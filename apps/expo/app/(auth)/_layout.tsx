import Drawer, { DrawerProvider } from 'app/components/drawer/Drawer';
import UserInformationModal from 'app/components/userInformationModal/UserInformationModal';
import useIsAuth from 'app/hooks/isAuth';
import { Slot, useRouter } from 'expo-router';
import { PropsWithChildren } from 'react';
import { XStack } from 'ui';

export default function AuthLayout() {
  const isAuth = useIsAuth();

  const router = useRouter();

  if (!isAuth) {
    return router.replace('/login');
  }

  return (
    <DrawerProvider>
      <XStack>
        <Drawer />
        <Slot />
      </XStack>
      <UserInformationModal />
    </DrawerProvider>
  );
}
