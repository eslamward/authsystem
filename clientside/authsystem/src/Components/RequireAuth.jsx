import React from 'react'
import { Navigate } from 'react-router'
import Cookies from "js-cookie"
function RequireAuth({ children }) {

    const token = Cookies.get("token")
    return token ? children : <Navigate to="/auth/register" replace />
}

export default RequireAuth
