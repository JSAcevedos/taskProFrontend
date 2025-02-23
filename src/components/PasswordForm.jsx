import { useContext, useState } from "react"
import PasswordInput from "./PasswordInput"
import Button from "./Button"
import PasswordRequirements from "./PasswordRequirements"
import { updatePassword } from "../requests/user"
import { toast } from "react-toastify"
import LoadingContext from "../context/LoadingContext"

export default function PasswordForm() {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const handleLoading = useContext(LoadingContext)

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
        })
        .catch((error) => toast.error(error.response.data))
        .finally(handleLoading(false))
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
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
            <PasswordRequirements password={newPassword} />
            <PasswordInput
                id="confirmNewPassword"
                label="Confirm New Password:"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
                type="submit"
                valueLabel="Update Password"
                isDisabled={isButtonDisabled}
            />
        </form>
    )
}
