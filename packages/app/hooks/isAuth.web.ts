import { auth } from 'app/utils/firebase/firebase';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function useIsAuth() {
  const [isReady, setIsReady] = useState(false);
  const [isAuth, setIsAuth] = useState(Boolean(auth.currentUser?.email));

  const interceptor = useRef<number | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        interceptor.current = axios.interceptors.request.use(async (config) => {
          const token = await user.getIdToken();

          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
          }

          return config;
        });
      } else {
        if (interceptor.current) {
          axios.interceptors.request.eject(interceptor.current);
          interceptor.current = null;
        }
      }

      setIsReady(true);

      setIsAuth(Boolean(user?.email));
    });

    return () => unsubscribe();
  }, []);

  return { isAuth, isReady };
}
