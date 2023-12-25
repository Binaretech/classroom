'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { XStack } from 'ui';
import useIsAuth from 'app/hooks/isAuth';
import UserInformationModal from 'app/components/userInformationModal/UserInformationModal';

export default function AuthLayout({ children }: PropsWithChildren) {
  const isAuth = useIsAuth();
  const router = useRouter();

  if (!isAuth) {
    return router.replace('/login');
  }

  return (
    <>
      <XStack>{children}</XStack>
      <UserInformationModal />
    </>
  );
}
