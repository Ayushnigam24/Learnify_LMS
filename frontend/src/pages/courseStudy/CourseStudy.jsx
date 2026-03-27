import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext'
import { server } from '../../main'

const CourseStudy = ({ user }) => {
    const { id } = useParams()
    const { fetchCourse, course } = CourseData()
    const navigate = useNavigate()

    useEffect(() => {
        if (user && user.userType !== 'admin' && !user.subscription.includes(id)) {
            navigate('/')
            return
        }
        fetchCourse(id)
    }, [id])

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-4 border-blue-800 border-t-transparent animate-spin" />
                    <p className="text-slate-500 text-sm font-medium tracking-wide">Loading course...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Banner */}
            <div className="relative w-full bg-blue-950 overflow-hidden">
                <div className="absolute inset-0 opacity-20 gradient(ellipse_at_bottom_left,#3b82f6,transparent_60%)]" />
                <div className="relative max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
                    {/* Course Thumbnail */}
                    <div className="shrink-0 w-full md:w-72 rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/50 ring-1 ring-white/10">
                        <img
                            src={`${server}/${course.image}`}
                            alt={course.title}
                            className="w-full h-52 md:h-44 object-cover"
                        />
                    </div>

                    {/* Course Meta */}
                    <div className="flex flex-col gap-4 text-white flex-1">
                        <span className="inline-flex items-center w-fit px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold tracking-widest uppercase border border-blue-500/30">
                            Enrolled
                        </span>
                        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                            {course.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200/80">
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
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
                {/* About Section */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 mb-3">About this course</h2>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            {course.description || course.discription}
                        </p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {[
                            { label: 'Duration', value: course.duration },
                            { label: 'Instructor', value: course.createdBy },
                            { label: 'Access', value: 'Lifetime' },
                        ].map(({ label, value }) => (
                            <div key={label} className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-100">
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{label}</p>
                                <p className="text-sm font-semibold text-slate-800 truncate">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Card */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-100 flex flex-col gap-4 sticky top-6">
                        <h3 className="text-base font-bold text-slate-800">Ready to learn?</h3>
                        <p className="text-sm text-slate-500">Jump straight into the lectures and start learning at your own pace.</p>
                        <Link to={`/lectures/${course._id}`}>
                            <button className="w-full bg-blue-800 hover:bg-blue-700 active:scale-95 transition-all duration-150 text-white font-semibold text-sm py-3 px-5 rounded-xl shadow-md shadow-blue-900/20 flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Go to Lectures
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseStudy