import { useContext, useState } from "react"
import { MdArrowBackIos } from "react-icons/md"
import PasswordInput from "./PasswordInput"
import Button from "./Button"
import { deleteAcount, updatePassword } from "../requests/user"
import { toast } from "react-toastify"
import LoadingContext from "../context/LoadingContext"

export default function PasswordForm() {
    const handleLoading = useContext(LoadingContext)

    const handleSubmit = async (event) => {
        handleLoading(true)
        event.preventDefault()

        await deleteAcount(password)
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
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Button
                type="submit"
                value="Delete Account"
                customBackground="bg-alert"
                customHoverBackground="bg-alert-hover"
                isDisabled={false}
            />
        </form>
    )
}
