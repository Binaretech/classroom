import { useClass } from 'app/services/classService';
import PostList from 'app/components/postList/PostList';
import { Spinner, YStack } from 'ui';
import AppBar from 'app/components/AppBar';

export default function ClassScreen({ id }: { id: string }) {
  const { isLoading, data, refetch } = useClass(id);

  return (
    <YStack w="100%" flex={1}>
      {isLoading && <Spinner />}
      {data && (
        <YStack w="100%" flex={1}>
          <AppBar title={data.name} />
          <PostList classId={id} />
        </YStack>
      )}
    </YStack>
  );
}
