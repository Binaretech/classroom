import { useAuth } from 'app/provider/AuthProvider';
import { PropsWithChildren } from 'react';

function AuthGuard({ children }: PropsWithChildren) {
  const isAuth = useAuth();

  // if (!isAuth) {
  //   return <Redirect to="/" />;
  // }

  return <>{children}</>;
}

export default AuthGuard;
