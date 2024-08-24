import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Cookies from "js-cookie"

import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import RequireAuth from './Components/RequireAuth'
import Users from './Pages/Users'



function App() {
  const token = Cookies.get("token")
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <p>Error</p>,
      children: [
        { index: true, element: <RequireAuth><Home /></RequireAuth> },
        { path: "auth/login", element: token ? <Navigate to="/" replace /> : <Login /> },
        { path: "auth/register", element: token ? <Navigate to="/" replace /> : <Register /> },
        {
          path: "users/", children: [
            { index: true, element: <RequireAuth><Users /></RequireAuth> }
          ]
        }
      ]
    },

  ])
  return (

    <RouterProvider router={router} />
  )
}

export default App
