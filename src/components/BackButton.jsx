import { FaArrowLeft } from "react-icons/fa6"
import { Link } from "react-router"

export default function BackButton() {
  return (
    <Link to="/" className="absolute p-3 rounded-md top-5 left-5 bg-quaternary hover:bg-secondary text-3xl text-black">
        <FaArrowLeft />
    </Link>
  )
}
