'use client';

import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import useIsAuth from 'app/hooks/isAuth';
import UserInformationModal from 'app/components/userInformationModal/UserInformationModal';

export default function AuthLayout({ children }: PropsWithChildren) {
  const { isAuth, isReady } = useIsAuth();

  if (!isAuth && isReady) {
    return redirect('/login');
  }

  return (
    <>
      <UserInformationModal />

      {children}
    </>
  );
}