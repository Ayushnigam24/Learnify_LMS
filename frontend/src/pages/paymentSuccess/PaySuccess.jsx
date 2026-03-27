import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PaySuccess = ({user}) => {
    const params = useParams()
  return (
    <>
    <div className="min-h-screen">
        {user && <div className='mt-10 justify-center justify-items-center'>
          <div className='bg-gray-200 p-5 rounded-lg'>
            <h2 className='text-xl font-bold text-blue-800'>Payment success</h2>
            <p className='text-gray-400'>Your Course Subscription is activated</p>
            <p>Reference no - {params.id}</p>
            <div className='justify-center justify-items-center mt-4'>
            <Link className=' bg-blue-800 text-white px-4 py-2 rounded-3xl' to={`/`}>Go to Home Page</Link>

            </div>
            </div>
            </div>}
    </div>
    </>
  )
}

export default PaySuccess