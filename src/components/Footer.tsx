import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-12 border-t border-gray-700">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📊</span>
              <span className="font-bold text-white text-lg">JobTracker</span>
            </div>
            <p className="text-sm text-gray-400">
              Your personal job application tracking companion.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link to="/landing" className="text-gray-400 hover:text-indigo-400 transition-colors">About</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-indigo-400 transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-indigo-400 transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-400">📝 Track Applications</span></li>
              <li><span className="text-gray-400">🔍 Advanced Search</span></li>
              <li><span className="text-gray-400">📊 Real-time Stats</span></li>
              <li><span className="text-gray-400">🔐 Secure & Private</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <p className="text-sm text-gray-400 mb-3">
              Have questions? We'd love to hear from you!
            </p>
            <div className="text-sm">
              <span className="text-gray-400">📧</span>
              <a href="mailto:support@jobtracker.app" className="text-indigo-400 hover:text-indigo-300 ml-2">
                support@jobtracker.app
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} JobTracker. All rights reserved. | Built with ❤️ to help you succeed in your career
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">Terms</a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer