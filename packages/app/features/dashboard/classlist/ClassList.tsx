import { ClassesResponse } from 'app/services/classService';
import { Spinner, YStack } from 'ui';
import ClassItem from './ClassItem';
import { FlatList } from 'react-native';

export type ClassListProps = {
  isLoading?: boolean;
  data?: ClassesResponse['classes'];
};

export default function ClassList({ isLoading, data = [] }: ClassListProps) {
  if (isLoading) {
    return (
      <YStack>
        <Spinner />
      </YStack>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ClassItem data={item} />}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  );
}
