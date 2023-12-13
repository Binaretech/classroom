import { Post } from 'app/entities/post';
import { YStack } from 'ui';

export type PostItemProps = {
  post: Post;
};

export default function PostItem({ post }: PostItemProps) {
  return <YStack />;
}
