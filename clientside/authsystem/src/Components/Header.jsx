import React from 'react'

function Header() {
    return (
        <header className=' bg-slate-700'>
            <div className='container mx-auto h-[78px]  text-white 
            flex items-center justify-between
            '>
                <div className='text-orange-500 text-xl font-bold'>
                    AUTHSYSTEM
                </div>
                <ul className='flex gap-5 font-medium'>
                    <li>Home</li>
                    <li>Login</li>
                </ul>
            </div>
        </header>
    )
}

export default Header
