import { toast } from "react-toastify"
import { register } from "../requests/auth"
import Button from "./Button"
import Input from "./Input"
import PasswordInput from "./PasswordInput"
import { Link, useNavigate } from "react-router"

export default function RegisterForm({handleLoading}) {
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    handleLoading(true)
    event.preventDefault()
    const name = event.target.name.value
    const email = event.target.email.value
    const password = event.target.password.value
    const confirmPassword = event.target.confirmPassword.value

    if(password !== confirmPassword){
      return
    }

    try {
      await register(name, email, password)
      .then((res) => {
        navigate("/")
        toast.success("Successfully registered, you can login now!")
      })
      .catch((error) => {
        toast.error("Registration failed: " + error.response.data)
      })
      .finally(() => handleLoading(false))
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <>
        <form className="space-y-5  bg-quaternary p-[3rem] rounded-md text-black" onSubmit={handleSubmit}>
            <h1 className="text-3xl mb-7 text-center text-black">Register in <Link to="/" className="text-tertiary hover:text-secondary underline">TaskPro</Link></h1>
            <Input id="name" placeholder="Louis Smith" label="Name:" type="text"/>
            <Input id="email" placeholder="louis.smith@email.com" label="Email:" type="email"/>
            <PasswordInput id="password" placeholder="New password" label="Password" mustValidateFormat={true}/>
            <PasswordInput id="confirmPassword" placeholder="Confirm new password" label="Confirm Password"/>
            <Button value="Register" type="submit" darkMode={true} />
        </form>
    </>
  )
}
