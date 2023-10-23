import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form, H2, Button, Input, Card, YStack, Text } from 'tamagui'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export type Inputs = {
  email: string
  password: string
}

export type LoginScreenProps = {
  onSubmit: (data: Inputs) => void
}

export default function LoginScreen({ onSubmit }: LoginScreenProps) {
  const { t } = useTranslation()

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })

  const { handleSubmit, control } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

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
          <H2>{t('views.login.title')}</H2>
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
              value={value}
              secureTextEntry
            />
          )}
          name="password"
          rules={{ required: true }}
        />

        <YStack my="$4">
          <Text>{t('views.login.forgotPassword')}</Text>
          <Text>{t('views.login.noAccount')}</Text>
        </YStack>

        <Card.Footer jc="center" ai="center" py="$4">
          <Form.Trigger asChild>
            <Button>{t('views.login.button')}</Button>
          </Form.Trigger>
        </Card.Footer>
      </Card>
    </Form>
  )
}
