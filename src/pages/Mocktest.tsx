import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Target, CheckCircle, Brain, ChevronRight, Star, Shield, BarChart, Users,
  Trophy, Timer, FileText, Loader2
} from 'lucide-react';
import { mockTestApi, type MockTestSummary } from '../api/Mocktest.api';
import { packageApi, type Package } from '../api/Package.api';
import { examApi, type Exam } from '../api/Exam.api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'Railway': '🚂',
    'UPSC': '🏛️',
    'SSC': '📋',
    'Banking': '🏦',
    'Defence': '⚔️',
    'Teaching': '📚',
    'Police': '👮',
    'State': '🗺️'
  };
  return icons[category] || '📄';
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Railway': '#FF6B35',
    'UPSC': '#2E5CFF',
    'SSC': '#8B5CF6',
    'Banking': '#10B981',
    'Defence': '#DC2626',
    'Teaching': '#0891B2',
    'Police': '#6366F1',
    'State': '#14B8A6'
  };
  return colors[category] || '#6B7280';
}

const MockTests = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // ← ADDED
  
  const [mockTests, setMockTests] = useState<MockTestSummary[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Ref for scrolling to tests
  const testsRef = useRef<HTMLDivElement>(null);

  // Load data
  useEffect(() => {
    Promise.all([
      mockTestApi.getAll({ page: 1, limit: 50 }),
      packageApi.getAll(),
      examApi.getAll({ limit: 20 })
    ])
      .then(([testsRes, pkgsRes, examsRes]) => {
        setMockTests(testsRes.data.data || []);
        setPackages(pkgsRes.data.data || []);
        setExams(examsRes.data.data || []);
      })
      .catch(() => toast.error('Failed to load data'))
      .finally(() => setLoading(false));
  }, []);

  // Group tests by category using exams data
  const examCategories = exams.reduce((acc: any[], exam) => {
    const existing = acc.find(c => c.id === exam.category);
    // Count tests that belong to this exam (by matching exam._id)
    const testsInCategory = mockTests.filter(t => 
      exams.find(e => e._id === t.exam._id && e.category === exam.category)
    ).length;
    
    if (existing) {
      existing.tests = testsInCategory;
      if (!existing.exams.includes(exam.shortName)) {
        existing.exams.push(exam.shortName);
      }
    } else {
      acc.push({
        id: exam.category,
        name: exam.category,
        icon: getCategoryIcon(exam.category),
        color: getCategoryColor(exam.category),
        tests: testsInCategory,
        exams: [exam.shortName],
        popular: ['Railway', 'UPSC', 'SSC'].includes(exam.category)
      });
    }
    return acc;
  }, []);

  // Create exam ID to category map for filtering
  const examCategoryMap = exams.reduce((map, exam) => {
    map[exam._id] = exam.category;
    return map;
  }, {} as Record<string, string>);

  const filteredTests = selectedCategory === 'all' 
    ? mockTests 
    : mockTests.filter(t => examCategoryMap[t.exam._id] === selectedCategory);

  // Handler for category selection with scroll
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Scroll to tests section after a short delay to let state update
    setTimeout(() => {
      testsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const features = [
    {
      icon: Timer,
      title: 'Real Exam Environment',
      description: 'Experience the actual exam interface with time limits and pressure',
      color: '#2E5CFF'
    },
    {
      icon: BarChart,
      title: 'Detailed Analytics',
      description: 'Get comprehensive insights on your strengths and weaknesses',
      color: '#8B5CF6'
    },
    {
      icon: Users,
      title: 'All India Ranking',
      description: 'Compare your performance with thousands of other aspirants',
      color: '#10B981'
    },
    {
      icon: Brain,
      title: 'AI Recommendations',
      description: 'Personalized study plan based on your performance patterns',
      color: '#FF6B35'
    }
  ];

  const benefits = [
    'Latest exam pattern & syllabus',
    'Questions by subject matter experts',
    'Detailed solutions with explanations',
    'Performance tracking over time',
    'Sectional & overall time analysis',
    'Identify weak areas instantly',
    'Mobile & desktop compatible',
    'Unlimited attempts with credits'
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      exam: 'SSC CGL',
      rank: 'AIR 142',
      avatar: '👨‍💼',
      quote: 'Mock tests helped me understand time management. Got selected in first attempt!',
      rating: 5
    },
    {
      name: 'Priya Singh',
      exam: 'IBPS PO',
      rank: 'Selected',
      avatar: '👩‍💼',
      quote: 'The analytics feature is amazing. I could track my improvement daily.',
      rating: 5
    },
    {
      name: 'Amit Kumar',
      exam: 'RRB NTPC',
      rank: 'AIR 89',
      avatar: '👨‍🎓',
      quote: 'Best investment for exam prep. All India ranking motivated me to improve.',
      rating: 5
    }
  ];

  const stats = [
    { value: mockTests.length + '+', label: 'Mock Tests', icon: FileText },
    { value: '98%', label: 'Selection Rate', icon: Trophy },
    { value: '4.9/5', label: 'Average Rating', icon: Star },
    { value: user ? `${user.credits || 0}` : '0', label: 'Your Credits', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply">
        <div className="absolute inset-0 bg-noise"></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-black py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-grid-pattern"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-element absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="floating-element-delayed absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white shadow-2xl mb-6">
              <Target className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-sm uppercase tracking-tight">Premium Mock Tests</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6">
              PRACTICE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                LIKE A
              </span>
              <br />
              CHAMPION
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 font-bold max-w-3xl mx-auto leading-relaxed mb-8">
              Take professional mock tests in real exam environment. Track your performance and improve with AI-powered analytics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing" className="px-10 py-5 bg-white text-black font-black text-xl rounded-none border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 uppercase">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white border-4 border-black rounded-xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-300 text-center"
            >
              <stat.icon className="w-10 h-10 mx-auto mb-3 text-blue-600" />
              <div className="text-3xl md:text-4xl font-black text-black mb-1">{stat.value}</div>
              <div className="text-sm font-bold text-gray-600 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Exam Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Exam</span>
          </h2>
          <p className="text-xl text-gray-600 font-medium">Select from {exams.length}+ competitive exams</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            {/* Compact grid categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div
                onClick={() => handleCategoryClick('all')}
                className={`p-4 border-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] scale-105 bg-blue-50'
                    : 'border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">📚</div>
                  <div>
                    <div className="text-2xl font-black text-blue-600">{mockTests.length}</div>
                    <div className="text-xs font-bold text-gray-600 uppercase">Tests</div>
                  </div>
                </div>
                <h3 className="text-lg font-black text-black">All Categories</h3>
              </div>

              {examCategories.map((exam: any) => (
                <div
                  key={exam.id}
                  onClick={() => handleCategoryClick(exam.id)}
                  className={`relative p-4 border-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedCategory === exam.id
                      ? 'border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] scale-105'
                      : 'border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                  style={{ backgroundColor: selectedCategory === exam.id ? exam.color + '20' : 'white' }}
                >
                  {exam.popular && (
                    <div className="absolute -top-2 -right-2 px-2 py-1 bg-red-500 text-white font-black text-xs rounded-full border-2 border-black">
                      HOT
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl">{exam.icon}</div>
                    <div>
                      <div className="text-2xl font-black" style={{ color: exam.color }}>{exam.tests}</div>
                      <div className="text-xs font-bold text-gray-600 uppercase">Tests</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-black mb-2">{exam.name}</h3>
                  
                  <div className="flex flex-wrap gap-1">
                    {exam.exams.slice(0, 2).map((subExam: string) => (
                      <span
                        key={subExam}
                        className="px-2 py-0.5 bg-gray-100 border border-black rounded text-xs font-bold truncate"
                      >
                        {subExam}
                      </span>
                    ))}
                    {exam.exams.length > 2 && (
                      <span className="text-xs font-bold text-gray-600">+{exam.exams.length - 2}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Test List - FIXED: Removed nested Link issue */}
            <div ref={testsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.slice(0, 6).map((test) => {
                const testCategory = examCategoryMap[test.exam._id] || 'General';
                return (
                  <div
                    key={test._id}
                    className="bg-white border-4 border-black rounded-xl p-6 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="px-3 py-1 bg-purple-100 border-2 border-purple-600 text-purple-800 text-xs font-black uppercase rounded-full">
                        {testCategory}
                      </span>
                      <span className="px-2 py-1 bg-yellow-400 border-2 border-black text-xs font-black rounded-full">
                        {test.difficulty}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-black mb-2 line-clamp-2">{test.name}</h3>
                    <p className="text-sm text-gray-600 font-medium mb-4">{test.exam.shortName}</p>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center p-2 bg-gray-50 border-2 border-gray-200 rounded">
                        <div className="text-xs text-gray-500">Questions</div>
                        <div className="font-black text-sm">{test.totalQuestions}</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 border-2 border-gray-200 rounded">
                        <div className="text-xs text-gray-500">Duration</div>
                        <div className="font-black text-sm">{test.duration}m</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 border-2 border-gray-200 rounded">
                        <div className="text-xs text-gray-500">Marks</div>
                        <div className="font-black text-sm">{test.totalMarks}</div>
                      </div>
                    </div>

                    {/* FIXED: Using navigate() for more reliable navigation */}
                    <button
                      onClick={() => {
                        console.log('Navigating to test:', test._id);
                        navigate(`/mock-tests/${test._id}`);
                      }}
                      className="block w-full py-3 bg-black text-white font-black text-sm uppercase border-2 border-black hover:bg-blue-600 transition-all text-center cursor-pointer"
                    >
                      View Test →
                    </button>
                  </div>
                );
              })}
            </div>

            {filteredTests.length > 6 && (
              <div className="text-center mt-8">
                <p className="text-gray-600 font-bold">Showing 6 of {filteredTests.length} tests</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* Pricing Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Simple <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Pricing</span>
            </h2>
            <p className="text-xl text-gray-600 font-medium">Choose the plan that fits your preparation strategy</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {packages.map((pkg, idx) => (
              <div
                key={pkg._id}
                className={`relative bg-white border-4 border-black rounded-2xl p-8 transition-all duration-300 ${
                  idx === 1 ? 'transform scale-105 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]' : 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                } hover:scale-105`}
              >
                {idx === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-orange-500 text-white font-black text-sm uppercase border-4 border-black rotate-[-2deg]">
                    Best Value
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-6xl font-black text-black mb-2">{pkg.credits}</div>
                  <div className="text-xl font-bold text-gray-600 uppercase mb-4">Credits</div>
                  
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-5xl font-black text-black">₹{pkg.price}</span>
                  </div>
                  
                  <div className="text-sm text-gray-500 font-medium">Valid for {pkg.validityDays} days</div>
                </div>

                <div className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/pricing"
                  className="block w-full py-4 bg-black text-white font-black text-lg uppercase border-4 border-black hover:bg-blue-600 transition-all duration-200 text-center"
                  style={{ boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)' }}
                >
                  Choose Plan
                </Link>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto p-6 bg-green-100 border-4 border-green-600 rounded-xl text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-green-600" />
              <div className="text-2xl font-black text-green-900">7-Day Money Back Guarantee</div>
            </div>
            <p className="text-green-800 font-medium">
              Not satisfied? Get 100% refund within 7 days, no questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            Why Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Mock Tests?</span>
          </h2>
          <p className="text-xl text-gray-600 font-medium">Professional features to accelerate your preparation</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group p-8 bg-white border-4 border-black rounded-2xl hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-black mb-6 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: feature.color }}
              >
                <feature.icon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-black text-black mb-3">{feature.title}</h3>
              <p className="text-gray-600 font-medium leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-50 border-4 border-black rounded-xl hover:bg-white transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center border-2 border-black flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-black" />
                </div>
                <span className="text-sm font-bold text-gray-900">{benefit}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-black py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white opacity-5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Success <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">Stories</span>
            </h2>
            <p className="text-xl text-gray-400 font-medium">Hear from students who cracked their exams</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white border-4 border-white rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-1 hover:translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 font-medium italic mb-6">"{testimonial.quote}"</p>
                
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-black text-black text-lg">{testimonial.name}</div>
                    <div className="text-purple-600 font-bold text-sm">{testimonial.exam}</div>
                    <div className="inline-block px-2 py-1 bg-yellow-400 text-black font-black text-xs rounded-full border-2 border-black mt-1">
                      {testimonial.rank}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 border-4 border-black rounded-3xl p-12 md:p-16 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            START PRACTICING
            <br />
            <span className="text-yellow-400">TODAY</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-bold mb-8 max-w-2xl mx-auto">
            Join thousands of students who trust us for their exam preparation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing" className="px-10 py-5 bg-white text-black font-black text-xl rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 uppercase">
              Buy Mock Tests
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

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(30px) translateX(-20px); }
        }

        .floating-element {
          animation: float 8s ease-in-out infinite;
        }

        .floating-element-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default MockTests;