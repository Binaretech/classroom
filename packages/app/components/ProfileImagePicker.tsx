import { Avatar, YStack } from 'ui';
import { Camera } from '@tamagui/lucide-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function ProfileImagePicker() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Avatar circular size="$10" onPress={pickImage}>
      {image && <Avatar.Image accessibilityLabel="Profile picture" src={image} />}
      <Avatar.Fallback bc="$backgroundFocus" jc="center" ai="center">
        <Camera size="$4" />
      </Avatar.Fallback>
    </Avatar>
  );
}
