import { useState } from 'react';
import { 
  Search, Download, FileText, Calendar, Filter, X, 
  ChevronDown, BookOpen, Award, TrendingUp,
  CheckCircle, Star, Zap, ArrowRight
} from 'lucide-react';
import Navbar from '../../src/pages/Navbar';
import Footer from '../../src/pages/Footer';
import { Link } from 'react-router-dom';

const FreePYQs = () => {
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const examCategories = [
    { id: 'all', name: 'All Exams', icon: '📚', color: '#6B7280', count: 1500 },
    { id: 'railway', name: 'Railway', icon: '🚂', color: '#FF6B35', count: 250 },
    { id: 'upsc', name: 'UPSC', icon: '🏛️', color: '#2E5CFF', count: 300 },
    { id: 'ssc', name: 'SSC', icon: '📋', color: '#8B5CF6', count: 350 },
    { id: 'banking', name: 'Banking', icon: '🏦', color: '#10B981', count: 280 },
    { id: 'defence', name: 'Defence', icon: '⚔️', color: '#DC2626', count: 200 },
    { id: 'teaching', name: 'Teaching', icon: '📚', color: '#0891B2', count: 120 },
  ];

  const years = [
    { value: 'all', label: 'All Years' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
  ];

  const subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'general-knowledge', label: 'General Knowledge' },
    { value: 'reasoning', label: 'Reasoning' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'english', label: 'English' },
    { value: 'science', label: 'Science' },
    { value: 'history', label: 'History' },
    { value: 'geography', label: 'Geography' },
  ];

  // Sample PYQ data
  const pyqData = [
    {
      id: 1,
      exam: 'SSC CGL',
      category: 'ssc',
      year: '2024',
      subject: 'General Knowledge',
      questions: 100,
      downloads: 15420,
      difficulty: 'Medium',
      size: '2.4 MB',
      popular: true
    },
    {
      id: 2,
      exam: 'RRB NTPC',
      category: 'railway',
      year: '2024',
      subject: 'Mathematics',
      questions: 80,
      downloads: 12300,
      difficulty: 'Easy',
      size: '1.8 MB',
      popular: true
    },
    {
      id: 3,
      exam: 'UPSC CSE Prelims',
      category: 'upsc',
      year: '2023',
      subject: 'History',
      questions: 120,
      downloads: 18900,
      difficulty: 'Hard',
      size: '3.2 MB',
      popular: true
    },
    {
      id: 4,
      exam: 'IBPS PO',
      category: 'banking',
      year: '2024',
      subject: 'Reasoning',
      questions: 90,
      downloads: 10500,
      difficulty: 'Medium',
      size: '2.1 MB',
      popular: false
    },
    {
      id: 5,
      exam: 'NDA',
      category: 'defence',
      year: '2023',
      subject: 'Mathematics',
      questions: 150,
      downloads: 9800,
      difficulty: 'Hard',
      size: '2.8 MB',
      popular: false
    },
    {
      id: 6,
      exam: 'CTET',
      category: 'teaching',
      year: '2024',
      subject: 'English',
      questions: 100,
      downloads: 8700,
      difficulty: 'Easy',
      size: '1.9 MB',
      popular: false
    },
    {
      id: 7,
      exam: 'SSC CHSL',
      category: 'ssc',
      year: '2023',
      subject: 'English',
      questions: 100,
      downloads: 11200,
      difficulty: 'Medium',
      size: '2.0 MB',
      popular: false
    },
    {
      id: 8,
      exam: 'RRB Group D',
      category: 'railway',
      year: '2023',
      subject: 'General Knowledge',
      questions: 75,
      downloads: 13500,
      difficulty: 'Easy',
      size: '1.7 MB',
      popular: true
    },
  ];

  const stats = [
    { value: '1,500+', label: 'Free PYQs', icon: FileText, color: '#2E5CFF' },
    { value: '250K+', label: 'Downloads', icon: Download, color: '#10B981' },
    { value: '50+', label: 'Exams Covered', icon: Award, color: '#FF6B35' },
    { value: '100%', label: 'Free Forever', icon: Zap, color: '#8B5CF6' },
  ];

  const features = [
    {
      icon: FileText,
      title: 'Latest Papers',
      description: 'Updated with 2024 PYQs from all major exams',
      color: '#2E5CFF'
    },
    {
      icon: CheckCircle,
      title: 'Verified Solutions',
      description: 'Expert-verified answers with detailed explanations',
      color: '#10B981'
    },
    {
      icon: Download,
      title: 'Instant Download',
      description: 'Download PDF papers instantly, no signup required',
      color: '#FF6B35'
    },
    {
      icon: Star,
      title: 'Free Forever',
      description: 'Complete access to all PYQs absolutely free',
      color: '#8B5CF6'
    },
  ];

  // Filter logic
  const filteredPYQs = pyqData.filter(pyq => {
    const matchesExam = selectedExam === 'all' || pyq.category === selectedExam;
    const matchesYear = selectedYear === 'all' || pyq.year === selectedYear;
    const matchesSubject = selectedSubject === 'all' || pyq.subject.toLowerCase().replace(' ', '-') === selectedSubject;
    const matchesSearch = searchQuery === '' || 
      pyq.exam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pyq.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesExam && matchesYear && matchesSubject && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return '#10B981';
      case 'Medium': return '#FF6B35';
      case 'Hard': return '#DC2626';
      default: return '#6B7280';
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden pt-[124px]">
        {/* Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply">
          <div className="absolute inset-0 bg-noise"></div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-black py-16 md:py-24 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-grid-pattern"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="floating-element absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="floating-element-delayed absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full opacity-20 blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-2xl text-white shadow-2xl mb-6">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="font-bold text-sm uppercase tracking-tight">100% Free Forever</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                FREE
                <br />
                <span className="text-yellow-300">
                  PREVIOUS YEAR
                </span>
                <br />
                QUESTIONS
              </h1>

              <p className="text-xl md:text-2xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed mb-8">
                Download 1,500+ solved PYQs from all major competitive exams. Updated regularly with latest papers.
              </p>

              {/* Quick Search */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by exam or subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 text-lg font-bold border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white border-4 border-black rounded-xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-300 text-center"
              >
                <stat.icon className="w-10 h-10 mx-auto mb-3" style={{ color: stat.color }} />
                <div className="text-3xl md:text-4xl font-black text-black mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-gray-600 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Exam Category Filter */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl md:text-4xl font-black text-black">
              Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Exam</span>
            </h2>
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-black text-white font-black text-sm uppercase border-2 border-black"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {examCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedExam(category.id)}
                className={`p-4 border-4 border-black rounded-xl transition-all duration-300 ${
                  selectedExam === category.id
                    ? 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] scale-105'
                    : 'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:scale-105'
                }`}
                style={{ 
                  backgroundColor: selectedExam === category.id ? category.color + '20' : 'white'
                }}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <div className="font-black text-sm mb-1" style={{ color: category.color }}>
                  {category.name}
                </div>
                <div className="text-xs text-gray-600 font-bold">{category.count} PYQs</div>
              </button>
            ))}
          </div>
        </section>

        {/* Filters Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-6 h-6 text-black" />
                  <span className="font-black text-xl">Advanced Filters</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedYear('all');
                    setSelectedSubject('all');
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 hover:text-black transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Year Filter */}
                <div>
                  <label className="block text-sm font-black uppercase text-gray-700 mb-3">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Year
                  </label>
                  <div className="relative">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-4 py-3 border-4 border-black font-bold text-lg focus:outline-none appearance-none cursor-pointer"
                    >
                      {years.map((year) => (
                        <option key={year.value} value={year.value}>
                          {year.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none" />
                  </div>
                </div>

                {/* Subject Filter */}
                <div>
                  <label className="block text-sm font-black uppercase text-gray-700 mb-3">
                    <BookOpen className="w-4 h-4 inline mr-2" />
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-4 py-3 border-4 border-black font-bold text-lg focus:outline-none appearance-none cursor-pointer"
                    >
                      {subjects.map((subject) => (
                        <option key={subject.value} value={subject.value}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black text-black">
              {filteredPYQs.length} Papers Found
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>Sorted by popularity</span>
            </div>
          </div>

          {filteredPYQs.length === 0 ? (
            <div className="bg-white border-4 border-black rounded-xl p-12 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-black text-black mb-2">No Papers Found</h3>
              <p className="text-gray-600 font-medium mb-6">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => {
                  setSelectedExam('all');
                  setSelectedYear('all');
                  setSelectedSubject('all');
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-black text-white font-black uppercase border-4 border-black hover:bg-gray-900 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPYQs.map((pyq) => (
                <div
                  key={pyq.id}
                  className="bg-white border-4 border-black rounded-xl p-6 hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative"
                >
                  {pyq.popular && (
                    <div className="absolute -top-3 -right-3 px-3 py-1 bg-yellow-400 text-black font-black text-xs rounded-full border-2 border-black rotate-12">
                      ⭐ POPULAR
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-xl font-black text-black">{pyq.exam}</h4>
                      <span 
                        className="px-2 py-1 text-white text-xs font-black rounded-full border-2 border-black"
                        style={{ backgroundColor: getDifficultyColor(pyq.difficulty) }}
                      >
                        {pyq.difficulty}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{pyq.subject}</div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Year:</span>
                      <span className="font-black text-black">{pyq.year}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Questions:</span>
                      <span className="font-black text-black">{pyq.questions}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Size:</span>
                      <span className="font-black text-black">{pyq.size}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Downloads:</span>
                      <span className="font-black text-blue-600">{pyq.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-black text-white font-black text-sm uppercase border-4 border-black hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Free
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="bg-black py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Why Students <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">Love Us</span>
              </h2>
              <p className="text-xl text-gray-400 font-medium">Everything you need to ace your exams</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white border-4 border-white rounded-xl p-6 text-center hover:scale-105 transition-all duration-300"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-black mx-auto mb-4"
                    style={{ backgroundColor: feature.color }}
                  >
                    <feature.icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-black text-black mb-2">{feature.title}</h3>
                  <p className="text-gray-600 font-medium">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 border-4 border-black rounded-3xl p-12 md:p-16 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              WANT MORE?
              <br />
              <span className="text-yellow-400">TRY MOCK TESTS</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-bold mb-8 max-w-2xl mx-auto">
              Get AI-powered analytics, All India ranking, and expert video solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing" className="px-10 py-5 bg-white text-black font-black text-xl rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 uppercase flex items-center justify-center gap-2">
                View Mock Tests
                <ArrowRight className="w-6 h-6" />
              </Link>
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

          .bg-noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.5;
          }

          .bg-grid-pattern {
            background-image: 
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-20px) translateX(10px); }
          }

          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(20px) translateX(-10px); }
          }

          .floating-element {
            animation: float 8s ease-in-out infinite;
          }

          .floating-element-delayed {
            animation: float-delayed 10s ease-in-out infinite;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default FreePYQs;