import { SubmitHandler } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import UI from './ui';
import { useState } from 'react';
import { Inputs, useLoginForm } from './hook';

export type LoginScreenProps = {
  onLogin: () => void;
};

export default function Screen({ onLogin }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useLoginForm();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    setIsLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      onLogin();
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
