import React from 'react'
import { server } from '../../main'
import { UserData } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const CoursesCard = ({ course }) => {
    const navigate = useNavigate()
    const { user, isAuth } = UserData()
    const { fetchCourses } = CourseData()

    const isAdmin = user?.userType === 'admin'
    const isEnrolled = user?.subscription?.includes(course._id)

    const deleteHandler = async (id) => {
        if (!confirm('Are you sure you want to delete this course?')) return
        try {
            const { data } = await axios.delete(`${server}/admin/course/${id}`, {
                headers: { token: localStorage.getItem('token') },
            })
            toast.success(data.message)
            fetchCourses()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong')
        }
    }

    const renderAction = () => {
        if (!isAuth) {
            return (
                <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-blue-800 hover:bg-blue-700 active:scale-95 transition-all duration-150 text-white text-sm font-semibold py-2.5 rounded-xl shadow-sm"
                >
                    Get Started
                </button>
            )
        }
        if (isAdmin) {
            return (
                <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="w-full bg-blue-800 hover:bg-blue-700 active:scale-95 transition-all duration-150 text-white text-sm font-semibold py-2.5 rounded-xl shadow-sm"
                >
                    Study
                </button>
            )
        }
        return isEnrolled ? (
            <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all duration-150 text-white text-sm font-semibold py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-2"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Continue Learning
            </button>
        ) : (
            <button
                onClick={() => navigate(`/course/${course._id}`)}
                className="w-full bg-blue-800 hover:bg-blue-700 active:scale-95 transition-all duration-150 text-white text-sm font-semibold py-2.5 rounded-xl shadow-sm"
            >
                Get Started
            </button>
        )
    }

    return (
        <div
            data-aos="fade-up"
            className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl ring-1 ring-slate-100 transition-shadow duration-300"
        >
            {/* Thumbnail */}
            <div className="relative overflow-hidden h-44 bg-slate-100">
                <img
                    src={`${server}/${course.image}`}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {isEnrolled && !isAdmin && (
                    <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                        Enrolled
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 gap-4">
                <div className="flex flex-col gap-1.5">
                    <h3 className="text-base font-bold text-slate-800 leading-snug line-clamp-2">
                        {course.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.duration}
                    </div>
                </div>

                <div className="mt-auto flex flex-col gap-2">
                    <p className="text-xl font-extrabold text-blue-800">
                        ₹{course.price}
                    </p>

                    {renderAction()}

                    {isAdmin && (
                        <button
                            onClick={() => deleteHandler(course._id)}
                            className="w-full bg-red-50 hover:bg-red-100 active:scale-95 transition-all duration-150 text-red-600 text-sm font-semibold py-2.5 rounded-xl ring-1 ring-red-200"
                        >
                            Delete Course
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CoursesCard