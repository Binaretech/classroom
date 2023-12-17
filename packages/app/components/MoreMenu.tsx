import { MoreVertical, Trash } from '@tamagui/lucide-icons';
import { Adapt, Button, Input, Label, ListItem, Popover, XStack, YGroup, YStack } from 'ui';

export default function MoreMenu() {
  return (
    <Popover placement="bottom">
      <Popover.Trigger>
        <Button icon={MoreVertical} chromeless circular p="$0.75" />
      </Popover.Trigger>

      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$4">
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
              <ListItem hoverTheme icon={Trash} title="delete" />
            </YGroup.Item>
          </YGroup>
        </YStack>
      </Popover.Content>
    </Popover>
  );
}
