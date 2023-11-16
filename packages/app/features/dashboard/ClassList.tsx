import useClassList from 'app/services/classService';
import { Text, YStack } from 'ui';

export default function ClassList() {
  const { isLoading, data } = useClassList();

  console.log(data);

  return (
    <YStack>
      <Text>Class List</Text>
    </YStack>
  );
}
