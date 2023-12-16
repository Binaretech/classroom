import { useClass } from 'app/services/classService';
import { YStack, Spinner, Text } from 'ui';
import ClassTabs from './ClassTabs';
import AppBar from 'app/components/AppBar';
import { FlatList } from 'react-native';

export default function ClassScreen({ id }: { id: string }) {
  const { isLoading, data, refetch } = useClass(id);

  return (
    <YStack w="100%">
      {isLoading && <Spinner />}
      {data && (
        <YStack w="100%">
          <AppBar title={data.name} />
          <ClassTabs classId={id} />
        </YStack>
      )}
    </YStack>
  );
}
