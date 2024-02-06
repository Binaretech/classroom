import LoginScreen from 'app/features/login/screen';
import { useAuth } from 'app/provider/AuthProvider';
import { Redirect, Stack, useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

export default function Login() {
  const { isAuth, isReady } = useAuth();

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
