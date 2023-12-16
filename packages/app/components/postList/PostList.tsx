import { FlatList } from 'react-native';
import { Button, Spinner, Text, YStack } from 'ui';
import { useTranslation } from 'react-i18next';
import CreatePostButton from './CreatePostButton';
import { usePostList } from 'app/services/postService';
import PostItem from './PostItem';
import ClassCover from 'app/features/class/ClassCover';

export type PostListProps = {
  classId: number | string;
};

export default function PostList({ classId }: PostListProps) {
  const { isLoading, data, fetchNextPage, hasNextPage } = usePostList(classId);

  const { t } = useTranslation();

  return (
    <FlatList
      style={{ width: '100%' }}
      data={data?.pages.map((page) => page.posts).flat() ?? []}
      renderItem={({ item }) => <PostItem post={item} />}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={
        <YStack w="100%">
          <ClassCover />
          <CreatePostButton />
        </YStack>
      }
      ListFooterComponent={
        <YStack>
          {isLoading && <Spinner />}
          {hasNextPage && <Button onPress={() => fetchNextPage()}>{t('views.loadMore')}</Button>}
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
