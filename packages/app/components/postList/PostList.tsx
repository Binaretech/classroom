import { FlatList, Platform, SafeAreaView } from 'react-native';
import { Button, Spinner, Text, YStack } from 'ui';
import { useTranslation } from 'react-i18next';
import CreatePostButton from './CreatePostButton';
import { PostsResponse, usePostList } from 'app/services/postService';
import PostItem from './PostItem';
import ClassCover from 'app/features/class/ClassCover';

export type PostListProps = {
  classId: number | string;
};

export default function PostList({ classId }: PostListProps) {
  const { isLoading, data, fetchNextPage, hasNextPage, refetch, isRefetching, isFetchingNextPage } =
    usePostList(classId);

  const { t } = useTranslation();

  const posts = flatPosts(data?.pages ?? []);

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

function flatPosts(data: PostsResponse[]) {
  const { ids, posts } = data.reduce(
    (acc, curr) => {
      acc.ids.push(...curr.posts.map((post) => post.id));

      const map = curr.posts.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});

      acc.posts = { ...acc.posts, ...map };

      return acc;
    },
    { ids: [] as number[], posts: {} }
  );

  return Array.from(new Set(ids)).map((id: number) => posts[id]);
}

function ListEmptyComponent() {
  const { t } = useTranslation();

  return (
    <YStack w="100%" ai="center" jc="center" px="$6" py="$4">
      <Text>{t('views.class.noPosts')}</Text>
    </YStack>
  );
}
