import { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/Auth.api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import weblogo from '../../assets/images/pyqpb.png';

export default function ResetPassword() {
  const { token }  = useParams<{ token: string }>();
  const navigate   = useNavigate();
  const { updateUser } = useAuth();

  const [password, setPassword]           = useState('');
  const [confirm, setConfirm]             = useState('');
  const [showPw, setShowPw]               = useState(false);
  const [showConfirm, setShowConfirm]     = useState(false);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState('');
  const [done, setDone]                   = useState(false);

  const strength = (() => {
    let s = 0;
    if (password.length >= 6)                          s++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password))                        s++;
    if (/[^A-Za-z0-9]/.test(password))                s++;
    return s;
  })();
  const strengthColor = ['bg-gray-200','bg-red-500','bg-orange-500','bg-yellow-500','bg-green-500'][strength];
  const strengthLabel = ['','Weak','Fair','Good','Strong'][strength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 6)  { setError('Password must be at least 6 characters'); return; }
    if (!token) { setError('Invalid reset link'); return; }

    setLoading(true);
    try {
      const { data } = await authApi.resetPassword(token, password);
      // Backend auto-logs in after reset — store the token
      if ((data as any).data?.accessToken) {
        localStorage.setItem('accessToken', (data as any).data.accessToken);
        if ((data as any).data?.user) updateUser((data as any).data.user);
      }
      setDone(true);
      toast.success('Password reset! Redirecting...');
      setTimeout(() => navigate('/dashboard', { replace: true }), 1500);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Reset failed. The link may have expired.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4 relative overflow-hidden"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&display=swap');`}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-green-500 to-teal-500 rounded-full opacity-20 blur-3xl animate-pulse" />
      </div>

      <Link to="/"
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-black text-white border-4 border-black rounded-full flex items-center justify-center hover:bg-gray-900 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 group">
        <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
      </Link>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <img src={weblogo} alt="Logo" className="h-12 w-auto object-contain mx-auto mb-4" />
        </div>

        <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10">

          {done ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-400 border-4 border-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <CheckCircle className="w-10 h-10 text-black" />
              </div>
              <h2 className="font-black text-3xl text-black mb-3" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                PASSWORD RESET!
              </h2>
              <p className="text-gray-600 font-medium mb-6">
                Your password has been updated. Redirecting you to the dashboard...
              </p>
              <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="font-black text-3xl md:text-4xl text-black mb-2"
                  style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                  SET NEW PASSWORD
                </h2>
                <p className="text-gray-600 font-medium">Choose a strong new password for your account.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-4 border-red-500 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-red-700 font-bold text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* New password */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={e => { setPassword(e.target.value); setError(''); }}
                      placeholder="••••••••"
                      required
                      autoFocus
                      autoComplete="new-password"
                      className="w-full pl-12 pr-12 py-4 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-lg transition-colors"
                    />
                    <button type="button" onClick={() => setShowPw(s => !s)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                      {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex gap-1">
                        {[0,1,2,3].map(i => (
                          <div key={i} className={`h-1.5 flex-1 transition-all ${i < strength ? strengthColor : 'bg-gray-200'}`} />
                        ))}
                      </div>
                      <p className={`text-xs font-bold ${strength >= 3 ? 'text-green-600' : 'text-orange-500'}`}>{strengthLabel}</p>
                    </div>
                  )}
                </div>

                {/* Confirm */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirm}
                      onChange={e => { setConfirm(e.target.value); setError(''); }}
                      placeholder="••••••••"
                      required
                      autoComplete="new-password"
                      className="w-full pl-12 pr-12 py-4 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-lg transition-colors"
                    />
                    <button type="button" onClick={() => setShowConfirm(s => !s)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                      {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {confirm && (
                    <div className={`mt-2 flex items-center gap-2 text-xs font-bold ${password === confirm ? 'text-green-600' : 'text-red-600'}`}>
                      {password === confirm
                        ? <><CheckCircle className="w-4 h-4" />Passwords match</>
                        : <><AlertCircle className="w-4 h-4" />Passwords do not match</>}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || password !== confirm}
                  className="w-full py-4 bg-black text-white font-black text-xl uppercase border-4 border-black
                             shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                             hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  {loading
                    ? <><div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />Resetting...</>
                    : <>Reset Password <ArrowRight className="w-6 h-6" /></>}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 font-medium">
                  Link expired?{' '}
                  <Link to="/forgot-password" className="font-black text-blue-600 hover:underline">
                    Request a new one
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}