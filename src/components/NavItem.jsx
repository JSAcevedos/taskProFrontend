import { Link } from "react-router"

export default function NavItem({label, href, icon: Icon, className, onClick}) {
  return (
    <li onClick={onClick} className={`flex w-full justify-center hover:bg-tertiary hover:text-black ${className}`}>
        <Link className="text-center w-full text-xl py-4 flex items-center justify-center" to={href}>
            <Icon className="mr-2" />
            {label}
        </Link>
    </li>
  )
}
