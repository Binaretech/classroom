import { Card, Text, XStack, YStack } from 'ui';
import UserAvatar from '../UserAvatar';
import { ClassMemberType, Member } from 'app/entities/members';
import { useTranslation } from 'react-i18next';

export type MemberItemProps = {
  member: Member;
};

export default function MemberItem({ member }: MemberItemProps) {
  const { t } = useTranslation();

  return (
    <Card p="$4" ai="center">
      <XStack ai="center">
        <UserAvatar user={member.user} size="$3" />
        <YStack ml="$-7" flex={1} pl="$3" ai="center">
          <Text fontWeight="bold">{member.user?.displayName}</Text>
          <Text color="$textSecondary">{member.user?.email}</Text>
        </YStack>
      </XStack>
    </Card>
  );
}
