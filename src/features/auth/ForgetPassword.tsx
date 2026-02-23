import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle, AlertCircle, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { authApi } from '../../api/Auth.api';
import toast from 'react-hot-toast';
import weblogo from '../../assets/images/pyqpb.png';

export default function ForgetPassword() {
  const [email, setEmail]     = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authApi.forgotPassword(email.trim().toLowerCase());
      setSent(true);
      toast.success('Reset link sent!');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Could not send reset email. Try again.';
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

      {/* Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full opacity-20 blur-3xl animate-pulse" />
      </div>

      {/* Close */}
      <Link to="/"
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-black text-white border-4 border-black rounded-full flex items-center justify-center hover:bg-gray-900 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 group">
        <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
      </Link>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <img src={weblogo} alt="Logo" className="h-12 w-auto object-contain mx-auto mb-4" />
        </div>

        <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10">

          {sent ? (
            /* ── Success state ─────────────────────────────────────────── */
            <div className="text-center">
              <div className="w-20 h-20 bg-green-400 border-4 border-black rounded-full flex items-center justify-center mx-auto mb-6
                              shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <CheckCircle className="w-10 h-10 text-black" />
              </div>
              <h2 className="font-black text-3xl text-black mb-3" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                CHECK YOUR EMAIL
              </h2>
              <p className="text-gray-600 font-medium mb-2">
                We've sent a password reset link to:
              </p>
              <p className="font-black text-black text-lg mb-6 break-all">{email}</p>
              <p className="text-gray-500 text-sm font-medium mb-8">
                The link expires in <span className="font-black text-black">1 hour</span>. Check your spam folder if you don't see it.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => { setSent(false); setEmail(''); }}
                  className="w-full py-3 bg-white border-4 border-black font-black uppercase text-sm
                             shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                             hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                  Try a different email
                </button>
                <Link to="/login"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-black text-white border-4 border-black font-black uppercase text-sm
                             shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                             hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                  <ArrowLeft className="w-4 h-4" />Back to Login
                </Link>
              </div>
            </div>
          ) : (
            /* ── Form state ────────────────────────────────────────────── */
            <>
              <div className="mb-8">
                <h2 className="font-black text-3xl md:text-4xl text-black mb-2"
                  style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                  FORGOT PASSWORD?
                </h2>
                <p className="text-gray-600 font-medium">
                  Enter your registered email and we'll send you a reset link.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-4 border-red-500 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-red-700 font-bold text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setError(''); }}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      autoFocus
                      className="w-full pl-12 pr-4 py-4 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-lg transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-black text-white font-black text-xl uppercase border-4 border-black
                             shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                             hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  {loading ? (
                    <><div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />Sending...</>
                  ) : (
                    <>Send Reset Link <ArrowRight className="w-6 h-6" /></>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <Link to="/login"
                  className="inline-flex items-center gap-2 text-sm font-black text-gray-600 hover:text-black transition-colors uppercase tracking-wide">
                  <ArrowLeft className="w-4 h-4" />Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}