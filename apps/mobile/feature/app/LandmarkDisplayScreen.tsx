import { ErrorText } from '@autotoor/ui-common';
import { Image, Pressable, ScrollView, StyleSheet, Text } from 'react-native';

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

const styles = StyleSheet.create({
  paragraph: {
    color: 'white',
    fontSize: 12,
    justifyContent: 'space-between',
    margin: 8,
    textAlign: 'justify',
  },
  image: {
    borderRadius: 20,
    height: 300,
    margin: 4,
  },
  imageNone: {
    backgroundColor: 'black',
    borderRadius: 20,
    height: 300,
    margin: 4,
    resizeMode: 'contain',
    width: '100%',
  },
  imageLoading: {
    backgroundColor: 'black',
    borderRadius: 20,
    height: '100%',
    margin: 4,
    resizeMode: 'contain',
    width: '100%',
  },
  scrollView: {
    alignSelf: 'center',
    borderRadius: 10,
    margin: 2,
    width: '100%',
  },
  contentContainer: {
    alignItems: 'stretch',
    backgroundColor: 'black',
    borderRadius: 10,
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: '100%',
    paddingBottom: 20,
  },
  startButton: {
    alignItems: 'center',
    backgroundColor: '#33b249',
    borderRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    margin: 4,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  stopButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#dd7973',
    margin: 4,
  },
  nextButton: {
    alignItems: 'center',
    backgroundColor: '#4681f4',
    borderRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    margin: 4,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    lineHeight: 21,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

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
  const paragraphs = landmarkText.split('\n');
  return (
    <>
      <ScrollView contentContainerStyle={styles.contentContainer} style={styles.scrollView}>
        {isError && <ErrorText>{errorMessage}</ErrorText>}
        {!imageUrl && isLoading ? (
          <Image
            style={styles.imageLoading}
            source={require('../../assets/loading-image.gif')}
          ></Image>
        ) : (
          <>
            <Image
              style={imageUrl ? styles.image : styles.imageNone}
              source={imageUrl ? { uri: imageUrl } : require('../../assets/icon.png')}
            ></Image>
            <Text style={styles.title}>{title}</Text>
            <Pressable style={isPaused ? styles.startButton : styles.stopButton} onPress={onPause}>
              <Text style={styles.buttonText}>{isPaused ? 'Start' : 'Pause'}</Text>
            </Pressable>
            <Pressable style={styles.nextButton} onPress={onNext}>
              <Text style={styles.buttonText}>Next</Text>
            </Pressable>
            {paragraphs.map((paragraph, index) => (
              <Text key={index} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}
          </>
        )}
      </ScrollView>
    </>
  );
};
