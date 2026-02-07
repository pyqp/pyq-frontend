import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import weblogo from '../../assets/images/pyqpb.png';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    targetExam: '',
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Check password strength
    if (name === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-300';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-orange-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return 'Too Weak';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!formData.agreeToTerms) {
      alert('Please agree to Terms & Conditions');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Registration attempt:', formData);
    }, 2000);
  };

  const targetExams = [
    'UPSC Civil Services',
    'SSC CGL',
    'SSC CHSL',
    'RRB NTPC',
    'RRB Group D',
    'IBPS PO',
    'SBI PO',
    'Banking Clerk',
    'NDA',
    'CDS',
    'CTET',
    'UGC NET',
    'State PSC',
    'Other',
  ];

  const benefits = [
    { icon: '🎯', text: '100% Free Access to PYQs' },
    { icon: '📊', text: 'AI-Powered Performance Tracking' },
    { icon: '🏆', text: 'Join 250K+ Successful Aspirants' },
    { icon: '💎', text: 'Premium Mock Tests Available' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden flex items-center justify-center p-4 py-12">
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
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Branding & Benefits */}
          <div className="hidden lg:block space-y-8 sticky top-8">
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
                START YOUR
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  SUCCESS
                </span>
                <br />
                JOURNEY
              </h1>
              <p className="text-2xl text-gray-600 font-bold leading-relaxed">
                Join 250,000+ aspirants preparing smarter for competitive exams.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
                >
                  <div className="text-3xl mb-2">{benefit.icon}</div>
                  <div className="text-sm font-bold text-gray-900">{benefit.text}</div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t-4 border-black">
              <div>
                <div className="text-4xl font-black text-black mb-1">250K+</div>
                <div className="text-gray-600 font-bold text-sm uppercase">Students</div>
              </div>
              <div>
                <div className="text-4xl font-black text-black mb-1">100K+</div>
                <div className="text-gray-600 font-bold text-sm uppercase">Questions</div>
              </div>
              <div>
                <div className="text-4xl font-black text-black mb-1">50+</div>
                <div className="text-gray-600 font-bold text-sm uppercase">Exams</div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-400 rounded-xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center border-2 border-black">
                  <CheckCircle className="w-6 h-6 text-black" />
                </div>
                <div className="font-black text-2xl text-green-900">100% Free Start</div>
              </div>
              <p className="text-green-800 font-medium">
                No credit card required. Access free PYQs instantly after signup.
              </p>
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <div className="relative">
            {/* Mobile Logo & Header */}
            <div className="lg:hidden mb-8 text-center">
              <img 
                src={weblogo} 
                alt="Logo" 
                className="h-12 w-auto object-contain mx-auto mb-4"
              />
              <h2 className="text-4xl font-black text-black mb-2">CREATE ACCOUNT</h2>
              <p className="text-gray-600 font-medium">Join 250K+ aspirants today</p>
            </div>

            <div className="bg-white border-4 border-black rounded-none shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10 relative">
              {/* Floating Badges */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-green-400 text-black font-black text-sm border-4 border-black rotate-12 shadow-lg">
                FREE
              </div>
              <div className="absolute -top-4 -left-4 px-3 py-1 bg-blue-400 text-black font-black text-xs border-4 border-black -rotate-12 shadow-lg hidden md:block">
                INSTANT ACCESS
              </div>

              {/* Form Header - Desktop Only */}
              <div className="hidden lg:block mb-8">
                <h2 className="text-3xl font-black text-black mb-2">Create Your Account</h2>
                <p className="text-gray-600 font-medium">Start your preparation journey for free</p>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full pl-12 pr-4 py-3 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-base transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="w-full pl-12 pr-4 py-3 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-base transition-colors"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full pl-12 pr-4 py-3 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-base transition-colors"
                    />
                  </div>
                </div>

                {/* Target Exam */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">
                    Target Exam
                  </label>
                  <div className="relative">
                    <select
                      name="targetExam"
                      value={formData.targetExam}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-base transition-colors appearance-none bg-white cursor-pointer"
                    >
                      <option value="">Select your target exam</option>
                      {targetExams.map((exam) => (
                        <option key={exam} value={exam}>{exam}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-black"></div>
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      minLength={8}
                      className="w-full pl-12 pr-12 py-3 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-base transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[...Array(4)].map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1.5 flex-1 transition-all duration-300 ${
                              idx < passwordStrength ? getPasswordStrengthColor() : 'bg-gray-300'
                            }`}
                          ></div>
                        ))}
                      </div>
                      <div className="text-xs font-bold text-gray-600">
                        Strength: <span className={passwordStrength >= 3 ? 'text-green-600' : 'text-orange-600'}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="w-full pl-12 pr-12 py-3 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-base transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <div className="mt-2 flex items-center gap-2 text-red-600 text-xs font-bold">
                      <AlertCircle className="w-4 h-4" />
                      Passwords do not match
                    </div>
                  )}
                </div>

                {/* Terms & Conditions */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-1">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 border-4 border-black transition-all duration-200 ${
                        formData.agreeToTerms ? 'bg-black' : 'bg-white'
                      }`}>
                        {formData.agreeToTerms && (
                          <CheckCircle className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">
                      I agree to the <a href="/terms" className="font-black text-blue-600 hover:underline">Terms & Conditions</a> and <a href="/privacy" className="font-black text-blue-600 hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !formData.agreeToTerms}
                  className="w-full py-4 bg-black text-white font-black text-lg uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center p-4 bg-gray-50 border-4 border-black">
                <p className="text-gray-700 font-medium">
                  Already have an account?{' '}
                  <a href="/login" className="font-black text-black underline hover:text-blue-600 transition-colors">
                    Login Here
                  </a>
                </p>
              </div>

              {/* Trust Badge */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 font-medium">
                  🔒 Your data is safe and secure with us
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

export default Register;