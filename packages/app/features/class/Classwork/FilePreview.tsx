import { X } from '@tamagui/lucide-icons';
import { DocumentPickerAsset } from 'expo-document-picker';
import { Button, Image, Text, View, XStack, YStack } from 'ui';

export type FilePreviewProps = {
  file: DocumentPickerAsset;
  onRemove?: () => void;
};

export default function FilePreview({ file, onRemove }: FilePreviewProps) {
  return (
    <XStack ai="center" jc="space-between" w="100%">
      <XStack ai="center" gap="$2">
        {file.mimeType?.startsWith?.('image/') ? (
          <Image source={{ uri: file.uri }} style={{ width: 100, height: 100 }} />
        ) : (
          <View width="$10" height="$10" jc="center" ai="center" overflow="hidden">
            <Text alignItems="center" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
              {file.mimeType}
            </Text>
          </View>
        )}
        <YStack>
          <Text>{file.name}</Text>
          <Text fontSize="$1">{file.size} bytes</Text>
        </YStack>
      </XStack>
      <Button icon={X} circular onPress={onRemove} />
    </XStack>
  );
}
