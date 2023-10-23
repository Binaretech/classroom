import React from 'react'
import { Card, Button } from 'tamagui'
import { useLink } from 'solito/navigation'

export default function Index() {
  const login = useLink({
    href: '/login',
  })

  const register = useLink({
    href: '/register',
  })

  return (
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
      <Button {...login}>login</Button>
      <Button {...register}>register</Button>
    </Card>
  )
}
