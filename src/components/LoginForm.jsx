import { login } from "../requests/auth";
import Button from "./Button";
import Input from "./Input";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
    const inputContainerClass = "flex flex-col text-xl";

    const handleSubmit = async (event) => {
      event.preventDefault()
      const email = event.target.email.value
      const password = event.target.password.value

      try {
        const response = await login(email, password)
        console.log(response)
      } catch (error) {
        console.error('Login failed:', error)
      }
    }

  return (
    <div className="flex flex-col bg-secondary space-y-10 p-[15%]">
        <h1 className="text-5xl">Login</h1>
        <form className="flex flex-col space-y-5 w-full" onSubmit={handleSubmit}>
          <div className={inputContainerClass}>
            <Input type="email" id="email" label="Email:" placeholder="email@doamin.com" required/>
          </div>
          <div className={inputContainerClass}>
            <PasswordInput label="Password:" placeholder="Your password" />
          </div>
          <Button value="Login" type="submit" />
          <div className="text-tertiary underline flex flex-col">
            <a className="hover:text-white" href="/recovery-password">Forgot your password?</a>
            <a className="hover:text-white" href="/register">Dont have an account? Register here</a>
          </div>
        </form>
      </div>
  )
}
