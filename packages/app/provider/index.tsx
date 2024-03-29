import { TamaguiProvider, TamaguiProviderProps } from 'ui';
import { useColorScheme } from 'react-native';

import config from '../tamagui.config';
import QueryProvider from './QueryProvider';
import { AppToastProvider } from './AppToastProvider';

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = useColorScheme();

  return (
    <QueryProvider>
      <TamaguiProvider
        config={config}
        disableInjectCSS
        defaultTheme={scheme === 'dark' ? 'dark' : 'light'}
        {...rest}
      >
        <AppToastProvider>{children}</AppToastProvider>
      </TamaguiProvider>
    </QueryProvider>
  );
}
