import NavItem from "./NavItem"
import { IoHome } from "react-icons/io5"

export default function Sidebar() {
  return (
    <nav className="bg-primary h-full text-white lg:pt-0 pt-17">
      <div className="flex items-center justify-center space-x-3 py-[10%]">
        <img className="w-15" src="/logo.png" alt="logo" />
        <h1 className="text-4xl text-tertiary">TaskPro</h1>
      </div>
      <ul>
        <NavItem label="Home" href="/tasks" icon={IoHome} />
      </ul>
    </nav>
  )
}
