import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setAuth } from '../utils/auth'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      const res = await axios.get('http://localhost:5000/users', {
        params: { username, password }
      })
      if (res.data && res.data.length) {
        const user = res.data[0]
        setAuth({ id: user.id, username: user.username })
        navigate('/home')
      } else {
        setError('Invalid credentials. Try demo/demo')
      }
    } catch (err) {
      setError('Server not reachable. Run json-server on port 5000.')
    }
  }

  return (
    <div className="container py-10 max-w-md">
      <div className="bg-white rounded p-6 shadow">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <div className="mb-3 text-red-600">{error}</div>}
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input required value={username} onChange={e => setUsername(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
          </div>
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded" type="submit">Login</button>
            <button type="button" onClick={() => { setUsername('demo'); setPassword('demo') }} className="text-sm text-indigo-600 hover:underline">Use demo</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
