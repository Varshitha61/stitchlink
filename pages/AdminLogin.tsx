import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Shield, Lock, ArrowRight, Loader2, Info } from 'lucide-react';

export const AdminLogin = () => {
  const { login } = useStore();
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(email, password);

      if (response.success && (email.toLowerCase().includes('admin') || email === 'admin@stitchlink.com' || email.toLowerCase() === 'varshithasomashekar22@gmail.com')) {
        navigate('/admin');
      } else {
        setError(response.error || 'Access Denied. Invalid admin credentials.');
        if (response.success) {
          setError('Access Denied. You do not have admin privileges.');
        }
        setLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-md w-full space-y-8 bg-slate-800/50 p-10 rounded-[2.5rem] shadow-2xl border border-slate-700 backdrop-blur-xl relative z-10">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/20">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-slate-400 font-medium">
            Authorized Personnel Only
          </p>
        </div>


        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Shield className="h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="Admin Email"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="Password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 p-3 rounded-xl border border-red-500/50">
              <p className="text-red-400 text-sm text-center font-bold">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 shadow-lg shadow-violet-500/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Access Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center pt-4">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-slate-500 hover:text-white transition-colors"
          >
            Return to Customer Login
          </button>
        </div>
      </div>
    </div>
  );
};
