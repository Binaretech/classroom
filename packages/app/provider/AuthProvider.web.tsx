import axios from 'axios';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { auth } from 'app/utils/firebase/firebase';

export type AuthContextProps = {
  isAuth: boolean;
  isReady: boolean;
  isLoggingOut: boolean;
  setIsLoggingOut: (isLoggingOut: boolean) => void;
};

const AuthContext = createContext<AuthContextProps>({
  isAuth: false,
  isReady: false,
  isLoggingOut: false,
  setIsLoggingOut: () => {},
});

export function AuthProvider({ children }) {
  const [isReady, setIsReady] = useState(false);
  const [isAuth, setIsAuth] = useState(Boolean(auth.currentUser?.email));
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isReady,
        isLoggingOut,
        setIsLoggingOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const { setIsLoggingOut, ...context } = useContext(AuthContext);

  const logout = async () => {
    setIsLoggingOut(true);

    try {
      await auth.signOut();
      setIsLoggingOut(false);
    } catch (e) {
      setIsLoggingOut(false);
    }
  };

  return { ...context, logout };
}
