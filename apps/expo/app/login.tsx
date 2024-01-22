import LoginScreen from 'app/features/login/screen';
import useIsAuth from 'app/hooks/isAuth';
import { Redirect, Stack, useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

export default function Login() {
  const { isAuth, isReady } = useIsAuth();

  const router = useRouter();

  if (isReady && isAuth) return <Redirect href="/dashboard" />;

  return (
    <>
      <Stack.Screen />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LoginScreen
          onLogin={() => {
            router.replace('(auth)/dashboard');
          }}
        />
      </ScrollView>
    </>
  );
}
