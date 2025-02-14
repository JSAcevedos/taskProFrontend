import Button from "./Button";
import Input from "./Input";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
    const inputContainerClass = "flex flex-col text-xl";

  return (
    <div className="flex flex-col bg-secondary space-y-10 p-[15%]">
        <h1 className="text-5xl">Login</h1>
        <form className="flex flex-col space-y-5 w-full" action="">
          <div className={inputContainerClass}>
            <Input type="email" id="email" label="Email:" placeholder="email@doamin.com" required/>
          </div>
          <div className={inputContainerClass}>
            <PasswordInput label="Password:" placeholder="Your password" />
          </div>
          <Button value="Login" />
          <div className="text-tertiary underline flex flex-col">
            <a className="hover:text-white" href="/recovery-password">Forgot your password?</a>
            <a className="hover:text-white" href="/register">Dont have an account? Register here</a>
          </div>
        </form>
      </div>
  )
}
