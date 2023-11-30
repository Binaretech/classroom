import { YStack, H2, XStack } from 'ui';
import ClassList from './classlist/ClassList';
import CreateClassModal from './CreateClassModal';
import JoinClassModal from './JoinClassModal';
import { useClassList } from 'app/services/classService';

export default function DashboardScreen() {
  const { isLoading, data, refetch } = useClassList();

  return (
    <>
      <YStack p="$4">
        <H2>Mis clases</H2>
        <XStack justifyContent="flex-end" columnGap="$4" p="$4">
          <JoinClassModal />
          <CreateClassModal onCreate={refetch} />
        </XStack>
        <ClassList isLoading={isLoading} data={data?.classes} />
      </YStack>
    </>
  );
}
