import React from 'react'
import { Navigate } from 'react-router'
import Cookies from "js-cookie"
import { useSelector } from 'react-redux'
function RequireAuth({ children }) {

    const token = useSelector(sate => sate.auth.token)
    return token ? children : <Navigate to="/auth/register" replace />
}

export default RequireAuth
