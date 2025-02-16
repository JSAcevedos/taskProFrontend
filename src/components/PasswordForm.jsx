import { useContext, useState } from "react"
import { MdArrowBackIos } from "react-icons/md"
import PasswordInput from "./PasswordInput"
import Button from "./Button"
import { updatePassword } from "../requests/user"
import { toast } from "react-toastify"
import LoadingContext from "../context/LoadingContext"

export default function PasswordForm() {
    const [showForm, setShowForm] = useState(false)
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const handleLoading = useContext(LoadingContext)

    const toggleForm = () => {
        setShowForm((showForm) => !showForm)
    }

    const allFieldsFilled = currentPassword !== "" && newPassword !== "" && confirmPassword !== ""
    const passwordsMatch = currentPassword !== newPassword && newPassword === confirmPassword
    const isButtonDisabled = !allFieldsFilled || !passwordsMatch

    const handleSubmit = async (event) => {
        handleLoading(true)
        event.preventDefault()

        await updatePassword(currentPassword, newPassword)
        .then((response) => {
            toast.success(response.data.message)
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
            toggleForm()
        })
        .catch((error) => toast.error(error.response.data))
        .finally(handleLoading(false))
    }

    return (
        <div>
            <button
                className="cursor-pointer flex items-center space-x-3"
                onClick={toggleForm}
            >
                <h1 className="text-xl">Update your password</h1>
                <MdArrowBackIos
                    className={`transition-all ${showForm && "-rotate-90"}`}
                />
            </button>
            <form className={`space-y-5 ${!showForm && "hidden"}`} onSubmit={handleSubmit}>
                <PasswordInput
                    id="currentPassword"
                    label="Current Password:"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <PasswordInput
                    id="newPassword"
                    mustValidateFormat={true}
                    label="New Password:"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <PasswordInput
                    id="confirmNewPassword"
                    label="Confirm New Password:"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    value="Update Password"
                    isDisabled={isButtonDisabled}
                />
            </form>
        </div>
    )
}
