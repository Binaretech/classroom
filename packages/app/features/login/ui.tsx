import { useTranslation } from 'react-i18next';
import { Form, H2, Button, Input, Card, YStack, Text, Spinner } from 'tamagui';
import { Controller, Control, useFormState } from 'react-hook-form';
import { useLink } from 'solito/navigation';
import { BaseSyntheticEvent } from 'react';
import { Inputs } from './hook';

export type LoginScreenProps = {
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => void;
  loading?: boolean;
  control: Control<Inputs>;
};

export default function LoginScreenUI({ onSubmit, loading, control }: LoginScreenProps) {
  const { t } = useTranslation();

  const { errors } = useFormState({ control });

  const register = useLink({
    href: '/register',
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
          <H2>{t('views.login.title')}</H2>
        </Card.Header>
        <YStack py="$4">
          <Controller
            control={control}
            disabled={loading}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder={t('fields.email')}
                my="$2"
                keyboardType="email-address"
                autoCapitalize="none"
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
            disabled={loading}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder={t('fields.password')}
                my="$2"
                onBlur={onBlur}
                autoCapitalize="none"
                onChangeText={(value) => onChange(value)}
                value={value}
                secureTextEntry
              />
            )}
            name="password"
            rules={{ required: true }}
          />
        </YStack>

        {(errors.email || errors.password) && (
          <YStack my="$4">
            <Text color="red.500">{t(errors.email?.message ?? '')}</Text>
            <Text color="red.500">{t(errors.password?.message ?? '')}</Text>
          </YStack>
        )}

        <YStack my="$4">
          <Text>{t('views.login.forgotPassword')}</Text>
          <Text
            {...register}
            $platform-web={{
              cursor: 'pointer',
            }}
          >
            {t('views.login.noAccount')}
          </Text>
        </YStack>

        <Card.Footer jc="center" ai="center" py="$4">
          <Form.Trigger asChild>
            <Button disabled={loading}>{loading ? <Spinner /> : t('views.login.button')}</Button>
          </Form.Trigger>
        </Card.Footer>
      </Card>
    </Form>
  );
}
