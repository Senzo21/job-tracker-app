import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { setAuth } from '../utils/auth'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await axios.get('http://localhost:5000/users', {
        params: { username, password }
      })
      if (res.data && res.data.length) {
        const user = res.data[0]
        setAuth({ id: user.id, username: user.username })
        navigate('/home')
      } else {
        setError('❌ Invalid credentials. Try demo/demo')
      }
    } catch (err) {
      setError('⚠️ Server not reachable. Run json-server on port 5000.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">📊</span>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to continue tracking your job applications</p>
        </div>

        <div className="card p-8 shadow-lg">
          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg font-medium">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input 
                required 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                className="input" 
                placeholder="Enter your username"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input 
                required 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="input" 
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn btn-primary py-3 text-lg font-semibold mt-6"
            >
              {loading ? '🔄 Signing in...' : '✨ Sign In'}
            </button>
          </form>

            <button 
              type="button" 
              onClick={() => { setUsername('demo'); setPassword('demo') }}
              disabled={loading}
              className="w-full btn btn-secondary py-2.5"
            >
              👤 Use Demo Account
            </button>
          </div>

            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="link-hover font-semibold">
                Sign up now
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
        </p>
      </div>
    </div>
  )
}

export default Login
