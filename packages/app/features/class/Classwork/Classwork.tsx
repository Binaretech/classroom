import { YStack } from 'ui';
import CreateClassworkButton from './CreateClassworkButton';
import { FlatList } from 'react-native';
import { useGetClasswork } from 'app/services/classService';
import { flatPaginatedData } from 'app/utils/functions';
import { Classwork } from 'app/entities/classwork';
import ClassworkItem from './ClassworkItem';

export type ClassworkProps = {
  classId: string | number;
};

export default function ClassworkView({ classId }: ClassworkProps) {
  const { data } = useGetClasswork(classId);

  const classworks = flatPaginatedData(data?.pages ?? [], (page) => page.classworks) as Classwork[];

  const renderItem = ({ item }: { item: Classwork }) => {
    return <ClassworkItem classwork={item} />;
  };

  return (
    <FlatList
      data={classworks}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <YStack>
          <CreateClassworkButton classId={classId} />
        </YStack>
      }
      renderItem={renderItem}
    />
  );
}
