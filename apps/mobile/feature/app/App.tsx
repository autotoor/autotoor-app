import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { LandmarkComponent } from './LandmarkComponent';
import { GeoService, SpeechService } from '../../service';

export default function App() {
  const [speechService] = useState(new SpeechService());
  const [geoService] = useState(new GeoService());
  return (
    <SafeAreaView style={styles.container}>
      <LandmarkComponent speechService={speechService} geoService={geoService} />
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
