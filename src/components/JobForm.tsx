import React, { useState } from 'react'
import { Job, JobStatus } from '../types/job'

type Props = {
  initial?: Partial<Job>
  onSave: (data: Partial<Job>) => void
}

const statuses: JobStatus[] = ['Applied', 'Interviewed', 'Rejected']

const JobForm: React.FC<Props> = ({ initial = {}, onSave }) => {
  const [company, setCompany] = useState(initial.company ?? '')
  const [role, setRole] = useState(initial.role ?? '')
  const [status, setStatus] = useState<JobStatus>(initial.status ?? 'Applied')
  const [dateApplied, setDateApplied] = useState(initial.dateApplied ?? new Date().toISOString().slice(0,10))
  const [details, setDetails] = useState(initial.details ?? '')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    onSave({ company, role, status, dateApplied, details })
  }

  return (
    <form onSubmit={submit} className="card p-6 space-y-4 shadow-lg">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
        <input 
          required 
          value={company} 
          onChange={e => setCompany(e.target.value)} 
          className="input" 
          placeholder="e.g., Google, Microsoft, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Job Role</label>
        <input 
          required 
          value={role} 
          onChange={e => setRole(e.target.value)} 
          className="input" 
          placeholder="e.g., Senior Developer, Product Manager"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Application Status</label>
          <select 
            value={status} 
            onChange={e => setStatus(e.target.value as JobStatus)} 
            className="input"
          >
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Date Applied</label>
          <input 
            type="date" 
            value={dateApplied} 
            onChange={e => setDateApplied(e.target.value)} 
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Interview Details</label>
        <textarea 
          value={details} 
          onChange={e => setDetails(e.target.value)} 
          className="input h-28" 
          placeholder="Add interview date, notes, contact person, etc."
        />
      </div>

      <div className="flex justify-end gap-3 pt-3">
        <button 
          type="submit" 
          className="btn btn-primary"
        >
          💾 Save Application
        </button>
      </div>
    </form>
  )
}

export default JobForm
