import RegisterScreen from 'app/features/register/screen'
import { Stack } from 'expo-router'
import { ScrollView } from 'react-native'

export default function Register() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <RegisterScreen />
      </ScrollView>
    </>
  )
}
