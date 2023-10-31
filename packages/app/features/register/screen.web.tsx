import { SubmitHandler } from 'react-hook-form';
import UI, { Inputs } from './ui';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'app/utils/firebase/firebase';
import { useRouter } from 'solito/navigation';

export default function RegisterScreen() {
  const { replace } = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        replace('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <UI onSubmit={onSubmit} />;
}