'use client';

import { TamaguiProvider } from './TamaguiProvider';
import { initializeLang } from 'app/lang';
import QueryProvider from 'app/provider/QueryProvider';

import '@tamagui/core/reset.css';
import '@tamagui/polyfill-dev';

import './global.css';

initializeLang();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <TamaguiProvider>{children}</TamaguiProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
