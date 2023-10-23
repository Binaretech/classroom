import { SubmitHandler } from 'react-hook-form'
import UI, { Inputs } from './ui'
import { auth } from 'app/utils/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Screen() {
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return <UI onSubmit={onSubmit} />
}
