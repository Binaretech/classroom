import Dashboard from 'app/features/dashboard/screen';
import { Stack } from 'expo-router';
import { SafeAreaView, ScrollView } from 'react-native';

export default function DashboardView() {
  return (
    <SafeAreaView>
      <Stack.Screen />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Dashboard />
      </ScrollView>
    </SafeAreaView>
  );
}
