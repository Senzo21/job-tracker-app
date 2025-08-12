import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import JobCard from '../components/JobCard'
import JobForm from '../components/JobForm'
import { jobService } from '../services/jobService'
import { Job } from '../types/job'
import { getAuth } from '../utils/auth'

const Home: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Job | null>(null)

  // URL params: ?q=search&status=Applied&sort=asc
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('q') ?? ''
  const status = searchParams.get('status') ?? ''
  const sort = searchParams.get('sort') ?? 'desc'
  const navigate = useNavigate()
  const auth = getAuth()

  useEffect(() => {
    fetchJobs()
  }, [searchParams])

  async function fetchJobs() {
    if (!auth) { setJobs([]); return }
    setLoading(true)
    try {
      const params: any = { userId: auth.id }
      if (search) params.q = search
      if (status) params.status = status
      // json-server doesn't support sort by date direction easily without field pref, but supports _sort/_order
      params._sort = 'dateApplied'
      params._order = sort === 'asc' ? 'asc' : 'desc'
      const data = await jobService.list(params)
      setJobs(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function setQuery(q?: string, s?: string, newSort?: string) {
    const params: any = {}
    if (q) params.q = q
    if (s) params.status = s
    if (newSort) params.sort = newSort
    // preserve empty → remove key
    Object.keys(params).forEach(k => searchParams.delete(k))
    const next = new URLSearchParams(searchParams.toString())
    if (q !== undefined) {
        if (q) {
          next.set('q', q)
        } else {
          next.delete('q')
        }
      }
      
      if (s !== undefined) {
        if (s) {
          next.set('status', s)
        } else {
          next.delete('status')
        }
      }
      
      if (newSort !== undefined) {
        if (newSort) {
          next.set('sort', newSort)
        } else {
          next.delete('sort')
        }
      }
    navigate({ pathname: '/home', search: next.toString() })
  }

  async function handleAdd(data: Partial<Job>) {
    if (!auth) return
    await jobService.create({ ...(data as Job), userId: auth.id })
    setShowForm(false)
    fetchJobs()
  }

  async function handleDelete(id?: number) {
    if (!id) return
    if (!confirm('Delete this job?')) return
    await jobService.remove(id)
    fetchJobs()
  }

  async function handleEdit(id?: number) {
    if (!id) return
    const job = await jobService.get(id)
    setEditing(job)
    setShowForm(true)
  }

  async function handleUpdate(id: number, data: Partial<Job>) {
    await jobService.update(id, data)
    setEditing(null)
    setShowForm(false)
    fetchJobs()
  }

  return (
    <>
      <Navbar />
      <div className="container py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-80">
            <div className="bg-white p-4 rounded shadow space-y-3">
              <h3 className="font-semibold">Controls</h3>
              <div>
                <label className="block text-sm font-medium">Search</label>
                <input defaultValue={search} onBlur={e => setQuery(e.target.value, status, sort)} className="mt-1 block w-full rounded border px-3 py-2" placeholder="Company or role" />
              </div>
              <div>
                <label className="block text-sm font-medium">Filter</label>
                <select value={status} onChange={e => setQuery(search, e.target.value, sort)} className="mt-1 block w-full rounded border px-3 py-2">
                  <option value="">All</option>
                  <option value="Applied">Applied</option>
                  <option value="Interviewed">Interviewed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Sort by date</label>
                <select value={sort} onChange={e => setQuery(search, status, e.target.value)} className="mt-1 block w-full rounded border px-3 py-2">
                  <option value="desc">Newest first</option>
                  <option value="asc">Oldest first</option>
                </select>
              </div>
              <div className="pt-2">
                <button onClick={() => setShowForm(v => !v)} className="w-full px-3 py-2 bg-indigo-600 text-white rounded">
                  {showForm ? 'Close' : 'Add Job'}
                </button>
              </div>
            </div>
          </aside>

          <section className="flex-1 space-y-4">
            {showForm && (
              <div>
                <h3 className="text-lg font-semibold">{editing ? 'Edit Job' : 'Add Job'}</h3>
                <JobForm
                  initial={editing || undefined}
                  onSave={(data) => {
                    if (editing?.id) handleUpdate(editing.id, data)
                    else handleAdd(data)
                  }}
                />
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold mb-4">Jobs</h2>
              {loading ? <div>Loading...</div> : (
                <div className="space-y-3">
                  {jobs.length === 0 && <div className="p-4 bg-white rounded shadow text-gray-600">No jobs found.</div>}
                  {jobs.map(j => <JobCard key={j.id} job={j} onDelete={handleDelete} />)}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Home