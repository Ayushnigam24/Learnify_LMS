import React from 'react'
import { Link } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext'
import CoursesCard from '../courses/CoursesCard'

const FeaturedCourses = () => {
  const { courses } = CourseData()

  // Last 4 recently added courses
  const recent = courses?.slice(-4).reverse() || []

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold text-blue-500 tracking-widest uppercase mb-1">✦ New</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Recently Added
            </h2>
          </div>
          <Link
            to="/courses"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-blue-600
              hover:text-blue-800 transition-colors group"
          >
            View All
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>

        {/* Courses Grid */}
        {recent.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {recent.map((course, i) => (
                <div
                  key={course._id}
                  style={{ animation: 'fadeUp 0.4s ease both', animationDelay: `${i * 80}ms` }}
                >
                  <CoursesCard course={course} />
                </div>
              ))}
            </div>

            {/* View More — mobile + desktop */}
            <div className="flex justify-center mt-8">
              <Link
                to="/courses"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700
                  text-white text-sm font-bold rounded-xl shadow-md shadow-blue-200
                  hover:-translate-y-0.5 transition-all duration-200"
              >
                View More Courses
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📚</div>
            <p className="text-xl font-bold text-gray-400">No courses added yet</p>
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

export default FeaturedCourses