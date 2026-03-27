import React from 'react'
import About from './About'

const Mission = () => {
    return (
    <div className="bg-[#f5f8ff] text-gray-800">

      {/* HERO SECTION */}
      <section className=" bg-linear-to-r from-blue-800 to-blue-100 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-2 items-center">
          <div  data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Journey to Knowledge Starts Here
            </h1>
            <p className="text-lg opacity-90">
              Learn new skills, grow your career, and achieve your goals with our
              modern Learning Management System.
            </p>
          </div>

          <img
           data-aos="fade-left"
            src="about.png"
            alt="Learning"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* ABOUT US */}
     <About/>

      {/* OUR MISSION DETAIL */}
      <section className="max-w-7xl mx-auto px-6 pb-20 py-5">
        <div className="bg-white rounded-2xl shadow p-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-6">
              Our goals are centered around empowering learners, simplifying
              education, and promoting life-long learning.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg text-blue-800">
                  Empower Students
                </h4>
                <p className="text-gray-600">
                  Providing tools and skills to succeed.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-blue-800">
                  Simplify Learning
                </h4>
                <p className="text-gray-600">
                  Seamless and enjoyable learning experience.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-blue-800">
                  Promote Life-Long Learning
                </h4>
                <p className="text-gray-600">
                  Encouraging continuous growth and education.
                </p>
              </div>
            </div>
          </div>

          <img
            src="https://illustrations.popsy.co/blue/studying.svg"
            alt="Mission"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>
      
    </div>
  );
}

export default Mission