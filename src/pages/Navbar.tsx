import { useState, useEffect, useRef } from "react";
import {
  Search, Menu, X, ChevronDown, Zap, Trophy,
  LogIn, Sparkles, CreditCard, LayoutDashboard,
  BarChart2, Settings, LogOut, User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import weblogo from "../assets/images/pyqpb.png";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isScrolled, setIsScrolled]           = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown]   = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen]       = useState(false);
  const [userMenuOpen, setUserMenuOpen]        = useState(false);
  const userMenuRef                            = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node))
        setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    setUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    await logout();
    toast.success("Logged out");
    navigate("/");
  };

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "";

  const examCategories = [
    { name: "Railway",  icon: "🚂", color: "#FF6B35", exams: ["RRB NTPC", "Group D", "JE", "ALP"] },
    { name: "UPSC",     icon: "🏛️", color: "#2E5CFF", exams: ["CSE Prelims", "CSE Mains", "CDS", "NDA"] },
    { name: "SSC",      icon: "📋", color: "#8B5CF6", exams: ["CGL", "CHSL", "MTS", "CPO"] },
    { name: "Banking",  icon: "🏦", color: "#10B981", exams: ["IBPS PO", "SBI PO", "RBI", "Clerk"] },
    { name: "Defence",  icon: "⚔️", color: "#DC2626", exams: ["NDA", "CDS", "AFCAT", "Army"] },
    { name: "Teaching", icon: "📚", color: "#0891B2", exams: ["CTET", "UGC NET", "SET", "TET"] },
  ];

  const resources = [
    { name: "Free PYQs",  badge: "FREE", color: "#10B981", link: "/free-pyqs" },
    { name: "Mock Tests", badge: "PAID", color: "#FF6B35", link: "/mock-tests" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white border-b-4 border-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)]"
            : "bg-white/95 backdrop-blur-xl border-b-4 border-black"
        }`}
      >
        {/* Top Bar */}
        <div className="bg-black border-b-2 border-white/20 py-2 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-8 text-white text-sm font-bold">
              <div className="flex items-center gap-2 animate-pulse">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>NEW: 2025 PYQs Available!</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Zap className="w-4 h-4 text-green-400" />
                <span>Mock Tests ₹199 Only</span>
              </div>
              <div className="hidden lg:flex items-center gap-2">
                <Trophy className="w-4 h-4 text-purple-400" />
                <span>250K+ Students Trust Us</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <img
                  src={weblogo}
                  alt="EXAMPRO Logo"
                  className="h-14 w-auto object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Exams Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("exams")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-5 py-3 font-black text-sm uppercase tracking-tight hover:bg-black hover:text-white transition-all duration-200 border-2 border-transparent hover:border-black flex items-center gap-2 group">
                  All Exams
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                {activeDropdown === "exams" && (
                  <div className="absolute top-full left-0 mt-2 w-[600px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none">
                    <div className="grid grid-cols-2 gap-4 p-6">
                      {examCategories.map((category) => (
                        <div key={category.name}
                          className="p-4 border-2 border-black hover:bg-gray-50 cursor-pointer group/item transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-3xl">{category.icon}</span>
                            <div className="font-black text-lg" style={{ color: category.color }}>{category.name}</div>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {category.exams.slice(0, 3).map((exam) => (
                              <span key={exam} className="px-2 py-1 bg-black text-white text-xs font-bold rounded-none">{exam}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t-4 border-black bg-gray-50 p-4">
                      <Link to="/all-exams"
                        className="block w-full py-5 bg-black text-white font-black text-base uppercase hover:bg-gray-900 transition-colors text-center tracking-wide"
                        onClick={() => setActiveDropdown(null)}>
                        VIEW ALL 50+ EXAMS →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("resources")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-5 py-3 font-black text-sm uppercase tracking-tight hover:bg-black hover:text-white transition-all duration-200 border-2 border-transparent hover:border-black flex items-center gap-2 group">
                  Resources
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                {activeDropdown === "resources" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none">
                    <div className="p-4 space-y-2">
                      {resources.map((resource) => (
                        <Link key={resource.name} to={resource.link}
                          className="block p-3 border-2 border-black hover:bg-gray-50 cursor-pointer transition-all duration-200"
                          onClick={() => setActiveDropdown(null)}>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm">{resource.name}</span>
                            <span className="px-2 py-1 text-white text-xs font-black rounded-none"
                              style={{ backgroundColor: resource.color }}>{resource.badge}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/about"
                className="px-5 py-3 font-black text-sm uppercase tracking-tight hover:bg-black hover:text-white transition-all duration-200 border-2 border-transparent hover:border-black">
                About
              </Link>
            </div>

            {/* ── Right Side ─────────────────────────────────────────────────── */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button onClick={() => setIsSearchOpen(true)}
                className="p-3 hover:bg-black hover:text-white border-2 border-black transition-all duration-200 rounded-none hidden md:block">
                <Search className="w-5 h-5" />
              </button>

              {/* ── AUTH STATE — only change from original ─────────────────── */}
              {isLoading ? (
                /* Skeleton while token is being validated */
                <div className="hidden md:block w-32 h-10 bg-gray-100 animate-pulse border-2 border-gray-200" />
              ) : isAuthenticated && user ? (
                /* ── LOGGED IN ─────────────────────────────────────────────── */
                <div className="hidden md:flex items-center gap-3">
                  {/* Credits badge */}
                  <Link to="/pricing"
                    className="flex items-center gap-1.5 px-3 py-2 bg-amber-400 text-black border-4 border-black font-black text-xs uppercase
                               shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                               hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    title="Your credits">
                    <CreditCard className="w-3.5 h-3.5" />
                    {user.credits?.total ?? 0}
                  </Link>

                  {/* Avatar + dropdown */}
                  <div className="relative" ref={userMenuRef}>
                    <button onClick={() => setUserMenuOpen((o) => !o)}
                      className="flex items-center gap-2 px-3 py-2 border-4 border-black font-black text-sm uppercase
                                 hover:bg-black hover:text-white transition-all duration-200
                                 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                 hover:translate-x-0.5 hover:translate-y-0.5">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name}
                          className="w-6 h-6 rounded-full object-cover border-2 border-current" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-current flex items-center justify-center">
                          <span className="font-black text-xs text-white mix-blend-difference">{initials}</span>
                        </div>
                      )}
                      <span className="max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-52 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50">
                        {/* Header */}
                        <div className="px-4 py-3 bg-black text-white border-b-4 border-black">
                          <p className="font-black text-sm truncate">{user.name}</p>
                          <p className="text-gray-400 text-xs truncate">{user.email}</p>
                        </div>
                        {/* Credits row */}
                        <div className="px-4 py-2 border-b-2 border-gray-100 flex items-center justify-between">
                          <span className="text-xs font-black uppercase tracking-widest text-gray-400">Credits</span>
                          <span className="font-black text-amber-500">{user.credits?.total ?? 0}</span>
                        </div>
                        {/* Links */}
                        {[
                          { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard"   },
                          { to: "/results",   icon: BarChart2,        label: "My Results"  },
                          { to: "/profile",   icon: Settings,          label: "Profile"     },
                        ].map(({ to, icon: Icon, label }) => (
                          <Link key={to} to={to} onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-black
                                       hover:bg-black hover:text-white transition-colors border-b-2 border-gray-100 last:border-0">
                            <Icon className="w-4 h-4" />{label}
                          </Link>
                        ))}
                        {/* Logout */}
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500
                                     hover:bg-red-500 hover:text-white transition-colors border-t-4 border-black">
                          <LogOut className="w-4 h-4" />Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* ── LOGGED OUT ────────────────────────────────────────────── */
                <>
                  <Link to="/login"
                    className="hidden md:flex items-center gap-2 px-6 py-3 bg-white text-black font-black text-sm uppercase
                               border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none
                               hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                    <LogIn className="w-4 h-4" />Login
                  </Link>
                  <Link to="/signup"
                    className="hidden md:flex items-center gap-2 px-6 py-3 bg-black text-white font-black text-sm uppercase
                               border-4 border-black hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600
                               transition-all duration-300">
                    Sign Up
                  </Link>
                </>
              )}

              {/* Mobile menu toggle */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 border-2 border-black hover:bg-black hover:text-white transition-all duration-200">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ─────────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-[140px] left-0 right-0 bg-white border-b-4 border-black max-h-[calc(100vh-140px)] overflow-y-auto transition-transform duration-300 ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>

          {/* Search */}
          <div className="p-4 border-b-4 border-black">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search exams..."
                className="w-full pl-12 pr-4 py-4 border-4 border-black focus:outline-none font-bold text-lg" />
            </div>
          </div>

          {/* Exam Categories */}
          <div className="p-4 border-b-4 border-black">
            <div className="text-xs font-black uppercase tracking-wider text-gray-500 mb-3">Popular Exams</div>
            <div className="space-y-2">
              {examCategories.map((category) => (
                <div key={category.name} className="p-4 border-2 border-black hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-black text-lg" style={{ color: category.color }}>{category.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 ml-11">
                    {category.exams.slice(0, 3).map((exam) => (
                      <span key={exam} className="px-2 py-1 bg-black text-white text-xs font-bold">{exam}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="p-4 border-b-4 border-black">
            <div className="text-xs font-black uppercase tracking-wider text-gray-500 mb-3">Resources</div>
            <div className="space-y-2">
              {resources.map((resource) => (
                <Link key={resource.name} to={resource.link}
                  className="block p-4 border-2 border-black hover:bg-gray-50 cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{resource.name}</span>
                    <span className="px-3 py-1 text-white text-xs font-black" style={{ backgroundColor: resource.color }}>
                      {resource.badge}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="p-4 space-y-3">
            <Link to="/about"
              className="flex items-center justify-center w-full py-4 bg-gray-100 text-black font-black text-lg uppercase border-4 border-black hover:bg-gray-200 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/mock-tests"
              className="flex items-center justify-center w-full py-4 bg-gray-100 text-black font-black text-lg uppercase border-4 border-black hover:bg-gray-200 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}>
              Mock Tests
            </Link>

            {/* ── Mobile auth state ──────────────────────────────────────── */}
            {isAuthenticated && user ? (
              <>
                {/* Credits */}
                <div className="flex items-center justify-between px-4 py-3 bg-amber-50 border-4 border-amber-400">
                  <span className="font-black text-sm uppercase">Credits</span>
                  <span className="font-black text-amber-600 text-xl">{user.credits?.total ?? 0}</span>
                </div>
                <Link to="/dashboard"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-black text-lg uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  <LayoutDashboard className="w-5 h-5" />Dashboard
                </Link>
                <Link to="/profile"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-black text-lg uppercase border-4 border-black"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="w-5 h-5" />Profile
                </Link>
                <button onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-black text-white font-black text-lg uppercase border-4 border-black">
                  <LogOut className="w-5 h-5" />Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-black text-lg uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  <LogIn className="w-5 h-5" />Login
                </Link>
                <Link to="/signup"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-black text-white font-black text-lg uppercase border-4 border-black"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Search Modal ─────────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-50 flex items-start justify-center pt-32 transition-all duration-300 ${
          isSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
        <div className="relative z-10 w-full max-w-3xl mx-4">
          <div className="bg-white border-4 border-white shadow-[12px_12px_0px_0px_rgba(255,255,255,0.3)]">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400" />
              <input type="text" placeholder="Search for exams, topics, questions..." autoFocus
                className="w-full pl-20 pr-20 py-8 text-2xl font-bold focus:outline-none" />
              <button onClick={() => setIsSearchOpen(false)}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 hover:bg-black hover:text-white border-2 border-black transition-all duration-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="border-t-4 border-black p-6">
              <div className="text-sm font-black uppercase tracking-wider text-gray-500 mb-4">Popular Searches</div>
              <div className="flex flex-wrap gap-3">
                {["UPSC CSE","SSC CGL","RRB NTPC","IBPS PO","CTET","NDA"].map((term) => (
                  <button key={term}
                    className="px-4 py-2 bg-black text-white font-bold text-sm border-2 border-black hover:bg-white hover:text-black transition-all duration-200">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;700&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; }
        h1, h2, h3, .font-black { font-family: 'Archivo Black', sans-serif; letter-spacing: -0.02em; }
      `}</style>
    </>
  );
};

export default Navbar;