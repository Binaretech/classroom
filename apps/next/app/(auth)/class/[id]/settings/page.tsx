'use client';

import ClassSettings from 'app/features/class/settings/ClassSettings';
import { useAuth } from 'app/provider/AuthProvider';

export default function SettingsPage({ params }: { params: { id: string } }) {
  const { isReady } = useAuth();

  if (!isReady) return null;

  return <ClassSettings classId={params.id} />;
}
