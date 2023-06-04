import { LocalLandmark } from '@autotoor/tour-common';
import { Strong } from '@autotoor/ui';
import axios from 'axios';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { useEffect, useState } from 'react';
import { Button, Image, ScrollView, Text, View } from 'react-native';

import { SpeechService } from '../../service';

export interface LandmarkDisplayScreenProps {
  speechService: SpeechService;
}

export const LandmarkDisplayScreen = (props: LandmarkDisplayScreenProps) => {
  const { speechService } = props;
  const baseUrl = 'http://10.0.0.19:3333/api/tour/landmark/v1/landmark/local';
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [landmarkState, setLandmarkState] = useState<{ localLandmarks: LocalLandmark[] }>({
    localLandmarks: [],
  });
  const [currentLandmarkIndex, setCurrentLandmarkIndex] = useState(-1);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setIsError(true);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      try {
        setIsError(false);
        setIsLoading(true);
        const landmarks: LocalLandmark[] = (
          await axios.get(baseUrl, {
            params: { latitude: location.coords.latitude, longitude: location.coords.longitude },
          })
        ).data;
        setLandmarkState({ localLandmarks: landmarks });
        setCurrentLandmarkIndex(0);
      } catch (e) {
        setErrorMsg('There was an error loading landmarks near you');
        setIsError(true);
      }
      setIsLoading(false);
    })().catch(console.error);
  }, [setLandmarkState]);

  // Hook called when the currentLandmarkIndex is changed
  useEffect(() => {
    (async () => {
      if (currentLandmarkIndex >= 0 && !isPaused) {
        const text = landmarkState.localLandmarks[currentLandmarkIndex]?.landmark.readableSummary;
        if (text !== null) {
          await speechService.stop();
          await speechService.speak(text, onSpeechDone);
        }
      }
    })().catch(console.error);
  }, [currentLandmarkIndex]);

  const incrementLandmarkIndex = (): number => {
    const next =
      currentLandmarkIndex + 1 >= landmarkState.localLandmarks.length
        ? 0
        : currentLandmarkIndex + 1;
    setCurrentLandmarkIndex(next);
    return next;
  };

  const onSpeechDone = () => {
    incrementLandmarkIndex();
  };

  const handlePauseButton = async () => {
    if (isPaused) {
      await speechService.resume(landmarkText, onSpeechDone);
      setIsPaused(false);
    } else {
      await speechService.pause();
      setIsPaused(true);
    }
  };

  const handleNextButton = async () => {
    incrementLandmarkIndex();
  };

  let landmarkText = '';
  let title: string = '';
  let imageUrl = '';
  if (isLoading) {
    landmarkText = 'Loading...';
  } else {
    landmarkText = landmarkState.localLandmarks[currentLandmarkIndex]?.landmark.readableSummary;
    imageUrl = landmarkState.localLandmarks[currentLandmarkIndex]?.landmark.imageUrl;
    title = landmarkState.localLandmarks[currentLandmarkIndex]?.landmark.title;
  }

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {isError && <Strong style={{ color: 'red' }}>{errorMsg}</Strong>}
        {isLoading ? (
          <Strong style={{ color: 'purple' }}>Loading ...</Strong>
        ) : (
          <Image style={{ width: '100%', height: '50%' }} source={{ uri: imageUrl }}></Image>
        )}
        <Strong>{title}</Strong>
        <Button
          title={isPaused ? 'Start' : 'Pause'}
          color="#841584"
          onPress={handlePauseButton}
        ></Button>
        <Button title="Next" color="#641584" onPress={handleNextButton}></Button>
        <View style={{ flex: 1 }}>
          <Text style={{ flex: 1 }}>{landmarkText}</Text>
        </View>
      </ScrollView>
    </>
  );
};
