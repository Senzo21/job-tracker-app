import React from 'react'
import { Job } from '../types/job'
import { Link } from 'react-router-dom'

const getStatusBadgeClass = (status: Job['status']) => {
  switch (status) {
    case 'Applied': return 'badge-applied'
    case 'Interviewed': return 'badge-interviewed'
    case 'Rejected': return 'badge-rejected'
    default: return 'badge'
  }
}

const getStatusIcon = (status: Job['status']) => {
  switch (status) {
    case 'Applied': return '📨'
    case 'Interviewed': return '🎤'
    case 'Rejected': return '❌'
    default: return '📌'
  }
}

const JobCard: React.FC<{ job: Job; onDelete?: (id?: number) => void; onEdit?: (id?: number) => void }> = ({ job, onDelete, onEdit }) => {
  return (
    <div className="card p-6 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-2">
            <span className="text-2xl mt-0.5">{getStatusIcon(job.status)}</span>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 truncate">{job.company}</h3>
              <p className="text-sm text-gray-600 truncate">{job.role}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-3">📅 Applied: {new Date(job.dateApplied).toLocaleDateString()}</p>
          {job.details && (
            <p className="text-sm text-gray-700 line-clamp-2 bg-gray-50 p-2 rounded">{job.details}</p>
          )}
        </div>

        <div className="flex flex-col items-start sm:items-end gap-3">
          <div className={`badge ${getStatusBadgeClass(job.status)}`}>
            {job.status}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Link 
              to={`/jobs/${job.id}`} 
              className="flex-1 sm:flex-none btn btn-secondary btn-small text-center"
            >
              👁️ View
            </Link>
            <button 
              onClick={() => onEdit && onEdit(job.id)} 
              className="btn btn-secondary btn-small"
              title="Edit this job"
            >
              ✏️
            </button>
            <button 
              onClick={() => onDelete && onDelete(job.id)} 
              className="btn btn-danger btn-small"
              title="Delete this job"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobCard
