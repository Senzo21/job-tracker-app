import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const NotFound: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center px-4">
        <div className="text-center card p-12 max-w-md">
          <div className="text-7xl mb-6">🤔</div>
          <h1 className="text-6xl font-bold text-gray-900 mb-3">404</h1>
          <p className="text-xl text-gray-600 mb-2">Page Not Found</p>
          <p className="text-gray-500 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/home" className="btn btn-primary">
              📊 Go to Home
            </Link>
            <Link to="/" className="btn btn-secondary">
              🏠 Back to Landing
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound
