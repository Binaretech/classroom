import RegisterScreen from 'app/features/register/screen';
import useIsAuth from 'app/hooks/isAuth';
import { Redirect, Stack } from 'expo-router';
import { ScrollView } from 'react-native';

export default function Register() {
  const isAuth = useIsAuth();

  if (isAuth) return <Redirect href="/dashboard" />;

  return (
    <>
      <Stack.Screen />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <RegisterScreen />
      </ScrollView>
    </>
  );
}
