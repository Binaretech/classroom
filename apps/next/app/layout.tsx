'use client';

import { TamaguiProvider } from './TamaguiProvider';
import { initializeLang } from 'app/lang';
import UserInformationModal from 'app/components/userInformationModal/UserInformationModal';

initializeLang();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TamaguiProvider>
          {children}
          <UserInformationModal />
        </TamaguiProvider>
      </body>
    </html>
  );
}
