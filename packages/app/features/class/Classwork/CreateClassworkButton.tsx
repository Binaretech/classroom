import { Book, BookMarked, ClipboardList } from '@tamagui/lucide-icons';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Adapt, Button, ListItem, Popover, Text, View, YGroup, YStack } from 'ui';
import CreateMaterialModal from './CreateMaterialModal';

enum Modal {
  Material,
  Assignment,
  Quiz,
}

export default function CreateClassworkButton({ classId }: { classId: string | number }) {
  const { t } = useTranslation();

  const [modal, setModal] = useState<Modal | null>(null);

  const onChangeModal = useCallback(
    (modal: Modal | null) => () => {
      setModal(modal);
    },
    [setModal]
  );

  return (
    <>
      <Popover placement="bottom">
        <Popover.Trigger asChild>
          <Button w="100%">{t('views.class.classwork.create')}</Button>
        </Popover.Trigger>

        <Adapt platform="touch">
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
          padding="0"
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

          <YStack gap="$3">
            <YGroup alignSelf="center" width={240} radiused size="$4">
              <YGroup.Item>
                <ListItem
                  hoverTheme
                  icon={BookMarked}
                  title={t('views.class.material')}
                  onPress={onChangeModal(Modal.Material)}
                />
              </YGroup.Item>
              <YGroup.Item>
                <ListItem hoverTheme icon={Book} title={t('views.class.assignment')} />
              </YGroup.Item>
              <YGroup.Item>
                <ListItem hoverTheme icon={ClipboardList} title={t('views.class.quiz')} />
              </YGroup.Item>
            </YGroup>
          </YStack>
        </Popover.Content>
      </Popover>

      <CreateMaterialModal
        classId={classId}
        open={modal === Modal.Material}
        onOpenChange={(value) => setModal(value ? Modal.Material : null)}
      />
    </>
  );
}
