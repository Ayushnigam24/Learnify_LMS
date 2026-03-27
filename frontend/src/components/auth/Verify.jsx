import React from 'react'
import { useState } from 'react'
import { UserData } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {
    const [otp, setOtp] = useState("")
    const { btnLoding, verifyOtp } = UserData()
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

function onChange(value) {
  console.log("Captcha value:", value);
  setShow(true)
}

    const submitHandler = async (e) => {
        e.preventDefault()
        await verifyOtp(Number(otp), navigate)
    }
    return (
        <>
            <div className="flex  flex-col justify-center px-6  lg:px-8 min-h-screen">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        src="logo.png"
                        alt="Your Company"
                        className="mx-auto h-16 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
                        Verify By OTP
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium text-black"
                            >
                                Enter OTP
                            </label>
                            <div className="mt-2">
                                <input
                                    id="otp"
                                    type="number"
                                    name="otp"
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className='justify-center justify-items-center '>
                            <ReCAPTCHA
                            
                                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                onChange={onChange}
                            />,
                        </div>
                        <div>
                           { show && <button
                                type="submit"
                                disabled={btnLoding}
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                {btnLoding ? "Please Wait" : "Verify"}
                            </button>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Verify