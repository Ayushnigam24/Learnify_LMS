import React, { useState } from 'react'
import { server } from '../../main'
import toast from 'react-hot-toast'
import {motion} from 'framer-motion'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${server}/api/user/contact-us`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      toast.success(data.message)

      // form reset
      setFormData({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      alert('Something went wrong')
    }
  }
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

  return (<>

  <div className=" text-center p-10 bg-blue-800">
        <h2 className="text-5xl md:text-6xl font-bold text-white">
          Contact <span className="">us</span>
        </h2>
        <p className="mt-2 text-gray-200">Contact with us</p>
      </div>


  <div className="bg-blue-50 px-6  lg:px-8">
      
<div className="grid md:grid-cols-2">
  <div className="form m-5 shadow-sm p-8 rounded-lg bg-white">
    <form
        onSubmit={handleSubmit}
        className="mx-auto  max-w-xl"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md border  border-blue-300  px-3 py-2"
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full rounded-md border  border-blue-300 px-3 py-2"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="sm:col-span-2 w-full rounded-md border  border-blue-300 px-3 py-2"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="sm:col-span-2 w-full rounded-md border  border-blue-300 px-3 py-2"
            required
          />

          <textarea
            name="message"
            rows={4}
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="sm:col-span-2 w-full rounded-md border  border-blue-300 px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-indigo-600 py-2 text-white font-semibold"
        >
          Let's Talk
        </button>
      </form>
  </div>
  <div className="phone p-5 my-auto gap-5">
    <motion.div initial={{x:100 , opacity:0 ,}} whileInView='show' animate={{x:0 , opacity:1}} whileHover={{scale:1.01 , boxShadow:'0px 2px 10px rgba(85, 84, 84, 0.418)'}} transition={{duration:0.5 , }} className="contact email bg-white text-xl m-5 max-w-100 rounded-lg shadow-sm flex gap-2 p-4">
      <h1 className='text-3xl'>📧</h1>
      <h1 className='leading-8'>ayush**24@gmail.com</h1>
    </motion.div>
    <motion.div initial={{x:100 , opacity:0 ,}} whileInView='show' animate={{x:0 , opacity:1}} whileHover={{scale:1.01 , boxShadow:'0px 2px 10px rgba(85, 84, 84, 0.418)'}} transition={{duration:0.5 , delay:0.3}} className="contact phone bg-white text-xl m-5 max-w-100 rounded-lg shadow-sm flex gap-2 p-4">
      <h1 className='text-3xl'>☎️</h1>
      <h1 className='leading-8'>91+ 8808694461</h1>
    </motion.div>
    <motion.div initial={{x:100 , opacity:0 ,}} whileInView='show' animate={{x:0 , opacity:1}} transition={{duration:0.5 , delay:0.5}}  whileHover={{scale:1.01 , boxShadow:'0px 1px 10px rgba(85, 84, 84, 0.418)'}}  className="contact add bg-white text-xl m-5 max-w-100 rounded-lg shadow-sm flex gap-2 p-4">
      <h1 className='text-3xl'>📍</h1>
      <h1 className='leading-8'> Azamgarh , Up ,India</h1>
    </motion.div>
  </div>
</div>
      
    </div>
  </>
    
    
  )
}

export default Contact