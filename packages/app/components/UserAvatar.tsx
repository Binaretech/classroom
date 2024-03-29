import { stringToHexColor } from 'app/utils/functions';
import { Avatar, Text, AvatarProps } from 'ui';

export type UserAvatarProps = {
  user: User | null;
};

export default function UserAvatar({ user, size, ...props }: UserAvatarProps & AvatarProps) {
  return (
    <Avatar circular size={size} {...props}>
      {/* <Avatar.Image src={user?.photoURL ?? undefined} /> */}
      <Avatar.Fallback
        backgroundColor={stringToHexColor(user?.email ?? '')}
        jc="center"
        ai="center"
      >
        <Text>{user?.displayName?.[0] ?? ''}</Text>
      </Avatar.Fallback>
    </Avatar>
  );
}
