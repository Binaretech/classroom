import { X } from '@tamagui/lucide-icons';
import { DocumentPickerAsset } from 'expo-document-picker';
import { Button, Image, Text, View, XStack, YStack } from 'ui';
import { filesize } from 'filesize';

export type FilePreviewProps = {
  file: DocumentPickerAsset;
  onRemove?: () => void;
};

export default function FilePreview({ file, onRemove }: FilePreviewProps) {
  return (
    <XStack ai="center" jc="space-between" w="100%">
      {file.mimeType?.startsWith?.('image/') ? (
        <Image source={{ uri: file.uri }} style={{ width: 100, height: 100 }} />
      ) : (
        <View width="$10" height="$10" jc="center" ai="center" overflow="hidden">
          <Text alignItems="center" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            {file.mimeType!.split('/')[1]}
          </Text>
        </View>
      )}
      <YStack f={1} px="$4">
        <Text>{file.name}</Text>
        <Text fontSize="$1">{filesize(file.size ?? 0)}</Text>
      </YStack>
      <Button icon={X} circular onPress={onRemove} />
    </XStack>
  );
}
