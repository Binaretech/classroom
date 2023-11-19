import { yupResolver } from '@hookform/resolvers/yup';
import {
  CreateClassBody,
  JoinClassBody,
  useCreateClass,
  useJoinClass,
} from 'app/services/classService';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const createClassSchema = yup.object().shape({
  name: yup.string().required('validation.required'),
  description: yup.string().required('validation.required'),
});

export function useCreateClassForm(onSuccess: () => void) {
  const { isPending, mutateAsync } = useCreateClass();

  const { control, handleSubmit, reset } = useForm<CreateClassBody>({
    resolver: yupResolver(createClassSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = handleSubmit((data) => mutateAsync(data).then(onSuccess));

  return { reset, control, onSubmit, isPending };
}

const joinClassSchema = yup.object().shape({
  code: yup.string().required('validation.required'),
});

export function useJoinClassForm() {
  const { isPending, mutateAsync } = useJoinClass();

  const { control, handleSubmit, reset } = useForm<JoinClassBody>({
    resolver: yupResolver(joinClassSchema),
    defaultValues: {
      code: '',
    },
  });

  return { reset, control, onSubmit: handleSubmit((data) => mutateAsync(data)), isPending };
}
