import LandingScreen from 'app/features/landing/screen';
import useIsAuth from 'app/hooks/isAuth';
import { Redirect, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { YStack } from 'ui';

export default function Screen() {
  const { isAuth, isReady } = useIsAuth();

  const { top } = useSafeAreaInsets();

  if (isAuth && isReady) return <Redirect href="/dashboard" />;

  return (
    <YStack pt={top}>
      <LandingScreen />
    </YStack>
  );
}
