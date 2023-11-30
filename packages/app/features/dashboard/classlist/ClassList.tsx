import { ClassesResponse } from 'app/services/classService';
import { Spinner, YStack } from 'ui';
import ClassItem from './ClassItem';

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
    <YStack flexWrap="wrap">
      {data.map((item) => (
        <ClassItem key={item.id} data={item} />
      ))}
    </YStack>
  );
}
