import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { HomeIcon } from './HomeIcon';
import { HomeScreen } from './HomeScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <HomeIcon style={{ fontSize: 64 }} />
      <HomeScreen />
      <StatusBar style="auto" />
    </View>
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
