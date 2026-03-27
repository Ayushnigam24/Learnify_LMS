import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { server } from '../../main'
import { useEffect } from 'react'
import Layout from '../utils/Layout'

const AdminUsers = ({user}) => {
    const navigate = useNavigate()
    if (user && user.userType !== 'admin') {
        return navigate('/')
    }
const [users, setUsers] = useState([])

async function fetchUsers() {
    try {
        const {data} = await axios.get(`${server}/admin/users`,{
            headers:{
                token: localStorage.getItem("token")
            }
        })
        setUsers(data.users)
    } catch (error) {
        console.log(error);
        
    }
}


useEffect(()=>{
fetchUsers()
},[])

  return (
    <>
    <Layout>
        <div className="users p-5">
            <h1 className='text-2xl text-blue-800 font-bold mb-3'>All Users</h1>
            <div className="table">
                <table className='border'>
                    <thead className='bg-blue-800 text-white w-full'>
                        <tr>
                            <td className='border px-5' >#</td>
                            <td className='border px-5' >Name</td>
                            <td className='border px-5' >Email</td>
                            <td className='border px-5' >Role</td>
                            {/* <td>Update role</td> */}
                        </tr>
                    </thead>
                    {
                        users && users.map((e,i)=>(
                            <tbody key={i}>
                                <tr>
                                    <td  className='border px-5 py-3'>{i+1}</td>
                                    <td  className='border px-5 py-3'>{e.name}</td>
                                    <td  className='border px-5 py-3'>{e.email}</td>
                                    <td  className='border px-5 py-3'>{e.userType}</td>
                                    {/* <td><button>update role</button></td> */}
                                </tr>
                            </tbody>
                        ))
                    }
                </table>
            </div>
        </div>
    </Layout>
    </>
  )
}

export default AdminUsers