import { YStack, Text } from 'ui';

export default function ClassScreen({ id }: { id: string }) {
  return (
    <YStack>
      <Text>Class Screen #{id}</Text>
    </YStack>
  );
}
