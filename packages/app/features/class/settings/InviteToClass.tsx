import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { X } from '@tamagui/lucide-icons';
import {
  Adapt,
  Dialog,
  Fieldset,
  Sheet,
  Form,
  XStack,
  Button,
  Spinner,
  Unspaced,
  Input,
  useToastController,
} from 'ui';
import { useState } from 'react';
import { useSendClassInvite } from 'app/services/classService';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export type InviteToClassProps = {
  classId: string | number;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export default function InviteToClass({ classId }: InviteToClassProps) {
  const [open, setOpen] = useState(false);

  const { show } = useToastController();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const { isPending, mutateAsync } = useSendClassInvite(classId);

  const { t } = useTranslation();

  const onSubmit = handleSubmit(async ({ email }) => {
    try {
      await mutateAsync({ email });
      setOpen(false);
    } catch (e) {
      if (e.response.data.message) {
        show(t(e.response.data.message), { type: 'error' });
      }
    }
  });

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button my="$4">{t('views.InviteToClass.button')}</Button>
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
          <Dialog.Title>{t('views.InviteToClass.title')}</Dialog.Title>

          <Dialog.Description>{t('views.InviteToClass.body')}</Dialog.Description>
          <Form onSubmit={onSubmit} jc="center" ai="center">
            <Fieldset gap="$4" horizontal w="100%">
              <Controller
                control={control}
                name="email"
                disabled={isPending}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    w="100%"
                    placeholder={t('fields.email')}
                    my="$2"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                )}
                rules={{ required: true }}
              />
            </Fieldset>

            <XStack width="100%" pt="$4" jc="center">
              <Form.Trigger asChild>
                <Button disabled={isPending} theme="alt1" aria-label="submit" px="$5">
                  {isPending ? <Spinner /> : t('views.InviteToClass.button')}
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
