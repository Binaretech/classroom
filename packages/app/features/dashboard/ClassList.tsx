import useClassList from 'app/services/classService';
import { Text, YStack } from 'ui';

export default function ClassList() {
  const { isLoading } = useClassList();

  return (
    <YStack>
      <Text>Class List</Text>
    </YStack>
  );
}
