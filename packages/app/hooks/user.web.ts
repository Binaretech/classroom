import { auth } from 'app/utils/firebase/firebase';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuth } from '../provider/AuthProvider';

export default function useUser() {
  const [hasData, setHasData] = useState<User | null>(auth.currentUser);

  const { isAuth, isReady } = useAuth();

  useEffect(() => {
    if (isAuth && isReady) {
      setHasData(auth.currentUser);
    }
  }, [isAuth, isReady]);

  return hasData;
}
