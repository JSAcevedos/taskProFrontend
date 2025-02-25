export default function Select({ id, label, options, onChange, className }) {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        onChange={onChange}
        className={`border rounded w-full p-3 ${className}`}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}