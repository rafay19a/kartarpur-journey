import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import logoDark from '../../assets/logo-dark.png'

export default function Login() {
  const { signIn, session } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Already signed in? Skip the login screen.
  useEffect(() => {
    if (session) navigate('/admin', { replace: true })
  }, [session, navigate])

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error: signInError } = await signIn(email, password)
    setLoading(false)
    if (signInError) setError(signInError.message)
    else navigate('/admin', { replace: true })
  }

  const input = 'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent transition-colors'

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <img src={logoDark} alt="Kartarpur Journey" className="h-12 w-auto object-contain mx-auto mb-6" />
        <h1 className="text-lg font-semibold text-slate-800 text-center mb-1">Admin Login</h1>
        <p className="text-sm text-slate-400 text-center mb-6">Sign in to manage packages</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className={input} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className={input} />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-gradient text-navy font-semibold text-sm py-2.5 rounded-lg shadow-gold disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
