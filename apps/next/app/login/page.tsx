'use client';

import Screen from 'app/features/login/screen';
import { useRouter } from 'next/navigation';

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
