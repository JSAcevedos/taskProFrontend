import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <section className="h-full lg:grid grid-cols-3 text-white">
      <div className="col-span-2 flex flex-col items-center space-between justify-center space-y-20 p-20 bg-primary">
        <div className="flex flex-col items-center space-y-5 text-center">
          <h1 className="justify-center text-5xl">Welcome to <span className="font-bold underline text-tertiary">Task Pro</span></h1>
          <h2 className="text-2xl">The <span className="font-bold text-tertiary">ultimate app</span> designed to help you efficiently <span className="font-bold text-tertiary">manage, organize, and track</span> all your tasks. Stay productive and never miss a deadline with Task Pro.</h2>
        </div>
        <img className="animate-levitate shadow-lg" src="/logo.png" alt="logo" />
      </div>

      <LoginForm />
    </section>
  );
}
