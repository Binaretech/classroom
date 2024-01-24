import { FlatList, Platform } from 'react-native';
import { Button, Spinner, YStack } from 'ui';
import { useTranslation } from 'react-i18next';
import MemberItem from './MemberItem';
import { useMembersList } from 'app/services/classService';
import { flatPaginatedData } from 'app/utils/functions';

export type PostListProps = {
  classId: number | string;
};

export default function MembersList({ classId }: PostListProps) {
  const { isLoading, data, fetchNextPage, hasNextPage, refetch, isRefetching, isFetchingNextPage } =
    useMembersList(classId);

  const { t } = useTranslation();

  const members = flatPaginatedData(
    data?.pages ?? [],
    (page) => page.members,
    (item) => item.userId
  );

  const loading = isLoading || isFetchingNextPage;

  return (
    <FlatList
      data={members}
      onRefresh={refetch}
      refreshing={isRefetching}
      renderItem={({ item }) => <MemberItem member={item} />}
      onEndReached={() => !loading && fetchNextPage()}
      ItemSeparatorComponent={() => <YStack h="$0.75" />}
      ListFooterComponent={
        <YStack>
          {loading && <Spinner />}
          {hasNextPage && Platform.OS === 'web' && (
            <Button onPress={() => fetchNextPage()}>{t('views.loadMore')}</Button>
          )}
        </YStack>
      }
      keyExtractor={(item) => item.userId.toString()}
    />
  );
}
