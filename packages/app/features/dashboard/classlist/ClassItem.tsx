import { Class } from 'app/entities/class';
import { YStack, Text, Card } from 'ui';

export type ClassItemProps = {
  data: Class;
};

export default function ClassItem({ data }: ClassItemProps) {
  return (
    <Card my="$2" p="$2" flex={1}>
      <Card.Header>
        <Text>{data.name}</Text>
      </Card.Header>
      <Text>{data.description}</Text>
    </Card>
  );
}
