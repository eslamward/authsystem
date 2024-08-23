import React, { useState } from 'react'

function InputForm() {
    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
    })

    const handelSubit = (e) => {
        e.preventDefault()
        console.log(inputValues)
    }

    return (
        <section className='border-2 w-3/4 p-2 rounded-md mx-auto mt-20'>
            <form onSubmit={handelSubit} className='flex flex-col gap-5'>
                <fieldset className='flex flex-col'>
                    <label htmlFor='email' className='font-mono'>Email:</label>
                    <input name='email' id="email"
                        type='email'
                        value={inputValues.email}
                        onChange={(e) => {
                            setInputValues(prev => {

                                return {
                                    ...prev,
                                    email: e.target.value
                                }
                            })
                        }}
                        className='
                    px-2
                    py-1
                    border-[1px]
                    rounded-md
                    border-slate-400
                    text-slate-400
                    focus:border-slate-500
                    ' />
                </fieldset>

                <fieldset className='flex flex-col'>
                    <label htmlFor='password' className='font-mono'>Password:</label>
                    <input name='password' id="password"
                        type='password'
                        value={inputValues.password}
                        onChange={(e) => {
                            setInputValues(prev => {

                                return {
                                    ...prev,
                                    password: e.target.value
                                }
                            })
                        }}
                        className='
                        px-2
                        py-1
                        border-[1px]
                        rounded-md
                        border-slate-400
                        text-slate-400
                        focus:border-slate-500

                    ' />
                </fieldset>
                <button
                    type='submit'
                    className='
                    w-fit 
                  bg-orange-600
                    mx-auto
                    py-3
                    px-6
                    rounded-lg
                    text-white
                    hover:bg-orange-700
               '>Register</button>
            </form>
        </section>
    )
}

export default InputForm
