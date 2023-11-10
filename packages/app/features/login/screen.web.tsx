import { SubmitHandler } from 'react-hook-form';
import UI, { Inputs } from './ui';
import { auth } from 'app/utils/firebase/firebase';
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'solito/navigation';
import { useState } from 'react';

export default function Screen() {
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, data.email, data.password);

      replace('/dashboard');
    } catch {
      setIsLoading(false);
    }
  };

  return <UI onSubmit={onSubmit} loading={isLoading} />;
}
