import { useState } from "react"
import BackButton from "../components/BackButton"
import Button from "../components/Button"
import Loading from "../components/Loading"
import PasswordInput from "../components/PasswordInput"
import PasswordRequirements from "../components/PasswordRequirements"
import { toast } from "react-toastify"
import { resetPassword } from "../requests/auth"
import { useNavigate } from "react-router"

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const password = event.target.password.value
    const confirmPassword = event.target.confirmPassword.value

    if (password != confirmPassword){
      setIsLoading(false)
      localStorage.removeItem('resetToken')
      toast.error("Password not match")
      return
    }

    await resetPassword(password)
    .then((response) => {
      toast.success(response.data.message)
      navigate("/")
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
            <PasswordInput id="password" label="New password:" placeholder="Your password" mustValidateFormat={true} onChange={(e) => setPassword(e.target.value)}/>
            <PasswordRequirements password={password} />
            <PasswordInput id="confirmPassword" label="Confirm new password:" placeholder="Confirm your password"/>
            <Button darkMode={true} valueLabel="Recover" type="submit" />
        </form>
    </div>
  )
}
