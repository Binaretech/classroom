import { SubmitHandler } from 'react-hook-form';
import UI from './ui';
import { auth } from 'app/utils/firebase/firebase';
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'solito/navigation';
import { useState } from 'react';
import { Inputs, useLoginForm } from './hook';

export default function Screen() {
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useLoginForm();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    const { email, password } = data;

    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);

      replace('/dashboard');
    } catch (e) {
      if (e.code.startsWith('auth/')) {
        control.setError('email', {
          type: 'manual',
          message: `errors.${e.code}`,
        });
      }
      setIsLoading(false);
    }
  };

  return <UI onSubmit={handleSubmit(onSubmit)} loading={isLoading} control={control} />;
}
