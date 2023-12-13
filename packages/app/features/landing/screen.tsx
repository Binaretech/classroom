import { Card, Button } from 'tamagui';
import { useLink, useRouter } from 'solito/navigation';
import useIsAuth from 'app/hooks/isAuth';
import { useEffect } from 'react';

export default function LandingScreen() {
  const isAuth = useIsAuth();

  const login = useLink({
    href: '/login',
  });

  const register = useLink({
    href: '/register',
  });

  const { replace } = useRouter();

  useEffect(() => {
    if (isAuth) {
      replace('/dashboard', {
        experimental: {
          nativeBehavior: 'stack-replace',
          isNestedNavigator: true,
        },
      });
    }
  }, [isAuth]);

  return (
    <Card
      elevate
      size="$4"
      bordered
      px="$4"
      width="100%"
      $platform-web={{
        width: '80%',
        maxWidth: '500px',
      }}
    >
      <Button {...login}>login</Button>
      <Button {...register}>register</Button>
    </Card>
  );
}
