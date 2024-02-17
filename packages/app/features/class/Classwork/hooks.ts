import { useCreateClassMaterial } from 'app/services/classService';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DocumentPickerAsset } from 'expo-document-picker';
import { useForm } from 'react-hook-form';
import { expoAssetToFile } from 'app/utils/functions';

const schema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  attachments: yup.array<DocumentPickerAsset, DocumentPickerAsset>().default([]),
});

type Schema = yup.InferType<typeof schema>;

export function useCreateMaterial(classId: number | string) {
  const { mutateAsync, isPending } = useCreateClassMaterial(classId);

  const { control, setValue, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      attachments: [],
    },
  });

  const send = async (data: Schema) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    mutateAsync,
    handleSubmit,
    control,
    setValue,
    send,
    isPending,
  };
}
