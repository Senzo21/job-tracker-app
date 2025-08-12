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
    <form onSubmit={submit} className="space-y-3 bg-white p-4 rounded shadow-sm">
      <div>
        <label className="block text-sm font-medium">Company</label>
        <input required value={company} onChange={(e: { target: { value: any } }) => setCompany(e.target.value)} className="mt-1 input" />
      </div>
      <div>
        <label className="block text-sm font-medium">Role</label>
        <input required value={role} onChange={(e: { target: { value: any } }) => setRole(e.target.value)} className="mt-1 input" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select value={status} onChange={(e: { target: { value: string } }) => setStatus(e.target.value as JobStatus)} className="mt-1 input">
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Date Applied</label>
          <input type="date" value={dateApplied} onChange={(e: { target: { value: any } }) => setDateApplied(e.target.value)} className="mt-1 input" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Details</label>
        <textarea value={details} onChange={(e: { target: { value: any } }) => setDetails(e.target.value)} className="mt-1 input h-24" />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
      </div>
    </form>
  )
}

export default JobForm
