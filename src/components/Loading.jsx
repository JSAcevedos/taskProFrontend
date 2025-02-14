export default function Loading() {
  return (
    <div className="w-full h-full absolute left-0 top-0 right-0 bottom-0 flex items-center justify-center">
      <div className="bg-black opacity-20 w-full h-full absolute"></div>
      <div className="border-7 border-t-tertiary rounded-full w-20 h-20 animate-spin z-10"></div>
    </div>
  )
}
