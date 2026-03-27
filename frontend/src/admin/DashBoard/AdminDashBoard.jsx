import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../utils/Layout';
import axios from 'axios'
import { server } from '../../main';

const AdminDashBoard = ({user}) => {
    const navigate = useNavigate();

    if (user && user.userType !== 'admin') {
        return navigate('/')
    }


    const [stats, setStats] = useState([])

    async function fetchStats() {
        try {
            const {data} = await axios.get(`${server}/admin/stats`,{
                headers:{
                    token: localStorage.getItem("token")
                }
            })
            setStats(data.stats)
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        fetchStats()
    },[])
  return (
    <>
    <Layout>
<div className="main-content p-5 grid gap-5 grid-cols-3">
    <div className="box border p-5 rounded-lg bg-blue-800 text-white shadow-lg">
        <p className='font-bold'>Total Courses</p>
        <p>{stats.totalCourse}</p>
    </div>
    <div className="box border p-5 rounded-lg bg-blue-800 text-white shadow-lg">
        <p className='font-bold'>Total Lecture</p>
        <p>{stats.totalLecture}</p>
    </div>
    <div className="box border p-5 rounded-lg bg-blue-800 text-white shadow-lg">
        <p className='font-bold'>Total User</p>
        <p>{stats.totalUser}</p>
    </div>
</div>

    </Layout>
    </>
  )
}

export default AdminDashBoard