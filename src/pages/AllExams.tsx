import { useState } from 'react';
import { 
  Search, Filter, X, BookOpen, Users, 
  TrendingUp, Award, FileText, Target, Zap,
  Clock, ArrowRight, Sparkles
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const AllExams = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedPopularity, setSelectedPopularity] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Exams', icon: '📚', color: '#6B7280', count: 50 },
    { id: 'railway', name: 'Railway', icon: '🚂', color: '#FF6B35', count: 8 },
    { id: 'upsc', name: 'UPSC', icon: '🏛️', color: '#2E5CFF', count: 6 },
    { id: 'ssc', name: 'SSC', icon: '📋', color: '#8B5CF6', count: 9 },
    { id: 'banking', name: 'Banking', icon: '🏦', color: '#10B981', count: 12 },
    { id: 'defence', name: 'Defence', icon: '⚔️', color: '#DC2626', count: 7 },
    { id: 'teaching', name: 'Teaching', icon: '📚', color: '#0891B2', count: 8 },
  ];

  const exams = [
    {
      id: 1,
      name: 'SSC CGL',
      fullName: 'Staff Selection Commission Combined Graduate Level',
      category: 'ssc',
      categoryName: 'SSC',
      icon: '📋',
      color: '#8B5CF6',
      level: 'Graduate',
      posts: '8000+',
      aspirants: '25 Lakh+',
      examDate: 'July 2024',
      difficulty: 'Medium',
      avgSalary: '₹44,900',
      popular: true,
      trending: true,
      pyqs: 120,
      mockTests: 35,
      description: 'One of the most sought-after exams for central government jobs'
    },
    {
      id: 2,
      name: 'RRB NTPC',
      fullName: 'Railway Non-Technical Popular Categories',
      category: 'railway',
      categoryName: 'Railway',
      icon: '🚂',
      color: '#FF6B35',
      level: 'Graduate',
      posts: '35,000+',
      aspirants: '1.2 Crore+',
      examDate: 'Sep 2024',
      difficulty: 'Easy',
      avgSalary: '₹35,400',
      popular: true,
      trending: true,
      pyqs: 95,
      mockTests: 28,
      description: 'Largest recruitment in Indian Railways for various posts'
    },
    {
      id: 3,
      name: 'UPSC CSE',
      fullName: 'Civil Services Examination',
      category: 'upsc',
      categoryName: 'UPSC',
      icon: '🏛️',
      color: '#2E5CFF',
      level: 'Graduate',
      posts: '1000+',
      aspirants: '10 Lakh+',
      examDate: 'June 2024',
      difficulty: 'Hard',
      avgSalary: '₹56,100',
      popular: true,
      trending: true,
      pyqs: 180,
      mockTests: 42,
      description: 'India\'s most prestigious exam for IAS, IPS, IFS officers'
    },
    {
      id: 4,
      name: 'IBPS PO',
      fullName: 'Institute of Banking Personnel Selection Probationary Officer',
      category: 'banking',
      categoryName: 'Banking',
      icon: '🏦',
      color: '#10B981',
      level: 'Graduate',
      posts: '4000+',
      aspirants: '15 Lakh+',
      examDate: 'Oct 2024',
      difficulty: 'Medium',
      avgSalary: '₹57,000',
      popular: true,
      trending: false,
      pyqs: 110,
      mockTests: 32,
      description: 'Recruitment for Probationary Officers in Public Sector Banks'
    },
    {
      id: 5,
      name: 'NDA',
      fullName: 'National Defence Academy',
      category: 'defence',
      categoryName: 'Defence',
      icon: '⚔️',
      color: '#DC2626',
      level: '12th Pass',
      posts: '400+',
      aspirants: '6 Lakh+',
      examDate: 'Apr 2024',
      difficulty: 'Hard',
      avgSalary: '₹56,100',
      popular: true,
      trending: true,
      pyqs: 145,
      mockTests: 38,
      description: 'Joint training academy for Army, Navy, and Air Force'
    },
    {
      id: 6,
      name: 'CTET',
      fullName: 'Central Teacher Eligibility Test',
      category: 'teaching',
      categoryName: 'Teaching',
      icon: '📚',
      color: '#0891B2',
      level: '12th/Graduate',
      posts: 'N/A',
      aspirants: '30 Lakh+',
      examDate: 'Dec 2024',
      difficulty: 'Easy',
      avgSalary: '₹44,900',
      popular: true,
      trending: false,
      pyqs: 88,
      mockTests: 25,
      description: 'Mandatory certificate for teaching in central government schools'
    },
    {
      id: 7,
      name: 'SSC CHSL',
      fullName: 'Combined Higher Secondary Level',
      category: 'ssc',
      categoryName: 'SSC',
      icon: '📋',
      color: '#8B5CF6',
      level: '12th Pass',
      posts: '4500+',
      aspirants: '20 Lakh+',
      examDate: 'Aug 2024',
      difficulty: 'Easy',
      avgSalary: '₹25,500',
      popular: true,
      trending: false,
      pyqs: 102,
      mockTests: 28,
      description: 'Recruitment for Lower Division Clerk, Data Entry Operator'
    },
    {
      id: 8,
      name: 'RRB Group D',
      fullName: 'Railway Recruitment Board Group D',
      category: 'railway',
      categoryName: 'Railway',
      icon: '🚂',
      color: '#FF6B35',
      level: '10th Pass',
      posts: '1,03,000+',
      aspirants: '1.5 Crore+',
      examDate: 'Aug 2024',
      difficulty: 'Easy',
      avgSalary: '₹18,000',
      popular: true,
      trending: true,
      pyqs: 78,
      mockTests: 22,
      description: 'Largest recruitment for Track Maintainer, Helper, Porter'
    },
    {
      id: 9,
      name: 'SBI PO',
      fullName: 'State Bank of India Probationary Officer',
      category: 'banking',
      categoryName: 'Banking',
      icon: '🏦',
      color: '#10B981',
      level: 'Graduate',
      posts: '2000+',
      aspirants: '12 Lakh+',
      examDate: 'Nov 2024',
      difficulty: 'Hard',
      avgSalary: '₹57,000',
      popular: true,
      trending: true,
      pyqs: 125,
      mockTests: 35,
      description: 'Recruitment for PO in India\'s largest public sector bank'
    },
    {
      id: 10,
      name: 'CDS',
      fullName: 'Combined Defence Services',
      category: 'defence',
      categoryName: 'Defence',
      icon: '⚔️',
      color: '#DC2626',
      level: 'Graduate',
      posts: '450+',
      aspirants: '5 Lakh+',
      examDate: 'Apr 2024',
      difficulty: 'Medium',
      avgSalary: '₹56,100',
      popular: false,
      trending: false,
      pyqs: 132,
      mockTests: 30,
      description: 'For recruitment to Indian Military Academy, Naval Academy'
    },
    {
      id: 11,
      name: 'UPSC NDA',
      fullName: 'National Defence Academy & Naval Academy',
      category: 'upsc',
      categoryName: 'UPSC',
      icon: '🏛️',
      color: '#2E5CFF',
      level: '12th Pass',
      posts: '400+',
      aspirants: '6 Lakh+',
      examDate: 'Apr 2024',
      difficulty: 'Hard',
      avgSalary: '₹56,100',
      popular: false,
      trending: false,
      pyqs: 145,
      mockTests: 38,
      description: 'Gateway to join Indian Armed Forces as an officer'
    },
    {
      id: 12,
      name: 'UGC NET',
      fullName: 'University Grants Commission National Eligibility Test',
      category: 'teaching',
      categoryName: 'Teaching',
      icon: '📚',
      color: '#0891B2',
      level: 'Post Graduate',
      posts: 'N/A',
      aspirants: '10 Lakh+',
      examDate: 'Dec 2024',
      difficulty: 'Hard',
      avgSalary: '₹57,700',
      popular: false,
      trending: false,
      pyqs: 156,
      mockTests: 42,
      description: 'For Assistant Professor and Junior Research Fellowship'
    },
  ];

  const stats = [
    { value: '50+', label: 'Total Exams', icon: BookOpen, color: '#2E5CFF' },
    { value: '2 Cr+', label: 'Aspirants Yearly', icon: Users, color: '#10B981' },
    { value: '100%', label: 'Free Resources', icon: Award, color: '#FF6B35' },
    { value: '24/7', label: 'Support Available', icon: Clock, color: '#8B5CF6' },
  ];

  // Filter logic
  const filteredExams = exams.filter(exam => {
    const matchesCategory = selectedCategory === 'all' || exam.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || exam.level.toLowerCase().includes(selectedLevel.toLowerCase());
    const matchesPopularity = selectedPopularity === 'all' || 
      (selectedPopularity === 'popular' && exam.popular) ||
      (selectedPopularity === 'trending' && exam.trending);
    
    return matchesCategory && matchesSearch && matchesLevel && matchesPopularity;
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white shadow-2xl mb-6">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-sm uppercase tracking-tight">50+ Competitive Exams</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                ALL
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                  COMPETITIVE
                </span>
                <br />
                EXAMS
              </h1>

              <p className="text-xl md:text-2xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed mb-8">
                Complete guide to all major government exams in India. Find exam details, dates, eligibility, and preparation resources.
              </p>

              {/* Quick Search */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search exams by name or category..."
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

        {/* Category Filter */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl md:text-4xl font-black text-black">
              Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Category</span>
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
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 border-4 border-black rounded-xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] scale-105'
                    : 'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:scale-105'
                }`}
                style={{ 
                  backgroundColor: selectedCategory === category.id ? category.color + '20' : 'white'
                }}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <div className="font-black text-sm mb-1" style={{ color: category.color }}>
                  {category.name}
                </div>
                <div className="text-xs text-gray-600 font-bold">{category.count} Exams</div>
              </button>
            ))}
          </div>
        </section>

        {/* Advanced Filters */}
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
                    setSelectedLevel('all');
                    setSelectedPopularity('all');
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 hover:text-black transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Level Filter */}
                <div>
                  <label className="block text-sm font-black uppercase text-gray-700 mb-3">
                    <Target className="w-4 h-4 inline mr-2" />
                    Education Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['all', '10th', '12th', 'graduate', 'post graduate'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`px-4 py-2 font-bold text-sm border-2 border-black transition-all ${
                          selectedLevel === level
                            ? 'bg-black text-white'
                            : 'bg-white text-black hover:bg-gray-100'
                        }`}
                      >
                        {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popularity Filter */}
                <div>
                  <label className="block text-sm font-black uppercase text-gray-700 mb-3">
                    <TrendingUp className="w-4 h-4 inline mr-2" />
                    Popularity
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'all', label: 'All Exams' },
                      { value: 'popular', label: 'Popular' },
                      { value: 'trending', label: 'Trending' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedPopularity(option.value)}
                        className={`px-4 py-2 font-bold text-sm border-2 border-black transition-all ${
                          selectedPopularity === option.value
                            ? 'bg-black text-white'
                            : 'bg-white text-black hover:bg-gray-100'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
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
              {filteredExams.length} Exams Found
            </h3>
          </div>

          {filteredExams.length === 0 ? (
            <div className="bg-white border-4 border-black rounded-xl p-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-black text-black mb-2">No Exams Found</h3>
              <p className="text-gray-600 font-medium mb-6">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                  setSelectedPopularity('all');
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-black text-white font-black uppercase border-4 border-black hover:bg-gray-900 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredExams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white border-4 border-black rounded-xl p-6 hover:scale-102 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative"
                >
                  {/* Badges */}
                  <div className="absolute -top-3 -right-3 flex gap-2">
                    {exam.trending && (
                      <div className="px-3 py-1 bg-red-500 text-white font-black text-xs rounded-full border-2 border-black rotate-12">
                        🔥 TRENDING
                      </div>
                    )}
                    {exam.popular && !exam.trending && (
                      <div className="px-3 py-1 bg-yellow-400 text-black font-black text-xs rounded-full border-2 border-black rotate-12">
                        ⭐ POPULAR
                      </div>
                    )}
                  </div>

                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl border-4 border-black flex-shrink-0"
                      style={{ backgroundColor: exam.color + '20' }}
                    >
                      {exam.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl font-black text-black">{exam.name}</h3>
                        <span 
                          className="px-2 py-1 text-white text-xs font-black rounded-full border-2 border-black"
                          style={{ backgroundColor: getDifficultyColor(exam.difficulty) }}
                        >
                          {exam.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">{exam.fullName}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 font-medium mb-4 text-sm leading-relaxed">
                    {exam.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-gray-50 border-2 border-black rounded-lg">
                      <div className="text-xs text-gray-600 font-medium mb-1">Posts</div>
                      <div className="text-lg font-black text-black">{exam.posts}</div>
                    </div>
                    <div className="p-3 bg-gray-50 border-2 border-black rounded-lg">
                      <div className="text-xs text-gray-600 font-medium mb-1">Aspirants</div>
                      <div className="text-lg font-black text-black">{exam.aspirants}</div>
                    </div>
                    <div className="p-3 bg-gray-50 border-2 border-black rounded-lg">
                      <div className="text-xs text-gray-600 font-medium mb-1">Avg Salary</div>
                      <div className="text-lg font-black text-black">{exam.avgSalary}</div>
                    </div>
                    <div className="p-3 bg-gray-50 border-2 border-black rounded-lg">
                      <div className="text-xs text-gray-600 font-medium mb-1">Exam Date</div>
                      <div className="text-lg font-black text-black">{exam.examDate}</div>
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b-2 border-gray-200">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-bold text-gray-700">{exam.pyqs} PYQs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-bold text-gray-700">{exam.mockTests} Mock Tests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-bold text-gray-700">{exam.level}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-3 bg-white text-black font-black text-sm uppercase border-4 border-black hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      View Details
                    </button>
                    <button 
                      className="py-3 text-white font-black text-sm uppercase border-4 border-black hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
                      style={{ backgroundColor: exam.color }}
                    >
                      <Zap className="w-4 h-4" />
                      Start Prep
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 border-4 border-black rounded-3xl p-12 md:p-16 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              CAN'T FIND
              <br />
              <span className="text-yellow-400">YOUR EXAM?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-bold mb-8 max-w-2xl mx-auto">
              We're constantly adding new exams. Contact us to request coverage for your target exam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-5 bg-white text-black font-black text-xl rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 uppercase flex items-center justify-center gap-2">
                Request Exam
                <ArrowRight className="w-6 h-6" />
              </button>
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

export default AllExams;