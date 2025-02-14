import Button from "./Button";
import Input from "./Input";
import PasswordInput from "./PasswordInput";

export default function RegisterForm() {
  return (
    <div>
        <h1 className="text-3xl mb-7 text-center text-white">Register in <a href="/" className="text-tertiary hover:text-secondary underline">TaskPro</a></h1>
        <form className="space-y-5 w-full bg-quaternary p-[15%] rounded-md text-black">
            <Input placeholder="Louis Smith" label="Name:" type="text"/>
            <Input placeholder="louis.smith@email.com" label="Email:" type="email"/>
            <PasswordInput placeholder="New password" label="Password" pattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"/>
            <PasswordInput placeholder="Confirm new password" label="Confirm Password"/>
            <Button value="Register" darkMode={true} />
        </form>
    </div>
  )
}
