import UserInformationModalUI from './UserInformationModalUI';
import auth from '@react-native-firebase/auth';

export default function UserInformationModal() {
  const onSubmit = () => {
    // update firebase user information
    auth().currentUser?.updateProfile({});
  };

  return <UserInformationModalUI onSubmit={onSubmit} />;
}
