import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useIsAuth() {
  const [isReady, setIsReady] = useState(false);
  const [isAuth, setIsAuth] = useState(Boolean(auth().currentUser?.email));

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }

      setIsReady(true);

      setIsAuth(Boolean(user?.email));
    });

    return () => unsubscribe();
  }, []);

  return { isAuth, isReady };
}
