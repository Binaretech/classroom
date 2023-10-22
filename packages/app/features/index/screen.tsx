import React from 'react'
import { Card } from 'tamagui'

export default function Index() {
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
    ></Card>
  )
}
