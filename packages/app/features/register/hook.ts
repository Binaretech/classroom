import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type Inputs = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required('validation.required'),
  password: yup.string().min(8).required('validation.required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'validation.matchPassword')
    .required('validation.required'),
});

export function useRegisterForm() {
  const { handleSubmit, control } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  return { control, handleSubmit };
}
