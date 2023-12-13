import useUser from 'app/hooks/user';
import { useTranslation } from 'react-i18next';
import { Avatar, Text, XStack, YStack } from 'ui';

export default function CreatePostButton() {
  const { t } = useTranslation();

  const user = useUser();

  return (
    <YStack px="$6" py="$4" bc="$color3" w="100">
      <XStack ai="center">
        <Avatar circular>
          <Avatar.Fallback backgroundColor={emailToHexColor(user?.email ?? '')} />
        </Avatar>

        <Text px="$4">{t('views.class.createPost')}</Text>
      </XStack>
    </YStack>
  );
}

function emailToHexColor(email: string) {
  const hash = email
    .split('')
    .reduce((hash, char) => char.charCodeAt(0) + ((hash << 5) - hash), 0)
    .toString(16);

  return `#${hash.slice(0, 6)}`;
}
