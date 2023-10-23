import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form, H2, Button, Input, Card } from 'tamagui'
import auth from '@react-native-firebase/auth'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type Inputs = {
  email: string
  password: string
}

export default function LoginScreen() {
  const { t } = useTranslation()

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })

  const { handleSubmit, control } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

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
            />
          )}
          name="password"
          rules={{ required: true }}
        />

        <Card.Footer jc="center" ai="center" py="$4">
          <Form.Trigger asChild>
            <Button>{t('views.login.button')}</Button>
          </Form.Trigger>
        </Card.Footer>
      </Card>
    </Form>
  )
}
