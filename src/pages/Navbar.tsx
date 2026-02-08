import { useState, useEffect } from "react";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Zap,
  Trophy,
  LogIn,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import weblogo from "../assets/images/pyqpb.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const examCategories = [
    {
      name: "Railway",
      icon: "🚂",
      color: "#FF6B35",
      exams: ["RRB NTPC", "Group D", "JE", "ALP"],
    },
    {
      name: "UPSC",
      icon: "🏛️",
      color: "#2E5CFF",
      exams: ["CSE Prelims", "CSE Mains", "CDS", "NDA"],
    },
    {
      name: "SSC",
      icon: "📋",
      color: "#8B5CF6",
      exams: ["CGL", "CHSL", "MTS", "CPO"],
    },
    {
      name: "Banking",
      icon: "🏦",
      color: "#10B981",
      exams: ["IBPS PO", "SBI PO", "RBI", "Clerk"],
    },
    {
      name: "Defence",
      icon: "⚔️",
      color: "#DC2626",
      exams: ["NDA", "CDS", "AFCAT", "Army"],
    },
    {
      name: "Teaching",
      icon: "📚",
      color: "#0891B2",
      exams: ["CTET", "UGC NET", "SET", "TET"],
    },
  ];

  const resources = [
    { name: "Free PYQs", badge: "FREE", color: "#10B981", link: "/free-pyqs" },
    {
      name: "Mock Tests",
      badge: "PAID",
      color: "#FF6B35",
      link: "/mock-tests",
    },
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
        {/* Top Bar - Announcements */}
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
            <Link
              to="/"
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={weblogo}
                  alt="EXAMPRO Logo"
                  className="h-14 w-auto object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
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

                {/* Mega Dropdown */}
                {activeDropdown === "exams" && (
                  <div className="absolute top-full left-0 mt-2 w-[600px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none">
                    <div className="grid grid-cols-2 gap-4 p-6">
                      {examCategories.map((category) => (
                        <div
                          key={category.name}
                          className="p-4 border-2 border-black hover:bg-gray-50 cursor-pointer group/item transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-3xl">{category.icon}</span>
                            <div>
                              <div
                                className="font-black text-lg"
                                style={{ color: category.color }}
                              >
                                {category.name}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {category.exams.slice(0, 3).map((exam) => (
                              <span
                                key={exam}
                                className="px-2 py-1 bg-black text-white text-xs font-bold rounded-none"
                              >
                                {exam}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t-4 border-black bg-gray-50 p-4">
                      <Link
                        to="/all-exams"
                        className="block w-full py-5 bg-black text-white font-black text-base uppercase hover:bg-gray-900 transition-colors text-center tracking-wide"
                        onClick={() => setActiveDropdown(null)}
                      >
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
                        <Link
                          key={resource.name}
                          to={resource.link}
                          className="block p-3 border-2 border-black hover:bg-gray-50 cursor-pointer transition-all duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm">
                              {resource.name}
                            </span>
                            <span
                              className="px-2 py-1 text-white text-xs font-black rounded-none"
                              style={{ backgroundColor: resource.color }}
                            >
                              {resource.badge}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/about"
                className="px-5 py-3 font-black text-sm uppercase tracking-tight hover:bg-black hover:text-white transition-all duration-200 border-2 border-transparent hover:border-black"
              >
                About
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-3 hover:bg-black hover:text-white border-2 border-black transition-all duration-200 rounded-none hidden md:block"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Login Button */}
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 px-6 py-3 bg-white text-black font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>

              {/* Sign Up Button */}
              <Link
                to="/signup"
                className="hidden md:flex items-center gap-2 px-6 py-3 bg-black text-white font-black text-sm uppercase border-4 border-black hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                Sign Up
              </Link>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 border-2 border-black hover:bg-black hover:text-white transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Menu Panel */}
        <div
          className={`absolute top-[140px] left-0 right-0 bg-white border-b-4 border-black max-h-[calc(100vh-140px)] overflow-y-auto transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {/* Search Bar */}
          <div className="p-4 border-b-4 border-black">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search exams..."
                className="w-full pl-12 pr-4 py-4 border-4 border-black focus:outline-none font-bold text-lg"
              />
            </div>
          </div>

          {/* Exam Categories */}
          <div className="p-4 border-b-4 border-black">
            <div className="text-xs font-black uppercase tracking-wider text-gray-500 mb-3">
              Popular Exams
            </div>
            <div className="space-y-2">
              {examCategories.map((category) => (
                <div
                  key={category.name}
                  className="p-4 border-2 border-black hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{category.icon}</span>
                    <span
                      className="font-black text-lg"
                      style={{ color: category.color }}
                    >
                      {category.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 ml-11">
                    {category.exams.slice(0, 3).map((exam) => (
                      <span
                        key={exam}
                        className="px-2 py-1 bg-black text-white text-xs font-bold"
                      >
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="p-4 border-b-4 border-black">
            <div className="text-xs font-black uppercase tracking-wider text-gray-500 mb-3">
              Resources
            </div>
            <div className="space-y-2">
              {resources.map((resource) => (
                <Link
                  key={resource.name}
                  to={resource.link}
                  className="block p-4 border-2 border-black hover:bg-gray-50 cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{resource.name}</span>
                    <span
                      className="px-3 py-1 text-white text-xs font-black"
                      style={{ backgroundColor: resource.color }}
                    >
                      {resource.badge}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 space-y-3">
            <Link
              to="/about"
              className="flex items-center justify-center w-full py-4 bg-gray-100 text-black font-black text-lg uppercase border-4 border-black hover:bg-gray-200 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/mock-tests"
              className="flex items-center justify-center w-full py-4 bg-gray-100 text-black font-black text-lg uppercase border-4 border-black hover:bg-gray-200 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Mock Tests
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-black text-lg uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LogIn className="w-5 h-5" />
              Login
            </Link>
            <Link
              to="/signup"
              className="flex items-center justify-center gap-2 w-full py-4 bg-black text-white font-black text-lg uppercase border-4 border-black"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-start justify-center pt-32 transition-all duration-300 ${
          isSearchOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        ></div>

        {/* Search Box */}
        <div className="relative z-10 w-full max-w-3xl mx-4">
          <div className="bg-white border-4 border-white shadow-[12px_12px_0px_0px_rgba(255,255,255,0.3)]">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400" />
              <input
                type="text"
                placeholder="Search for exams, topics, questions..."
                autoFocus
                className="w-full pl-20 pr-20 py-8 text-2xl font-bold focus:outline-none"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 hover:bg-black hover:text-white border-2 border-black transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="border-t-4 border-black p-6">
              <div className="text-sm font-black uppercase tracking-wider text-gray-500 mb-4">
                Popular Searches
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  "UPSC CSE",
                  "SSC CGL",
                  "RRB NTPC",
                  "IBPS PO",
                  "CTET",
                  "NDA",
                ].map((term) => (
                  <button
                    key={term}
                    className="px-4 py-2 bg-black text-white font-bold text-sm border-2 border-black hover:bg-white hover:text-black transition-all duration-200"
                  >
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
        
        * {
          font-family: 'Space Grotesk', sans-serif;
        }

        h1, h2, h3, .font-black {
          font-family: 'Archivo Black', sans-serif;
          letter-spacing: -0.02em;
        }
      `}</style>
    </>
  );
};

export default Navbar;
