import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import weblogo from '../../assets/images/pyqpb.png';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempt:', { email, password, rememberMe });
    }, 2000);
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
          {/* Left Column - Branding & Benefits */}
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
                WELCOME
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  BACK
                </span>
              </h1>
              <p className="text-2xl text-gray-600 font-bold leading-relaxed">
                Continue your journey to crack India's toughest competitive exams.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center border-2 border-black flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-black" />
                </div>
                <div>
                  <div className="font-black text-lg text-gray-900 mb-1">100K+ Free PYQs</div>
                  <div className="text-gray-600 text-sm">Access latest question papers instantly</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center border-2 border-black flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-black" />
                </div>
                <div>
                  <div className="font-black text-lg text-gray-900 mb-1">AI-Powered Analytics</div>
                  <div className="text-gray-600 text-sm">Track your performance & improve</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center border-2 border-black flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-black" />
                </div>
                <div>
                  <div className="font-black text-lg text-gray-900 mb-1">Mock Test Series</div>
                  <div className="text-gray-600 text-sm">Real exam environment practice</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t-4 border-black">
              <div>
                <div className="text-4xl font-black text-black mb-1">250K+</div>
                <div className="text-gray-600 font-bold text-sm uppercase">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-black text-black mb-1">98%</div>
                <div className="text-gray-600 font-bold text-sm uppercase">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-black text-black mb-1">50+</div>
                <div className="text-gray-600 font-bold text-sm uppercase">Exams</div>
              </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="relative">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center">
              <img 
                src={weblogo} 
                alt="Logo" 
                className="h-12 w-auto object-contain mx-auto mb-4"
              />
              <h2 className="text-4xl font-black text-black">LOGIN</h2>
            </div>

            <div className="bg-white border-4 border-black rounded-none shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 relative">
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-green-400 text-black font-black text-sm border-4 border-black rotate-12 shadow-lg">
                SECURE
              </div>

              {/* Form Header - Desktop Only */}
              <div className="hidden lg:block mb-8">
                <h2 className="text-4xl font-black text-black mb-2">Login to Account</h2>
                <p className="text-gray-600 font-medium">Enter your credentials to continue</p>
              </div>

              {/* Login Form */}
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
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-black uppercase tracking-wider text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-12 pr-12 py-4 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-lg transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 border-4 border-black transition-all duration-200 ${
                        rememberMe ? 'bg-black' : 'bg-white'
                      }`}>
                        {rememberMe && (
                          <CheckCircle className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-700 group-hover:text-black transition-colors">
                      Remember me
                    </span>
                  </label>
                  <Link to="/forgot-password" className="text-sm font-black text-blue-600 hover:text-blue-700 transition-colors uppercase">
                    Forgot?
                  </Link>
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
                      Logging In...
                    </>
                  ) : (
                    <>
                      Login
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-8 text-center p-4 bg-gray-50 border-4 border-black">
                <p className="text-gray-700 font-medium">
                  Don't have an account?{' '}
                  <a href="/signup" className="font-black text-black underline hover:text-blue-600 transition-colors">
                    Sign Up Free
                  </a>
                </p>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 font-medium">
                  🔒 Protected by 256-bit SSL encryption
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

export default Login;