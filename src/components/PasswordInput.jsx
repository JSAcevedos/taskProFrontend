import { useState } from "react";

export default function PasswordInput({ label, mustValidateFormat = false, ...props }) {
  const inputClass = "rounded-sm p-3 bg-transparent text-black w-full";
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const pattern = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";
  const title = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(() => e.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <div className="flex bg-white rounded-sm border border-black">
        <input
          className={inputClass}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          pattern={mustValidateFormat ? pattern : ".*"}
          title={mustValidateFormat ? title : ""}
          required
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-200"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}
