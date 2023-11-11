import { SubmitHandler } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import UI from './ui';
import { useRouter } from 'solito/navigation';
import { useState } from 'react';
import { Inputs, useLoginForm } from './hook';

export default function Screen() {
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useLoginForm();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      await auth().signInWithEmailAndPassword(data.email, data.password);
      replace('dashboard', {
        experimental: {
          nativeBehavior: 'stack-replace',
          isNestedNavigator: true,
        },
      });
    } catch {
      setIsLoading(false);
    }
  };

  return <UI onSubmit={handleSubmit(onSubmit)} loading={isLoading} control={control} />;
}
