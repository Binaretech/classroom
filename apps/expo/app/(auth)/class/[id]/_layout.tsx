import { RouteProp, useRoute } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { ClassIdProvider } from 'app/provider/ClassIdProvider';
import { useTranslation } from 'app/hooks/translation';
import { useClass } from 'app/services/classService';
import { MessagesSquare, Users } from '@tamagui/lucide-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import useUser from 'app/hooks/user';
import SettingsButton from 'app/components/SettingsButton';

export default function ClassLayout() {
  const route = useRoute<RouteProp<RootStackParamList, 'class/[id]'>>();
  const { data } = useClass(route.params.id);

  const user = useUser();

  const { t } = useTranslation();

  return (
    <ClassIdProvider classId={route.params.id}>
      <Tabs
        screenOptions={{
          headerShown: true,
          title: data?.name ?? '',
          headerRight: () =>
            data?.ownerId === user?.uid && <SettingsButton classId={route.params.id} />,
          headerLeft: () => <DrawerToggleButton />,
        }}
      >
        <Tabs.Screen
          name="posts"
          options={{
            tabBarLabel: t('views.class.tabs.posts'),
            tabBarIcon: ({ color, size }) => <MessagesSquare color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="members"
          options={{
            tabBarLabel: t('views.class.tabs.members'),
            tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: t('views.class.tabs.settings'),
            href: null,
          }}
        />
      </Tabs>
    </ClassIdProvider>
  );
}
