import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { jobService } from '../services/jobService'
import { Job } from '../types/job'

const JobDetails: React.FC = () => {
  const { id } = useParams()
  const [job, setJob] = useState<Job | null>(null)
  useEffect(() => {
    if (!id) return
    jobService.get(parseInt(id)).then(setJob)
  }, [id])

  if (!job) return (
    <>
      <Navbar />
      <div className="container py-10">Loading...</div>
    </>
  )

  return (
    <>
      <Navbar />
      <div className="container py-10">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold">{job.company} — {job.role}</h2>
          <p className="text-sm text-gray-500 mt-1">Applied on {job.dateApplied}</p>
          <div className="mt-4">
            <h4 className="font-semibold">Status</h4>
            <div className="inline-block px-3 py-1 mt-1 rounded bg-gray-100">{job.status}</div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Details</h4>
            <p className="mt-2 text-gray-700">{job.details}</p>
          </div>
          <div className="mt-4">
            <Link to="/home" className="px-3 py-2 bg-indigo-600 text-white rounded">Back</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobDetails
