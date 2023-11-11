import { SubmitHandler } from 'react-hook-form';
import UI, { Inputs } from './ui';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'app/utils/firebase/firebase';
import { useRouter } from 'solito/navigation';
import { useRegisterForm } from './hook';
import { useState } from 'react';

export default function RegisterScreen() {
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useRegisterForm();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
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
