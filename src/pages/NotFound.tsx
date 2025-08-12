import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-gray-600">Page not found</p>
      <Link to="/" className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded">Go home</Link>
    </div>
  )
}

export default NotFound
