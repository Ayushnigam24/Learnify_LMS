import React, { useState } from 'react'
import Layout from '../utils/Layout'
import { useNavigate } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import CoursesCard from '../../pages/courses/CoursesCard';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../../main';
import { useEffect } from 'react';

const categories = [
    "Web Development",
    "App Development",
    "Game Development",
    "Data Science",
    "AI"
]

const AdminCourses = ({user}) => {
     const navigate = useNavigate();
    

    useEffect(() => {
    if (user && user.userType !== 'admin') {
        navigate('/')
    }
}, [user, navigate])


    const [title, setTitle] = useState("")
    const [discription, setDiscription] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [createdBy, setCreatedBy] = useState("")
    const [duration, setDuration] = useState("")
    const [image, setImage] = useState("")
    const [imagePrev , setImagePrev] = useState("")
    const [btnLoading , setBtnLoading] = useState(false)

    const {courses, fetchCourses} = CourseData()

    const changeImageHandler =(e)=>{
        const file = e.target.files[0];
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImagePrev(reader.result)
            setImage(file);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setBtnLoading(true)
        const myForm = new FormData()
        myForm.append("title",title)
        myForm.append("discription",discription)
        myForm.append("category",category)
        myForm.append("price",price)
        myForm.append("createdBy",createdBy)
        myForm.append("duration",duration)
        myForm.append("file",image)

        try {
            const {data} = await axios.post(`${server}/admin/course/new`, myForm,{
                headers:{
                    token: localStorage.getItem("token")
                }
            })
            toast.success(data.message)
            setBtnLoading(false)
            await fetchCourses()
            setImage("")
            setTitle("")
            setDiscription("")
            setCategory("")
            setDuration("")
            setPrice("")
            setImagePrev("")
            setCreatedBy("")
        } catch (error) {
    setBtnLoading(false)

    const msg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"

    toast.error(msg)
}


    }
  return (
    <Layout>
        <div className='admin-course grid md:grid-cols-2'>
            <div className="left p-3">
                <h1 className='text-2xl text-blue-800 font-bold mb-3'>All Courses</h1>
                <div className="dashboard-content grid md:grid-cols-2 gap-2">
                    {
                        courses && courses.length>0 ? courses.map((e)=>{
                            return <CoursesCard key={e._id} course={e}/>
                        }): <p className='text-2xl text-gray-500 font-bold p-3'>No Courses Yet</p>
                    }
                </div>
            </div>
            <div className="right p-4">
                <div className="add-course">
                    <div className="course-form">
                        <h2 className='text-2xl text-blue-800 font-bold'>Add Courses</h2>
                         <form onSubmit={submitHandler}>
                                                <div>
                                                    <label
                                                        htmlFor="text"
                                                        className="block text-sm/6 font-medium text-black"
                                                    >
                                                        Title
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            value={title}
                                                            onChange={(e) => setTitle(e.target.value)}
                                                            required
                                                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="text"
                                                        className="block text-sm/6 font-medium text-black"
                                                    >
                                                        Description
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            value={discription}
                                                            onChange={(e) => setDiscription(e.target.value)}
                                                            required
                                                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="text"
                                                        className="block text-sm/6 font-medium text-black"
                                                    >
                                                        Price
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="number"
                                                            value={price}
                                                            onChange={(e) => setPrice(e.target.value)}
                                                            required
                                                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="text"
                                                        className="block text-sm/6 font-medium text-black"
                                                    >
                                                        Created By
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            value={createdBy}
                                                            onChange={(e) => setCreatedBy(e.target.value)}
                                                            required
                                                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                        />
                                                    </div>
                                                </div>
                                               <div>
                                                    <label
                                                        htmlFor="text"
                                                        className="block text-sm/6 font-medium text-black"
                                                    >
                                                        Duration
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            value={duration}
                                                            onChange={(e) => setDuration(e.target.value)}
                                                            required
                                                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                        />
                                                    </div>
                                                </div>
                                                <select className='border border-indigo-500 rounded-lg w-full mt-2 px-2 text-sm py-2' onChange={(e)=>setCategory(e.target.value)} value={category}>
                                                    <option value={""}>select Category</option>
                                                    {
                                                        categories.map((e)=>(
                                                            <option value={e} key={e}>{e}</option>
                                                        ))
                                                    }
                                                </select>
                                                <input className='border border-indigo-500 rounded-lg w-full mt-2 px-2 text-sm py-2' type="file" required onChange={changeImageHandler} />
                                                {
                                                    imagePrev && <img src={imagePrev} alt='' className='h-60'/>
                                                }

                                                <div>

                                                </div>

                                                <button  disabled={btnLoading} type='submit' className='bg-blue-800 border text-white border-blue-800 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white mt-3'>
                                                    {btnLoading ? "Please Wait...." : "Add"}
                                                </button>
                                            </form>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminCourses