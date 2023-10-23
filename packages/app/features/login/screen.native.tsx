import { SubmitHandler } from 'react-hook-form'
import auth from '@react-native-firebase/auth'
import UI, { Inputs } from './ui'

export default function Screen() {
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

  return <UI onSubmit={onSubmit} />
}
