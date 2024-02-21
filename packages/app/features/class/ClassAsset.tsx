import { File } from 'app/entities/file';
import { Image, Text, XStack } from 'ui';

export type ClassAssetProps = {
  file: File;
};

export default function ClassAsset({ file }: ClassAssetProps) {
  const isImage = file.mimetype.startsWith('image');

  return (
    <>
      {!isImage && (
        <XStack>
          <Text>{file.mimetype}</Text>
        </XStack>
      )}
      {isImage && <Image source={{ uri: file.url }} width={150} height={150} alt={file.path} />}
    </>
  );
}
