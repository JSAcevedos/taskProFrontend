export default function Button({ darkMode = false, isDisabled = false, value, customBackground, addCustomHoverBackground = false, className, ...props }) {
  const background = customBackground ? customBackground : (darkMode ? "bg-primary" : "bg-tertiary");
  const hoverClass = addCustomHoverBackground ? "" : (darkMode ? "hover:bg-secondary" : "hover:bg-quaternary");
  const textClass = darkMode ? "text-white" : "text-black";
  const cursorClass = isDisabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer";
  
  const styleClass = `${background} ${hoverClass} ${textClass} ${cursorClass}`;

  return (
    <button className={`w-full p-3 mt-7 rounded-sm transition duration-200 font-bold text-lg ${styleClass} ${className}`} disabled={isDisabled} {...props}>
      {value}
    </button>
  );
}
