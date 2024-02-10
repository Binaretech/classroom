import { YStack } from 'ui';
import CreateClassworkButton from './CreateClassworkButton';

export type ClassworkProps = {
  classId: string | number;
};

export default function Classwork({ classId }: ClassworkProps) {
  return (
    <YStack>
      <CreateClassworkButton />
    </YStack>
  );
}
