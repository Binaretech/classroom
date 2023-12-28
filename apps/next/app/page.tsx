'use client';

import LandingScreen from 'app/features/landing/screen';
import useIsAuth from 'app/hooks/isAuth';
import { redirect } from 'next/navigation';

export default function Landing() {
  const { isAuth } = useIsAuth();

  if (isAuth) {
    return redirect('/dashboard');
  }

  return <LandingScreen />;
}
