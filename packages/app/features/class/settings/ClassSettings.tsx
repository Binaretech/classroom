import { View, XStack, YStack } from 'ui';
import ClassInfoForm from './ClassInfoForm';
import ShareableClassCode from './ShareableClassCode';

export type ClassSettingsProps = {
  classId: string;
};

export default function ClassSettings({ classId }: ClassSettingsProps) {
  return (
    <XStack px="$4" jc="center">
      <YStack w="100%" maw={700}>
        <ClassInfoForm classId={classId} />
        <ShareableClassCode classId={classId} />
      </YStack>
    </XStack>
  );
}
