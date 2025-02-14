export default function NotFound() {
  return (
    <div className="bg-primary text-white h-screen flex flex-col items-center justify-center">
        <img className="mb-10 w-[9rem]" src="/logo.png" alt="logo" />
        <h1 className="text-6xl">404 Not Found</h1>
        <a href="/" className="bg-secondary hover:bg-tertiary p-4 rounded-sm mt-5">Back to home</a>
    </div>
  )
}
