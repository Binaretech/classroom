import { Button, Spinner, Text, YStack } from 'ui';
import { useSearchParams, useParams, useLink } from 'solito/navigation';
import { useJoinByInvitation } from 'app/services/classService';
import useIsAuth from 'app/hooks/isAuth';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type SearchParams = { code: string };

export default function JoinClass() {
  const { isAuth, isReady } = useIsAuth();

  const { id } = useParams<{ id: string }>();

  const search = useSearchParams<SearchParams>();

  const code = search?.get?.('code');

  const goHome = useLink({
    href: '/dashboard',
  });

  const { t } = useTranslation();

  const { mutateAsync, isPending, error, isError } = useJoinByInvitation(id);

  useEffect(() => {
    if (isReady && isAuth) {
      mutateAsync(code ?? '');
    }
  }, [isAuth, isReady, code, mutateAsync]);

  return (
    <YStack flex={1} ai="center" jc="center">
      {(isPending || !isReady) && <Spinner />}
      {isError && <Text>{t(error.response?.data.message ?? '')}</Text>}
      {isError && (
        <Button mt="$4" {...goHome}>
          {t('views.JoinClass.goToDashboard')}
        </Button>
      )}
    </YStack>
  );
}
