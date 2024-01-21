'use client';

import { TamaguiProvider } from './TamaguiProvider';
import { initializeLang } from 'app/lang';
import QueryProvider from 'app/provider/QueryProvider';
import { initializeDayjsPlugins } from 'app/utils/date';
import { AppToastProvider } from 'app/provider/AppToastProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '@tamagui/core/reset.css';
import '@tamagui/polyfill-dev';

import './global.css';

initializeDayjsPlugins();

initializeLang();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SafeAreaProvider>
          <QueryProvider>
            <TamaguiProvider>
              <AppToastProvider>{children}</AppToastProvider>
            </TamaguiProvider>
          </QueryProvider>
        </SafeAreaProvider>
      </body>
    </html>
  );
}
