import React, { PropsWithChildren, useState } from 'react';
import { Menu } from '@tamagui/lucide-icons';
import {
  Adapt,
  Avatar,
  Button,
  Input,
  Label,
  Popover,
  PopoverProps,
  XStack,
  YGroup,
  YStack,
} from 'ui';
import { cls } from 'utils/styles';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from '@tamagui/lucide-icons';

import styles from './css/Drawer.module.css';
import UserAvatar from 'app/components/UserAvatar';
import useUser from 'app/hooks/user';

export default function Drawer({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <YStack w="100%">
      <XStack p="$2" jc="space-between">
        <Button onPress={toggleDrawer} circular chromeless icon={Menu} />
      </XStack>
      <XStack w="100%">
        <YStack className={cls(styles.drawer, isOpen && styles.open)}>
          <YStack>
            <div>Drawer</div>
          </YStack>
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

  return (
    <Popover placement="bottom">
      <Popover.Trigger asChild>
        <Button circular chromeless>
          <UserAvatar user={user} size={40} />
        </Button>
      </Popover.Trigger>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
      >
        {/* <Popover.Arrow borderWidth={1} borderColor="$borderColor" /> */}

        <YStack gap="$3">
          <YGroup alignSelf="center" bordered width={240} size="$4"></YGroup>
        </YStack>
      </Popover.Content>
    </Popover>
  );
}
