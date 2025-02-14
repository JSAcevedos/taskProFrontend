import { BrowserRouter, Routes, Route } from "react-router";
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Login from './pages/Login';
import Tasks from './pages/Tasks';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route element={<PublicRoute/>}>
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/tasks" element={<Tasks />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
