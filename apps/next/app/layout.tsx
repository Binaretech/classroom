'use client';

import { TamaguiProvider } from './TamaguiProvider';
import { initializeLang } from 'app/lang';
import QueryProvider from 'app/provider/QueryProvider';
import { initializeDayjsPlugins } from 'app/utils/date';
import { AppToastProvider } from 'app/provider/AppToastProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from 'app/provider/AuthProvider';
import {
  useSelectedLayoutSegments,
  useSearchParams,
  useRouter,
  redirect,
  usePathname,
} from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

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
              <AuthProvider>
                <AppToastProvider>
                  <RedirectOnAuth>{children}</RedirectOnAuth>
                </AppToastProvider>
              </AuthProvider>
            </TamaguiProvider>
          </QueryProvider>
        </SafeAreaProvider>
      </body>
    </html>
  );
}

function RedirectOnAuth({ children }: PropsWithChildren<{}>) {
  const { isAuth, isReady } = useAuth();

  const params = useSearchParams();

  const router = useRouter();

  const segments = useSelectedLayoutSegments();

  useEffect(() => {
    if (isReady && isAuth && !segments.includes('(auth)')) {
      const path = params.get('redirect') || '/dashboard';

      router.replace(path);
    }
  }, [isAuth, isReady, params, router, segments]);

  return <>{children}</>;
}
