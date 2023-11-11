import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type Inputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required('validation.required'),
  password: yup.string().min(8).required('validation.required'),
});

export function useLoginForm() {
  const { control, handleSubmit } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return { control, handleSubmit };
}
