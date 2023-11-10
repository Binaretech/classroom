import { auth } from 'app/utils/firebase/firebase';
import { useEffect, useState } from 'react';

export default function useIsAuth() {
  const [isAuth, setIsAuth] = useState(auth.currentUser?.email);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuth(user?.email);
    });

    return () => unsubscribe();
  }, []);

  return isAuth;
}
