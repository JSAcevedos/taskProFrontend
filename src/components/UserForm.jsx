import { useState, useEffect, useContext } from "react"
import Button from "./Button"
import Input from "./Input"
import { updateUserInfo } from "../requests/user"
import LoadingContext from "../context/LoadingContext"
import { toast } from "react-toastify"

export default function UserForm({ nameValue, emailValue }) {
  const [currentName, setCurrentName] = useState(nameValue || "")
  const [currentEmail, setCurrentEmail] = useState(emailValue || "")
  const [originalName, setOriginalName] = useState(nameValue || "")
  const [originalEmail, setOriginalEmail] = useState(emailValue || "")

  const handleLoading = useContext(LoadingContext)
  const valuesChanged = currentName !== originalName || currentEmail !== originalEmail

  const handleSubmit = async (event) => {
    event.preventDefault()
    handleLoading(true)

    await updateUserInfo(currentName, currentEmail)
    .then((response) => {
      toast.success(response.data.message)
      setOriginalName(currentName)
      setOriginalEmail(currentEmail)
    })
    .catch((error) => {
      toast.error(error.response?.message || "An error occurred")
    })
    .finally(() => handleLoading(false))
  }

  useEffect(() => {
    if (nameValue !== undefined) {
      setCurrentName(nameValue)
      setOriginalName(nameValue)
    }
  }, [nameValue])

  useEffect(() => {
    if (emailValue !== undefined) {
      setCurrentEmail(emailValue)
      setOriginalEmail(emailValue)
    }
  }, [emailValue])

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Input
        label="Name: "
        value={currentName}
        type="text"
        onChange={(e) => setCurrentName(e.target.value)}
      />
      <Input
        label="Email: "
        value={currentEmail}
        type="email"
        onChange={(e) => setCurrentEmail(e.target.value)}
      />
      <Button value="Update Info" isDisabled={!valuesChanged} />
    </form>
  )
}
