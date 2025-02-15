import { useNavigate } from "react-router"

export default function Tasks() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('authToken')
    navigate("/")
  }
  return (
    <div className="flex flex-col justify-center items-center h-full">
        <h1>TASKS</h1>
        <button className="bg-secondary hover:bg-quaternary hover:text-black cursor-pointer text-white rounded-sm p-2" onClick={logout}>Log Out</button>
    </div>
  )
}
