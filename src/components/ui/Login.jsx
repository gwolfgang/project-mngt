import React, { useState } from 'react';
import { cls } from '../../lib/utils';
import { useStore } from '../../store';

export function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const setAuthToken = useStore(state => state.setAuthToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
      const payload = isRegistering ? { name, email, password } : { email, password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      setAuthToken(data.token, data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      {/* Background Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-900/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-400 font-bold mb-2">Build Sprint Nexus</div>
          <h1 className="text-3xl font-black text-white tracking-widest">CELLTHENA / CELLFORGE</h1>
        </div>

        <div className="rounded-3xl border border-cyan-400/20 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            {isRegistering ? 'Create Authorization' : 'Secure Terminal Access'}
          </h2>

          {error && (
            <div className="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-cyan-300 mb-2">Display Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-white outline-none focus:border-cyan-400/50 transition-colors"
                  placeholder="Operative Name"
                />
              </div>
            )}
            
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-cyan-300 mb-2">Email Identity</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-white outline-none focus:border-cyan-400/50 transition-colors"
                placeholder="identity@zeusvision.com"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-cyan-300 mb-2">Passphrase</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-white outline-none focus:border-cyan-400/50 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-xl bg-cyan-400/20 border border-cyan-400/50 py-3 text-sm font-bold tracking-widest uppercase text-cyan-300 hover:bg-cyan-400/30 transition-colors disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : (isRegistering ? 'Register Credentials' : 'Initialize Session')}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            {isRegistering ? "Already have clearance? " : "No clearance established? "}
            <button
              type="button"
              onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
              className="text-cyan-300 hover:text-cyan-200 underline"
            >
              {isRegistering ? "Log In" : "Request Access"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
