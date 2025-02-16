import { useState } from "react"
import Loading from "../components/Loading"
import RegisterForm from "../components/RegisterForm"
import BackButton from "../components/BackButton"

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLoading = (state) => {
    setIsLoading(() => state)
  }
  return (
    <div className="bg-primary text-white h-screen flex flex-col items-center justify-center">
        {isLoading && <Loading />}
        <BackButton />
        <RegisterForm  handleLoading={handleLoading}/>
    </div>
  )
}
