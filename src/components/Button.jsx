export default function Button({ darkMode = false, isDisabled = false, value, customBackground, customHoverBackground, ...props }) {

    const background = customBackground ? customBackground : (darkMode ? "bg-primary" : "bg-tertiary")
    const hoverBackground = customHoverBackground ? customHoverBackground : (darkMode ? "hover:bg-secondary" : "hover:bg-quaternary")
    const styleClass = `${darkMode ? "text-white" : "text-black"} ${isDisabled ? "opacity-30" : `hover:${hoverBackground} cursor-pointer`} ${background}`

  return (
    <button className={`w-full p-3 mt-7 rounded-sm transition duration-200 font-bold text-lg ${styleClass}`} disabled={isDisabled} {...props}>{value}</button>
  )
}
