export const authKey = 'job-tracker-auth'

// store a simple user object token { id, username }
export function setAuth(user: { id: number; username: string } | null) {
  if (user) localStorage.setItem(authKey, JSON.stringify(user))
  else localStorage.removeItem(authKey)
}

export function getAuth(): { id: number; username: string } | null {
  const raw = localStorage.getItem(authKey)
  return raw ? JSON.parse(raw) : null
}
