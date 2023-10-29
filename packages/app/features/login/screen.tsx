import { SubmitHandler } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import UI, { Inputs } from './ui';
import { useRouter } from 'solito/navigation';

export default function Screen() {
  const { replace } = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((response) => {
        replace('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <UI onSubmit={onSubmit} />;
}
