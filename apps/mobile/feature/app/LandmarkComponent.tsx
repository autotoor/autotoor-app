import { DistanceUnit, LocalLandmark } from '@autotoor/tour-common';
import axios from 'axios';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { LocationAccuracy, LocationObject } from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, NativeModules } from 'react-native';

import { LandmarkDisplayScreen } from './LandmarkDisplayScreen';
import { GeoService, SpeechService } from '../../service';
import { locToCoords } from '../../service/geo/util';

const localApiHost = '192.168.68.68';

export interface LandmarkComponentProps {
  speechService: SpeechService;
  geoService: GeoService;
}
export const LandmarkComponent = (props: LandmarkComponentProps) => {
  const distanceThresholdMeters = 1500;
  const locationPollIntervalMillis = 10000;
  const connectionDebugTimeoutMillis = 30000;
  const { speechService, geoService } = props;
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [unreadLandmarks, setUnreadLandmarks] = useState<LocalLandmark[]>([]);
  const [currentLandmark, setCurrentLandmark] = useState<LocalLandmark | null>(null);
  const [isReadyForNext, setIsReadyForNext] = useState(false);
  const [requestRetryCount, setRequestRetryCount] = useState(0);

  const alertsEnabled = false;
  const debug = (s: string) => {
    if (alertsEnabled) {
      alert(s);
    }
  };

  const getExpoDevHost = (): string | undefined => {
    const constants = Constants as typeof Constants & {
      debuggerHost?: string;
      expoGoConfig?: { hostUri?: string } | null;
      linkingUri?: string;
      manifest?: { debuggerHost?: string; hostUri?: string } | null;
      manifest2?: { launchAsset?: { url?: string } } | null;
    };
    const hostUri =
      process.env.EXPO_PUBLIC_AUTOTOOR_API_HOST ??
      constants.expoConfig?.hostUri ??
      constants.manifest2?.launchAsset?.url ??
      constants.expoGoConfig?.hostUri ??
      constants.manifest?.hostUri ??
      constants.manifest?.debuggerHost ??
      constants.debuggerHost ??
      constants.linkingUri ??
      NativeModules.SourceCode?.scriptURL;
    if (!hostUri) return undefined;

    try {
      const uri = hostUri.includes('://') ? hostUri : `http://${hostUri}`;
      return new URL(uri).hostname;
    } catch {
      return hostUri.split(':').shift();
    }
  };

  const getHostDomain = (): string => {
    if (process.env.EXPO_PUBLIC_AUTOTOOR_API_BASE_URL) {
      return process.env.EXPO_PUBLIC_AUTOTOOR_API_BASE_URL;
    }

    const devHost = getExpoDevHost();
    if (devHost) return `http://${devHost}:3333`;

    if (Constants.expoConfig?.extra?.appVariant === 'development' || __DEV__) {
      return `http://${localApiHost}:3333`;
    }

    return 'https://api.autotoor.com';
  };

  const baseUrl = `${getHostDomain()}/api/tour/landmark/v1/landmark/local`;

  /**
   * This periodically updates the currentLocation
   */
  useEffect(() => {
    updateCurrentLocation().catch(console.error);
    const interval = setInterval(() => {
      updateCurrentLocation().catch(console.error);
    }, locationPollIntervalMillis);
    return () => {
      clearInterval(interval);
    };
  }, [setCurrentLocation]);

  /**
   * This checks to see if location should be updated when currentLocation changes
   * It updates location of currentLocation is further away than the threshold from location
   */
  useEffect(() => {
    if (currentLocation !== null) {
      if (location === null) {
        setLocation(currentLocation);
      } else {
        const distance = geoService.calculateDistance(
          locToCoords(location),
          locToCoords(currentLocation),
          DistanceUnit.METER
        );
        if (distance > distanceThresholdMeters) {
          debug(`Setting location, distance change: ${distance}`);
          setLocation(currentLocation);
        } else {
          debug(`The distance: ${distance}`);
        }
      }
    }
  }, [currentLocation, location]);

  /**
   * This updates the list of landmarks when the location changes
   */
  useEffect(() => {
    if (location === null) return undefined;

    const controller = new AbortController();
    let didLoadLandmarks = false;

    const timeout = setTimeout(() => {
      if (didLoadLandmarks) return;

      Alert.alert('Unable to connect', `AutoToor could not load landmarks from:\n\n${baseUrl}`, [
        {
          onPress: () => {
            controller.abort();
            setRequestRetryCount((count) => count + 1);
          },
          text: 'Retry',
        },
      ]);
    }, connectionDebugTimeoutMillis);

    (async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const landmarks: LocalLandmark[] = (
          await axios.get(baseUrl, {
            params: { latitude: location.coords.latitude, longitude: location.coords.longitude },
            signal: controller.signal,
          })
        ).data;
        didLoadLandmarks = true;
        setUnreadLandmarks(landmarks);
        // we need to trigger ready for next if this is the first time we are doing this
        if (!currentLandmark) setIsReadyForNext(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        if (!axios.isCancel(e)) {
          console.error(`Error loading landmarks from ${baseUrl}`, e);
          setErrorMsg('There was an error loading landmarks near you');
          setIsError(true);
        }
      }
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    })().catch(console.error);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [baseUrl, connectionDebugTimeoutMillis, location, requestRetryCount]);

  /**
   * Called when the isReadyForNext changed
   */
  useEffect(() => {
    if (isReadyForNext) {
      debug('setting current landmark');
      advanceLandmark();
      setIsReadyForNext(false);
    }
  }, [isReadyForNext]);

  /**
   * Updates the presentation when the current landmark is set
   */
  useEffect(() => {
    (async () => {
      // start reading the landmark summary if not paused
      if (currentLandmark !== null && !isPaused) {
        const text = currentLandmark.landmark.readableSummary;
        if (text !== null) {
          await speechService.stop();
          await speechService.speak(text, onSpeechDone);
        }
      } else if (currentLandmark === null) {
        // if we have advanced past the last landmark we set to null and stop the speech
        await speechService.stop();
      }
    })().catch(console.error);
  }, [currentLandmark]);

  const advanceLandmark = (): void => {
    const landmark = unreadLandmarks.shift();
    if (landmark) {
      setUnreadLandmarks(unreadLandmarks);
      // TODO - compare landmark to those already visited and skip forward if we have already seen it recently
      setCurrentLandmark(landmark);
    } else {
      // if we are out of landmarks, trigger load of more by clearing currentLandmark and locations
      setCurrentLandmark(null);
      setIsLoading(true);
      setLocation(null);
      setCurrentLocation(null);
    }
  };

  const updateCurrentLocation = async (): Promise<void> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      setIsError(true);
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: LocationAccuracy.BestForNavigation,
    });
    setCurrentLocation(currentLocation);
  };

  const onSpeechDone = () => {
    // incrementLandmarkIndex();
    setIsReadyForNext(true);
  };

  const onPause = async () => {
    if (isPaused) {
      if (currentLandmark) {
        await speechService.resume(currentLandmark.landmark.readableSummary, onSpeechDone);
      }
      setIsPaused(false);
    } else {
      await speechService.pause();
      setIsPaused(true);
    }
  };

  const onNext = async () => {
    advanceLandmark();
  };

  let landmarkText: string;
  let title: string = '';
  let imageUrl = '';
  if (!currentLandmark) {
    landmarkText = '';
  } else {
    landmarkText = currentLandmark.landmark.readableSummary;
    imageUrl = currentLandmark.landmark.imageUrl;
    title = currentLandmark.landmark.title;
  }
  return (
    <LandmarkDisplayScreen
      landmarkText={landmarkText}
      title={title}
      imageUrl={imageUrl}
      isError={isError}
      isPaused={isPaused}
      isLoading={isLoading}
      errorMessage={errorMsg}
      onPause={onPause}
      onNext={onNext}
    />
  );
};
