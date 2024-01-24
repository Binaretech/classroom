import { FlatList, Platform } from 'react-native';
import { Button, Spinner, Text, YStack } from 'ui';
import { useTranslation } from 'react-i18next';
import CreatePostButton from './CreatePostButton';
import { usePostList } from 'app/services/postService';
import PostItem from './PostItem';
import { flatPaginatedData } from 'app/utils/functions';

export type PostListProps = {
  classId: number | string;
};

export default function PostList({ classId }: PostListProps) {
  const { isLoading, data, fetchNextPage, hasNextPage, refetch, isRefetching, isFetchingNextPage } =
    usePostList(classId);

  const { t } = useTranslation();

  const posts = flatPaginatedData(data?.pages ?? [], (page) => page.posts);

  const loading = isLoading || isFetchingNextPage;

  return (
    <FlatList
      data={posts}
      onRefresh={refetch}
      refreshing={isRefetching}
      renderItem={({ item }) => <PostItem post={item} />}
      onEndReached={() => !loading && fetchNextPage()}
      ItemSeparatorComponent={() => <YStack h="$0.75" />}
      ListEmptyComponent={() => !loading && <ListEmptyComponent />}
      ListHeaderComponent={
        <YStack w="100%" pb="$4">
          <CreatePostButton classId={classId} />
        </YStack>
      }
      ListFooterComponent={
        <YStack>
          {loading && <Spinner />}
          {hasNextPage && Platform.OS === 'web' && (
            <Button onPress={() => fetchNextPage()}>{t('views.loadMore')}</Button>
          )}
        </YStack>
      }
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

function ListEmptyComponent() {
  const { t } = useTranslation();

  return (
    <YStack w="100%" ai="center" jc="center" px="$6" py="$4">
      <Text>{t('views.class.noPosts')}</Text>
    </YStack>
  );
}
