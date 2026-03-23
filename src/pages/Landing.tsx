import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">JobTracker</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-small btn-secondary">Login</Link>
            <Link to="/register" className="btn-small btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <section className="container py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn">
              <div className="inline-block mb-4 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                ✨ Track Your Career Journey
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Never Lose Track of Your Job Applications Again
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Stay organized with a powerful job application tracker. Monitor the status of every application, store important details, and never miss an interview.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn btn-primary text-lg py-3">
                  Start Tracking Now
                </Link>
                <button className="btn btn-secondary text-lg py-3">
                  Learn More
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slideInLeft">
                <div className="text-4xl mb-3">📝</div>
                <h3 className="text-xl font-bold mb-2">Add Applications</h3>
                <p className="text-gray-600">Quickly add new job applications with company, role, and details.</p>
              </div>
              <div className="card p-6 hover:shadow-lg transform hover:-translate-y-1">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="text-xl font-bold mb-2">Smart Filtering</h3>
                <p className="text-gray-600">Filter by status and sort applications by date applied.</p>
              </div>
              <div className="card p-6 hover:shadow-lg transform hover:-translate-y-1">
                <div className="text-4xl mb-3">🔗</div>
                <h3 className="text-xl font-bold mb-2">Shareable Links</h3>
                <p className="text-gray-600">Share your application status via URL query parameters.</p>
              </div>
              <div className="card p-6 hover:shadow-lg transform hover:-translate-y-1">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="text-xl font-bold mb-2">Track Progress</h3>
                <p className="text-gray-600">Monitor your interview pipeline and application status.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container">
            <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card p-8 text-center">
                <div className="text-5xl mb-4 flex justify-center">1️⃣</div>
                <h3 className="text-xl font-bold mb-3">Create Account</h3>
                <p className="text-gray-600">Sign up and start building your job application tracker in seconds.</p>
              </div>
              <div className="card p-8 text-center">
                <div className="text-5xl mb-4 flex justify-center">2️⃣</div>
                <h3 className="text-xl font-bold mb-3">Add Applications</h3>
                <p className="text-gray-600">Add each job you apply to with company, role, and interview details.</p>
              </div>
              <div className="card p-8 text-center">
                <div className="text-5xl mb-4 flex justify-center">3️⃣</div>
                <h3 className="text-xl font-bold mb-3">Get Organized</h3>
                <p className="text-gray-600">Track status, search, filter, and stay on top of every application.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ['📌', 'Status Tracking', 'Applied, Interviewed, Rejected - track every stage'],
              ['🔎', 'Advanced Search', 'Find applications by company or role instantly'],
              ['📅', 'Date Sorting', 'Sort by application date to prioritize follow-ups'],
              ['💾', 'Persistent Storage', 'All your data saved securely'],
              ['📱', 'Responsive Design', 'Access from desktop, tablet, or mobile'],
              ['🔐', 'Secure Authentication', 'Your data is protected with secure login'],
            ].map(([icon, title, desc], i) => (
              <div key={i} className="card p-6 hover:shadow-lg transform hover:-translate-y-0.5">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-indigo-600 to-blue-600 py-16">
          <div className="container text-center">
            <p className="text-xl text-indigo-100 mb-8">Join thousands of job seekers organizing their applications today.</p>
            <Link to="/register" className="btn btn-primary bg-white text-indigo-600 hover:bg-gray-100 text-lg py-3">
              Start Free Today
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Landing
