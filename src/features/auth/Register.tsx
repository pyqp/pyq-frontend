import { useState } from "react";
import {
  Mail, Lock, Eye, EyeOff, ArrowRight,
  User, Phone, CheckCircle, AlertCircle, X,
} from "lucide-react";
import weblogo from "../../assets/images/pyqpb.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const navigate       = useNavigate();
  const { register }   = useAuth();

  const [showPassword, setShowPassword]               = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading]                     = useState(false);
  const [apiError, setApiError]                       = useState("");
  const [successMsg, setSuccessMsg]                   = useState("");
  const [passwordStrength, setPasswordStrength]       = useState(0);

  const [formData, setFormData] = useState({
    fullName:        "",
    email:           "",
    phone:           "",
    password:        "",
    confirmPassword: "",
    referralCode:    "",
    agreeToTerms:    false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (name === "password") setPasswordStrength(calcStrength(value));
    if (apiError) setApiError(""); // clear error on typing
  };

  const calcStrength = (pw: string): number => {
    let s = 0;
    if (pw.length >= 8)                              s++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw))       s++;
    if (/[0-9]/.test(pw))                            s++;
    if (/[^A-Za-z0-9]/.test(pw))                    s++;
    return s;
  };

  const strengthColor = ["bg-gray-200", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"][passwordStrength];
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];

  // Sanitise phone → 10-digit before sending
  const sanitisePhone = (raw: string): string | undefined => {
    if (!raw.trim()) return undefined;
    const cleaned = raw.replace(/[\s\-().+]/g, "");
    if (cleaned.startsWith("91") && cleaned.length === 12) return cleaned.slice(2);
    return cleaned || undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    setSuccessMsg("");

    if (formData.password !== formData.confirmPassword) {
      setApiError("Passwords do not match");
      return;
    }
    if (!formData.agreeToTerms) {
      setApiError("Please agree to the Terms & Conditions");
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name:         formData.fullName.trim(),
        email:        formData.email.trim().toLowerCase(),
        password:     formData.password,
        phone:        sanitisePhone(formData.phone),
        referralCode: formData.referralCode.trim().toUpperCase() || undefined,
      });

      setSuccessMsg("🎉 Account created! Redirecting to your dashboard...");
      toast.success("Welcome to PYQPB! Account created successfully.");
      setTimeout(() => navigate("/dashboard", { replace: true }), 1500);

    } catch (err: any) {
      // express-validator returns { success:false, message:'Validation failed', errors:[{field,message}] }
      const resData = err.response?.data;
      const fieldErrors: { field: string; message: string }[] = resData?.errors ?? [];

      if (fieldErrors.length > 0) {
        // Show all field errors joined
        const msg = fieldErrors.map(e => `${e.field}: ${e.message}`).join("  •  ");
        setApiError(msg);
        toast.error(fieldErrors[0].message);
      } else {
        const msg = resData?.message || err.message || "Registration failed. Please try again.";
        setApiError(msg);
        toast.error(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: "🎯", text: "100% Free Access to PYQs" },
    { icon: "📊", text: "AI-Powered Performance Tracking" },
    { icon: "🏆", text: "Join 250K+ Successful Aspirants" },
    { icon: "💎", text: "Premium Mock Tests Available" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden flex items-center justify-center p-4 py-12">
      {/* Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply">
        <div className="absolute inset-0 bg-noise" />
      </div>

      {/* Close */}
      <Link to="/"
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-black text-white border-4 border-black rounded-full flex items-center justify-center hover:bg-gray-900 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 group"
      >
        <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
      </Link>

      {/* Animated blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl" />
        <div className="floating-element-delayed absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full opacity-20 blur-3xl" />
        <div className="floating-element-slow absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-green-500 to-teal-500 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* ── Left: Branding ── */}
          <div className="hidden lg:block space-y-8 sticky top-8">
            <img src={weblogo} alt="Logo" className="h-16 w-auto object-contain" />
            <div>
              <h1 className="text-6xl font-black text-black leading-[0.9] tracking-tighter mb-6">
                START YOUR<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  SUCCESS
                </span><br />
                JOURNEY
              </h1>
              <p className="text-2xl text-gray-600 font-bold leading-relaxed">
                Join 250,000+ aspirants preparing smarter for competitive exams.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div key={i} className="p-4 bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all">
                  <div className="text-3xl mb-2">{b.icon}</div>
                  <div className="text-sm font-bold text-gray-900">{b.text}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-8 pt-8 border-t-4 border-black">
              {[["250K+", "Students"], ["100K+", "Questions"], ["50+", "Exams"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-4xl font-black text-black mb-1">{n}</div>
                  <div className="text-gray-600 font-bold text-sm uppercase">{l}</div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-400 rounded-xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center border-2 border-black">
                  <CheckCircle className="w-6 h-6 text-black" />
                </div>
                <div className="font-black text-2xl text-green-900">100% Free Start</div>
              </div>
              <p className="text-green-800 font-medium">No credit card required. Access free PYQs instantly.</p>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="relative">
            {/* Mobile header */}
            <div className="lg:hidden mb-8 text-center">
              <img src={weblogo} alt="Logo" className="h-12 w-auto object-contain mx-auto mb-4" />
              <h2 className="text-4xl font-black text-black mb-2">CREATE ACCOUNT</h2>
              <p className="text-gray-600 font-medium">Join 250K+ aspirants today</p>
            </div>

            <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10 relative">
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-green-400 text-black font-black text-sm border-4 border-black rotate-12">FREE</div>
              <div className="absolute -top-4 -left-4 px-3 py-1 bg-blue-400 text-black font-black text-xs border-4 border-black -rotate-12 hidden md:block">INSTANT ACCESS</div>

              <div className="hidden lg:block mb-8">
                <h2 className="text-3xl font-black text-black mb-1">Create Your Account</h2>
                <p className="text-gray-500 font-medium">Start your preparation journey for free</p>
              </div>

              {/* ── Success banner ── */}
              {successMsg && (
                <div className="mb-6 p-4 bg-green-50 border-4 border-green-500 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-green-800 font-bold text-sm">{successMsg}</p>
                </div>
              )}

              {/* ── Error banner ── */}
              {apiError && (
                <div className="mb-6 p-4 bg-red-50 border-4 border-red-500 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-red-700 font-bold text-sm leading-relaxed">{apiError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" name="fullName" value={formData.fullName}
                      onChange={handleChange} placeholder="Ravi Kumar"
                      required autoComplete="name" minLength={2} maxLength={50}
                      className="w-full pl-12 pr-4 py-3 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-base transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" name="email" value={formData.email}
                      onChange={handleChange} placeholder="you@example.com"
                      required autoComplete="email"
                      className="w-full pl-12 pr-4 py-3 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-base transition-colors"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">
                    Phone <span className="text-gray-400 font-medium normal-case">(optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="tel" name="phone" value={formData.phone}
                      onChange={handleChange} placeholder="9876543210"
                      autoComplete="tel" maxLength={13}
                      className="w-full pl-12 pr-4 py-3 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-base transition-colors"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-400 font-medium">10-digit Indian number. +91 prefix is accepted.</p>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type={showPassword ? "text" : "password"}
                      name="password" value={formData.password}
                      onChange={handleChange} placeholder="••••••••"
                      required minLength={6} autoComplete="new-password"
                      className="w-full pl-12 pr-12 py-3 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-base transition-colors"
                    />
                    <button type="button" onClick={() => setShowPassword(s => !s)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {/* Strength bar */}
                  {formData.password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex gap-1">
                        {[0,1,2,3].map(i => (
                          <div key={i} className={`h-1.5 flex-1 transition-all duration-300 ${i < passwordStrength ? strengthColor : "bg-gray-200"}`} />
                        ))}
                      </div>
                      <p className="text-xs font-bold text-gray-500">
                        {strengthLabel && <span className={passwordStrength >= 3 ? "text-green-600" : "text-orange-500"}>{strengthLabel}</span>}
                        {passwordStrength < 3 && <span className="ml-1 text-gray-400">— needs uppercase, lowercase &amp; number</span>}
                      </p>
                    </div>
                  )}
                  <p className="mt-1 text-xs text-gray-400 font-medium">Min 6 chars with uppercase, lowercase &amp; a number. E.g. <code>Test@1234</code></p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword" value={formData.confirmPassword}
                      onChange={handleChange} placeholder="••••••••"
                      required autoComplete="new-password"
                      className="w-full pl-12 pr-12 py-3 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-base transition-colors"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(s => !s)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <div className="mt-2 flex items-center gap-2 text-red-600 text-xs font-bold">
                      <AlertCircle className="w-4 h-4" /> Passwords do not match
                    </div>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <div className="mt-2 flex items-center gap-2 text-green-600 text-xs font-bold">
                      <CheckCircle className="w-4 h-4" /> Passwords match
                    </div>
                  )}
                </div>

                {/* Referral Code */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">
                    Referral Code <span className="text-gray-400 font-medium normal-case">(optional)</span>
                  </label>
                  <input type="text" name="referralCode" value={formData.referralCode}
                    onChange={handleChange} placeholder="FRIEND01"
                    maxLength={10} autoComplete="off"
                    className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-base uppercase tracking-widest transition-colors"
                  />
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-1 flex-shrink-0">
                    <input type="checkbox" name="agreeToTerms"
                      checked={formData.agreeToTerms} onChange={handleChange}
                      className="sr-only" />
                    <div className={`w-6 h-6 border-4 border-black flex items-center justify-center transition-all ${formData.agreeToTerms ? "bg-black" : "bg-white"}`}>
                      {formData.agreeToTerms && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">
                    I agree to the{" "}
                    <Link to="/terms" className="font-black text-blue-600 hover:underline">Terms & Conditions</Link>
                    {" "}and{" "}
                    <Link to="/privacy" className="font-black text-blue-600 hover:underline">Privacy Policy</Link>
                  </span>
                </label>

                {/* Submit */}
                <button type="submit"
                  disabled={isLoading || !formData.agreeToTerms || !!successMsg}
                  className="w-full py-4 bg-black text-white font-black text-lg uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  {isLoading ? (
                    <><div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" /> Creating Account...</>
                  ) : successMsg ? (
                    <><CheckCircle className="w-6 h-6" /> Account Created!</>
                  ) : (
                    <>Create Account <ArrowRight className="w-6 h-6" /></>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center p-4 bg-gray-50 border-4 border-black">
                <p className="text-gray-700 font-medium">
                  Already have an account?{" "}
                  <Link to="/login" className="font-black text-black underline hover:text-blue-600 transition-colors">Login Here</Link>
                </p>
              </div>
              <p className="mt-4 text-center text-xs text-gray-400 font-medium">🔒 Your data is safe and secure</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;700&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; }
        h1, h2, h3, .font-black { font-family: 'Archivo Black', sans-serif; letter-spacing: -0.02em; }
        .bg-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); opacity: 0.5; }
        @keyframes float { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-30px) translateX(20px)} }
        @keyframes float-delayed { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(30px) translateX(-20px)} }
        @keyframes float-slow { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.1)} }
        .floating-element { animation: float 8s ease-in-out infinite; }
        .floating-element-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .floating-element-slow { animation: float-slow 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Register;