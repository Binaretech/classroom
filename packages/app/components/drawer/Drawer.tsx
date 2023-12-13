import { Menu } from '@tamagui/lucide-icons';
import { PropsWithChildren, createContext, useCallback, useContext, useState } from 'react';
import { Button, Text, YStack } from 'ui';

interface DrawerContextProps {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export function DrawerProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => setIsOpen(true), [setIsOpen]);
  const closeDrawer = useCallback(() => setIsOpen(false), [setIsOpen]);

  const toggleDrawer = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);

  return (
    <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
}

export default function Drawer() {
  const { isOpen } = useDrawer();

  if (!isOpen) return null;

  return (
    <YStack>
      <Text>drawer</Text>
    </YStack>
  );
}

export function DrawerButton() {
  const { toggleDrawer } = useDrawer();

  return <Button icon={Menu} onPress={toggleDrawer} />;
}
