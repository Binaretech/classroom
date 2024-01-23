import React, { ReactNode } from 'react';
import { Toast, ToastProvider, ToastViewport, YStack, useToastState } from 'ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AppToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { left, top, right } = useSafeAreaInsets();

  return (
    <ToastProvider>
      {children}
      <AppToast />
      <ToastViewport
        multipleToasts
        flexDirection="column-reverse"
        top={top}
        left={left}
        right={right}
        portalToRoot
      />
    </ToastProvider>
  );
};

function AppToast() {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) return null;

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration ?? 3000}
      y={0}
      opacity={1}
      scale={1}
      viewportName={currentToast.viewportName}
    >
      <YStack>
        <Toast.Title>{currentToast.title}</Toast.Title>
        {!!currentToast.message && <Toast.Description>{currentToast.message}</Toast.Description>}
      </YStack>
    </Toast>
  );
}
