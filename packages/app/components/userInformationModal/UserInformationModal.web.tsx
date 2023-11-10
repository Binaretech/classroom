import { User, updateProfile } from 'firebase/auth';
import UserInformationModalUI, { UserInformationInputs } from './UserInformationModalUI';
import { auth } from 'app/utils/firebase/firebase';
import { useState } from 'react';
import useIsAuth from 'app/hooks/isAuth';

export default function UserInformationModal() {
  const [isLoading, setIsLoading] = useState(false);

  const isAuth = useIsAuth();

  const onSubmit = async (data: UserInformationInputs) => {
    const { currentUser } = auth;
    setIsLoading(true);
    try {
      await updateProfile(currentUser as User, data);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  if (!isAuth) return null;

  return <UserInformationModalUI onSubmit={onSubmit} loading={isLoading} />;
}
