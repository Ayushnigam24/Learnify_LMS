import React, { useEffect, useState } from 'react'
import { UserData } from '../../context/UserContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { server } from '../../main'

const Account = () => {
     
  const { user, setIsAuth, setUser, fetchUser } = UserData()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) fetchUser()
  }, [])

  const logoutHandle = () => {
    localStorage.clear()
    setUser(null)
    setIsAuth(false)
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const isAdmin = user?.userType === 'admin'

  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
  }

  if (!user) return null


  const [preview, setPreview] = useState(null);
   const avatarSrc = preview
      ? preview
      : user?.avatar?.url
      ? `${server}${user.avatar.url}`
      : null;
  
    const initials = name
      ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
      : "U";

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center py-14 px-4">
      <div className="w-full max-w-md flex flex-col gap-4">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 overflow-hidden">
          {/* Top Banner */}
          <div className="h-14  relative">
            <div className="absolute inset-0 opacity-20 gradient(ellipse_at_top_right,#3b82f6,transparent_60%)]" />
          </div>

          {/* Avatar */}
          <div className="px-6 pb-6">
            <div className="-mt-10 mb-4 flex items-end justify-between">
                
<div className={`w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden
                  flex items-center justify-center text-3xl font-black text-white select-none
                  ${!avatarSrc ? "bg-linear-to-br from-blue-600 to-blue-400" : ""}`}
                >
                  {avatarSrc
                    ? <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
                    : initials
                  }
                </div>

              {isAdmin && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold tracking-wide border border-amber-200">
                  Admin
                </span>
              )}
            </div>

            <h2 className="text-xl font-extrabold text-slate-800">{user.name}</h2>
            <p className="text-sm text-slate-400 mt-0.5">{user.email}</p>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full border border-blue-100 capitalize">
                {user.userType}
              </span>
            </div>
          </div>
        </div>

        {/* Actions Card */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 p-4 flex flex-col gap-2">
          <ActionButton
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            }
            label="My Dashboard"
            onClick={() => navigate(`/${user._id}/dashboard`)}
          />

          {isAdmin && (
            <ActionButton
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              label="Admin Dashboard"
              onClick={() => navigate('/admin/dashboard')}
              badge="Admin"
            />
          )}

          <ActionButton
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            label="Update Profile"
            onClick={() => navigate('/account/profile')}
          />

          <div className="border-t border-slate-100 my-1" />

          <ActionButton
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            }
            label="Log Out"
            onClick={logoutHandle}
            danger
          />
        </div>

      </div>
    </div>
  )
}

const ActionButton = ({ icon, label, onClick, danger = false, badge }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-95
      ${danger
        ? 'text-red-600 hover:bg-red-50 ring-1 ring-red-100'
        : 'text-slate-700 hover:bg-slate-50'
      }`}
  >
    <span className={`${danger ? 'text-red-500' : 'text-blue-700'}`}>{icon}</span>
    <span className="flex-1 text-left">{label}</span>
    {badge && (
      <span className="text-xs bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-200">
        {badge}
      </span>
    )}
    {!danger && (
      <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    )}
  </button>
)

export default Account