import Dashboard from 'app/features/dashboard/screen';
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';

export default function Login() {
  return (
    <>
      <Stack.Screen />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Dashboard />
      </ScrollView>
    </>
  );
}
