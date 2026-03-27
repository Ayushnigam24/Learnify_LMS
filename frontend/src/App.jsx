import { useState } from 'react'
import './App.css'
import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Verify from './components/auth/Verify'
import Home from './pages/home/Home'
import Footer from './components/footer/Footer'
import About from './pages/about/About'
import { UserData } from './context/UserContext'
import Account from './pages/account/Account'
import Contact from './pages/contact/Contact'
import Courses from './pages/courses/Courses'
import CourseDiscription from './pages/courseDiscription/CourseDiscription'
import Dashboard from './pages/dashboard/Dashboard'
import Mission from './pages/about/Mission'
import CourseStudy from './pages/courseStudy/CourseStudy'
import Lecture from './pages/lecture/Lecture'
import AdminDashBoard from './admin/DashBoard/AdminDashBoard'
import AdminCourses from './admin/Courses/AdminCourses'
import AdminUsers from './admin/Users/AdminUsers'
import AOS from 'aos';
import "aos/dist/aos.css"
import { useEffect } from 'react'
import Profile from './pages/profile/Profile'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import AdminContact from './admin/contact/AdminContact'
import Header from './components/header/Header'
import PaySuccess from './pages/paymentSuccess/PaySuccess'
import GroqChat from './components/chat/GroqChat'
import GroqChatWidget from './components/chat/GroqChat'


function App() {
  const { isAuth, user } = UserData()

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 450,
      easing: 'ease-in-sine',
      delay: 100,
    });
  })

  return (
    <>
      <BrowserRouter>


        <Header isAuth={isAuth} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<Mission />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/login' element={isAuth ? <Home /> : <Login />} />
          <Route path='/register' element={isAuth ? <Home /> : <Register />} />
          <Route path='/verify' element={isAuth ? <Home /> : <Verify />} />
          <Route path='/account' element={isAuth ? <Account user={user} /> : <Login />} />
          <Route path='/course/:id' element={isAuth ? <CourseDiscription user={user} /> : <Login />} />
          <Route path='/payment-success/:id' element={isAuth ? <PaySuccess user={user} /> : <Login />} />
          <Route path='/:id/dashboard' element={isAuth ? <Dashboard user={user} /> : <Login />} />
          <Route path='/course/study/:id' element={isAuth ? <CourseStudy user={user} /> : <Login />} />
          <Route path='/lectures/:id' element={isAuth ? <Lecture user={user} /> : <Login />} />
          <Route path='/admin/dashboard' element={isAuth ? <AdminDashBoard user={user} /> : <Login />} />
          <Route path='/admin/course' element={isAuth ? <AdminCourses user={user} /> : <Login />} />
          <Route path='/admin/users' element={isAuth ? <AdminUsers user={user} /> : <Login />} />
          <Route path='/admin/contacts' element={isAuth ? <AdminContact user={user} /> : <Login />} />
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          

        </Routes>
        <Footer />
      </BrowserRouter>
      <GroqChatWidget/>
    </>
  )
}

export default App
