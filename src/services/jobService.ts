import axios from 'axios'
import { Job } from '../types/job'

const API = axios.create({
  baseURL: 'http://localhost:5000'
})

export const jobService = {
  list: (params = {}) => API.get<Job[]>('/jobs', { params }).then(r => r.data),
  get: (id: number) => API.get<Job>(`/jobs/${id}`).then(r => r.data),
  create: (job: Job) => API.post<Job>('/jobs', job).then(r => r.data),
  update: (id: number, job: Partial<Job>) => API.patch<Job>(`/jobs/${id}`, job).then(r => r.data),
  remove: (id: number) => API.delete(`/jobs/${id}`).then(r => r.data)
}
