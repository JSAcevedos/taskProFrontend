export default function Login() {
  const inputClass = "border border-black"
  return (
    <section className="h-full grid grid-cols-2 bg-primary text-white">
      <div className="flex flex-col items-center justify-center">
        <h1 className="justify-center text-4xl">Welcome to <span className="font-bold underline">Task Pro</span></h1>
        <img src="/logo.png" alt="logo" />
      </div>
        <div className="flex items-center justify-center">
            <form className="flex flex-col " action="">
              <h1 className="text-4xl">Login</h1>
              <input className={inputClass} type="email" id="email"/>
              <input className={inputClass} type="password" id="password"/>
            </form>
        </div>
    </section>
  )
}
