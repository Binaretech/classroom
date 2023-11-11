import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { SubmitHandler } from 'react-hook-form';
import { useRouter } from 'solito/navigation';
import UI from './ui';
import { Inputs } from './ui';
import { useRegisterForm } from './hook';

export default function RegisterScreen() {
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useRegisterForm();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(data.email, data.password);
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
