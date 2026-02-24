import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle,
  X,
  AlertCircle,
} from "lucide-react";
import weblogo from "../../assets/images/pyqpb.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // In Login.tsx, line 25-35:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    setIsLoading(true);

    try {
      await login({ email: email.trim().toLowerCase(), password });

      // Get the updated user from localStorage after login
      const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");

      toast.success("Welcome back! 👋");

      // Redirect based on role
      if (loggedInUser.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err: any) {
      const resData = err.response?.data;
      const fieldErrors = resData?.errors ?? [];
      const msg =
        fieldErrors.length > 0
          ? fieldErrors.map((e: any) => e.message).join("  •  ")
          : resData?.message ||
            err.message ||
            "Login failed. Please try again.";
      setApiError(msg);
      toast.error(resData?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Check all possible locations
  console.log("accessToken:", localStorage.getItem("accessToken"));
  console.log("token:", localStorage.getItem("token"));
  console.log("authToken:", localStorage.getItem("authToken"));
  console.log(
    "All localStorage:",
    Object.keys(localStorage).map(
      (key) => `${key}: ${localStorage.getItem(key)}`,
    ),
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden flex items-center justify-center p-4">
      {/* Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply">
        <div className="absolute inset-0 bg-noise" />
      </div>

      {/* Close */}
      <Link
        to="/"
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-black text-white border-4 border-black rounded-full flex items-center justify-center hover:bg-gray-900 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 group"
        title="Back to Home"
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
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* ── Left: Branding ── */}
          <div className="hidden lg:block space-y-8">
            <img
              src={weblogo}
              alt="Logo"
              className="h-16 w-auto object-contain"
            />
            <div>
              <h1 className="text-6xl md:text-7xl font-black text-black leading-[0.9] tracking-tighter mb-6">
                WELCOME
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  BACK
                </span>
              </h1>
              <p className="text-2xl text-gray-600 font-bold leading-relaxed">
                Continue your journey to crack India's toughest competitive
                exams.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  color: "bg-green-400",
                  icon: CheckCircle,
                  title: "100K+ Free PYQs",
                  sub: "Access latest question papers instantly",
                },
                {
                  color: "bg-blue-400",
                  icon: Sparkles,
                  title: "AI-Powered Analytics",
                  sub: "Track your performance & improve",
                },
                {
                  color: "bg-purple-400",
                  icon: CheckCircle,
                  title: "Mock Test Series",
                  sub: "Real exam environment practice",
                },
              ].map(({ color, icon: Icon, title, sub }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 p-4 bg-white border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <div
                    className={`w-12 h-12 ${color} rounded-full flex items-center justify-center border-2 border-black flex-shrink-0`}
                  >
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-black text-lg text-gray-900 mb-1">
                      {title}
                    </div>
                    <div className="text-gray-600 text-sm">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-8 pt-8 border-t-4 border-black">
              {[
                ["250K+", "Active Users"],
                ["98%", "Success Rate"],
                ["50+", "Exams"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-4xl font-black text-black mb-1">{n}</div>
                  <div className="text-gray-600 font-bold text-sm uppercase">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="relative">
            {/* Mobile header */}
            <div className="lg:hidden mb-8 text-center">
              <img
                src={weblogo}
                alt="Logo"
                className="h-12 w-auto object-contain mx-auto mb-4"
              />
              <h2 className="text-4xl font-black text-black">LOGIN</h2>
            </div>

            <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 relative">
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-green-400 text-black font-black text-sm border-4 border-black rotate-12">
                SECURE
              </div>

              <div className="hidden lg:block mb-8">
                <h2 className="text-4xl font-black text-black mb-2">
                  Login to Account
                </h2>
                <p className="text-gray-600 font-medium">
                  Enter your credentials to continue
                </p>
              </div>

              {/* Error banner */}
              {apiError && (
                <div className="mb-6 p-4 bg-red-50 border-4 border-red-500 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-red-700 font-bold text-sm leading-relaxed">
                    {apiError}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-black uppercase tracking-wider text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setApiError("");
                      }}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      className="w-full pl-12 pr-4 py-4 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-lg transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-black uppercase tracking-wider text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setApiError("");
                      }}
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
                      className="w-full pl-12 pr-12 py-4 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-lg transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-6 h-6 border-4 border-black flex items-center justify-center transition-all ${rememberMe ? "bg-black" : "bg-white"}`}
                      >
                        {rememberMe && (
                          <CheckCircle className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-700 group-hover:text-black transition-colors">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-black text-blue-600 hover:text-blue-700 transition-colors uppercase"
                  >
                    Forgot?
                  </Link>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-black text-white font-black text-xl uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                      Logging In...
                    </>
                  ) : (
                    <>
                      Login <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center p-4 bg-gray-50 border-4 border-black">
                <p className="text-gray-700 font-medium">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-black text-black underline hover:text-blue-600 transition-colors"
                  >
                    Sign Up Free
                  </Link>
                </p>
              </div>
              <p className="mt-6 text-center text-xs text-gray-500 font-medium">
                🔒 Protected by 256-bit SSL encryption
              </p>
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

export default Login;
