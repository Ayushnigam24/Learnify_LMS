import React from 'react'

const About = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen">

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-14 text-center">
        <p className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-3">Who We Are</p>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
          About <span className="text-blue-700">Us</span>
        </h1>
        <p className="text-gray-400 text-base max-w-md mx-auto font-light">
          Empowering learners worldwide with expert-led, accessible education.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-gray-100" />
      </div>

      {/* Who We Are Cards */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { icon: '🎯', title: 'Our Goal', text: 'Help students acquire new skills and advance their careers with confidence.' },
            { icon: '📚', title: 'Quality Content', text: 'High-quality courses taught by expert instructors from top industries.' },
            { icon: '🛤️', title: 'Personalized', text: 'Custom learning paths, resources, and assessments tailored for you.' },
          ].map((item) => (
            <div key={item.title} className="flex flex-col gap-2 p-5 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="font-bold text-blue-700">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-gray-100" />
      </div>

      {/* Images + Mission */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-5">
        <img
          src="https://img.freepik.com/free-vector/online-learning-concept-illustration_114360-4766.jpg"
          className="rounded-2xl border border-gray-100 shadow-sm object-cover w-full"
          alt="Online Learning"
        />
        <img
          src="https://img.freepik.com/free-vector/online-education-concept_52683-37480.jpg"
          className="rounded-2xl border border-gray-100 shadow-sm object-cover w-full"
          alt="Online Education"
        />
        <div className="border border-blue-100 bg-blue-50 rounded-2xl p-7 flex flex-col justify-center">
          <span className="text-3xl mb-3">🚀</span>
          <h3 className="text-xl font-bold text-blue-800 mb-2">Our Mission</h3>
          <p className="text-gray-500 text-sm leading-relaxed font-light">
            To make education accessible, engaging, and impactful for every learner — regardless of background or location.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-gray-100" />
      </div>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {[
          { num: '50+', label: 'Courses' },
          { num: '10K+', label: 'Students' },
          { num: '30+', label: 'Instructors' },
          { num: '98%', label: 'Satisfaction' },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-black text-blue-700">{s.num}</p>
            <p className="text-sm text-gray-400 font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </section>

      

    </div>
  )
}

export default About