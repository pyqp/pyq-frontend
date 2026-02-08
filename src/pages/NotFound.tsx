import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Search, BookOpen, Trophy, FileText, ArrowRight,
  Compass, AlertCircle, TrendingUp, Zap
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const NotFound = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const popularPages = [
    {
      title: 'Free PYQs',
      description: '100% free previous year questions',
      icon: FileText,
      link: '/free-pyqs',
      color: '#10B981',
      badge: 'FREE'
    },
    {
      title: 'Mock Tests',
      description: 'Professional mock test packages',
      icon: Trophy,
      link: '/mock-tests',
      color: '#FF6B35',
      badge: 'PAID'
    },
    {
      title: 'All Exams',
      description: 'Browse 50+ competitive exams',
      icon: BookOpen,
      link: '/all-exams',
      color: '#2E5CFF',
      badge: 'POPULAR'
    },
    {
      title: 'Pricing',
      description: 'View our pricing plans',
      icon: Zap,
      link: '/pricing',
      color: '#8B5CF6',
      badge: 'NEW'
    }
  ];

  const examCategories = [
    { name: 'Railway', icon: '🚂', link: '/all-exams', color: '#FF6B35' },
    { name: 'UPSC', icon: '🏛️', link: '/all-exams', color: '#2E5CFF' },
    { name: 'SSC', icon: '📋', link: '/all-exams', color: '#8B5CF6' },
    { name: 'Banking', icon: '🏦', link: '/all-exams', color: '#10B981' },
    { name: 'Defence', icon: '⚔️', link: '/all-exams', color: '#DC2626' },
    { name: 'Teaching', icon: '📚', link: '/all-exams', color: '#0891B2' }
  ];

  const helpfulTips = [
    'Check the URL for typos',
    'Use the search bar to find what you need',
    'Browse popular exam categories below',
    'Visit our homepage to start fresh'
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
        {/* Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply">
          <div className="absolute inset-0 bg-noise"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          {/* 404 Section */}
          <div className="text-center mb-16">
            {/* Floating Alert Icon */}
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 opacity-20 blur-3xl rounded-full animate-pulse"></div>
              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <AlertCircle className="w-20 h-20 md:w-24 md:h-24 text-red-500" />
              </div>
            </div>

            {/* 404 Text */}
            <div className="mb-6">
              <div className="text-8xl sm:text-9xl md:text-[12rem] font-black leading-none mb-4">
                <span className="text-black">4</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">0</span>
                <span className="text-black">4</span>
              </div>
              <div className="inline-block px-6 py-3 bg-black text-white font-black text-xl md:text-2xl uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
                Page Not Found
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-600 font-bold max-w-2xl mx-auto leading-relaxed mb-4">
              Oops! Looks like you've wandered off the exam path.
              <br />
              Don't worry, we'll help you get back on track!
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for exams, PYQs, or mock tests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 text-lg font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 transition-all duration-200"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white font-black text-lg uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
              >
                <Home className="w-5 h-5" />
                Go to Homepage
              </Link>
              <Link
                to="/all-exams"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-black text-lg uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
              >
                <Compass className="w-5 h-5" />
                Browse Exams
              </Link>
            </div>
          </div>

          {/* Helpful Tips */}
          <div className="mb-16">
            <div className="max-w-3xl mx-auto bg-blue-50 border-4 border-blue-600 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-black text-blue-900">Quick Tips</h3>
              </div>
              <ul className="space-y-3">
                {helpfulTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-black text-sm">{idx + 1}</span>
                    </div>
                    <span className="text-blue-900 font-medium text-lg">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Popular Pages */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Destinations</span>
              </h2>
              <p className="text-xl text-gray-600 font-medium">Start your preparation journey here</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularPages.map((page, idx) => (
                <Link
                  key={idx}
                  to={page.link}
                  className="group relative bg-white border-4 border-black rounded-xl p-6 hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div 
                    className="absolute -top-3 -right-3 px-3 py-1 text-xs font-black uppercase border-2 border-black rounded-full rotate-12"
                    style={{ backgroundColor: page.color, color: 'white' }}
                  >
                    {page.badge}
                  </div>

                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-black mb-4"
                    style={{ backgroundColor: page.color + '20' }}
                  >
                    <page.icon className="w-8 h-8" style={{ color: page.color }} />
                  </div>

                  <h3 className="text-xl font-black text-black mb-2">{page.title}</h3>
                  <p className="text-gray-600 font-medium text-sm mb-4">{page.description}</p>

                  <div className="flex items-center gap-2 text-black font-bold group-hover:translate-x-2 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Exam Categories */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Category</span>
              </h2>
              <p className="text-xl text-gray-600 font-medium">Find your exam preparation resources</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {examCategories.map((category, idx) => (
                <Link
                  key={idx}
                  to={category.link}
                  className="group bg-white border-4 border-black rounded-xl p-6 hover:scale-110 transition-all duration-300 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  style={{ backgroundColor: 'white' }}
                >
                  <div className="text-5xl mb-3 group-hover:scale-125 transition-transform">
                    {category.icon}
                  </div>
                  <div className="font-black text-lg" style={{ color: category.color }}>
                    {category.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 border-4 border-black rounded-3xl p-12 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                STILL LOST?
              </h3>
              <p className="text-xl text-white/90 font-bold mb-6">
                No worries! Our support team is here to help you navigate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/about"
                  className="inline-block px-8 py-4 bg-white text-black font-black text-lg uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
                >
                  Contact Support
                </Link>
                <Link
                  to="/free-pyqs"
                  className="inline-block px-8 py-4 bg-black text-white font-black text-lg uppercase border-4 border-white hover:bg-gray-900 transition-colors"
                >
                  Start Free Practice
                </Link>
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

          .bg-noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.5;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;