import { MoreVertical, Trash } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { Adapt, Button, Text, ListItem, Popover, YGroup, YStack } from 'ui';

export default function MoreMenu() {
  const { t } = useTranslation();

  return (
    <Popover placement="bottom">
      <Popover.Trigger asChild>
        <Button icon={MoreVertical} chromeless circular p="$0.75" />
      </Popover.Trigger>

      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$4">
            <YStack p="$4">
              <Text fontSize="$5" fontWeight="bold" textAlign="center">
                {t('views.options')}
              </Text>
            </YStack>
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Popover.Sheet>
      </Adapt>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />

        <YStack space="$3">
          <YGroup alignSelf="center" bordered width={240} size="$4">
            <YGroup.Item>
              <ListItem hoverTheme icon={Trash} title={t('views.delete')} />
            </YGroup.Item>
          </YGroup>
        </YStack>
      </Popover.Content>
    </Popover>
  );
}
