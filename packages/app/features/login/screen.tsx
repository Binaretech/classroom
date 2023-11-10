import { SubmitHandler } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import UI, { Inputs } from './ui';
import { useRouter } from 'solito/navigation';
import { useState } from 'react';

export default function Screen() {
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  return <UI onSubmit={onSubmit} loading={isLoading} />;
}
