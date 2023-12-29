import { useMutation } from '@tanstack/react-query';
import { UrlFormatter } from 'app/utils/http';
import { UserInfo } from 'firebase/auth';
import axios from 'axios';
import { ImagePickerAsset } from 'expo-image-picker';

export type UpdateUserData = {
  displayName: string;
  profileImage?: ImagePickerAsset | null;
};

export function useUpdateUser() {
  const mutation = useMutation({
    mutationFn: (data: UpdateUserData) => updateUser(data),
  });

  return mutation;
}

async function updateUser(data: UpdateUserData) {
  const formData = new FormData();
  formData.append('displayName', data.displayName);

  if (data.profileImage) {
    const uriParts = data.profileImage.uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    formData.append('profileImage', {
      uri: data.profileImage.uri,
      name: data.profileImage.fileName,
      type: `image/${fileType}`,
    } as any);
  }

  const url = UrlFormatter.formatUrl('user');

  const response = await axios.put<UserInfo>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
