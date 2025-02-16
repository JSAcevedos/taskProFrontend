import NavItem from "./NavItem"
import { IoHome } from "react-icons/io5"
import { FaPersonSkiing } from "react-icons/fa6"
import { useLocation } from "react-router"

export default function Sidebar({handleShowMenu}) {
  const location = useLocation()

  const setActive = (route) => {
    return location.pathname === route ? "bg-tertiary text-black" : ""
  }

  return (
    <nav className="bg-primary h-full text-white lg:pt-0 pt-17">
      <div className="flex items-center justify-center space-x-3 py-[10%]">
        <img className="w-15" src="/logo.png" alt="logo" />
        <h1 className="text-4xl text-tertiary">TaskPro</h1>
      </div>
      <ul>
        <NavItem onClick={() => handleShowMenu(false)} label="Home" href="/tasks" icon={IoHome} className={setActive("/tasks")} />
        {/* <NavItem label="Add Task" href="/add-task" icon={FaPersonSkiing} className={setActive("/add-task")} /> */}
        <NavItem onClick={() => handleShowMenu(false)} label="Profile" href="/profile" icon={FaPersonSkiing} className={setActive("/profile")} />
      </ul>
    </nav>
  )
}
