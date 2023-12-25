import { YStack, Image } from 'ui';

export default function ClassCover({ imageUrl }: { imageUrl?: string }) {
  return (
    <YStack h="$15">
      <YStack
        w="100%"
        h="100%"
        bg="gray"
        borderRadius="$2"
        justifyContent="center"
        alignItems="center"
      />
      {imageUrl && (
        <Image
          source={{
            uri: imageUrl,
          }}
          alt="Class Cover"
        />
      )}
    </YStack>
  );
}
