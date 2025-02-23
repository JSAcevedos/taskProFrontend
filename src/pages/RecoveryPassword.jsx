import { useState } from "react"
import BackButton from "../components/BackButton"
import Button from "../components/Button"
import Input from "../components/Input"
import Loading from "../components/Loading"
import { recoverPassword } from "../requests/auth"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

export default function RecoveryPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        await recoverPassword(event.target.email.value, event.target.userId.value)
        .then((response) => {
            toast.success("Recovery successfull")
            const token = response.data.token

            localStorage.setItem('resetToken', token)
            navigate('/reset-password')
        })
        .catch((error) => {
            toast.error(error.response.data)
        })
        .finally(() => setIsLoading(false))
    }

  return (
    <div className="flex flex-col bg-primary w-full h-full text-black justify-center items-center">
        {isLoading && <Loading />}
        <BackButton />
        <h1 className="text-4xl mb-10 text-white text-center">Recovery Password</h1>
        <form className="bg-quaternary py-10 px-10 lg:px-20 mx-10 rounded-sm space-y-5" onSubmit={handleSubmit}>
            <Input id="email" label="Email:" placeholder="email@email.com" type="email"/>
            <Input id="userId" label="Account id:" placeholder="fbc9f65b-24c6-4610-8732-1c45182833fd" type="text" />
            <Button darkMode={true} valueLabel="Recover" type="submit" />
        </form>
    </div>
  )
}
