import RegisterScreen from 'app/features/register/screen';
import { useAuth } from 'app/provider/AuthProvider';
import { Redirect, Stack } from 'expo-router';
import { ScrollView } from 'react-native';

export default function Register() {
  const { isAuth, isReady } = useAuth();

  if (isAuth && isReady) return <Redirect href="/dashboard" />;

  return (
    <>
      <Stack.Screen />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <RegisterScreen />
      </ScrollView>
    </>
  );
}
