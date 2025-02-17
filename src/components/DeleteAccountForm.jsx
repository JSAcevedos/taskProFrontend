import { useContext, useState } from "react"
import PasswordInput from "./PasswordInput"
import Button from "./Button"
import { deleteAccount } from "../requests/user"
import { toast } from "react-toastify"
import LoadingContext from "../context/LoadingContext"
import Input from "./Input"
import { useNavigate } from "react-router"

export default function PasswordForm() {
    const [confirmationValue, setConfirmationValue] = useState("")
    const [password, setPassword] = useState("")
    const handleLoading = useContext(LoadingContext)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        handleLoading(true)
        event.preventDefault()

        if (confirmationValue !== "confirm") {
            toast.error("Need to confirm deletion")
            return
        }

        await deleteAccount(password)
        .then((response) => {
            toast.success(response.data.message)
            localStorage.removeItem('authToken')
            navigate("/")

        })
        .catch((error) => toast.error(error.response?.data || "Validation error"))
        .finally(handleLoading(false))
    }

    const isButtonDisabled = !(confirmationValue === "confirm" && password !== "")

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <PasswordInput
                label="Enter your Password:"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <Input
                id="confirmationInput"
                label='Type "confirm" to delete the account:'
                onChange={(e) => setConfirmationValue(e.target.value)}
                type="text"
                required
            />
            <Button
                type="submit"
                value="Delete Account"
                customBackground="bg-alert"
                addCustomHoverBackground={true}
                className="hover:bg-alert-hover"
                isDisabled={isButtonDisabled}
            />
        </form>
    )
}
