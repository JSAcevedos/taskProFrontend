import { useNavigate } from 'react-router'

export default function LogoutButton() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('authToken')
        navigate("/")
    }
  return (
    <button className="bg-secondary hover:bg-quaternary hover:text-black cursor-pointer text-white rounded-sm p-2" onClick={logout}>Log Out</button>
  )
}
