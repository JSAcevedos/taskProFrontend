import { BrowserRouter, Routes, Route } from "react-router";
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import NotFound from './pages/NotFound.jsx';
import Register from "./pages/Register.jsx";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout.jsx";
import RecoveryPassword from "./pages/RecoveryPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
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

            </Route>
          </Route>

          <Route path="*" element={<NotFound />} /> 

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
