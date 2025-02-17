import { useContext, useEffect, useState } from "react"
import { getUser } from "../requests/user"
import LoadingContext from "../context/LoadingContext"
import { toast } from "react-toastify"
import UserForm from "../components/UserForm"
import PasswordForm from "../components/PasswordForm"
import DeleteAccountForm from "../components/DeleteAccountForm"
import FormItem from "../components/FormItem"

export default function Profile() {
  const handleLoading = useContext(LoadingContext)
  const [userData, setUserData] = useState({})

  const handleUserData = (userData) => {
    setUserData(() => userData)
  }

  useEffect(() => {
    const loadUserData = async () => {
      handleLoading(true)
      await getUser()
      .then((response) => handleUserData(response.data.data))
      .catch((error) => toast.error(error))
      .finally(() => handleLoading(false))
    }

    loadUserData()

  },[])
    
  return (
    <div className="flex w-full justify-center">
      <div className="m-10 lg:m-20 mt-30 lg:mt-10 space-y-10 max-w-[40rem] w-[40rem]">
          <h1 className="text-4xl">Welcome, {userData.name}</h1>
          <p>Please keep safe this id to recover your account: <span className="opacity-50">{userData.userId}</span></p>
          <FormItem itemName="Update account information">
            <UserForm nameValue={userData.name} emailValue={userData.email}/>
          </FormItem>
          <FormItem itemName="Update your password">
            <PasswordForm />
          </FormItem>
          <FormItem itemName="Delete your account">
            <DeleteAccountForm />
          </FormItem>
      </div>
    </div>
  )
}
