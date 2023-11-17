import useIsAuth from 'app/hooks/isAuth';
import { PropsWithChildren } from 'react';

function AuthGuard({ children }: PropsWithChildren) {
  const isAuth = useIsAuth();

  // if (!isAuth) {
  //   return <Redirect to="/" />;
  // }

  return <>{children}</>;
}

export default AuthGuard;
