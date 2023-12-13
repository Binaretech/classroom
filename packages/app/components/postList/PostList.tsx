import { Fragment, useEffect, useRef } from 'react';
import { usePostList } from 'app/services/postService';
import { Button, Spinner, YStack } from 'ui';
import PostItem from './PostItem';
import { useTranslation } from 'react-i18next';
import CreatePostButton from './CreatePostButton';

export type PostListProps = {
  classId: number | string;
};

export default function PostList({ classId }: PostListProps) {
  const { isLoading, data, fetchNextPage, hasNextPage } = usePostList(classId);

  const { t } = useTranslation();

  return (
    <YStack w="100%">
      <CreatePostButton />
      <YStack>
        {data?.pages.map?.((group, i) => (
          <Fragment key={i}>
            {group.posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </Fragment>
        ))}
        {isLoading && <Spinner />}
        {hasNextPage && <Button onPress={() => fetchNextPage()}>{t('views.loadMore')}</Button>}
      </YStack>
    </YStack>
  );
}
