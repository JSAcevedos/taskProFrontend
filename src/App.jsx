import { Routes, Route } from "react-router"
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
import NotFound from './pages/NotFound.jsx'
import Register from "./pages/Register.jsx"
import Layout from "./components/Layout.jsx"
import RecoveryPassword from "./pages/RecoveryPassword.jsx"
import ResetPassword from "./pages/ResetPassword.jsx"
import Profile from "./pages/Profile.jsx"
import Task from "./pages/Task.jsx"
import AddTask from "./pages/AddTask.jsx"

function App() {

  return (
    <>
        <Routes>

          <Route element={<PublicRoute/>}>

            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recovery-password" element={<RecoveryPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

          </Route>

          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>

              <Route path="/tasks" element={<Tasks />} />
              <Route path="/task/:taskId" element={<Task />} />
              <Route path="/add-task" element={<AddTask />} />
              <Route path="/profile" element={<Profile />} />

            </Route>
          </Route>

          <Route path="*" element={<NotFound />} /> 

        </Routes>
    </>
  )
}

export default App
