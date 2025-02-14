export default function Button({ darkMode = false, value, ...props }) {
    const darkModeClass = "bg-primary text-white  hover:bg-secondary";
    const lightModeClass = "bg-tertiary text-black  hover:bg-quaternary";

  return (
    <button className={"w-full p-3 mt-7 rounded-sm cursor-pointer transition duration-200 font-bold text-lg " + (darkMode ? darkModeClass : lightModeClass)} {...props}>{value}</button>
  )
}
