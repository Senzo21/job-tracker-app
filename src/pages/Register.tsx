import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { setAuth } from '../utils/auth'

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    if (!username || !password) {
      setError('❌ Please fill in all fields')
      setLoading(false)
      return
    }

    try {
      // check existing
      const check = await axios.get('http://localhost:5000/users', { params: { username } })
      if (check.data.length) {
        setError('❌ Username already exists. Please choose another.')
        setLoading(false)
        return
      }

      const res = await axios.post('http://localhost:5000/users', { username, password })
      setAuth({ id: res.data.id, username: res.data.username })
      navigate('/home')
    } catch (err) {
      setError('⚠️ Failed to register. Make sure json-server is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">📊</span>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Get Started
          </h1>
          <p className="text-gray-600">Create an account to start tracking your job applications</p>
        </div>

        {/* Form Card */}
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
                placeholder="Choose a username"
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
                placeholder="Create a password"
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn btn-primary py-3 text-lg font-semibold mt-6"
            >
              {loading ? '🔄 Creating account...' : '✨ Create Account'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="link-hover font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          By creating an account, you agree to our terms and conditions
        </p>
      </div>
    </div>
  )
}

export default Register
