import { usePostList } from 'app/services/postService';
import { Spinner, YStack } from 'ui';

export type PostListProps = {
  classId: number | string;
};

export default function PostList({ classId }: PostListProps) {
  const { isLoading } = usePostList(classId);
  return <YStack p="$4">{isLoading && <Spinner />}</YStack>;
}
