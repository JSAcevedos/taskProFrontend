import { FaArrowLeft } from "react-icons/fa6"
import { Link } from "react-router"

export default function BackButton({goTo = "/", className = ""}) {
  return (
    <Link to={goTo} className={`absolute p-3 rounded-md top-5 right-5 lg:right-auto lg:left-5 bg-quaternary hover:bg-secondary text-3xl text-black ${className}`}>
        <FaArrowLeft />
    </Link>
  )
}
