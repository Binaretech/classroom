import useUser from 'app/hooks/user';
import { useClass } from 'app/services/classService';

export function useIsClassOwner(id: string | number) {
  const { isSuccess, data } = useClass(id);

  const user = useUser();

  return { isOwner: isSuccess && data?.ownerId === user?.uid, isReady: isSuccess };
}
