import { auth } from 'app/utils/firebase/firebase';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import useIsAuth from './isAuth';

export default function useUser() {
  const [hasData, setHasData] = useState<User | null>(auth.currentUser);

  const isAuth = useIsAuth();

  useEffect(() => {
    if (isAuth) {
      setHasData(auth.currentUser);
    }
  }, [isAuth]);

  return hasData;
}
