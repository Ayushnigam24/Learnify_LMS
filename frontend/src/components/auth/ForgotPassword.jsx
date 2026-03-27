import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from 'axios'
import { server } from '../../main'


const ForgotPassword = () => {

  const [email, setEmail] = useState("")
  const [btnLoading, setBtnLoading] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    setBtnLoading(true)
    e.preventDefault()
    try {
      const { data } = await axios.post(`${server}/api/user/forgot-password`, { email })
      toast.success(data.message)
      navigate('/login')
      setBtnLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
      setBtnLoading(false)
    }
  }

  return (
    <>


<div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            src="logo.png"
                            alt="Your Company"
                            className="mx-auto h-16 w-auto"
                        />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
                            Forget Password
                        </h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm/6 font-medium text-black"
                                >
                                    Enter Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        type="email"
                                       value={email} onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    disabled={btnLoading}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                   {btnLoading ? "Please wait...." : "Forgot Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


      {/* <form onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-black"
        >
          Email address
        </label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type='submit' disabled={btnLoading} >{btnLoading ? "Please wait" : "Forgot Password"}</button>
      </form> */}
    </>
  )
}

export default ForgotPassword