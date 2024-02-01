import { Card, Button, YStack } from 'ui';
import { useLink } from 'solito/navigation';
import { SafeAreaView } from 'react-native';

export default function LandingScreen() {
  const login = useLink({
    href: '/login',
  });

  const register = useLink({
    href: '/register',
  });

  return (
    <YStack flex={1} ai="center" jc="center">
      <Card
        elevate
        size="$4"
        bordered
        px="$4"
        width="100%"
        $platform-web={{
          width: '80%',
          maxWidth: '500px',
        }}
      >
        <Button my="$2" {...login}>
          login
        </Button>
        <Button my="$2" {...register}>
          register
        </Button>
      </Card>
    </YStack>
  );
}
