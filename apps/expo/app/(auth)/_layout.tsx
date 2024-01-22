import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import UserInformationModal from 'app/components/userInformationModal/UserInformationModal';
import useIsAuth from 'app/hooks/isAuth';
import { Redirect, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Home } from '@tamagui/lucide-icons';
import { useClassList } from 'app/services/classService';
import { useTranslation } from 'app/hooks/translation';
import { YStack } from 'ui';
import auth from '@react-native-firebase/auth';

export default function AuthLayout() {
  const { isAuth, isReady } = useIsAuth();

  const router = useRouter();

  const { data } = useClassList();

  const { t } = useTranslation();

  if (!isAuth && isReady) {
    return <Redirect href="/login" />;
  }

  return (
    <>
      <Drawer
        drawerContent={(props) => (
          <YStack flex={1}>
            <DrawerContentScrollView {...props}>
              <DrawerItem
                icon={() => <Home />}
                label=""
                onPress={() => {
                  router.push('/dashboard');
                }}
              />
              {data?.classes?.map?.((classItem) => (
                <DrawerItem
                  key={classItem.id}
                  label={classItem.name}
                  onPress={() => {
                    router.push(`(auth)/class/${classItem.id}/posts`);
                  }}
                />
              ))}
            </DrawerContentScrollView>
            <DrawerItem
              label={t('views.dashboard.logout')}
              onPress={() => {
                auth().signOut();
              }}
            />
          </YStack>
        )}
      >
        <Drawer.Screen
          name="dashboard"
          options={{
            title: t('views.dashboard.title'),
          }}
        />
        <Drawer.Screen
          name="class/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Drawer>
      <UserInformationModal />
    </>
  );
}
