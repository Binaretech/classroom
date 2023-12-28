import useUser from 'app/hooks/user';
import UserInformationModalUI, { UserInformationInputs } from './UserInformationModalUI';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import useIsAuth from 'app/hooks/isAuth';

export default function UserInformationModal() {
  const [isLoading, setIsLoading] = useState(false);

  const user = useUser();
  console.log(user?.displayName);

  const { isAuth, isReady } = useIsAuth();

  const onSubmit = async (data: UserInformationInputs) => {
    setIsLoading(true);
    try {
      await auth().currentUser?.updateProfile({
        displayName: data.displayName,
      });
    } catch {
      setIsLoading(false);
    }
  };

  const open = !Boolean(user?.displayName) && isReady && isAuth;

  return <UserInformationModalUI onSubmit={onSubmit} loading={isLoading} open={open} />;
}
