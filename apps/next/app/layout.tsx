'use client';

import { TamaguiProvider } from './TamaguiProvider';
import { initializeLang } from 'app/lang';
import QueryProvider from 'app/provider/QueryProvider';
import { initializeDayjsPlugins } from 'app/utils/date';
import { AppToastProvider } from 'app/provider/AppToastProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useIsAuth from 'app/hooks/isAuth';
import {
  redirect,
  useSelectedLayoutSegments,
  useSearchParams,
  useRouter,
  usePathname,
} from 'next/navigation';
import { useEffect } from 'react';

import '@tamagui/core/reset.css';
import '@tamagui/polyfill-dev';

import './global.css';

initializeDayjsPlugins();

initializeLang();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isAuth, isReady } = useIsAuth();

  const params = useSearchParams();

  const pathname = usePathname();

  const router = useRouter();

  const segments = useSelectedLayoutSegments();

  useEffect(() => {
    if (isReady && isAuth && !segments.includes('(auth)')) {
      const path = params.get('redirect') || '/dashboard';

      router.replace(path);
    }
  }, [isAuth, isReady, params, router, segments]);

  useEffect(() => {
    if (isReady && !isAuth && segments.includes('(auth)')) {
      redirect(`/login?redirect=${pathname}`);
    }
  }, [isAuth, isReady, segments, pathname]);

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
