import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form, H2, Button, Input, Card } from 'tamagui'

export default function RegisterScreen() {
  const { t } = useTranslation()

  return (
    <Form onSubmit={() => {}} mt="$20" px="$4" jc="center" ai="center">
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
        <Input placeholder="Username" keyboardType="email-address" my="$2" />
        <Input placeholder="Passowrd" secureTextEntry my="$2" />
        <Card.Footer jc="center" ai="center" py="$4">
          <Form.Trigger asChild>
            <Button>{t('views.login.button')}</Button>
          </Form.Trigger>
        </Card.Footer>
      </Card>
    </Form>
  )
}
