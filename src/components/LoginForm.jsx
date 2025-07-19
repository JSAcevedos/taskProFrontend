import { useState, useRef, useEffect } from "react"
import { login } from "../requests/auth"
import Button from "./Button"
import Input from "./Input"
import Loading from "./Loading"
import PasswordInput from "./PasswordInput"
import { Link, useNavigate } from "react-router"
import ReCAPTCHA from "react-google-recaptcha";


export default function LoginForm() {
  const recaptchaRef = useRef(null);
  const inputContainerClass = "flex flex-col text-xl"
  const [isLoading, setIsLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const navigate = useNavigate()
  
  
  const handleLoading = (state) => {
    setIsLoading(() => state)
  }

  const checkCaptchaCompletion = () => {
      if (!captchaToken) {
        throw new Error("Por favor completa el CAPTCHA");
    }
  }

  const resetCaptcha = () => {
    if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }

    setCaptchaToken(""); 
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleLoading(true);

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {

      checkCaptchaCompletion()
      const response = await login(email, password, captchaToken);
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      navigate("/tasks");
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage =
        error.response?.data ||
        error.message ||
        "Ocurrió un error durante el login";
      setLoginErrorMessage(errorMessage)
      resetCaptcha();
      
    } finally {
      handleLoading(false);
    }
  };


  return (
    <div className="flex flex-col bg-secondary space-y-10 p-[15%] relative">
      {isLoading && <Loading />}
        <h1 className="text-5xl">Login</h1>
        <form className="flex flex-col space-y-5 w-full" onSubmit={handleSubmit}>
          <div className={inputContainerClass}>
            <Input type="email" id="email" label="Email:" placeholder="email@domain.com" required/>
          </div>
          <div className={inputContainerClass}>
            <PasswordInput label="Password:" placeholder="Your password" id="password" />
          </div>
          <ReCAPTCHA
            sitekey="6Le634crAAAAAIzbmUmHFPrtBebVVFoqRbu2GZCR"
            onChange={(token) => setCaptchaToken(token)}
            ref={recaptchaRef}
          />
          {loginErrorMessage && (
          <div className="text-red-500 text-sm font-semibold">
            {loginErrorMessage}
          </div>
        )}

          <Button valueLabel="Login" type="submit" />
          <div className="text-tertiary underline flex flex-col">
            <Link className="hover:text-white" to="/register">Dont have an account? Register here</Link>
            <Link className="hover:text-white" to="/recovery-password">Forgot your password?</Link>
          </div>
        </form>
      </div>
  )
}
