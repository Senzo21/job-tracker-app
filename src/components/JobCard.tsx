import React from 'react'
import { Job } from '../types/job'
import { Link } from 'react-router-dom'

const statusColor = (status: Job['status']) => {
  switch (status) {
    case 'Applied': return 'bg-yellow-100 text-yellow-800'
    case 'Interviewed': return 'bg-green-100 text-green-800'
    case 'Rejected': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100'
  }
}

const JobCard: React.FC<{ job: Job; onDelete?: (id?: number) => void }> = ({ job, onDelete }) => {
  return (
    <div className="p-4 bg-white shadow-sm rounded-md flex flex-col sm:flex-row sm:justify-between gap-3">
      <div>
        <h3 className="text-lg font-semibold">{job.company} — <span className="font-normal">{job.role}</span></h3>
        <p className="text-sm text-gray-500">Applied: {job.dateApplied}</p>
        <p className="mt-2 text-sm">{job.details}</p>
      </div>
      <div className="flex flex-col items-start sm:items-end gap-2">
        <div className={`px-3 py-1 rounded ${statusColor(job.status)} text-sm`}>{job.status}</div>
        <div className="flex gap-2">
          <Link to={`/jobs/${job.id}`} className="text-sm px-3 py-1 border rounded">Details</Link>
          <button onClick={() => onDelete && onDelete(job.id)} className="text-sm px-3 py-1 border rounded text-red-600">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default JobCard
