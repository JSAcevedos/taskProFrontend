export default function Button({ darkMode = false, isDisabled = false, value, ...props }) {
    const darkModeClass = "bg-primary text-white  hover:bg-secondary"
    const lightModeClass = `bg-tertiary text-black ${isDisabled ? "opacity-30" : "hover:bg-quaternary cursor-pointer"}`

  return (
    <button className={"w-full p-3 mt-7 rounded-sm transition duration-200 font-bold text-lg " + (darkMode ? darkModeClass : lightModeClass)} disabled={isDisabled} {...props}>{value}</button>
  )
}
