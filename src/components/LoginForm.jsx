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
      
      let errorMessage = "Ocurrió un error durante el login";
      
      if (error.response?.status === 429) {
        // Manejar específicamente el error 429 (Too Many Requests)
        errorMessage = error.response?.data?.error || "You have made too many requests at the last minute. Please try again later.";
      } else if(error.response?.status === 500) {
        // Manejar errores de validación
        errorMessage = "Invalid email or password";
      }else if (error.response?.data?.error) {
        // Manejar otros errores del servidor
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        // Manejar mensajes alternativos del servidor
        errorMessage = error.response.data.message;
      } else if (error.message) {
        // Manejar errores de red u otros errores
        errorMessage = error.message;
      }
      
      setLoginErrorMessage(errorMessage);
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
          <div className="text-red-700 bg-red-50 text-sm font-semibold p-3 border-l-4 border-red-500">
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
