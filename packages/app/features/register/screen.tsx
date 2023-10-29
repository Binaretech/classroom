import UI from './ui';
import { SubmitHandler } from 'react-hook-form';
import { Inputs } from './ui';
import auth from '@react-native-firebase/auth';
import { useRouter } from 'solito/navigation';

export default function RegisterScreen() {
  const { replace } = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((response) => {
        replace('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <UI onSubmit={onSubmit} />;
}
