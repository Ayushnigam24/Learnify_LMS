import React, { useState } from 'react'
import {motion} from 'framer-motion'

const categories = [
  {
    text: "Mathematics",
    icon: "📐",
    bg: "bg-amber-100",
    border: "border-amber-300",
    iconBg: "bg-amber-400",
    textColor: "text-amber-800",
  },
  {
    text: "Science",
    icon: "🔬",
    bg: "bg-blue-100",
    border: "border-blue-300",
    iconBg: "bg-blue-500",
    textColor: "text-blue-800",
  },
  {
    text: "Web Dev",
    icon: "💻",
    bg: "bg-green-100",
    border: "border-green-300",
    iconBg: "bg-green-500",
    textColor: "text-green-800",
  },
  {
    text: "Design",
    icon: "🎨",
    bg: "bg-violet-100",
    border: "border-violet-300",
    iconBg: "bg-violet-500",
    textColor: "text-violet-800",
  },
  {
    text: "English",
    icon: "📖",
    bg: "bg-rose-100",
    border: "border-rose-300",
    iconBg: "bg-rose-500",
    textColor: "text-rose-800",
  },
  {
    text: "AI & ML",
    icon: "🤖",
    bg: "bg-cyan-100",
    border: "border-cyan-300",
    iconBg: "bg-cyan-500",
    textColor: "text-cyan-800",
  },
]

const Category = () => {
  const [active, setActive] = useState(null)

  const container ={
    hidden :{},
    show:{
        transition:{
            staggerChildren:0.1
        }
    }
  }

  const itemAnimation = {
    hidden:{x:-80, y:-40, opacity:0},
    show:{x:0,y:0, opacity:1}
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-8">
        <div>
          <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-1">
            Explore
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Top Categories
          </h2>
        </div>
      </div>

      {/* Grid — 2 cols on mobile, 3 on sm, 6 on lg */}
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((cat, i) => (
          <motion.button
            variants={itemAnimation}
            transition={{duration:0.8}}
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            className={`
              group flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl border-2
              transition-all duration-200 cursor-pointer text-left
              ${cat.bg} ${cat.border}
              ${active === i
                ? 'scale-95 shadow-inner opacity-90'
                : 'hover:-translate-y-1 hover:shadow-lg shadow-sm'}
            `}
          >
            {/* Icon circle */}
            <div
              className={`
                w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl
                ${cat.iconBg} shadow-md
                group-hover:scale-110 transition-transform duration-200
              `}
            >
              {cat.icon}
            </div>

            {/* Text */}
            <div className="text-center">
              <p className={`font-bold text-sm sm:text-base leading-tight ${cat.textColor}`}>
                {cat.text}
              </p>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </section>
  )
}

export default Category