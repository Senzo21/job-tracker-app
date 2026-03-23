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
    if (!confirm('🗑️ Are you sure you want to delete this job application?')) return
    await jobService.remove(id)
    fetchJobs()
  }

  async function handleEdit(id?: number) {
    if (!id) return
    const job = await jobService.get(id)
    setEditing(job)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleUpdate(id: number, data: Partial<Job>) {
    await jobService.update(id, data)
    setEditing(null)
    setShowForm(false)
    fetchJobs()
  }

  const getStats = () => {
    const applied = jobs.filter(j => j.status === 'Applied').length
    const interviewed = jobs.filter(j => j.status === 'Interviewed').length
    const rejected = jobs.filter(j => j.status === 'Rejected').length
    return { applied, interviewed, rejected }
  }

  const stats = getStats()

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-8">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{jobs.length}</div>
                <div className="text-indigo-100">Total Applied</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">📨 {stats.applied}</div>
                <div className="text-indigo-100">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">🎤 {stats.interviewed}</div>
                <div className="text-indigo-100">Interview</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">❌ {stats.rejected}</div>
                <div className="text-indigo-100">Rejected</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="sticky top-20 space-y-4">
                <button 
                  onClick={() => {
                    setShowForm(v => !v)
                    setEditing(null)
                  }} 
                  className="w-full btn btn-primary py-3 text-lg font-semibold"
                >
                  {showForm ? '✖️ Close' : '➕ Add New Job'}
                </button>

                <div className="card p-5 space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">🔍 Filters</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
                    <input 
                      defaultValue={search} 
                      onBlur={e => setQuery(e.target.value, status, sort)} 
                      className="input"
                      placeholder="Company or role..." 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <select 
                      value={status} 
                      onChange={e => setQuery(search, e.target.value, sort)} 
                      className="input"
                    >
                      <option value="">📋 All Status</option>
                      <option value="Applied">📨 Applied</option>
                      <option value="Interviewed">🎤 Interviewed</option>
                      <option value="Rejected">❌ Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sort</label>
                    <select 
                      value={sort} 
                      onChange={e => setQuery(search, status, e.target.value)} 
                      className="input"
                    >
                      <option value="desc">📅 Newest First</option>
                      <option value="asc">📅 Oldest First</option>
                    </select>
                  </div>

                  {(search || status || sort !== 'desc') && (
                    <button
                      onClick={() => {
                        setQuery('', '', 'desc')
                      }}
                      className="w-full btn btn-secondary text-sm"
                    >
                      🔄 Clear Filters
                    </button>
                  )}
                </div>
              </div>
            </aside>

            <section className="flex-1 min-w-0">
              {showForm && (
                <div className="mb-8 animate-fadeIn">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    {editing ? '✏️ Edit Application' : '➕ Add New Application'}
                  </h2>
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
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">📊 Your Applications</h2>
                  <span className="text-gray-600 font-medium">{jobs.length} total</span>
                </div>

                {loading ? (
                  <div className="card p-12 text-center">
                    <div className="text-4xl mb-4">⏳</div>
                    <p className="text-gray-600 text-lg">Loading your applications...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {jobs.length === 0 ? (
                      <div className="card p-12 text-center">
                        <div className="text-5xl mb-4">📭</div>
                        <p className="text-gray-600 text-lg font-medium">No applications yet</p>
                        <p className="text-gray-500 mb-6">Start adding job applications to track your career progress</p>
                        <button
                          onClick={() => setShowForm(true)}
                          className="btn btn-primary"
                        >
                          ➕ Add Your First Job
                        </button>
                      </div>
                    ) : (
                      jobs.map(j => (
                        <JobCard 
                          key={j.id} 
                          job={j} 
                          onDelete={handleDelete}
                          onEdit={handleEdit}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home