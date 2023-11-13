import useUser from 'app/hooks/user';
import UserInformationModalUI from './UserInformationModalUI';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';

export default function UserInformationModal() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await auth().currentUser?.updateProfile({});
    } catch {
      setIsLoading(false);
    }
  };

  const open = !Boolean(user?.displayName);

  return <UserInformationModalUI onSubmit={onSubmit} loading={isLoading} open={open} />;
}
