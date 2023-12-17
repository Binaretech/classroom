import { Post } from 'app/entities/post';
import { Card, Text, XStack, YStack, styled } from 'ui';
import dayjs from 'dayjs';
import UserAvatar from '../UserAvatar';
import { capitalize } from 'app/utils/functions';
import MoreMenu from '../MoreMenu';

export type PostItemProps = {
  post: Post;
};

export default function PostItem({ post }: PostItemProps) {
  return (
    <Card p="$4">
      <YStack>
        <XStack pb="$4" ai="center">
          <XStack flex={1}>
            <UserAvatar user={post.author} size="$3" />
            <YStack pl="$3">
              <Text>{post.author.displayName}</Text>
              <Text fontSize="$1">{capitalize(dayjs(post.createdAt).fromNow())}</Text>
            </YStack>
          </XStack>
          <MoreMenu />
        </XStack>
        <Text>{post.content}</Text>
      </YStack>
    </Card>
  );
}
