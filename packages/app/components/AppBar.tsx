import { H2, XStack } from 'ui';

export type AppBarProps = {
  title: string;
};

export default function AppBar({ title }: AppBarProps) {
  return (
    <XStack ai="center" w="100%">
      {
        <H2 px="$6" fontWeight="bold">
          {title}
        </H2>
      }
    </XStack>
  );
}
