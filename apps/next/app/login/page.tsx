'use client';

import Screen from 'app/features/login/screen';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  return (
    <Screen
      onLogin={() => {
        router.replace('/dashboard');
      }}
    />
  );
}
