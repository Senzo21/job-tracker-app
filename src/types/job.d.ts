export type JobStatus = 'Applied' | 'Interviewed' | 'Rejected'

export interface Job {
  id?: number
  userId: number
  company: string
  role: string
  status: JobStatus
  dateApplied: string // YYYY-MM-DD
  details?: string
}
