import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Cookies from "js-cookie"

import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import RequireAuth from './Components/RequireAuth'
import Users from './Pages/Users'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUserData, setUserData } from './redux/featcher/auth/authSlice'



function App() {
  const tokenState = useSelector(state => state.auth.token)
  const token = Cookies.get("token")
  const email = Cookies.get("email")
  const dispatch = useDispatch()
  useEffect(() => {
    if (token && email) {
      dispatch(setUserData({ email, token }))

    } else {
      dispatch(removeUserData())
    }
  }, [])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <p>Error</p>,
      children: [
        { index: true, element: <Home /> },
        { path: "auth/login", element: tokenState ? <Navigate to="/" replace /> : <Login /> },
        { path: "auth/register", element: tokenState ? <Navigate to="/" replace /> : <Register /> },
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
