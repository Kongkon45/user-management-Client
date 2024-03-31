import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav className='bg-blue-500 flex justify-center items-center gap-10 h-12'>
            <Link to="/" className='text-2xl font-bold text-white'>Home</Link>
            <Link to="/all-users" className='text-2xl font-bold text-white'>All-Users</Link>
            <Link to="/add-user" className='text-2xl font-bold text-white'>Add-User</Link>
        </nav>
    </div>
  )
}

export default Navbar