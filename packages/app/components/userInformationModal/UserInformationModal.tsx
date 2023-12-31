import useUser from 'app/hooks/user';
import UserInformationModalUI, { UserInformationInputs } from './UserInformationModalUI';
import useIsAuth from 'app/hooks/isAuth';
import { useUpdateUser } from 'app/services/userService';

export default function UserInformationModal() {
  const { mutateAsync, isPending } = useUpdateUser();

  const user = useUser();

  const { isAuth, isReady } = useIsAuth();

  const onSubmit = async (data: UserInformationInputs) => {
    await mutateAsync(data);
    user?.reload?.();
  };

  const open = !Boolean(user?.displayName) && isReady && isAuth;

  return <UserInformationModalUI onSubmit={onSubmit} loading={isPending} open={open} />;
}
