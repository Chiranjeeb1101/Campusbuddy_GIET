import React, { useState } from 'react'
import { X, Mail, Lock, User, GraduationCap, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { signUp, signIn, supabase } from '../lib/supabase'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (name?: string) => void
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    year_of_study: 1,
    branch: 'Computer Science'
  })

  const branches = [
    'Computer Science',
    'Information Technology',
    'Electronics',
    'Mechanical',
    'Civil',
    'Electrical'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      if (!supabaseUrl || supabaseUrl.includes('demo')) {
        setTimeout(() => {
          onSuccess(formData.full_name)
          onClose()
        }, 1200)
        return
      }

      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password)
        if (error) throw error
      } else {
        const { error } = await signUp(formData.email, formData.password, {
          full_name: formData.full_name,
          year_of_study: formData.year_of_study,
          branch: formData.branch
        })
        if (error) throw error
      }

      onSuccess(formData.full_name)
      onClose()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      if (!supabaseUrl || supabaseUrl.includes('demo')) {
        setTimeout(() => {
          onSuccess(formData.full_name || 'User')
          onClose()
        }, 1200)
        return
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
      if (error) throw error
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative p-10 max-h-[90vh] overflow-y-auto no-scrollbar">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-brand-primary rounded-xl text-white shadow-lg shadow-indigo-200">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                      {isLogin ? 'Sign In' : 'Join Us'}
                    </h2>
                    <p className="text-slate-500 text-sm font-medium mt-1">CampusBuddy Ecosystem</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                    Academic ID / Email
                  </label>
                  <div className="relative group">
                    <Mail className="h-5 w-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-brand-primary transition-colors" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-300"
                      placeholder="alex.smith@college.edu"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                    Your Name
                  </label>
                  <div className="relative group">
                    <User className="h-5 w-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-brand-primary transition-colors" />
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-300"
                      placeholder="Alex Smith"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                    Access Key / Password
                  </label>
                  <div className="relative group">
                    <Lock className="h-5 w-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-brand-primary transition-colors" />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-300"
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>
                </div>

                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-6 pt-2"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 text-center">
                          Year
                        </label>
                        <select
                          value={formData.year_of_study}
                          onChange={(e) => setFormData({ ...formData, year_of_study: parseInt(e.target.value) })}
                          className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all text-slate-900 font-bold"
                        >
                          <option value={1}>Year 1</option>
                          <option value={2}>Year 2</option>
                          <option value={3}>Year 3</option>
                          <option value={4}>Year 4</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 text-center">
                          Track
                        </label>
                        <select
                          value={formData.branch}
                          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                          className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all text-slate-900 font-bold"
                        >
                          {branches.map(branch => (
                            <option key={branch} value={branch}>{branch}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
                    <p className="text-red-600 text-sm font-semibold flex items-center gap-2">
                      <span className="block w-1.5 h-1.5 bg-red-600 rounded-full" />
                      {error}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative py-5 bg-brand-primary text-white font-black rounded-2xl shadow-xl shadow-indigo-200 hover:shadow-indigo-300 active:scale-95 transition-all disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide">
                    {loading ? 'Authenticating...' : (isLogin ? 'Enter Workspace' : 'Begin Journey')}
                    {!loading && <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                  </span>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </button>
              </form>

              <div className="my-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Digital ID</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-slate-100 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-200 transition-all shadow-sm active:scale-95"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google SSO
              </button>

              <div className="mt-10 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-brand-primary hover:text-brand-secondary font-black text-sm tracking-tight transition-colors underline decoration-2 underline-offset-4 decoration-indigo-200 hover:decoration-brand-primary"
                >
                  {isLogin ? "New here? Create your identity" : "Legacy member? Sign in instead"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
