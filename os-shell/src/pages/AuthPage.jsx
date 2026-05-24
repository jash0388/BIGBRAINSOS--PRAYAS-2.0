import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AuthPage = ({ onSuccess }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        const { data, error } = await signUp(email, password, name);
        if (error) throw error;
        
        // If Supabase returns no error, the signup request was successful.
        // We show the message. If it also returned a session, we can log them in.
        setMessage('Verify your account link sent to your email! Please check your inbox (and spam folder) to activate your account.');
        
        if (data?.session) {
          onSuccess(data.user);
        }
      } else {
        const { data, error } = await signIn(email, password);
        if (error) throw error;
        onSuccess(data.user);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-black">
      {/* Left Panel — Branding */}
      <div
        className="hidden lg:flex w-1/2 flex-col items-center justify-center relative"
        style={{
          background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        }}
      >
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-purple-600/20 blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 flex flex-col items-center gap-6 px-12 text-center">
          {/* Brain Icon */}
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center shadow-2xl">
            <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-5.224 4.668 4 4 0 0 0 2.912 6.13A4 4 0 0 0 9 20a4 4 0 0 0 6 0 4 4 0 0 0 5.309-4.077 4 4 0 0 0 2.912-6.13 4 4 0 0 0-5.224-4.668A3 3 0 1 0 12 5Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 16v-2.5a3.5 3.5 0 0 1 7 0V16" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9V5" />
            </svg>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">BigBrainsOS</h1>
            <p className="text-blue-300 text-lg mt-2">India's First AI-Native Cloud OS</p>
          </div>

          <p className="text-white/50 text-sm max-w-xs leading-relaxed">
            Run VS Code, Terminal, Firefox, and AI models — entirely in your browser. 
            No installation. No hardware limits. Just your brain and the cloud.
          </p>

          {/* Feature pills */}
          <div className="flex flex-col gap-3 w-full mt-4">
            {[
              { icon: '⚡', text: 'Instant workspace — no setup required' },
              { icon: '🤖', text: 'AI agent built into the OS' },
              { icon: '🌐', text: 'Works on any device with a browser' },
              { icon: '🔒', text: 'Isolated containers — fully secure' },
            ].map(f => (
              <div key={f.text} className="flex items-center gap-3 text-sm text-white/60 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                <span className="text-base">{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>

          <p className="text-white/20 text-xs mt-4">
            Built by Jashwanth Singh · N. Abhilash · Yousuf Uddin
          </p>
        </div>
      </div>

      {/* Right Panel — Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#0d0d0f] px-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-5.224 4.668 4 4 0 0 0 2.912 6.13A4 4 0 0 0 9 20a4 4 0 0 0 6 0 4 4 0 0 0 5.309-4.077 4 4 0 0 0 2.912-6.13 4 4 0 0 0-5.224-4.668A3 3 0 1 0 12 5Z" />
              </svg>
            </div>
            <span className="text-white font-bold text-xl">BigBrainsOS</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-white/40 text-sm mt-1">
              {mode === 'login'
                ? 'Log in to access your cloud workspace'
                : 'Sign up for free — no credit card required'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'signup' && (
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Jashwanth Singh"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 outline-none focus:border-blue-500/50 focus:bg-white/8 transition"
                />
              </div>
            )}

            <div>
              <label className="text-xs text-white/50 mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 outline-none focus:border-blue-500/50 focus:bg-white/8 transition"
              />
            </div>

            <div>
              <label className="text-xs text-white/50 mb-1.5 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 outline-none focus:border-blue-500/50 focus:bg-white/8 transition"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {message && (
              <div className="text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center text-sm text-white/40">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => { setMode('signup'); setError(''); setMessage(''); }}
                  className="text-blue-400 hover:text-blue-300 transition font-medium"
                >
                  Sign up free
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => { setMode('login'); setError(''); setMessage(''); }}
                  className="text-blue-400 hover:text-blue-300 transition font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
