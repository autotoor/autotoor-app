import { Strong } from '@autotoor/ui';
import { Button, Image, ScrollView, Text, View } from 'react-native';

export interface LandmarkDisplayScreenProps {
  landmarkText: string;
  imageUrl: string;
  title: string;
  isPaused: boolean;
  isError: boolean;
  isLoading: boolean;
  errorMessage: string | null;
  onPause: () => void;
  onNext: () => void;
}

export const LandmarkDisplayScreen = (props: LandmarkDisplayScreenProps) => {
  const {
    isError,
    errorMessage,
    title,
    landmarkText,
    imageUrl,
    isPaused,
    isLoading,
    onPause,
    onNext,
  } = props;
  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {isError && <Strong style={{ color: 'red' }}>{errorMessage}</Strong>}
        {isLoading ? (
          <Strong style={{ color: 'purple' }}>Loading ...</Strong>
        ) : (
          <Image style={{ width: '100%', height: '50%' }} source={{ uri: imageUrl }}></Image>
        )}
        <Strong>{title}</Strong>
        <Button title={isPaused ? 'Start' : 'Pause'} color="#841584" onPress={onPause}></Button>
        <Button title="Next" color="#641584" onPress={onNext}></Button>
        <View style={{ flex: 1 }}>
          <Text style={{ flex: 1 }}>{landmarkText}</Text>
        </View>
      </ScrollView>
    </>
  );
};
