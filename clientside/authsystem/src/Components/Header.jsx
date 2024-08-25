import React from 'react'
import { NavLink } from 'react-router-dom'
import Cookies from "js-cookie"
import { useSelector } from 'react-redux'
function Header() {
    const token = useSelector(state => state.auth.token)
    return (
        <header className=' bg-slate-700'>
            <div className='container mx-auto h-[78px]  text-white 
            flex items-center justify-between
            '>
                <div className='text-orange-500 text-xl font-bold'>
                    AUTHSYSTEM
                </div>
                <ul className='flex gap-5 font-medium'>
                    <NavLink to={"/"}>Home</NavLink>
                    {token ? <NavLink to={"/users"}>Users</NavLink> :
                        <NavLink to={"/auth/login"}>Login</NavLink>}
                </ul>
            </div>
        </header>
    )
}

export default Header
