import { H2, XStack } from 'ui';
import SettingsButton from './SettingsButton';

export type AppBarProps = {
  title: string;
  classId: string | number;
};

export default function AppBar({ title, classId }: AppBarProps) {
  return (
    <XStack ai="center" jc="space-between" w="100%" py="$4">
      <H2 px="$6" fontWeight="bold">
        {title}
      </H2>
      <XStack>
        <SettingsButton classId={classId} scaleIcon={1.5} />
      </XStack>
    </XStack>
  );
}
