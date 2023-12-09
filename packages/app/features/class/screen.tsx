import PostList from 'app/components/postList/PostList';
import { useClass } from 'app/services/classService';
import { YStack, Spinner, Text, XStack } from 'ui';

export default function ClassScreen({ id }: { id: string }) {
  const { isLoading, data, refetch } = useClass(id);

  return (
    <YStack>
      {isLoading && <Spinner />}
      {data && (
        <YStack>
          <XStack p="$4">
            <Text fontSize="$6" fontWeight="bold">
              {data.name}
            </Text>
          </XStack>
          <PostList classId={id} />
        </YStack>
      )}
    </YStack>
  );
}
