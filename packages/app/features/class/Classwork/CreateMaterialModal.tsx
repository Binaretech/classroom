import { useTranslation } from 'react-i18next';
import { X } from '@tamagui/lucide-icons';
import {
  Adapt,
  Dialog,
  Sheet,
  Form,
  XStack,
  Button,
  Unspaced,
  Fieldset,
  Input,
  Text,
  Spinner,
  useToastController,
  YStack,
} from 'ui';
import { Controller, useWatch } from 'react-hook-form';
import FilePicker from 'app/components/FilePicker';
import { DocumentPickerAsset } from 'expo-document-picker';
import FilePreview from 'app/features/class/Classwork/FilePreview';
import { useCallback } from 'react';
import { useCreateMaterial } from './hooks';

export type CreateMaterialModalProps = {
  open: boolean;
  classId: string | number;
  onOpenChange: (open: boolean) => void;
};

export default function CreateMaterialModal({
  open,
  onOpenChange,
  classId,
}: CreateMaterialModalProps) {
  const { t } = useTranslation();

  const { control, setValue, send, handleSubmit, isPending } = useCreateMaterial(classId);

  const attachments = useWatch({ name: 'attachments', control });

  const { show } = useToastController();

  const onRemove = useCallback(
    (file: DocumentPickerAsset) => () => {
      const value = attachments.filter((attachment) => attachment.uri !== file.uri);
      setValue('attachments', value);
    },
    [attachments]
  );

  const onSubmit = handleSubmit(async (data) => {
    await send(data);
    onOpenChange(false);

    show(t('views.classwork.material.created'));
  });

  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <Adapt when="sm" platform="touch">
        <Sheet animation="bouncy" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>

          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>

      <Dialog.Portal zIndex={200000}>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          fullscreen
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>{t('views.classwork.material.title')}</Dialog.Title>

          <Dialog.Description>{t('views.classwork.material.body')}</Dialog.Description>
          <XStack w="100%" jc="center">
            <Form onSubmit={onSubmit} jc="center" ai="center" w="100%" maw="400px">
              <Fieldset gap="$4" horizontal w="100%">
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      w="100%"
                      placeholder={t('fields.title')}
                      autoCapitalize="none"
                      my="$2"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="title"
                />
              </Fieldset>

              <Fieldset gap="$4" horizontal w="100%">
                <Controller
                  control={control}
                  disabled={isPending}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      w="100%"
                      placeholder={t('fields.description')}
                      autoCapitalize="none"
                      rows={4}
                      multiline
                      my="$2"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="description"
                />
              </Fieldset>
              <Fieldset gap="$4" horizontal w="100%">
                <Controller
                  control={control}
                  disabled={isPending}
                  render={({ field: { onChange, value, disabled } }) => (
                    <XStack ai="center">
                      <Text px="$2">{t('fields.attachments')}</Text>
                      <FilePicker
                        disabled={disabled}
                        onChange={(files) => {
                          onChange([...value, ...files]);
                        }}
                      />
                    </XStack>
                  )}
                  name="attachments"
                />
              </Fieldset>
              <YStack w="100%">
                {attachments.map((attachment) => (
                  <FilePreview
                    key={attachment.uri}
                    file={attachment}
                    onRemove={onRemove(attachment)}
                  />
                ))}
              </YStack>
              <XStack width="100%" pt="$4" jc="center">
                <Form.Trigger asChild>
                  <Button disabled={isPending} w="100%">
                    {isPending && <Spinner />}
                    {!isPending && t('views.save')}
                  </Button>
                </Form.Trigger>
              </XStack>
            </Form>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button position="absolute" top="$3" right="$3" size="$2" circular icon={X} />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
