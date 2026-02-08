import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, FileText, Award, ArrowRight, Download, BookOpen, Zap, CheckCircle, Star, Trophy } from 'lucide-react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const examCategories = [
    {
      id: 'railway',
      name: 'Railway',
      fullName: 'Railway Recruitment',
      icon: '🚂',
      color: '#FF6B35',
      bgColor: '#FFF4F0',
      accentColor: '#FF8C61',
      questions: '25,000+',
      successRate: '95%',
      exams: ['RRB NTPC', 'Group D', 'JE', 'ALP', 'Technician'],
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      pattern: 'diagonal-lines',
      rank: '#1'
    },
    {
      id: 'upsc',
      name: 'UPSC',
      fullName: 'Civil Services',
      icon: '🏛️',
      color: '#2E5CFF',
      bgColor: '#F0F4FF',
      accentColor: '#5B7FFF',
      questions: '35,000+',
      successRate: '98%',
      exams: ['CSE Prelims', 'CSE Mains', 'IAS', 'IPS', 'IFS'],
      gradient: 'from-blue-600 via-indigo-600 to-purple-600',
      pattern: 'dots',
      rank: '#2'
    },
    {
      id: 'ssc',
      name: 'SSC',
      fullName: 'Staff Selection',
      icon: '📋',
      color: '#8B5CF6',
      bgColor: '#F8F4FF',
      accentColor: '#A78BFA',
      questions: '30,000+',
      successRate: '96%',
      exams: ['CGL', 'CHSL', 'MTS', 'CPO', 'GD'],
      gradient: 'from-purple-600 via-violet-600 to-fuchsia-600',
      pattern: 'grid',
      rank: '#3'
    },
    {
      id: 'banking',
      name: 'Banking',
      fullName: 'Banking & Finance',
      icon: '🏦',
      color: '#10B981',
      bgColor: '#F0FDF9',
      accentColor: '#34D399',
      questions: '28,000+',
      successRate: '94%',
      exams: ['IBPS PO', 'SBI PO', 'RBI', 'Clerk', 'SO'],
      gradient: 'from-green-600 via-emerald-600 to-teal-600',
      pattern: 'chevron',
      rank: '#4'
    },
    {
      id: 'defence',
      name: 'Defence',
      fullName: 'Armed Forces',
      icon: '⚔️',
      color: '#DC2626',
      bgColor: '#FFF1F1',
      accentColor: '#EF4444',
      questions: '22,000+',
      successRate: '93%',
      exams: ['NDA', 'CDS', 'AFCAT', 'Army', 'Navy'],
      gradient: 'from-red-600 via-orange-600 to-amber-600',
      pattern: 'stars',
      rank: '#5'
    },
    {
      id: 'teaching',
      name: 'Teaching',
      fullName: 'Educator Exams',
      icon: '📚',
      color: '#0891B2',
      bgColor: '#F0FDFF',
      accentColor: '#22D3EE',
      questions: '18,000+',
      successRate: '92%',
      exams: ['CTET', 'UGC NET', 'SET', 'TET', 'B.Ed'],
      gradient: 'from-cyan-600 via-teal-600 to-blue-600',
      pattern: 'waves',
      rank: '#6'
    }
  ];

  const liveStats = [
    { value: '250K+', label: 'Aspirants', icon: Users, color: '#2E5CFF', trend: '+12%' },
    { value: '100K+', label: 'Questions', icon: FileText, color: '#8B5CF6', trend: '+8%' },
    { value: '98%', label: 'Success', icon: Trophy, color: '#10B981', trend: '+5%' },
    { value: '50+', label: 'Exams', icon: BookOpen, color: '#FF6B35', trend: 'Live' }
  ];

  const testimonials = [
    { name: 'Priya S.', exam: 'UPSC CSE', avatar: '👩‍🎓', quote: 'The mock tests were game-changers!' },
    { name: 'Rahul K.', exam: 'SSC CGL', avatar: '👨‍💼', quote: 'Best PYQ solutions I found online' },
    { name: 'Anjali M.', exam: 'Banking PO', avatar: '👩‍💻', quote: 'Detailed analysis helped me improve' }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply">
        <div className="absolute inset-0 bg-noise"></div>
      </div>

      {/* Custom Cursor Trail - Desktop Only */}
      <div 
        className="hidden lg:block fixed w-8 h-8 border-2 border-black rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${hoveredCard ? 1.5 : 1})`
        }}
      />

      {/* Hero Section - Asymmetric Layout */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-black pt-20 md:pt-0">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-grid-pattern"></div>
          <div 
            className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"
            style={{
              transform: `translate(${scrollY * 0.3}px, ${scrollY * 0.2}px)`
            }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="floating-element-delayed absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="floating-element-slow absolute top-1/2 left-1/2 w-36 h-36 bg-gradient-to-br from-green-500 to-teal-500 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Column - Text */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-3 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-xl md:rounded-2xl text-white shadow-2xl group hover:bg-white/20 transition-all duration-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                <span className="font-bold text-sm md:text-lg tracking-tight">250,000+ Active Learners</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Main Heading - Brutal Typography */}
              <div className="space-y-3 md:space-y-4">
                <h1 className="font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-[0.9] tracking-tighter">
                  CRACK
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 italic skew-y-[-2deg] inline-block">
                    EVERY
                  </span>
                  <br />
                  EXAM
                </h1>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="h-1 md:h-1.5 w-20 md:w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-bold">
                    India's #1 Competitive Exam Platform
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 leading-relaxed max-w-2xl font-medium">
                Access <span className="text-white font-bold">100K+ previous year questions</span>, expert solutions, 
                and <span className="text-white font-bold">professional mock tests</span> for 50+ competitive exams.
              </p>

              {/* CTA Buttons - Neo-Brutalist Style */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-4">
                <Link to="/free-pyqs" className="group relative inline-block px-6 md:px-10 py-3 md:py-5 bg-white text-black font-black text-base md:text-xl rounded-none border-3 md:border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 uppercase tracking-tight">
                  Start Free
                  <div className="absolute -top-2 md:-top-3 -right-2 md:-right-3 w-6 h-6 md:w-8 md:h-8 bg-green-400 rounded-full flex items-center justify-center text-black text-xs md:text-sm font-bold border-2 border-black">
                    ₹0
                  </div>
                </Link>
                <Link to="/mock-tests" className="inline-block px-6 md:px-10 py-3 md:py-5 bg-black text-white font-black text-base md:text-xl rounded-none border-3 md:border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] md:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] md:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 uppercase tracking-tight">
                  Mock Tests
                </Link>
              </div>

              {/* Live Stats Ticker */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-6 md:pt-8 border-t-2 border-white/10">
                {liveStats.slice(0, 3).map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: stat.color }} />
                    <div>
                      <div className="text-lg md:text-2xl font-black text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - 3D Card Stack */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[500px] md:h-[600px]">
                {/* Card Stack */}
                {examCategories.slice(0, 3).map((exam, idx) => {
                  const isHovered = hoveredCard === exam.id;
                  const displayExam = isHovered ? exam : examCategories[0]; // Show hovered card content or default to first
                  
                  return (
                    <div
                      key={exam.id}
                      className="absolute inset-0 transition-all duration-700 hover:z-20 cursor-pointer group"
                      style={{
                        transform: `
                          translateY(${idx * 30}px) 
                          translateX(${idx * 15}px)
                          rotate(${idx * -2}deg)
                          scale(${1 - idx * 0.05})
                        `,
                        zIndex: isHovered ? 30 : 3 - idx
                      }}
                      onMouseEnter={() => setHoveredCard(exam.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div 
                        className="w-full h-[350px] md:h-[400px] rounded-2xl md:rounded-3xl border-3 md:border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300 overflow-hidden"
                        style={{ backgroundColor: displayExam.bgColor }}
                      >
                        <div className="p-4 md:p-8 h-full flex flex-col justify-between relative">
                          {/* Pattern Overlay */}
                          <div className="absolute inset-0 opacity-5">
                            <div className={`w-full h-full bg-${displayExam.pattern}`}></div>
                          </div>

                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4 md:mb-6">
                              <div className="text-5xl md:text-7xl">{displayExam.icon}</div>
                              <div className="px-3 py-1 md:px-4 md:py-2 bg-black text-white font-black text-xs md:text-sm rounded-full border-2 border-black">
                                {displayExam.rank}
                              </div>
                            </div>

                            <h3 className="text-3xl md:text-5xl font-black mb-1 md:mb-2" style={{ color: displayExam.color }}>
                              {displayExam.name}
                            </h3>
                            <p className="text-sm md:text-lg text-gray-600 font-bold mb-3 md:mb-6">{displayExam.fullName}</p>

                            <div className="flex gap-2 md:gap-4 mb-3 md:mb-6">
                              <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 bg-white border-2 border-black rounded-full">
                                <FileText className="w-3 h-3 md:w-4 md:h-4" style={{ color: displayExam.color }} />
                                <span className="font-black text-xs md:text-sm">{displayExam.questions}</span>
                              </div>
                              <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 bg-white border-2 border-black rounded-full">
                                <Award className="w-3 h-3 md:w-4 md:h-4" style={{ color: displayExam.color }} />
                                <span className="font-black text-xs md:text-sm">{displayExam.successRate}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                              {displayExam.exams.slice(0, 3).map((subExam) => (
                                <span
                                  key={subExam}
                                  className="px-2 md:px-3 py-1 md:py-1.5 bg-black text-white text-xs font-bold rounded-md md:rounded-lg border-2 border-black"
                                >
                                  {subExam}
                                </span>
                              ))}
                            </div>
                          </div>

                          <Link 
                            to="/all-exams"
                            className="relative z-10 w-full py-3 md:py-4 bg-black text-white font-black text-base md:text-lg rounded-none border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 uppercase block text-center"
                            style={{ backgroundColor: displayExam.color }}
                          >
                            Explore →
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-3 animate-bounce">
          <div className="text-white/60 text-sm font-bold uppercase tracking-widest">Scroll</div>
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Marquee Stats Bar */}
      <div className="bg-black border-y-4 border-white py-3 md:py-4 overflow-hidden">
        <div className="flex gap-8 md:gap-12 animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, setIdx) => (
            <div key={setIdx} className="flex gap-8 md:gap-12 items-center">
              <span className="text-white font-black text-lg md:text-2xl">⚡ 98% SUCCESS RATE</span>
              <span className="text-yellow-400 font-black text-lg md:text-2xl">★ 250K+ USERS</span>
              <span className="text-purple-400 font-black text-lg md:text-2xl">💎 100K+ QUESTIONS</span>
              <span className="text-green-400 font-black text-lg md:text-2xl">✓ 50+ EXAMS</span>
              <span className="text-blue-400 font-black text-lg md:text-2xl">🎯 TRUSTED PLATFORM</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bento Grid - All Exams */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-12 md:mb-16">
          <div className="inline-block">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 relative">
              ALL EXAMS
              <div className="absolute -bottom-2 left-0 w-full h-2 md:h-3 bg-yellow-400 -z-10"></div>
            </h2>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 font-bold mt-6">Choose your battlefield. Master your future.</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[200px]">
          {examCategories.map((exam, idx) => {
            const gridSpans = [
              'md:col-span-3 md:row-span-2',
              'md:col-span-3 md:row-span-2',
              'md:col-span-2 md:row-span-1',
              'md:col-span-2 md:row-span-1',
              'md:col-span-2 md:row-span-1',
              'md:col-span-6 md:row-span-1'
            ];

            return (
              <div
                key={exam.id}
                className={`${gridSpans[idx]} group relative overflow-hidden cursor-pointer`}
                style={{ backgroundColor: exam.bgColor }}
                onMouseEnter={() => setHoveredCard(exam.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 border-3 md:border-4 border-black rounded-xl md:rounded-2xl transition-all duration-300 group-hover:scale-[0.97]">
                  <div className="absolute inset-0 opacity-10">
                    <div className={`w-full h-full bg-${exam.pattern}`}></div>
                  </div>

                  <div className="relative h-full p-4 md:p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3 md:mb-4">
                        <div className="text-4xl md:text-5xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                          {exam.icon}
                        </div>
                        <div className="flex flex-col gap-2">
                          <div 
                            className="px-2 md:px-3 py-1 bg-black text-white font-black text-xs rounded-full"
                            style={{ backgroundColor: exam.color }}
                          >
                            {exam.rank}
                          </div>
                          <div className="px-2 md:px-3 py-1 bg-white border-2 border-black rounded-full font-black text-xs">
                            {exam.successRate}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 md:mb-2" style={{ color: exam.color }}>
                        {exam.name}
                      </h3>
                      <p className="text-xs md:text-sm font-bold text-gray-600 mb-2 md:mb-3">{exam.fullName}</p>

                      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3">
                        {exam.exams.slice(0, idx === 5 ? 5 : 3).map((subExam) => (
                          <span
                            key={subExam}
                            className="px-2 py-1 bg-white border-2 border-black rounded-md text-xs font-bold"
                          >
                            {subExam}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg md:text-xl font-black" style={{ color: exam.color }}>
                        {exam.questions} Qs
                      </div>
                      <Link to="/all-exams" className="inline-flex items-center justify-center p-2 md:p-3 bg-black text-white rounded-full border-2 border-black group-hover:scale-110 transition-transform">
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${exam.color}20, transparent)`
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features - Split Layout */}
      <section className="bg-black py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* FREE Section */}
            <div className="relative">
              <div className="md:sticky md:top-24">
                <div className="inline-block mb-6">
                  <div className="px-4 md:px-6 py-2 md:py-3 bg-green-400 text-black font-black text-xl md:text-2xl rounded-none border-3 md:border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] md:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] rotate-[-2deg]">
                    100% FREE
                  </div>
                </div>

                <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-tight">
                  Latest Year
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                    PYQ Solutions
                  </span>
                </h3>

                <p className="text-lg md:text-xl text-gray-400 mb-6 md:mb-8 leading-relaxed">
                  Get complete access to <span className="text-white font-bold">2025 previous year questions</span> with 
                  detailed, step-by-step solutions. Download PDFs, practice online unlimited times.
                </p>

                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/5 border-2 border-white/10 rounded-xl backdrop-blur-sm">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-white">
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-black" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-base md:text-lg mb-1">Latest 2025 Papers</div>
                      <div className="text-gray-400 text-sm">Most recent exam papers with solutions</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/5 border-2 border-white/10 rounded-xl backdrop-blur-sm">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-white">
                      <Download className="w-5 h-5 md:w-6 md:h-6 text-black" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-base md:text-lg mb-1">PDF Downloads</div>
                      <div className="text-gray-400 text-sm">Save and study offline anytime</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/5 border-2 border-white/10 rounded-xl backdrop-blur-sm">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-white">
                      <Zap className="w-5 h-5 md:w-6 md:h-6 text-black" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-base md:text-lg mb-1">Unlimited Practice</div>
                      <div className="text-gray-400 text-sm">Practice online as many times as you want</div>
                    </div>
                  </div>
                </div>

                <Link to="/free-pyqs" className="inline-block px-6 md:px-10 py-3 md:py-5 bg-green-400 text-black font-black text-lg md:text-xl rounded-none border-3 md:border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] md:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] md:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 uppercase">
                  Start Free Practice
                </Link>
              </div>
            </div>

            {/* PAID Section */}
            <div className="relative">
              <div className="md:sticky md:top-24">
                <div className="inline-block mb-6">
                  <div className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-black text-xl md:text-2xl rounded-none border-3 md:border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] md:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] rotate-[2deg]">
                    PREMIUM
                  </div>
                </div>

                <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-tight">
                  Professional
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                    Mock Tests
                  </span>
                </h3>

                <p className="text-lg md:text-xl text-gray-400 mb-6 md:mb-8 leading-relaxed">
                  Experience the <span className="text-white font-bold">real exam environment</span> with our 
                  professionally designed mock tests. Get instant results and detailed performance analytics.
                </p>

                {/* Pricing Cards - Stacked */}
                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <div className="relative p-4 md:p-6 bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-3 md:border-4 border-amber-400 rounded-xl md:rounded-2xl group hover:scale-105 transition-all duration-300">
                    <div className="absolute -top-2 md:-top-3 -right-2 md:-right-3 px-3 md:px-4 py-1 md:py-2 bg-red-500 text-white font-black text-xs md:text-sm rounded-full border-2 border-white rotate-12">
                      BEST VALUE
                    </div>
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div>
                        <div className="text-4xl md:text-5xl font-black text-white mb-1">5 Tests</div>
                        <div className="text-amber-400 font-bold text-sm md:text-base">Save ₹496</div>
                      </div>
                      <div className="text-3xl md:text-4xl font-black text-amber-400">₹499</div>
                    </div>
                    <Link to="/mock-tests" className="block w-full py-2 md:py-3 bg-amber-400 text-black font-black text-sm md:text-base rounded-lg border-2 border-white hover:bg-amber-300 transition-colors text-center">
                      BUY NOW →
                    </Link>
                  </div>

                  <Link to="/mock-tests" className="block p-4 md:p-5 bg-white/5 border-2 border-white/20 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl md:text-3xl font-black text-white">10 Tests</div>
                        <div className="text-green-400 font-bold text-sm">Save ₹1,191</div>
                      </div>
                      <div className="text-2xl md:text-3xl font-black text-white">₹799</div>
                    </div>
                  </Link>

                  <Link to="/mock-tests" className="block p-4 md:p-5 bg-white/5 border-2 border-white/20 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl md:text-3xl font-black text-white">1 Test</div>
                        <div className="text-gray-400 font-bold text-sm">Trial Pack</div>
                      </div>
                      <div className="text-2xl md:text-3xl font-black text-white">₹199</div>
                    </div>
                  </Link>
                </div>

                <div className="p-3 md:p-4 bg-blue-500/10 border-2 border-blue-400/30 rounded-xl">
                  <div className="text-blue-400 font-bold text-sm mb-2">💡 HOW IT WORKS</div>
                  <div className="text-white text-sm">
                    Buy package → Get credits → Use on any mock test → Unlimited attempts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials Slider */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
              SUCCESS <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">STORIES</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 font-bold">Real aspirants. Real results.</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border-3 md:border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-300"
              >
                <div className="text-5xl md:text-6xl mb-4">{testimonial.avatar}</div>
                <div className="mb-4">
                  <div className="text-xl md:text-2xl font-black text-gray-900 mb-1">{testimonial.name}</div>
                  <div className="text-purple-600 font-bold text-sm md:text-base">{testimonial.exam}</div>
                </div>
                <p className="text-gray-700 font-medium text-base md:text-lg italic">"{testimonial.quote}"</p>
                <div className="absolute top-4 md:top-6 right-4 md:right-6">
                  <Star className="w-6 h-6 md:w-8 md:h-8 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

        /* Grid Pattern */
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .bg-grid-white {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
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

        /* Marquee Animation */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        /* Gradient Shift */
        @keyframes gradient-shift {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(50px) translateY(30px); }
        }

        .animate-gradient-shift {
          animation: gradient-shift 10s ease-in-out infinite;
        }

        /* Patterns */
        .bg-diagonal-lines {
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            currentColor 10px,
            currentColor 11px
          );
        }

        .bg-dots {
          background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .bg-grid {
          background-image: 
            linear-gradient(currentColor 1px, transparent 1px),
            linear-gradient(90deg, currentColor 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .bg-chevron {
          background-image: repeating-linear-gradient(
            135deg,
            transparent,
            transparent 10px,
            currentColor 10px,
            currentColor 20px
          );
        }

        .bg-stars {
          background-image: 
            radial-gradient(circle at 20% 50%, currentColor 2px, transparent 2px),
            radial-gradient(circle at 80% 80%, currentColor 1px, transparent 1px),
            radial-gradient(circle at 40% 20%, currentColor 1.5px, transparent 1.5px);
          background-size: 50px 50px;
        }

        .bg-waves {
          background-image: repeating-radial-gradient(
            circle at 0 0,
            transparent 0,
            currentColor 10px,
            transparent 20px
          );
        }
      `}</style>
    </div>
  );
};

export default Hero;