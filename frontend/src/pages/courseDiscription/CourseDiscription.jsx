import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext'
import { server } from '../../main'
import Loading from '../loding/Loding.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'
import { UserData } from '../../context/UserContext'

const CourseDescription = ({ user }) => {
    const { id } = useParams()
    const { fetchCourse, course, fetchMyCourse } = CourseData()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchCourse(id)
    }, [id])

    const isEnrolled = user?.subscription?.includes(course?._id)

    const checkoutHandler = async () => {
        try {
            const token = localStorage.getItem('token')
            setLoading(true)

            const { data } = await axios.post(
                `${server}/api/course/checkout/${id}`,
                {},
                { headers: { token } }
            )

            if (!window.Razorpay) {
                toast.error('Razorpay SDK not loaded')
                setLoading(false)
                return
            }

            const options = {
                key: 'rzp_test_S9kwgEIGFYzwbS',
                currency: 'INR',
                order_id: data.order.id,
                name: 'LMS',
                description: 'Learn with us',
                handler: async (response) => {
                    try {
                        const res = await axios.post(
                            `${server}/api/verification/${id}`,
                            response,
                            { headers: { token } }
                        )
                        await fetchMyCourse()
                        toast.success(res.data.message)
                        navigate(`/payment-success/${response.razorpay_payment_id}`)
                    } catch (err) {
                        toast.error(err.response?.data?.message || 'Verification failed')
                    } finally {
                        setLoading(false)
                    }
                },
            }

            new window.Razorpay(options).open()
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
            setLoading(false)
        }
    }

    if (loading) return <Loading />

    if (!course) return null

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="bg-blue-950 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 gradient(ellipse_at_bottom_left,#3b82f6,transparent_60%)]" />
                <div className="relative max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center gap-10">
                    {/* Thumbnail */}
                    <div className="shrink-0 w-full md:w-80 rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/50 ring-1 ring-white/10">
                        <img
                            src={`${server}/${course.image}`}
                            alt={course.title}
                            className="w-full h-56 object-cover"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-3 text-white flex-1">
                        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                            {course.title}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-sm text-blue-200/80">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {course.createdBy}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {course.duration}
                            </span>
                        </div>
                        <p className="text-blue-100/70 text-sm leading-relaxed line-clamp-3">
                            {course.description || course.discription}
                        </p>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
                {/* About */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 mb-3">About this Course</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            {course.description || course.discription}
                        </p>
                    </div>

                    {/* Meta cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {[
                            { label: 'Instructor', value: course.createdBy },
                            { label: 'Duration', value: course.duration },
                            { label: 'Access', value: 'Lifetime' },
                        ].map(({ label, value }) => (
                            <div key={label} className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-100">
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{label}</p>
                                <p className="text-sm font-semibold text-slate-800 truncate">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Purchase Card */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-100 flex flex-col gap-5 sticky top-6">
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Course Price</p>
                            <p className="text-4xl font-extrabold text-blue-800">₹{course.price}</p>
                        </div>

                        <ul className="flex flex-col gap-2 text-sm text-slate-600">
                            {[
                                'Full lifetime access',
                                'Access on all devices',
                                'Certificate of completion',
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {isEnrolled ? (
                            <button
                                onClick={() => navigate(`/course/study/${course._id}`)}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all duration-150 text-white font-semibold text-sm py-3 rounded-xl shadow flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Continue Learning
                            </button>
                        ) : (
                            <button
                                onClick={checkoutHandler}
                                className="w-full bg-blue-800 hover:bg-blue-700 active:scale-95 transition-all duration-150 text-white font-semibold text-sm py-3 rounded-xl shadow flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Buy Now
                            </button>
                        )}

                        <p className="text-center text-xs text-slate-400">30-day money-back guarantee</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDescription