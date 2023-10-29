'use client';

import useIsAuth from 'app/hooks/isAuth';
import { PropsWithChildren } from 'react';

export default function AuthGuard({ children }: PropsWithChildren) {
  const isAuth = useIsAuth();

  return <>{children}</>;
}
