import React, { useEffect, useRef, useState } from 'react'

const stats = [
  { icon: "📚", value: 500, suffix: "+", label: "Total Courses" },
  { icon: "👨‍🎓", value: 24, suffix: "K+", label: "Active Students" },
  { icon: "🏆", value: 150, suffix: "+", label: "Expert Instructors" },
  { icon: "🎓", value: 98, suffix: "%", label: "Success Rate" },
]

// Animated number hook
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

const StatCard = ({ icon, value, suffix, label, delay, started }) => {
  const count = useCountUp(value, 1600, started)
  return (
    <div
      className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-md border border-blue-100
                 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-2xl shadow-md shrink-0">
        {icon}
      </div>
      {/* Text */}
      <div>
        <p className="text-2xl font-extrabold text-blue-900 leading-tight">
          {count}{suffix}
        </p>
        <p className="text-sm text-gray-500 font-medium mt-0.5">{label}</p>
      </div>
    </div>
  )
}

const Counter = () => {
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="w-full px-4 sm:px-6 lg:px-10 py-12 bg-blue-50 rounded-3xl my-8 mx-auto max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-1">Our Impact</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Numbers That Speak</h2>
      </div>

      {/* Stats Grid — 1 col mobile, 2 col sm, 4 col lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} delay={i * 100} started={started} />
        ))}
      </div>
    </section>
  )
}

export default Counter