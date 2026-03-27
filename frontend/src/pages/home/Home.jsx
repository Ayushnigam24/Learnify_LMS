import React from 'react'
import {useNavigate} from 'react-router-dom'
import Testimonial from '../../components/testimonial/Testimonial'
import Counter from '../../components/counter/Counter'
import About from '../about/About'
import Category from '../category/Category'
import {motion} from 'framer-motion'
import FeaturedCourses from '../featureCourses/FeaturedCourses'

const Home = () => {
    const navigate = useNavigate()
  return (
   <>
 <section className="hero dark:bg-gray-900 px-4">
  <div className="grid px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
    <div className="mr-auto place-self-center lg:col-span-7">
      <p className='text-white text-sm font-bold bg-blue-800 w-35  px-5 py-3 rounded-full'>● Hey Learners</p>
      <motion.h1 initial={{x:-100 , opacity:0}} animate={{x:0, opacity:1}} transition={{duration:0.8 }} className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight  leading-none md:text-5xl xl:text-6xl dark:text-white">
        Master <span className='text-blue-800'>Skills</span> with Expert-Led <span className='text-blue-800'>Courses</span>
      </motion.h1>
      <motion.p initial={{scale:0.8, opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.8, delay:1}} className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
        From checkout to global sales tax compliance, companies around the world
        use Flowbite to simplify their payment stack.
      </motion.p>
      <motion.a whileHover={{background:'blue'}} whileTap={{scale: 0.5}} initial={{opacity:0 ,x:-100}} animate={{x:0 ,opacity:1}} transition={{duration:0.8, delay:0.8}}
        className="inline-flex items-center text-white bg-blue-800 justify-center px-5 py-3 text-base font-medium text-center border  rounded-lg transition-all focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        onClick={()=>navigate("/courses")}
      >
        Start Learning Now
      </motion.a>
    </div>
    <motion.div initial={{x:100, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:0.8}} className="hidden lg:mt-0 lg:col-span-5 lg:flex">
      <motion.img
      animate={{ y:[0,-20,0]}}
      transition={{duration:3, repeat:Infinity, ease:"easeInOut"}}
        src="hero.png"
        alt="mockup"
      />
    </motion.div>
  </div>
</section>

<Counter/>
<Category/>

<br />
<div className="justify-center  justify-items-center sm:block hidden">
<hr className="border-4 border-gray-200 w-5xl "/>
</div>

<FeaturedCourses/>
<About/>
<Testimonial/>



   </>
  )
}

export default Home