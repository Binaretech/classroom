'use client';

import { TamaguiProvider } from './TamaguiProvider';
import { initializeLang } from 'app/lang';
import { auth } from 'app/utils/firebase/firebase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

initializeLang();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
    });
  }, []);

  return (
    <html lang="en">
      <body>
        <TamaguiProvider>{children}</TamaguiProvider>
      </body>
    </html>
  );
}
