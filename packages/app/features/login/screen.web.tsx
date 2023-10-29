import { SubmitHandler } from 'react-hook-form';
import UI, { Inputs } from './ui';
import { auth } from 'app/utils/firebase/firebase';
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'solito/navigation';

export default function Screen() {
  const { replace } = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, data.email, data.password);

    replace('/dashboard');
  };

  return <UI onSubmit={onSubmit} />;
}
