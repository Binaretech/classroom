'use client';

import { TamaguiProvider } from './TamaguiProvider';
import { initializeLang } from 'app/lang';
import UserInformationModal from 'app/components/userInformationModal/UserInformationModal';
import QueryProvider from 'app/provider/QueryProvider';

initializeLang();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <TamaguiProvider>
            {children}
            <UserInformationModal />
          </TamaguiProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
