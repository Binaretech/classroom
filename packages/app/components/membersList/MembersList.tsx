import { FlatList, Platform } from 'react-native';
import { Button, Spinner, YStack } from 'ui';
import { useTranslation } from 'react-i18next';
import MemberItem from './MemberItem';
import { MembersResponse, useMembersList } from 'app/services/classService';
import { Member } from 'app/entities/members';

export type PostListProps = {
  classId: number | string;
};

export default function MembersList({ classId }: PostListProps) {
  const {
    isLoading,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useMembersList(classId);

  const { t } = useTranslation();

  const members = flatMembers(data?.pages ?? []);

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

function flatMembers(data: MembersResponse[]) {
  const { ids, members } = data.reduce(
    (acc, curr) => {
      acc.ids.push(...curr.members.map((member) => member.userId));

      const map = curr.members.reduce((acc, curr) => {
        acc[curr.userId] = curr;
        return acc;
      }, {});

      acc.members = { ...acc.members, ...map };

      return acc;
    },
    { ids: [] as string[], members: {} }
  );

  return Array.from(new Set(ids)).map<Member>((id: string) => members[id]);
}
