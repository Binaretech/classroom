import { Avatar } from 'ui';
import { Camera } from '@tamagui/lucide-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export type ProfileImagePickerProps = {
  onChange?: (image: ImagePicker.ImagePickerAsset | null) => void;
  defaultUrl?: string | null;
};

export default function ProfileImagePicker({ onChange, defaultUrl }: ProfileImagePickerProps) {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  console.log(defaultUrl);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0] ?? null);
      onChange?.(result.assets[0] ?? null);
    }
  };

  return (
    <Avatar circular size="$10" onPress={pickImage}>
      {image && <Avatar.Image accessibilityLabel="Profile picture" src={image.uri} />}
      {!image && defaultUrl && (
        <Avatar.Image accessibilityLabel="Profile picture" src={defaultUrl} />
      )}
      <Avatar.Fallback bc="$backgroundFocus" jc="center" ai="center">
        <Camera size="$4" />
      </Avatar.Fallback>
    </Avatar>
  );
}
