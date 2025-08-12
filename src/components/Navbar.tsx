import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, setAuth } from '../utils/auth'

const Navbar: React.FC = () => {
  const user = getAuth()
  const navigate = useNavigate()

  function logout() {
    setAuth(null)
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container flex items-center justify-between h-14">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-lg text-indigo-600">JobTracker</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/landing" className="hover:underline">About</Link>
          <Link to="/home" className="hover:underline">Home</Link>
          {user ? (
            <>
              <span className="text-sm text-gray-600">Hi, {user.username}</span>
              <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 bg-indigo-600 text-white rounded">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
