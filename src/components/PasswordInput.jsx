import { useState } from "react";

export default function PasswordInput({label, ...props}) {
    const inputClass = "rounded-sm p-3 bg-transparent text-black w-full";
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
  return (
    <div>
        <label>{label}</label>
        <div className="flex bg-white rounded-sm border border-balck">
            <input className={inputClass} type={showPassword ? "text" : "password"} {...props} required/>
            <button type="button" onClick={togglePasswordVisibility} className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-200">
            {showPassword ? "Hide" : "Show"}
            </button>
        </div>
    </div>
  )
}
