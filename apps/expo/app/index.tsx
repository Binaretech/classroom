import LandingScreen from 'app/features/landing/screen';
import useIsAuth from 'app/hooks/isAuth';
import { Redirect } from 'expo-router';
import { YStack } from 'ui';

export default function Screen() {
  const { isAuth, isReady } = useIsAuth();

  if (isAuth && isReady) return <Redirect href="/dashboard" />;

  return (
    <YStack p="$4" flex={1} ai="center" jc="center">
      <LandingScreen />
    </YStack>
  );
}
