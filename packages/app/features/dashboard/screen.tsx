import { YStack, XStack } from 'ui';
import ClassList from './classlist/ClassList';
import CreateClassModal from './CreateClassModal';
import JoinClassModal from './JoinClassModal';
import { useClassList } from 'app/services/classService';
import { flatPaginatedData } from 'app/utils/functions';

export default function DashboardScreen() {
  const { isLoading, data, refetch } = useClassList();

  const classes = flatPaginatedData(data?.pages ?? [], (page) => page.classes);

  return (
    <YStack px="$4" f={1}>
      <XStack justifyContent="flex-end" columnGap="$4" p="$4">
        <JoinClassModal />
        <CreateClassModal onCreate={refetch} />
      </XStack>
      <ClassList isLoading={isLoading} data={classes} />
    </YStack>
  );
}
