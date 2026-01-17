import React from 'react'
import { useParams } from 'react-router-dom'

function User() {
    const {userid} = useParams();
  return (
    <div className='text-center text-white text-3xl p-4 bg-gray-600'>
      user: {userid}
    </div>
  )
}

export default User
