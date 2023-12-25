import { Drawer } from 'expo-router/drawer';
import { DrawerContent, DrawerContentScrollView } from '@react-navigation/drawer';
import { useClassList } from 'app/services/classService';
import { ListItem, YGroup, YStack } from 'ui';
import { Link } from 'expo-router';
import { Home } from '@tamagui/lucide-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ClassLayout() {
  const { data } = useClassList();

  const { top } = useSafeAreaInsets();

  return (
    <Drawer
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <YGroup>
            <YGroup.Item>
              <Link href="/dashboard">
                <ListItem>
                  <Home />
                </ListItem>
              </Link>
            </YGroup.Item>
          </YGroup>
          {data?.classes?.map((classItem) => (
            <Link href={`/class/${classItem.id}`}>
              <ListItem>{classItem.name}</ListItem>
            </Link>
          ))}
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="[id]"
        options={{
          title: 'Class',
          headerShown: true,
        }}
      />
    </Drawer>
  );
}
