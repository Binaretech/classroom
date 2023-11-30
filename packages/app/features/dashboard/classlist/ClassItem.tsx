import { Class } from 'app/entities/class';
import { Text, Card, Button } from 'ui';
import { useLink } from 'solito/navigation';

export type ClassItemProps = {
  data: Class;
};

export default function ClassItem({ data }: ClassItemProps) {
  const Link = useLink({
    href: `/class/${data.id}`,
  });

  return (
    <Card my="$2" p="$2" flex={1} {...Link}>
      <Card.Header>
        <Text>{data.name}</Text>
      </Card.Header>
      <Text>{data.description}</Text>
    </Card>
  );
}
