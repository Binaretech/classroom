import { Spinner, XStack, YStack } from 'ui';
import ClassInfoForm from './ClassInfoForm';
import ShareableClassCode from './ShareableClassCode';
import InviteToClass from './InviteToClass';
import { useRouter } from 'solito/navigation';
import { useIsClassOwner } from '../hooks';

export type ClassSettingsProps = {
  classId: string;
};

export default function ClassSettings({ classId }: ClassSettingsProps) {
  const { replace } = useRouter();

  const { isOwner, isReady } = useIsClassOwner(classId);

  if (isReady && !isOwner) replace(`/class/${classId}`);

  if (!isReady)
    return (
      <YStack flex={1} jc="center" ai="center">
        <Spinner />
      </YStack>
    );

  return (
    <XStack px="$4" jc="center">
      <YStack w="100%" maw={700}>
        <ClassInfoForm classId={classId} />
        <ShareableClassCode classId={classId} />
        <InviteToClass classId={classId} />
      </YStack>
    </XStack>
  );
}
