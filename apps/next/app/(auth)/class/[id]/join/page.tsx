'use client';

import JoinClass from 'app/features/class/JoinClass';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const onUnauthenticated = () => {
    router.push('/auth/login');
  };

  return <JoinClass onUnauthenticated={onUnauthenticated} />;
}
