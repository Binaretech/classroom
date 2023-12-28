import LandingScreen from 'app/features/landing/screen';
import useIsAuth from 'app/hooks/isAuth';
import { Redirect, Stack } from 'expo-router';
import { SafeAreaView, ScrollView } from 'react-native';

export default function Screen() {
  const { isAuth, isReady } = useIsAuth();

  if (isAuth && isReady) return <Redirect href="/dashboard" />;

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LandingScreen />
      </ScrollView>
    </SafeAreaView>
  );
}
