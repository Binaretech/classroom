import React, { BaseSyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, H2, Button, Input, Card, Text, YStack, Spinner } from 'ui';
import { Controller, useFormState, Control } from 'react-hook-form';
import { useLink } from 'solito/navigation';

export type Inputs = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type RegisterScreenUIProps = {
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => void;
  loading?: boolean;
  control: Control<Inputs>;
};

export default function RegisterScreenUI({ onSubmit, loading, control }: RegisterScreenUIProps) {
  const { t } = useTranslation();

  const { errors } = useFormState({ control });

  const login = useLink({
    href: '/login',
  });

  return (
    <Form onSubmit={onSubmit} mt="$20" px="$4" jc="center" ai="center">
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
        <Card.Header padded jc="center" ai="center">
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
            <Button disabled={loading}>{loading ? <Spinner /> : t('views.register.button')}</Button>
          </Form.Trigger>
        </Card.Footer>
      </Card>
    </Form>
  );
}
