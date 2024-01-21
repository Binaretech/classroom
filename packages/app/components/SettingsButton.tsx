import { Settings } from '@tamagui/lucide-icons';
import { Button } from 'ui';
import { useLink } from 'solito/navigation';

export type SettingsButtonProps = {
  classId: string | number;
  scaleIcon?: number;
};

export default function SettingsButton({ classId, scaleIcon = 1.2 }: SettingsButtonProps) {
  const link = useLink({
    href: `/class/${classId}/settings`,
  });

  return <Button scaleIcon={scaleIcon} icon={Settings} circular chromeless {...link} />;
}
