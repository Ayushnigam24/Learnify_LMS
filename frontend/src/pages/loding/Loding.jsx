import React from 'react'

const Loding = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">

      {/* Circle wrapper */}
      <div className="relative flex items-center justify-center">

        {/* Outer filled blue circle */}
        <div className="h-20 w-20 rounded-full bg-blue-500" />

        {/* Inner small white circle - fades in and out */}
        <div className="absolute h-8 w-8 rounded-full bg-white animate-pulse" />
      </div>

      {/* Text + bouncing dots */}
      <div className="mt-8 flex items-center gap-1">
        <span className="text-blue-700 text-sm font-semibold tracking-widest uppercase">
          Loading
        </span>
        <span className="flex gap-0.5 ml-1 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-bounce [animation-delay:300ms]" />
        </span>
      </div>

    </div>
  )
}

export default Loding