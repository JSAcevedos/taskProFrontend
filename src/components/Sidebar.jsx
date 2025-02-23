import NavItem from "./NavItem"
import { FaPersonSkiing } from "react-icons/fa6"
import { useLocation, useNavigate } from "react-router"
import { TbDoorExit } from "react-icons/tb"
import { LiaClipboardListSolid } from "react-icons/lia"
import { MdOutlineAddCircleOutline } from "react-icons/md"

export default function Sidebar({handleShowMenu}) {
  const location = useLocation()
  const navigate = useNavigate()

  const setActive = (route) => {
    return location.pathname === route ? "bg-tertiary text-black" : ""
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    navigate("/")
}

  return (
    <nav className="bg-primary h-full text-white lg:pt-0 pt-17">
      <div className="flex items-center justify-center space-x-3 py-[10%]">
        <img className="w-15" src="/logo.png" alt="logo" />
        <h1 className="text-4xl text-tertiary">TaskPro</h1>
      </div>
      <ul>
        <NavItem onClick={() => handleShowMenu(false)} label="Tasks" href="/tasks" icon={LiaClipboardListSolid} className={setActive("/tasks")} />
        <NavItem onClick={() => handleShowMenu(false)} label="Add Task" href="/add-task" icon={MdOutlineAddCircleOutline} className={setActive("/add-task")} />
        <NavItem onClick={() => handleShowMenu(false)} label="Profile" href="/profile" icon={FaPersonSkiing} className={setActive("/profile")} />
        <NavItem onClick={() => logout(false)} label="Log Out" icon={TbDoorExit} />
      </ul>
    </nav>
  )
}
