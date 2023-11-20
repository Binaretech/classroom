import { useClassList } from 'app/services/classService';
import { Spinner, YStack } from 'ui';
import ClassItem from './ClassItem';

export default function ClassList() {
  const { isLoading, data } = useClassList();

  if (isLoading) {
    return (
      <YStack>
        <Spinner />
      </YStack>
    );
  }

  const classes = data?.classes ?? [];

  return (
    <YStack flexWrap="wrap">
      {classes.map((item) => (
        <ClassItem key={item.id} data={item} />
      ))}
    </YStack>
  );
}
