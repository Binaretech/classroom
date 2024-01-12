import { Card, Text, XStack, YStack } from 'ui';
import UserAvatar from '../UserAvatar';
import { Member } from 'app/entities/members';

export type MemberItemProps = {
  member: Member;
};

export default function MemberItem({ member }: MemberItemProps) {
  return (
    <Card p="$4" ai="center">
      <XStack ai="center" w="100%">
        <UserAvatar user={member.user} size="$3" />
        <YStack pl="$4">
          <Text fontWeight="bold">{member.user?.displayName}</Text>
          <Text>{member.user?.email}</Text>
        </YStack>
      </XStack>
    </Card>
  );
}
