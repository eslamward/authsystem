import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <p>Error</p>,
    children: [
      { index: true, element: <Home /> },
      { path: "auth/login", element: <Login /> },
      { path: "auth/register", element: <Register /> }
    ]
  }
])

function App() {
  return (

    <RouterProvider router={router} />
  )
}

export default App
