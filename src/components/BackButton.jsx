import { FaArrowLeft } from "react-icons/fa6"

export default function BackButton() {
  return (
    <a href="/" className="absolute p-3 rounded-md top-5 left-5 bg-quaternary hover:bg-secondary text-3xl text-black">
        <FaArrowLeft />
    </a>
  )
}
