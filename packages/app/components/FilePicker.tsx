import React from 'react';
import { Button, YStack } from 'ui';
import * as DocumentPicker from 'expo-document-picker';
import { Paperclip } from '@tamagui/lucide-icons';

type FileInputProps = {
  onChange: (files: DocumentPicker.DocumentPickerAsset[]) => void;
  disabled?: boolean;
};

export default function FilePicker({ onChange, ...props }: FileInputProps) {
  const pickDocuments = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      multiple: true,
    });

    if (!result.canceled) {
      onChange(result.assets ?? []);
    }
  };

  return (
    <YStack>
      <Button icon={Paperclip} circular chromeless onPress={pickDocuments} {...props} />
    </YStack>
  );
}
