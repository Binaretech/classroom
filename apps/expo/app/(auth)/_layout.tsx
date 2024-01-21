import UserInformationModal from 'app/components/userInformationModal/UserInformationModal';
import useIsAuth from 'app/hooks/isAuth';
import { Redirect, Slot, useRouter } from 'expo-router';
import { XStack } from 'ui';

export default function AuthLayout() {
  const { isAuth, isReady } = useIsAuth();

  const router = useRouter();

  if (!isAuth) {
    return <Redirect href="/login" />;
  }

  return (
    <XStack flex={1} w="100%">
      <Slot />
      <UserInformationModal />
    </XStack>
  );
}
