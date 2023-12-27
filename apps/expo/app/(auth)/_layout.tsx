import { useRoute } from '@react-navigation/native';
import UserInformationModal from 'app/components/userInformationModal/UserInformationModal';
import useIsAuth from 'app/hooks/isAuth';
import { Slot, useRouter } from 'expo-router';
import { XStack } from 'ui';

export default function AuthLayout() {
  const isAuth = useIsAuth();

  const router = useRouter();

  if (!isAuth) {
    return router.replace('/login');
  }

  return (
    <XStack flex={1} w="100%">
      <Slot />
      <UserInformationModal />
    </XStack>
  );
}
