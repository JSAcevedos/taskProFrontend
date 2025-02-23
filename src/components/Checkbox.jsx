export default function Checkbox({id, checkHandler, isChecked, ...props}) {
  return (
    <input type="checkbox" id={id} checked={isChecked} onChange={checkHandler} className="
        cursor-pointer w-4 h-4 border-2 border-blue-500 rounded-sm bg-white mt-1
        checked:bg-blue-800 checked:border-0
        focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-100
        disabled:border-steel-400 disabled:bg-steel-400"
      {...props}
    />
  )
}
