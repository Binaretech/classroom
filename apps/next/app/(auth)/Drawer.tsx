import React, { PropsWithChildren, useState } from 'react';
import { Menu } from '@tamagui/lucide-icons';
import { LogOut, UserCog } from '@tamagui/lucide-icons';
import { Button, ListItem, Popover, Spinner, View, XStack, YGroup, YStack } from 'ui';
import { cls } from 'utils/styles';
import useUser from 'app/hooks/user';
import UserAvatar from 'app/components/UserAvatar';
import { useTranslation } from 'app/hooks/translation';

import styles from './css/Drawer.module.css';
import { useClassList } from 'app/services/classService';
import { useAuth } from 'app/provider/AuthProvider';
import { flatPaginatedData } from 'app/utils/functions';

export default function Drawer({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isSuccess } = useClassList();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const classes = flatPaginatedData(
    data?.pages ?? [],
    (page) => page.classes,
    (item) => item.id
  );

  return (
    <YStack w="100%">
      <XStack p="$2" jc="space-between">
        <Button onPress={toggleDrawer} circular chromeless icon={Menu} />
        <UserButton />
      </XStack>
      <XStack w="100%">
        <YStack className={cls(styles.drawer, isOpen && styles.open)}>
          {isSuccess &&
            classes?.map((classItem) => (
              <ListItem
                key={classItem.id}
                title={classItem.name}
                onPress={() => {
                  console.log('classItem', classItem);
                }}
              />
            ))}
        </YStack>
        <YStack w={isOpen ? 'calc(100% - 250px)' : '100%'} className={cls(styles.content)}>
          {children}
        </YStack>
      </XStack>
    </YStack>
  );
}

function UserButton() {
  const user = useUser();

  const { t } = useTranslation();

  return (
    <Popover placement="bottom" strategy="absolute">
      <Popover.Trigger asChild>
        <View position="relative">
          <UserAvatar user={user} size={40} />
        </View>
      </Popover.Trigger>

      <Popover.Content
        borderWidth={1}
        padding="0"
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
      >
        <YStack gap="$3">
          <YGroup alignSelf="center" width={240} size="$4" radiused>
            <YGroup.Item>
              <ListItem hoverTheme icon={UserCog} title={t('views.profile.title')} />
            </YGroup.Item>
            <YGroup.Item>
              <LogoutItem />
            </YGroup.Item>
          </YGroup>
        </YStack>
      </Popover.Content>
    </Popover>
  );
}

function LogoutItem() {
  const { t } = useTranslation();

  const { logout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await logout();
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <ListItem
      hoverTheme
      disabled={isLoading}
      icon={LogOut}
      flexDirection="row"
      title={isLoading ? <Spinner size="small" /> : t('views.logout')}
      onPress={handleLogout}
    />
  );
}
