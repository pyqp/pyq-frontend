import { useState } from 'react';
import { 
  Target, CheckCircle, Brain,
  ChevronRight, Star, Shield, BarChart, Users,
  ArrowRight, Trophy, Timer, FileText
} from 'lucide-react';
import Navbar from '../../src/pages/Navbar';
import Footer from '../../src/pages/Footer';

const MockTest = () => {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('5-tests');

  const pricingPlans = [
    {
      id: '1-test',
      tests: 1,
      price: 199,
      originalPrice: 199,
      savings: 0,
      badge: 'Trial',
      popular: false,
      color: '#8B5CF6',
      features: [
        'Access to 1 mock test',
        'Detailed performance report',
        'Answer key with solutions',
        'Valid for 30 days'
      ]
    },
    {
      id: '5-tests',
      tests: 5,
      price: 499,
      originalPrice: 995,
      savings: 496,
      badge: 'Best Value',
      popular: true,
      color: '#FF6B35',
      features: [
        'Access to 5 mock tests',
        'Advanced analytics dashboard',
        'All India rank comparison',
        'Expert video solutions',
        'Valid for 90 days'
      ]
    },
    {
      id: '10-tests',
      tests: 10,
      price: 799,
      originalPrice: 1990,
      savings: 1191,
      badge: 'Max Value',
      popular: false,
      color: '#10B981',
      features: [
        'Access to 10 mock tests',
        'Premium analytics & insights',
        'All India rank tracking',
        'Personalized improvement plan',
        'Expert doubt resolution',
        'Valid for 180 days'
      ]
    }
  ];

  const examCategories = [
    {
      id: 'railway',
      name: 'Railway',
      icon: '🚂',
      color: '#FF6B35',
      tests: 25,
      exams: ['RRB NTPC', 'RRB Group D', 'RRB JE', 'RRB ALP'],
      popular: true
    },
    {
      id: 'upsc',
      name: 'UPSC',
      icon: '🏛️',
      color: '#2E5CFF',
      tests: 30,
      exams: ['UPSC CSE', 'UPSC CDS', 'UPSC NDA', 'UPSC CAPF'],
      popular: true
    },
    {
      id: 'ssc',
      name: 'SSC',
      icon: '📋',
      color: '#8B5CF6',
      tests: 35,
      exams: ['SSC CGL', 'SSC CHSL', 'SSC MTS', 'SSC CPO'],
      popular: true
    },
    {
      id: 'banking',
      name: 'Banking',
      icon: '🏦',
      color: '#10B981',
      tests: 28,
      exams: ['IBPS PO', 'SBI PO', 'RBI Grade B', 'IBPS Clerk'],
      popular: false
    },
    {
      id: 'defence',
      name: 'Defence',
      icon: '⚔️',
      color: '#DC2626',
      tests: 20,
      exams: ['NDA', 'CDS', 'AFCAT', 'Army GD'],
      popular: false
    },
    {
      id: 'teaching',
      name: 'Teaching',
      icon: '📚',
      color: '#0891B2',
      tests: 22,
      exams: ['CTET', 'UGC NET', 'KVS', 'DSSSB'],
      popular: false
    }
  ];

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
    'Attempt tests unlimited times'
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
    { value: '50K+', label: 'Tests Attempted Daily', icon: FileText },
    { value: '98%', label: 'Selection Rate', icon: Trophy },
    { value: '4.9/5', label: 'Average Rating', icon: Star },
    { value: '250K+', label: 'Active Users', icon: Users }
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden pt-[124px]">
      {/* pt-[124px] = 44px announcement + 80px navbar */}
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply">
        <div className="absolute inset-0 bg-noise"></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-black py-20 md:py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-grid-pattern"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        </div>

        {/* Floating Elements */}
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
              <button className="px-10 py-5 bg-white text-black font-black text-xl rounded-none border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 uppercase">
                View Pricing
              </button>
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
          <p className="text-xl text-gray-600 font-medium">Select from 50+ competitive exams</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {examCategories.map((exam) => (
            <div
              key={exam.id}
              onClick={() => setSelectedExam(exam.id)}
              className={`relative p-6 border-4 rounded-xl cursor-pointer transition-all duration-300 ${
                selectedExam === exam.id
                  ? 'border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] scale-105'
                  : 'border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:scale-102'
              }`}
              style={{ backgroundColor: selectedExam === exam.id ? exam.color + '20' : 'white' }}
            >
              {exam.popular && (
                <div className="absolute -top-3 -right-3 px-3 py-1 bg-red-500 text-white font-black text-xs rounded-full border-2 border-black rotate-12">
                  HOT
                </div>
              )}
              
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{exam.icon}</div>
                <div className="text-right">
                  <div className="text-2xl font-black" style={{ color: exam.color }}>{exam.tests}</div>
                  <div className="text-xs font-bold text-gray-600 uppercase">Tests</div>
                </div>
              </div>

              <h3 className="text-2xl font-black text-black mb-2">{exam.name}</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {exam.exams.slice(0, 2).map((subExam) => (
                  <span
                    key={subExam}
                    className="px-2 py-1 bg-gray-100 border-2 border-black rounded-md text-xs font-bold"
                  >
                    {subExam}
                  </span>
                ))}
                {exam.exams.length > 2 && (
                  <span className="px-2 py-1 text-xs font-bold text-gray-600">
                    +{exam.exams.length - 2} more
                  </span>
                )}
              </div>

              <button
                className="w-full py-3 bg-black text-white font-black text-sm uppercase border-2 border-black hover:bg-white hover:text-black transition-all duration-200 flex items-center justify-center gap-2"
              >
                View Tests
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
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
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative bg-white border-4 border-black rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
                  plan.popular ? 'transform scale-105 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]' : 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                } ${selectedPlan === plan.id ? 'ring-4 ring-offset-4' : ''} hover:scale-105`}
                style={{ 
                  outlineColor: selectedPlan === plan.id ? plan.color : 'transparent',
                  outlineStyle: selectedPlan === plan.id ? 'solid' : 'none',
                  outlineWidth: selectedPlan === plan.id ? '4px' : '0px',
                  outlineOffset: '4px'
                }}
              >
                {plan.popular && (
                  <div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 text-white font-black text-sm uppercase border-4 border-black rotate-[-2deg]"
                    style={{ backgroundColor: plan.color }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-6xl font-black text-black mb-2">{plan.tests}</div>
                  <div className="text-xl font-bold text-gray-600 uppercase mb-4">Mock Tests</div>
                  
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-5xl font-black text-black">₹{plan.price}</span>
                  </div>
                  
                  {plan.savings > 0 && (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-400 line-through text-lg">₹{plan.originalPrice}</span>
                      <span className="px-2 py-1 bg-green-400 text-black font-black text-xs rounded-full border-2 border-black">
                        Save ₹{plan.savings}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                      <span className="text-sm font-medium text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="w-full py-4 font-black text-lg uppercase border-4 border-black transition-all duration-200 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: selectedPlan === plan.id ? plan.color : 'black',
                    color: selectedPlan === plan.id ? 'black' : 'white',
                    boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '3px 3px 0px 0px rgba(0,0,0,1)';
                    e.currentTarget.style.transform = 'translate(3px, 3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '6px 6px 0px 0px rgba(0,0,0,1)';
                    e.currentTarget.style.transform = 'translate(0, 0)';
                  }}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>

          {/* Money Back Guarantee */}
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

        {/* Benefits Grid */}
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
            Join 250,000+ students who trust us for their exam preparation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-white text-black font-black text-xl rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 uppercase">
              Buy Mock Tests
            </button>
            <button className="px-10 py-5 bg-black text-white font-black text-xl rounded-none border-4 border-white hover:bg-white hover:text-black transition-all duration-300 uppercase">
              Try Free Demo
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
      `}</style>
    </div>
    <Footer/>
    </>
  );
};

export default MockTest;