import LoginScreen from 'app/features/login/screen'
import { Stack } from 'expo-router'
import { ScrollView } from 'react-native'

export default function Login() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LoginScreen />
      </ScrollView>
    </>
  )
}
