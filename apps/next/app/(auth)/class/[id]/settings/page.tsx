'use client';

import ClassSettings from 'app/features/class/settings/ClassSettings';

export default function SettingsPage({ params }: { params: { id: string } }) {
  return <ClassSettings classId={params.id} />;
}
