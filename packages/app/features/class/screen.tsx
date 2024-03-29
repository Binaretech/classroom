import { useClass } from 'app/services/classService';
import { Spinner, YStack } from 'ui';
import AppBar from 'app/components/AppBar';
import ClassTabs from './ClassTabs';
import ClassCover from './ClassCover';

export default function ClassScreen({ id }: { id: string }) {
  const { isLoading, isSuccess, data } = useClass(id);
  return (
    <YStack w="100%" flex={1}>
      {isLoading && <Spinner />}
      {isSuccess && (
        <YStack w="100%" flex={1}>
          <AppBar title={data.name} classId={id} />
          <ClassCover />
          <ClassTabs classId={id} />
        </YStack>
      )}
    </YStack>
  );
}
