import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate,Link } from 'react-router-dom'
import { UserData } from '../../context/UserContext'
import { CourseData } from '../../context/CourseContext'

const Login = () => {
    const navigate = useNavigate();
    const{loginUser ,btnLoding} = UserData();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {fetchMyCourse} = CourseData()


    const submitHandler = async (e) => {
        e.preventDefault()
        await loginUser(email,password,navigate,fetchMyCourse)
    }
    return (
        <>

            <>
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            src="logo.png"
                            alt="Your Company"
                            className="mx-auto h-16 w-auto"
                        />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
                            Sign in to your account
                        </h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={submitHandler} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm/6 font-medium text-black"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required=""
                                        autoComplete="email"
                                        placeholder='ayuu***@gmail.com'
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm/6 font-medium text-black"
                                    >
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <Link  className="font-semibold text-indigo-600 hover:text-indigo-300" to="/forgot">Forgot password?</Link>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required=""
                                        autoComplete="current-password"
                                        placeholder='*****'
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    disabled={btnLoding}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    {btnLoding?"Please Wait...":"Sign In"}
                                </button>
                            </div>
                        </form>
                        <p className="mt-10 text-center text-sm/6 text-gray-600">
                            Don't have any account .
                            <NavLink className="font-semibold text-indigo-600 hover:text-indigo-300" to="/register">Register Here</NavLink>
                        </p>
                    </div>
                </div>
            </>

        </>
    )
}

export default Login