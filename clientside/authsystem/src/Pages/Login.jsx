import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useLoginMutation } from '../redux/featcher/auth/authApiSlice'
import Cookies from "js-cookie"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/featcher/auth/authSlice'

function Login() {

    const [login, { isError, isLoading, error }] = useLoginMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
    })

    const handelSubit = async (e) => {
        e.preventDefault()
        try {

            const { data } = await login({
                email: inputValues.email,
                password: inputValues.password
            })

            const token = data.token
            const user = data.user
            const userEmail = user["email"]
            if (token) {
                dispatch(setUserData({ userEmail, token }))
            }



            setInputValues({
                email: "",
                password: ""
            })

            navigate("/")
        } catch (error) {
        }
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
                {isError && error &&
                    <div className='bg-red-500 text-white font-mono p-4 rounded-md'>{error.data.message}</div>}

                <div className='flex items-center'>
                    <p className='flex-1'>Do You Have Account?
                        <Link to={"/auth/register"} className='text-blue-500 mx-2'>Register</Link></p>
                    <button
                        disabled={isLoading}
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
                   '>Login</button>
                </div>
            </form>
        </section>
    )
}

export default Login


