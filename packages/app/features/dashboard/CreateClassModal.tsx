import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { X } from '@tamagui/lucide-icons';
import { Adapt, Dialog, Fieldset, Sheet, Form, XStack, Button, Spinner, Unspaced, Input } from 'ui';
import { useCreateClassForm } from './hooks';
import { useEffect, useState } from 'react';

export type CreateClassModalProps = {
  onCreate?: () => void;
};

export default function CreateClassModal({ onCreate }: CreateClassModalProps) {
  const [open, setOpen] = useState(false);

  const { isPending, control, onSubmit, reset } = useCreateClassForm(() => {
    setOpen(false);
    onCreate?.();
  });

  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open]);

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>{t('views.dashboard.createClass')}</Button>
      </Dialog.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet animation="bouncy" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>

          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
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
          <Dialog.Title>{t('views.createClassModal.title')}</Dialog.Title>

          <Dialog.Description>{t('views.createClassModal.body')}</Dialog.Description>
          <Form onSubmit={onSubmit} jc="center" ai="center">
            <Fieldset gap="$4" horizontal w="100%">
              <Controller
                control={control}
                disabled={isPending}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    w="100%"
                    placeholder={t('fields.name')}
                    my="$2"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                )}
                name="name"
                rules={{ required: true }}
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
                    my="$2"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                )}
                name="description"
                rules={{ required: true }}
              />
            </Fieldset>

            <Fieldset gap="$4" horizontal w="100%">
              <Controller
                control={control}
                disabled={isPending}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    w="100%"
                    placeholder={t('fields.section')}
                    my="$2"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                )}
                name="section"
              />
            </Fieldset>

            <XStack width="100%" pt="$4" jc="center">
              <Form.Trigger asChild>
                <Button disabled={isPending} theme="alt1" aria-label="Close" px="$5">
                  {isPending ? <Spinner /> : t('views.createClassModal.button')}
                </Button>
              </Form.Trigger>
            </XStack>
          </Form>
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
