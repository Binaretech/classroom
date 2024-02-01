import useIsAuth from 'app/hooks/isAuth';
import { Spinner, YStack } from 'ui';
import { useSearchParams, useParams } from 'solito/navigation';

export type JoinClassProps = {
  onUnauthenticated: () => void;
};

type SearchParams = { code: string };

export default function JoinClass({ onUnauthenticated }: JoinClassProps) {
  const { isAuth, isReady } = useIsAuth();
  const search = useSearchParams<SearchParams>();

  const { id } = useParams<{ id: string }>();

  const code = search?.get?.('code');

  if (!isAuth && isReady) {
    onUnauthenticated();
  }

  return (
    <YStack flex={1} ai="center" jc="center">
      <Spinner />
    </YStack>
  );
}
