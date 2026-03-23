import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { jobService } from '../services/jobService'
import { Job } from '../types/job'

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

const JobDetails: React.FC = () => {
  const { id } = useParams()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    jobService.get(parseInt(id))
      .then(setJob)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">⏳</div>
            <p className="text-xl text-gray-600 font-medium">Loading job details...</p>
          </div>
        </div>
      </>
    )
  }

  if (!job) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
          <div className="text-center card p-12">
            <div className="text-5xl mb-4">❌</div>
            <p className="text-xl text-gray-600 font-medium mb-6">Job not found</p>
            <Link to="/home" className="btn btn-primary">
              ← Back to Jobs
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12">
        <div className="container max-w-2xl">
          <div className="card p-8 shadow-lg animate-fadeIn">
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {job.company}
                  </h1>
                  <p className="text-xl text-gray-600">{job.role}</p>
                </div>
                <div className={`badge ${getStatusBadgeClass(job.status)} text-lg`}>
                  {getStatusIcon(job.status)} {job.status}
                </div>
              </div>
              <p className="text-gray-500 flex items-center gap-2">
                <span>📅</span>
                Applied on {new Date(job.dateApplied).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📊</span> Application Status
              </h3>
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-200">
                <div className={`badge ${getStatusBadgeClass(job.status)} text-lg px-4 py-2`}>
                  {getStatusIcon(job.status)} {job.status}
                </div>
              </div>
            </div>

            <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📝</span> Interview & Application Details
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {job.details}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-1">📌</div>
                <p className="text-sm text-gray-600">Company</p>
                <p className="font-semibold text-gray-900">{job.company}</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-1">💼</div>
                <p className="text-sm text-gray-600">Position</p>
                <p className="font-semibold text-gray-900">{job.role}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-1">📅</div>
                <p className="text-sm text-gray-600">Applied</p>
                <p className="font-semibold text-gray-900">{job.dateApplied}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                ← Back to Jobs
              </Link>
              <a 
                href={`/home?q=${encodeURIComponent(job.company)}`}
                className="btn btn-secondary"
              >
                🔍 Search Company
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobDetails
