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
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl">📊</span>
          <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">JobTracker</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/landing" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">About</Link>
          {user && (
            <Link to="/home" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Jobs</Link>
          )}
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-lg">
                  <span className="text-sm font-medium text-indigo-700">👤 {user.username}</span>
                </div>
                <button 
                  onClick={logout} 
                  className="btn-small btn-danger"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-small btn-secondary">Login</Link>
                <Link to="/register" className="btn-small btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
