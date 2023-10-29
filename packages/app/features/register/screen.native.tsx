import UI from './ui'
import { SubmitHandler } from 'react-hook-form'
import { Inputs } from './ui'
import auth from '@react-native-firebase/auth'

export default function RegisterScreen() {
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return <UI onSubmit={onSubmit} />
}
