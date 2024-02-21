import UserAvatar from 'app/components/UserAvatar';
import { Classwork, ClassworkType } from 'app/entities/classwork';
import { capitalize } from 'app/utils/functions';
import dayjs from 'dayjs';
import { Card, Text, XStack, YStack } from 'ui';
import ClassAsset from '../ClassAsset';

export type ClassworkItemProps = {
  classwork: Classwork;
};

export default function ClassworkItem({ classwork }: ClassworkItemProps) {
  return (
    <Card p="$4">
      <YStack>
        <XStack pb="$4" ai="center">
          <XStack flex={1}>
            <UserAvatar user={classwork.user} size="$3" />
            <YStack pl="$3">
              <Text>{classwork.user.displayName}</Text>
              <Text fontSize="$1">{capitalize(dayjs(classwork.createdAt).fromNow())}</Text>
            </YStack>
          </XStack>
        </XStack>
        {classwork.type === ClassworkType.Material && <MaterialClasswork classwork={classwork} />}
      </YStack>
    </Card>
  );
}

function MaterialClasswork({ classwork }: ClassworkItemProps) {
  return (
    <YStack>
      <Text>{classwork.title}</Text>
      <Text>{classwork.description}</Text>
      <XStack>
        {classwork.attachments.map((attachment) => (
          <ClassAsset key={attachment.id} file={attachment} />
        ))}
      </XStack>
    </YStack>
  );
}
