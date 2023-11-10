import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

export default function useUser() {
  const [user, setUser] = useState(auth().currentUser);

  useEffect(() => {
    const unsubscribe = auth().onUserChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return user;
}
