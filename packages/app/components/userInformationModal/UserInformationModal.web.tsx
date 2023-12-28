import { User, updateProfile } from 'firebase/auth';
import UserInformationModalUI, { UserInformationInputs } from './UserInformationModalUI';
import { auth } from 'app/utils/firebase/firebase';
import { useState } from 'react';
import useIsAuth from 'app/hooks/isAuth';
import useUser from 'app/hooks/user';

export default function UserInformationModal() {
  const [isLoading, setIsLoading] = useState(false);

  const user = useUser();
  const { isAuth, isReady } = useIsAuth();

  const onSubmit = async (data: UserInformationInputs) => {
    const { currentUser } = auth;

    setIsLoading(true);

    try {
      await updateProfile(currentUser as User, data);
      await auth.currentUser?.getIdToken(true);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  const open = !Boolean(user?.displayName) && isReady && isAuth;

  return <UserInformationModalUI onSubmit={onSubmit} loading={isLoading} open={open} />;
}
