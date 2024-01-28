'use client';

import ClassSettings from 'app/features/class/settings/ClassSettings';
import useIsAuth from 'app/hooks/isAuth';

export default function SettingsPage({ params }: { params: { id: string } }) {
  const { isReady } = useIsAuth();

  if (!isReady) return null;

  return <ClassSettings classId={params.id} />;
}
