import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { LandmarkDisplayScreen } from './LandmarkDisplayScreen';
import { SpeechService } from '../../service';

export default function App() {
  const [speechService] = useState(new SpeechService());
  return (
    <SafeAreaView style={styles.container}>
      <LandmarkDisplayScreen speechService={speechService} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
