'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { XStack } from 'ui';
import useIsAuth from 'app/hooks/isAuth';
import Drawer, { DrawerProvider } from 'app/components/drawer/Drawer';
import UserInformationModal from 'app/components/userInformationModal/UserInformationModal';

export default function AuthLayout({ children }: PropsWithChildren) {
  const isAuth = useIsAuth();
  const router = useRouter();

  if (!isAuth) {
    return router.replace('/login');
  }

  return (
    <DrawerProvider>
      <XStack>
        <Drawer />
        {children}
      </XStack>
      <UserInformationModal />
    </DrawerProvider>
  );
}
