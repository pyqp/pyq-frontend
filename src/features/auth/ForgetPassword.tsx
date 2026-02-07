import { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, CheckCircle, Sparkles, Shield, Clock } from 'lucide-react';
import weblogo from '../../assets/images/pyqpb.png';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleResend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Reset link sent again!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden flex items-center justify-center p-4">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply">
        <div className="absolute inset-0 bg-noise"></div>
      </div>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="floating-element absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="floating-element-delayed absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="floating-element-slow absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-green-500 to-teal-500 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Illustration & Info */}
          <div className="hidden lg:block space-y-8">
            {/* Logo */}
            <div className="inline-block">
              <img 
                src={weblogo} 
                alt="Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-6xl md:text-7xl font-black text-black leading-[0.9] tracking-tighter mb-6">
                FORGOT
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  PASSWORD?
                </span>
              </h1>
              <p className="text-2xl text-gray-600 font-bold leading-relaxed">
                No worries! We'll send you reset instructions to your email.
              </p>
            </div>

            {/* How it Works */}
            <div className="space-y-4">
              <div className="text-xl font-black text-black mb-4 uppercase">How it Works:</div>
              
              <div className="flex items-start gap-4 p-4 bg-white border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center border-2 border-black flex-shrink-0">
                  <span className="text-2xl font-black text-black">1</span>
                </div>
                <div>
                  <div className="font-black text-lg text-gray-900 mb-1">Enter Your Email</div>
                  <div className="text-gray-600 text-sm">Provide the email you used to register</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center border-2 border-black flex-shrink-0">
                  <span className="text-2xl font-black text-black">2</span>
                </div>
                <div>
                  <div className="font-black text-lg text-gray-900 mb-1">Check Your Inbox</div>
                  <div className="text-gray-600 text-sm">We'll send you a reset link instantly</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center border-2 border-black flex-shrink-0">
                  <span className="text-2xl font-black text-black">3</span>
                </div>
                <div>
                  <div className="font-black text-lg text-gray-900 mb-1">Create New Password</div>
                  <div className="text-gray-600 text-sm">Click the link and set a new password</div>
                </div>
              </div>
            </div>

            {/* Security Note */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-4 border-blue-400 rounded-xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center border-2 border-black">
                  <Shield className="w-6 h-6 text-black" />
                </div>
                <div className="font-black text-2xl text-blue-900">Secure Process</div>
              </div>
              <p className="text-blue-800 font-medium">
                The reset link expires in 1 hour for your security. Your account data remains safe.
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="relative">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center">
              <img 
                src={weblogo} 
                alt="Logo" 
                className="h-12 w-auto object-contain mx-auto mb-4"
              />
              <h2 className="text-4xl font-black text-black mb-2">RESET PASSWORD</h2>
              <p className="text-gray-600 font-medium">We'll send you reset instructions</p>
            </div>

            <div className="bg-white border-4 border-black rounded-none shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 relative">
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-blue-400 text-black font-black text-sm border-4 border-black rotate-12 shadow-lg">
                SECURE
              </div>

              {!isSubmitted ? (
                <>
                  {/* Form Header */}
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-black text-black mb-2">Reset Password</h2>
                    <p className="text-gray-600 font-medium">Enter your email and we'll send you a reset link</p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-black uppercase tracking-wider text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="w-full pl-12 pr-4 py-4 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-lg transition-colors"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-600 font-medium">
                        💡 Enter the email you used to create your account
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 bg-black text-white font-black text-xl uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending Link...
                        </>
                      ) : (
                        <>
                          Send Reset Link
                          <ArrowRight className="w-6 h-6" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Back to Login */}
                  <div className="mt-8">
                    <a 
                      href="/login" 
                      className="flex items-center justify-center gap-2 text-gray-700 hover:text-black font-bold transition-colors group"
                    >
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      Back to Login
                    </a>
                  </div>
                </>
              ) : (
                <>
                  {/* Success State */}
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-black">
                      <CheckCircle className="w-12 h-12 text-black" />
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-black text-black mb-4">Check Your Email! 📧</h3>
                    <p className="text-lg text-gray-600 font-medium mb-6">
                      We've sent password reset instructions to:
                    </p>
                    
                    <div className="p-4 bg-gray-50 border-4 border-black mb-8">
                      <p className="text-xl font-black text-black break-all">{email}</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                        <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-left">
                          <div className="font-black text-sm text-blue-900 mb-1">Link expires in 1 hour</div>
                          <div className="text-sm text-blue-700">Click the link in your email to reset your password</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                        <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div className="text-left">
                          <div className="font-black text-sm text-yellow-900 mb-1">Check spam folder</div>
                          <div className="text-sm text-yellow-700">If you don't see it in inbox, check spam/junk</div>
                        </div>
                      </div>
                    </div>

                    {/* Resend Button */}
                    <button
                      onClick={handleResend}
                      disabled={isLoading}
                      className="w-full py-4 bg-white text-black font-black text-lg uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 mb-6 disabled:opacity-50"
                    >
                      {isLoading ? 'Sending...' : 'Resend Email'}
                    </button>

                    {/* Back to Login */}
                    <a 
                      href="/login" 
                      className="flex items-center justify-center gap-2 text-gray-700 hover:text-black font-bold transition-colors group"
                    >
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      Back to Login
                    </a>
                  </div>
                </>
              )}

              {/* Help Section */}
              <div className="mt-8 p-4 bg-gray-50 border-4 border-black">
                <div className="text-center">
                  <p className="text-gray-700 font-medium mb-2">
                    Having trouble?
                  </p>
                  <a href="/contact" className="font-black text-black underline hover:text-blue-600 transition-colors">
                    Contact Support
                  </a>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 font-medium">
                  🔒 Secure password recovery powered by 256-bit encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;700&display=swap');
        
        * {
          font-family: 'Space Grotesk', sans-serif;
        }

        h1, h2, h3, .font-black {
          font-family: 'Archivo Black', sans-serif;
          letter-spacing: -0.02em;
        }

        /* Noise Texture */
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.5;
        }

        /* Floating Elements Animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(30px) translateX(-20px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }

        .floating-element {
          animation: float 8s ease-in-out infinite;
        }

        .floating-element-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        .floating-element-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ForgetPassword;