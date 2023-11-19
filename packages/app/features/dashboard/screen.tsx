import { YStack, H2, XStack, Button } from 'ui';
import ClassList from './ClassList';
import CreateClassModal from './CreateClassModal';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import JoinClassModal from './JoinClassModal';

export default function DashboardScreen() {
  const { t } = useTranslation();

  return (
    <>
      <YStack p="$4">
        <H2>Mis clases</H2>
        <XStack justifyContent="flex-end" columnGap="$4" p="$4">
          <JoinClassModal />
          <CreateClassModal />
        </XStack>
        <ClassList />
      </YStack>
    </>
  );
}
