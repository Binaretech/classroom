import LandingScreen from 'app/features/landing/screen';
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LandingScreen />
      </ScrollView>
    </>
  );
}
