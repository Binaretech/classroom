import useUser from 'app/hooks/user';
import { useCreatePost } from 'app/services/postService';
import { stringToHexColor } from 'app/utils/functions';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Avatar, Button, Form, Spinner, Text, TextArea, XStack, YStack } from 'ui';
import UserAvatar from '../UserAvatar';

export type CreatePostButtonProps = {
  classId: string | number;
};

export default function CreatePostButton({ classId }: CreatePostButtonProps) {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const user = useUser();

  if (isOpen) {
    return <CreatePostForm classId={classId} onCreate={() => setIsOpen(false)} />;
  }

  return (
    <YStack pl="$4" py="$4" bc="$color3" w="100%" onPress={() => setIsOpen(true)}>
      <XStack ai="center">
        <UserAvatar user={user} size="$3" />
        <Text px="$4">{t('views.class.createPost')}</Text>
      </XStack>
    </YStack>
  );
}

type CreatePostFormProps = {
  classId: string | number;
  onCreate: () => void;
};

type Inputs = {
  content: string;
};

function CreatePostForm({ classId, onCreate }: CreatePostFormProps) {
  const { control, handleSubmit } = useForm<Inputs>();

  const { mutateAsync, isPending } = useCreatePost(classId);

  const { t } = useTranslation();

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
    onCreate();
  });

  return (
    <YStack elevation="$4" bc="$color3">
      <Form onSubmit={onSubmit} px="$6" py="$4" w="100%">
        <Controller
          control={control}
          name="content"
          disabled={isPending}
          render={({ field }) => (
            <TextArea {...field} placeholder={t('views.class.posts.create')} size="$4" autoFocus />
          )}
        />
        <Form.Trigger asChild>
          <Button disabled={isPending} aria-label="submit" mt="$4" px="$5">
            {isPending ? <Spinner /> : t('views.class.posts.button')}
          </Button>
        </Form.Trigger>
      </Form>
    </YStack>
  );
}
