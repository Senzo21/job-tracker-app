import React from 'react'
import { Link } from 'react-router-dom'

const Landing: React.FC = () => {
  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">Job Application Tracker</h1>
          <p className="text-gray-700 mb-4">
            Keep track of jobs you applied to, the status of each application, and the details you need for interviews.
            Use filters, search, and sort — all reflected in the URL for easy sharing and tracking.
          </p>
          <div className="flex gap-3">
            <Link to="/register" className="px-4 py-2 bg-indigo-600 text-white rounded">Register</Link>
            <Link to="/login" className="px-4 py-2 border rounded">Login</Link>
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-2">How it works</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Add jobs and save details.</li>
            <li>Filter by status and sort by date.</li>
            <li>Search by company or role (query appears in the URL).</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Landing
