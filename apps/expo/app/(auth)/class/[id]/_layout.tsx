import { RouteProp, useRoute } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { ClassIdProvider } from 'app/provider/ClassIdProvider';
import { useTranslation } from 'app/hooks/translation';
import { useClass } from 'app/services/classService';
import { MessagesSquare, Users } from '@tamagui/lucide-icons';

export default function ClassLayout() {
  const route = useRoute<RouteProp<RootStackParamList, 'class/[id]'>>();
  const { data } = useClass(route.params.id);

  const { t } = useTranslation();

  return (
    <ClassIdProvider classId={route.params.id}>
      <Tabs
        screenOptions={{
          headerShown: true,
          title: data?.name ?? '',
        }}
      >
        <Tabs.Screen
          name="posts"
          options={{
            tabBarIcon: ({ color, size }) => <MessagesSquare color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="members"
          options={{
            tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
          }}
        />
      </Tabs>
    </ClassIdProvider>
  );
}
