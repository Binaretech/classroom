import { X } from '@tamagui/lucide-icons';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ImagePickerAsset } from 'expo-image-picker';
import { Adapt, Button, Dialog, Fieldset, Input, Sheet, Unspaced, XStack, Form, Spinner } from 'ui';
import ProfileImagePicker from '../ProfileImagePicker';
import useUser from 'app/hooks/user';

export type UserInformationInputs = {
  displayName: string;
  profileImage?: ImagePickerAsset | null;
};

export type UserInformationModalProps = {
  onSubmit: (data: UserInformationInputs) => void;
  loading?: boolean;
  open: boolean;
};

export default function UserInformationModalUI({
  onSubmit,
  loading = false,
  open,
}: UserInformationModalProps) {
  const user = useUser();

  const { control, handleSubmit, setValue } = useForm<UserInformationInputs>({
    defaultValues: {
      displayName: user?.displayName || '',
      profileImage: null,
    },
  });

  const { t } = useTranslation();

  return (
    <Dialog modal open={open}>
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
          <Dialog.Title>{t('views.UserInformationModal.title')}</Dialog.Title>

          <Dialog.Description>{t('views.UserInformationModal.body')}</Dialog.Description>
          <Form onSubmit={handleSubmit(onSubmit)} jc="center" ai="center">
            <ProfileImagePicker
              onChange={(image) => {
                setValue('profileImage', image);
              }}
            />
            <Fieldset gap="$4" horizontal>
              <Controller
                control={control}
                disabled={loading}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    width="100%"
                    placeholder={t('fields.displayName')}
                    my="$2"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                )}
                name="displayName"
                rules={{ required: true }}
              />
            </Fieldset>

            <XStack width="100%" pt="$4" jc="center">
              <Form.Trigger asChild>
                <Button disabled={loading} theme="alt1" aria-label="submit" px="$5">
                  {loading ? <Spinner /> : t('views.UserInformationModal.button')}
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
