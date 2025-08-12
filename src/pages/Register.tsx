import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { setAuth } from '../utils/auth'

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!username || !password) return setError('Fill all fields')

    try {
      // check existing
      const check = await axios.get('http://localhost:5000/users', { params: { username } })
      if (check.data.length) return setError('Username already exists')

      const res = await axios.post('http://localhost:5000/users', { username, password })
      setAuth({ id: res.data.id, username: res.data.username })
      navigate('/home')
    } catch (err) {
      setError('Failed to register. Make sure json-server is running.')
    }
  }

  return (
    <div className="container py-10 max-w-md">
      <div className="bg-white rounded p-6 shadow">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        {error && <div className="mb-3 text-red-600">{error}</div>}
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input required value={username} onChange={(e: { target: { value: React.SetStateAction<string> } }) => setUsername(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input required type="password" value={password} onChange={(e: { target: { value: React.SetStateAction<string> } }) => setPassword(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded" type="submit">Create account</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
