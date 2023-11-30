'use client';

import ClassScreen from 'app/features/class/screen';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return <ClassScreen id={id} />;
}
