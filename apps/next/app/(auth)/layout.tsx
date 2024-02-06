'use client';

import { redirect, usePathname, useParams, useSelectedLayoutSegments } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';
import { useAuth } from 'app/provider/AuthProvider';
import UserInformationModal from 'app/components/userInformationModal/UserInformationModal';
import Drawer from './Drawer';

export default function AuthLayout({ children }: PropsWithChildren) {
  const { isAuth, isReady, isLoggingOut } = useAuth();

  const pathname = usePathname();

  const params = useParams();

  const segments = useSelectedLayoutSegments();

  useEffect(() => {
    if (isReady && !isAuth) {
      redirect(isLoggingOut ? '/' : `/login?redirect=${pathname}`);
    }
  }, [isAuth, isReady, segments, pathname, params, isLoggingOut]);

  return (
    <Drawer>
      <UserInformationModal />
      {children}
    </Drawer>
  );
}
