import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Trophy,
  BookOpen,
  CreditCard,
  TrendingUp,
  Clock,
  Star,
  LogOut,
  Bell,
  ChevronRight,
  Target,
  Zap,
  Menu,
  X,
  LayoutDashboard,
  FileText,
  BarChart2,
  ShoppingBag,
  HelpCircle,
  Settings,
  ChevronDown,
  Award,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { authApi } from "../../api/Auth.api";
import toast from "react-hot-toast";
import weblogo from "../../assets/images/pyqpb.png";

/* ─── Types ─────────────────────────────────────────────────── */
interface DashboardData {
  stats: {
    totalTestsTaken: number;
    averageScore: number;
    bestScore: number;
    totalTimeSpent: number;
  };
  credits: { total: number; expiringSoon: number; batches?: any[] };
  recentResults: any[];
  loyaltyPoints: { total: number; level: string; levelName: string };
  notifications: number;
}

/* ─── Sidebar nav items ──────────────────────────────────────── */
const NAV = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/mock-tests", icon: FileText, label: "Mock Tests" },
  { to: "/free-pyqs", icon: BookOpen, label: "Free PYQs" },
  { to: "/results", icon: BarChart2, label: "My Results" },
  { to: "/pricing", icon: ShoppingBag, label: "Buy Credits" },
];
const NAV_BOTTOM = [
  { to: "/help", icon: HelpCircle, label: "Help Center" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

/* ─── Sidebar ────────────────────────────────────────────────── */
const Sidebar = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const sidebarClass = `
    fixed inset-y-0 left-0 z-50 w-72 bg-white border-r-4 border-black flex flex-col
    transform transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:static lg:z-auto
  `;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={sidebarClass}>
        {/* Logo row */}
        <div className="flex items-center justify-between px-6 py-5 border-b-4 border-black">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={weblogo}
              alt="PYQPB Logo"
              className="h-11 w-auto object-contain"
            />
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User card */}
        <div className="mx-4 mt-4 p-4 bg-black text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
          <div className="w-12 h-12 bg-yellow-400 border-2 border-white flex items-center justify-center text-black font-black text-xl mb-3">
            {user?.name?.charAt(0).toUpperCase() ?? "U"}
          </div>
          <p className="font-black text-sm truncate">{user?.name}</p>
          <p className="text-gray-400 text-xs truncate">{user?.email}</p>
          <div className="mt-2 flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs text-yellow-400 font-bold uppercase">
              {user?.loyaltyPoints?.levelName ?? "Bronze"}
            </span>
          </div>
        </div>

        {/* Credits pill */}
        <div className="mx-4 mt-3 flex items-center justify-between px-4 py-2 bg-green-400 border-4 border-black">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-black" />
            <span className="font-black text-sm text-black">Credits</span>
          </div>
          <span className="font-black text-xl text-black">
            {user?.credits?.total ?? 0}
          </span>
        </div>

        {/* Main nav */}
        <nav className="flex-1 px-3 pt-4 overflow-y-auto">
          <p className="px-3 mb-2 text-xs font-black uppercase tracking-widest text-gray-400">
            Menu
          </p>
          {NAV.map(({ to, icon: Icon, label }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 mb-1 font-bold text-sm transition-all border-2 ${
                  active
                    ? "bg-black text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]"
                    : "bg-white text-gray-700 border-transparent hover:bg-gray-50 hover:border-black"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {label}
                {active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}

          <p className="px-3 mt-4 mb-2 text-xs font-black uppercase tracking-widest text-gray-400">
            Account
          </p>
          {NAV_BOTTOM.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 mb-1 font-bold text-sm text-gray-700 border-2 border-transparent hover:bg-gray-50 hover:border-black transition-all"
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t-4 border-black">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 border-4 border-black font-black text-sm hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

/* ─── Dashboard Page ─────────────────────────────────────────── */
const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(
      h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening",
    );
  }, []);

  useEffect(() => {
    authApi
      .getMe()
      .then((res) => {
        setData({
          stats: res.data.data.stats,
          credits: {
            total: res.data.data.credits.total,
            expiringSoon: 0,
          },
          recentResults: [],
          loyaltyPoints: res.data.data.loyaltyPoints,
          notifications: 0,
        });
      })
      .catch(() => {
        setData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const stats = data?.stats ?? {
    totalTestsTaken: 0,
    averageScore: 0,
    bestScore: 0,
    totalTimeSpent: 0,
  };
  const credits = data?.credits ?? {
    total: user?.credits?.total ?? 0,
    expiringSoon: 0,
  };

  return (
    <div
      className="min-h-screen bg-[#FAFAFA] flex"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .font-arch { font-family: 'Archivo Black', sans-serif; }
      `}</style>

      {/* ── Sidebar ── */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b-4 border-black sticky top-0 z-30">
          <div className="px-4 md:px-6 py-4 flex items-center justify-between">
            {/* Hamburger (mobile) */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 border-4 border-black hover:bg-black hover:text-white transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Page title (desktop) */}
            <h1 className="hidden lg:block text-xl font-black font-arch">
              Dashboard
            </h1>

            <div className="flex items-center gap-3 ml-auto">
              {/* Notification bell */}
              <button className="relative p-2 border-4 border-black hover:bg-black hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5">
                <Bell className="w-5 h-5" />
                {(data?.notifications ?? 0) > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-black rounded-full flex items-center justify-center border-2 border-black">
                    {data!.notifications}
                  </span>
                )}
              </button>

              {/* User chip */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 border-4 border-black bg-white">
                <div className="w-7 h-7 bg-yellow-400 border-2 border-black flex items-center justify-center text-black font-black text-sm">
                  {user?.name?.charAt(0).toUpperCase() ?? "U"}
                </div>
                <span className="font-black text-sm max-w-[120px] truncate">
                  {user?.name?.split(" ")[0]}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 overflow-y-auto">
          {loading ? (
            /* Skeleton */
            <div className="space-y-6 animate-pulse">
              <div className="h-40 bg-gray-200 border-4 border-gray-200" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-32 bg-gray-200 border-4 border-gray-200"
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Welcome hero */}
              <div className="bg-black text-white p-6 md:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-yellow-400 opacity-[0.05] rounded-full translate-y-1/2" />
                <div className="relative z-10">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-1">
                    {greeting},
                  </p>
                  <h2 className="text-3xl md:text-4xl font-black mb-2 font-arch">
                    {user?.name?.split(" ")[0]} 👋
                  </h2>
                  <p className="text-gray-300 font-medium text-sm">
                    Ready to conquer today's preparation?
                  </p>
                </div>
                <div className="relative z-10 mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/mock-tests"
                    className="px-5 py-2.5 bg-white text-black font-black text-sm border-4 border-white hover:bg-yellow-400 hover:border-yellow-400 transition-all flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
                  >
                    <Zap className="w-4 h-4" />
                    Start Mock Test
                  </Link>
                  <Link
                    to="/free-pyqs"
                    className="px-5 py-2.5 bg-transparent text-white font-black text-sm border-4 border-white hover:bg-white hover:text-black transition-all flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Browse PYQs
                  </Link>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  {
                    icon: Trophy,
                    label: "Tests Taken",
                    value: stats.totalTestsTaken,
                    color: "bg-yellow-400",
                  },
                  {
                    icon: TrendingUp,
                    label: "Avg Score",
                    value: `${stats.averageScore?.toFixed(1) ?? 0}%`,
                    color: "bg-blue-400",
                  },
                  {
                    icon: Star,
                    label: "Best Score",
                    value: `${stats.bestScore?.toFixed(1) ?? 0}%`,
                    color: "bg-green-400",
                  },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div
                    key={label}
                    className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
                  >
                    <div
                      className={`w-11 h-11 ${color} border-2 border-black flex items-center justify-center mb-3`}
                    >
                      <Icon className="w-5 h-5 text-black" />
                    </div>
                    <div className="text-3xl font-black font-arch mb-0.5">
                      {value}
                    </div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Middle row */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Credits */}
                <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-xl font-arch">Credits</h3>
                    <div className="w-10 h-10 bg-green-400 border-2 border-black flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-black" />
                    </div>
                  </div>
                  <div className="text-5xl font-black font-arch mb-1">
                    {credits.total}
                  </div>
                  <p className="text-gray-400 font-medium text-sm mb-1">
                    Available credits
                  </p>
                  {credits.expiringSoon > 0 && (
                    <p className="text-orange-500 font-bold text-xs mb-3">
                      ⚠ {credits.expiringSoon} expiring soon
                    </p>
                  )}
                  {(user?.credits?.batches ?? [])
                    .slice(0, 2)
                    .map((b: any, i: number) => (
                      <div
                        key={i}
                        className="flex justify-between items-center py-2 border-t-2 border-gray-100"
                      >
                        <span className="text-sm font-bold text-gray-500 truncate">
                          {b.packageName}
                        </span>
                        <span className="text-sm font-black ml-2">
                          {b.creditsRemaining} cr
                        </span>
                      </div>
                    ))}
                  <Link
                    to="/pricing"
                    className="mt-4 w-full py-3 bg-black text-white font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    Buy More Credits <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Recent Tests */}
                <div className="lg:col-span-2 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-xl font-arch">
                      Recent Tests
                    </h3>
                    <Link
                      to="/results"
                      className="text-sm font-black text-blue-600 hover:underline"
                    >
                      View All →
                    </Link>
                  </div>
                  {(data?.recentResults ?? []).length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <Target className="w-16 h-16 text-gray-200 mb-3" />
                      <p className="font-black text-gray-400 text-lg">
                        No tests taken yet
                      </p>
                      <p className="text-gray-400 text-sm mt-1 mb-4">
                        Take your first mock test to see results
                      </p>
                      <Link
                        to="/mock-tests"
                        className="px-6 py-3 bg-black text-white font-black text-sm border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                      >
                        Browse Tests
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {data!.recentResults.slice(0, 5).map((r: any) => (
                        <Link
                          key={r._id}
                          to={`/results/${r._id}`}
                          className="flex items-center justify-between p-4 border-2 border-black hover:bg-gray-50 transition-colors group"
                        >
                          <div className="min-w-0">
                            <p className="font-black text-sm truncate">
                              {r.mockTest?.name ?? "Mock Test"}
                            </p>
                            <p className="text-xs text-gray-400 font-medium">
                              {new Date(r.createdAt).toLocaleDateString(
                                "en-IN",
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 flex-shrink-0 ml-2">
                            <div className="text-right">
                              <p className="font-black text-xl">
                                {r.percentage?.toFixed(0)}%
                              </p>
                              <p className="text-xs text-gray-400">
                                Rank #{r.rank}
                              </p>
                            </div>
                            <div
                              className={`w-3 h-3 rounded-full border-2 border-black ${r.percentage >= 70 ? "bg-green-400" : r.percentage >= 40 ? "bg-yellow-400" : "bg-red-400"}`}
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick links */}
              <div>
                <h3 className="font-black text-xl font-arch mb-4">
                  Quick Access
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      to: "/mock-tests",
                      icon: "📝",
                      label: "Mock Tests",
                      color: "bg-blue-400",
                    },
                    {
                      to: "/free-pyqs",
                      icon: "📚",
                      label: "Free PYQs",
                      color: "bg-green-400",
                    },
                    {
                      to: "/results",
                      icon: "📊",
                      label: "My Results",
                      color: "bg-yellow-400",
                    },
                    {
                      to: "/pricing",
                      icon: "💎",
                      label: "Buy Credits",
                      color: "bg-purple-400",
                    },
                  ].map(({ to, icon, label, color }) => (
                    <Link
                      key={to}
                      to={to}
                      className="flex flex-col items-center gap-3 p-6 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all text-center"
                    >
                      <div
                        className={`w-14 h-14 ${color} border-2 border-black flex items-center justify-center text-2xl`}
                      >
                        {icon}
                      </div>
                      <span className="font-black text-xs uppercase tracking-wide font-arch">
                        {label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Loyalty Points banner */}
              <div className="bg-yellow-400 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-black flex items-center justify-center border-4 border-black flex-shrink-0">
                    <Award className="w-7 h-7 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-black text-xl font-arch text-black">
                      {user?.loyaltyPoints?.total ?? 0} Loyalty Points
                    </p>
                    <p className="text-sm font-bold text-gray-800">
                      {user?.loyaltyPoints?.levelName ?? "Bronze Member"} •{" "}
                      {user?.loyaltyPoints?.pointsToNextLevel ?? 1000} pts to
                      next level
                    </p>
                  </div>
                </div>
                <Link
                  to="/pricing"
                  className="flex-shrink-0 px-6 py-3 bg-black text-white font-black text-sm border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  Redeem Points
                </Link>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;