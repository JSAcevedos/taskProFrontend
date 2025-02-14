import { BrowserRouter, Routes, Route } from "react-router";
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import NotFound from './pages/NotFound.jsx';
import Register from "./pages/Register.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<PublicRoute/>}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/tasks" element={<Tasks />} />
          </Route>

          <Route path="*" element={<NotFound />} /> 

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
