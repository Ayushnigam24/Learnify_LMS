import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({children}) => {
  return (
    <>
    <div className="dashBoard-admin flex min-h-screen">
        <Sidebar/>
        <div className="content">{children}</div>
    </div>
    </>
  )
}

export default Layout