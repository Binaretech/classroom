import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, H2, Button, Input, Card, Text, YStack } from 'ui';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLink } from 'solito/navigation';

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

export type RegisterScreenUIProps = {
  onSubmit: SubmitHandler<Inputs>;
};

export default function RegisterScreenUI({ onSubmit }: RegisterScreenUIProps) {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const login = useLink({
    href: '/login',
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} mt="$20" px="$4" jc="center" ai="center">
      <Card
        elevate
        size="$4"
        bordered
        px="$4"
        width="100%"
        $platform-web={{
          width: '80%',
          maxWidth: '500px',
        }}
      >
        <Card.Header padded>
          <H2>{t('views.register.title')}</H2>
        </Card.Header>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder={t('fields.email')}
              my="$2"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder={t('fields.password')}
              my="$2"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              secureTextEntry
              value={value}
            />
          )}
          name="password"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder={t('fields.passwordConfirmation')}
              my="$2"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              secureTextEntry
              value={value}
            />
          )}
          name="passwordConfirmation"
          rules={{ required: true }}
        />

        {errors.email && <Text>{errors.email.message}</Text>}

        <YStack my="$4">
          <Text
            {...login}
            $platform-web={{
              cursor: 'pointer',
            }}
          >
            {t('views.register.haveAccount')}
          </Text>
        </YStack>

        <Card.Footer jc="center" ai="center" py="$4">
          <Form.Trigger asChild>
            <Button>{t('views.register.button')}</Button>
          </Form.Trigger>
        </Card.Footer>
      </Card>
    </Form>
  );
}
