export default function NavItem({label, href, icon: Icon,}) {
  return (
    <li className="flex w-full justify-center hover:bg-tertiary hover:text-black">
        <a className="text-center w-full text-xl py-4 flex items-center justify-center" href={href}>
            <Icon className="mr-2" />
            {label}
        </a>
    </li>
  )
}
