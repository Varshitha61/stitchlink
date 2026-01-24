import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Scissors, Mail, Lock, User, ArrowRight, Loader2, ShieldCheck, Info } from 'lucide-react';

export const Login = () => {
  const { login, signup } = useStore();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await login(email, password);
        if (response.success) {
          if (email.toLowerCase().includes('admin') || email.toLowerCase() === 'varshithasomashekar22@gmail.com') {
            navigate('/admin');
          } else {
            navigate('/catalog');
          }
        } else {
          setError(response.error || 'Invalid credentials. Please check your email and password.');
          setLoading(false);
        }
      } else {
        // Sign Up Logic
        if (email && name && password) {
          const response = await signup(name, email, password);
          if (response.success) {
            navigate('/catalog');
          } else {
            setError(response.error || 'Signup failed. Please try again.');
            setLoading(false);
          }
        } else {
          setError('Please fill in all fields.');
          setLoading(false);
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-violet-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-md w-full space-y-8 bg-white/80 dark:bg-slate-900/90 p-10 rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-slate-700 backdrop-blur-xl">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-tr from-rose-300 to-violet-300 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-rose-200 dark:shadow-none rotate-3 hover:rotate-0 transition-transform duration-300">
            <Scissors className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            {isLogin ? 'Welcome Back' : 'Join StitchLink'}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
            {isLogin ? 'Customer Login' : 'Create your design journey today'}
          </p>
        </div>


        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400 group-focus-within:text-rose-400 transition-colors" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                  placeholder="Full Name"
                />
              </div>
            )}

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-rose-400 transition-colors" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                placeholder="Email Address"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-rose-400 transition-colors" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                placeholder="Password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-800">
              <p className="text-red-500 text-sm text-center font-bold">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-gradient-to-r from-rose-400 to-violet-400 hover:from-rose-500 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400 shadow-xl shadow-rose-200 dark:shadow-none transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Secure Login' : 'Create Account'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="font-bold text-rose-500 hover:text-rose-600 transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-center">
          <button
            onClick={() => navigate('/admin/login')}
            className="text-xs text-slate-400 hover:text-rose-500 flex items-center transition-colors"
          >
            <ShieldCheck className="w-3 h-3 mr-1" />
            Are you an admin? Login here
          </button>
        </div>
      </div>
    </div>
  );
};
