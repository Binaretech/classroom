import { SubmitHandler } from 'react-hook-form'
import UI, { Inputs } from './ui'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'app/utils/firebase/firebase.web'

export default function RegisterScreen() {
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return <UI onSubmit={onSubmit} />
}
