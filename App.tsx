import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Navigation from './navigation/index';

export default function App() {
  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
}

