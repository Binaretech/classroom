import { Settings } from '@tamagui/lucide-icons';
import { Button } from 'ui';
import { useLink } from 'solito/navigation';

export type SettingsButtonProps = {
  classId: string | number;
};

export default function SettingsButton({ classId }: SettingsButtonProps) {
  const link = useLink({
    href: `/class/${classId}/settings`,
  });

  return <Button scaleIcon={1.2} icon={Settings} circular chromeless {...link} />;
}
