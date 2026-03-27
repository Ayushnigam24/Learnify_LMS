import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";





const Sidebar = () => {
    return (
        <>
            <div className="sidebar p-5 border-r border-gray-400 flex justify-center justify-items-center">
                <ul>
                    <li>
                        <Link to={'/admin/dashboard'} className='flex p-2 gap-1 leading-4 mb-3 border-b border-gray-300 hover:text-blue-800 transition-all ease-in-out font-medium'>
                            <div className="icon">
                                <FaHome />
                            </div>
                            <span>Home</span>
                        </Link>
                    </li>
                     <li>
                        <Link to={'/admin/course'} className='flex p-2 gap-1 leading-4 mb-3 border-b border-gray-300 hover:text-blue-800 transition-all ease-in-out font-medium '>
                            <div className="icon">
                                <FaBook />
                            </div>
                            <span>Course</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/admin/contacts'} className='flex p-2 gap-1 leading-4 mb-3 border-b border-gray-300 hover:text-blue-800 transition-all ease-in-out font-medium '>
                            <div className="icon">
                                <FaBook />
                            </div>
                            <span>Contact</span>
                        </Link>
                    </li>
                     <li>
                        <Link to={'/admin/users'} className='flex p-2 gap-1 leading-4 mb-3 border-b border-gray-300 hover:text-blue-800 transition-all ease-in-out font-medium '>
                            <div className="icon">
                                <FaUser />
                            </div>
                            <span>Users</span>
                        </Link>
                         <li>
                        <Link to={'/account'} className='flex p-2 gap-1 leading-4 mb-3 border-b border-gray-300 hover:text-blue-800 transition-all ease-in-out font-medium '>
                            <div className="icon">
                                <MdLogout />
                            </div>
                            <span>Logout</span>
                        </Link>
                    </li>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar