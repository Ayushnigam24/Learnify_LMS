import React, { useState } from 'react'
import { CourseData } from '../../context/CourseContext'
import CoursesCard from './CoursesCard'

const Courses = () => {
  const { courses } = CourseData()
  const [search, setSearch] = useState('')

  const filtered = courses?.filter(c =>
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.description?.toLowerCase().includes(search.toLowerCase())
  ) || []

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero Banner ── */}
      <div className="relative bg-linear-to-br from-blue-900 via-blue-800 to-blue-600 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-14 pb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            <span className="text-white/80 text-xs font-semibold tracking-wide">Live Courses Available</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight mb-3">
            Explore <span className="text-blue-200">Courses</span>
          </h1>
          <p className="text-blue-200/80 text-base sm:text-lg font-light max-w-md mb-8">
            Discover expert-crafted courses and level up your skills today.
          </p>

          {/* Search Bar */}
          <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3.5 shadow-2xl shadow-blue-950/40 max-w-lg
            focus-within:ring-2 focus-within:ring-blue-300 transition-all duration-200">
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search courses by name or topic..."
              className="flex-1 text-sm text-gray-700 placeholder-gray-300 outline-none font-medium bg-transparent"
            />
            {search
              ? (
                <button
                  onClick={() => setSearch('')}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-500
                    flex items-center justify-center text-gray-400 transition-colors shrink-0"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                </button>
              ) : (
                <kbd className="hidden sm:flex items-center gap-1 text-xs text-gray-300 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 font-mono shrink-0">
                  ⌘K
                </kbd>
              )
            }
          </div>
        </div>
      </div>

      {/* ── Content Area ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

        {/* Result info bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 font-medium">
            {search
              ? <><span className="text-blue-700 font-bold">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''} for "<span className="italic text-gray-700">{search}</span>"</>
              : <><span className="text-blue-700 font-bold">{filtered.length}</span> courses available</>
            }
          </p>
          {search && filtered.length > 0 && (
            <button
              onClick={() => setSearch('')}
              className="text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors"
            >
              Clear search ✕
            </button>
          )}
        </div>

        {/* Courses Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((e, i) => (
              <div
                key={e._id}
                style={{ animation: `fadeUp 0.4s ease both`, animationDelay: `${i * 50}ms` }}
              >
                <CoursesCard course={e} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-3xl bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-5xl mb-5 shadow-inner">
              {search ? '🔍' : '📚'}
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">
              {search ? `No results for "${search}"` : 'No Courses Yet'}
            </h3>
            <p className="text-sm text-gray-400 font-light max-w-xs mb-6">
              {search
                ? 'Try a different keyword or clear the search.'
                : 'New courses are being added soon. Stay tuned!'}
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold
                  rounded-xl shadow-md shadow-blue-200 hover:-translate-y-0.5 transition-all"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default Courses