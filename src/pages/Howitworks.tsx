import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserPlus, CreditCard, BookOpen, Trophy, BarChart, Award,
  CheckCircle, Download, Clock, Target, Zap, Shield,
  TrendingUp, Brain, Users, Star, ArrowRight,
  FileText, Search, Sparkles
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<'free' | 'paid'>('free');
//   const [activeStep, setActiveStep] = useState(1);

  const freeFlowSteps = [
    {
      step: 1,
      title: 'Browse Free PYQs',
      description: 'Explore 1,500+ previous year questions from 50+ competitive exams - completely free!',
      icon: Search,
      color: '#10B981',
      details: [
        'Access latest year PYQs (2024) for all major exams',
        'Filter by exam category, year, and subject',
        'Preview questions before downloading',
        'No login required for browsing'
      ]
    },
    {
      step: 2,
      title: 'Download or Practice Online',
      description: 'Choose your preferred way to study - download PDFs or practice directly on our platform',
      icon: Download,
      color: '#2E5CFF',
      details: [
        'Download PDFs for offline study',
        'Practice online with instant feedback',
        'Unlimited attempts on all questions',
        'Step-by-step solutions included'
      ]
    },
    {
      step: 3,
      title: 'Study & Improve',
      description: 'Learn from detailed solutions and track your progress as you practice',
      icon: Brain,
      color: '#8B5CF6',
      details: [
        'Detailed explanations for every question',
        'Understand concepts thoroughly',
        'Practice as many times as you want',
        '100% free forever - no hidden costs'
      ]
    }
  ];

  const paidFlowSteps = [
    {
      step: 1,
      title: 'Create Free Account',
      description: 'Sign up in seconds using email or Google - no credit card required for registration',
      icon: UserPlus,
      color: '#FF6B35',
      details: [
        'Quick registration with email/Google',
        'Secure authentication with OTP',
        'Create your profile',
        'Free to create account'
      ]
    },
    {
      step: 2,
      title: 'Choose Your Package',
      description: 'Select the mock test package that fits your preparation needs and budget',
      icon: CreditCard,
      color: '#10B981',
      details: [
        'Trial: 1 test - ₹199',
        'Best Value: 5 tests - ₹499 (save ₹496)',
        'Max Value: 10 tests - ₹799 (save ₹1,191)',
        'Secure payment via Razorpay'
      ]
    },
    {
      step: 3,
      title: 'Get Instant Credits',
      description: 'Credits are added to your account immediately after successful payment',
      icon: Zap,
      color: '#FF6B35',
      details: [
        'Credits appear instantly',
        '1 credit = 1 mock test unlock',
        'Use credits on any exam',
        'Valid for 30-180 days based on package'
      ]
    },
    {
      step: 4,
      title: 'Unlock & Take Tests',
      description: 'Use your credits to unlock mock tests and attempt them in real exam conditions',
      icon: Trophy,
      color: '#2E5CFF',
      details: [
        'Browse 50+ exam categories',
        'Use 1 credit to unlock any test',
        'Real exam interface with timer',
        'Unlimited attempts after unlocking'
      ]
    },
    {
      step: 5,
      title: 'Get Instant Results',
      description: 'Receive detailed performance analysis immediately after submitting your test',
      icon: BarChart,
      color: '#8B5CF6',
      details: [
        'Instant score and rank',
        'All India ranking comparison',
        'Question-wise analysis',
        'Time spent per question'
      ]
    },
    {
      step: 6,
      title: 'Review & Improve',
      description: 'Study solutions, track progress, and identify weak areas for targeted improvement',
      icon: Award,
      color: '#DC2626',
      details: [
        'Detailed video solutions',
        'Performance tracking graphs',
        'AI-powered weak area detection',
        'Personalized improvement plan'
      ]
    }
  ];

  const features = [
    {
      title: 'Real Exam Environment',
      description: 'Experience the actual exam interface with timer, navigation, and auto-submit',
      icon: Clock,
      color: '#FF6B35'
    },
    {
      title: 'All India Ranking',
      description: 'Compare your performance with thousands of other aspirants nationwide',
      icon: TrendingUp,
      color: '#2E5CFF'
    },
    {
      title: 'Detailed Analytics',
      description: 'Track your progress with comprehensive performance charts and insights',
      icon: BarChart,
      color: '#10B981'
    },
    {
      title: 'Expert Solutions',
      description: 'Learn from step-by-step explanations and video solutions by experts',
      icon: Brain,
      color: '#8B5CF6'
    },
    {
      title: 'Unlimited Attempts',
      description: 'Practice any unlocked test as many times as you want within validity',
      icon: Target,
      color: '#FF6B35'
    },
    {
      title: 'Secure Payments',
      description: '256-bit SSL encryption with Razorpay for safe and secure transactions',
      icon: Shield,
      color: '#10B981'
    }
  ];

  const faqs = [
    {
      q: 'What\'s the difference between Free PYQs and Mock Tests?',
      a: 'Free PYQs are actual previous year questions from past exams (latest year only). Mock Tests are professionally designed practice tests that simulate the real exam environment with timer, ranking, and detailed analytics.'
    },
    {
      q: 'How long are my credits valid?',
      a: 'Trial pack (1 test) - 30 days, Best Value (5 tests) - 90 days, Max Value (10 tests) - 180 days. Once you unlock a test, you can attempt it unlimited times within the validity period.'
    },
    {
      q: 'Can I use credits on different exams?',
      a: 'Yes! Your credits are universal. You can buy one package and use credits across any exam category - SSC, Railway, Banking, UPSC, Defence, or Teaching.'
    },
    {
      q: 'What happens after I unlock a test?',
      a: 'Once unlocked with 1 credit, you get lifetime access to that test (within validity period). You can attempt it multiple times, review solutions, and track your progress.'
    }
  ];

  const benefits = [
    { icon: CheckCircle, text: 'No hidden charges or subscriptions', color: '#10B981' },
    { icon: CheckCircle, text: 'Pay only for what you need', color: '#10B981' },
    { icon: CheckCircle, text: 'Instant access after payment', color: '#10B981' },
    { icon: CheckCircle, text: 'Money-back guarantee available', color: '#10B981' },
    { icon: CheckCircle, text: 'Practice on any device', color: '#10B981' },
    { icon: CheckCircle, text: '24/7 customer support', color: '#10B981' }
  ];

  const stats = [
    { value: '250K+', label: 'Active Users', icon: Users, color: '#2E5CFF' },
    { value: '1,500+', label: 'Free PYQs', icon: FileText, color: '#10B981' },
    { value: '500+', label: 'Mock Tests', icon: Trophy, color: '#FF6B35' },
    { value: '98%', label: 'Success Rate', icon: Star, color: '#8B5CF6' }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
        {/* Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply">
          <div className="absolute inset-0 bg-noise"></div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-black py-16 md:py-24 overflow-hidden mt-[124px]">
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
                <span className="font-bold text-sm uppercase tracking-tight">Simple & Powerful</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                HOW IT
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                  WORKS
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed mb-8">
                From free practice to paid mock tests - everything you need to ace competitive exams
              </p>
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

        {/* Tab Selector */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex justify-center">
            <div className="inline-flex bg-white border-4 border-black rounded-2xl p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <button
                onClick={() => setActiveTab('free')}
                className={`px-8 py-4 font-black text-lg uppercase transition-all duration-300 ${
                  activeTab === 'free'
                    ? 'bg-green-400 text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Free Path
              </button>
              <button
                onClick={() => setActiveTab('paid')}
                className={`px-8 py-4 font-black text-lg uppercase transition-all duration-300 ${
                  activeTab === 'paid'
                    ? 'bg-orange-400 text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Paid Path
              </button>
            </div>
          </div>
        </section>

        {/* Free Flow Steps */}
        {activeTab === 'free' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="text-center mb-12">
              <div className="inline-block px-6 py-3 bg-green-400 text-black font-black text-xl uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6 rotate-[-2deg]">
                100% Free Forever
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                Start Practicing <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">For Free</span>
              </h2>
              <p className="text-xl text-gray-600 font-medium">No credit card required. No hidden charges. Just pure learning.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {freeFlowSteps.map((step, idx) => (
                <div
                  key={step.step}
                  className="relative bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-300"
                >
                  {/* Step Number */}
                  <div 
                    className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center border-4 border-black font-black text-2xl"
                    style={{ backgroundColor: step.color, color: 'white' }}
                  >
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-black mb-6 mx-auto"
                    style={{ backgroundColor: step.color + '20' }}
                  >
                    <step.icon className="w-10 h-10" style={{ color: step.color }} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-black text-black mb-3 text-center">{step.title}</h3>
                  <p className="text-gray-600 font-medium text-center mb-6">{step.description}</p>

                  {/* Details */}
                  <div className="space-y-2">
                    {step.details.map((detail, detailIdx) => (
                      <div key={detailIdx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: step.color }} />
                        <span className="text-sm font-medium text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Arrow */}
                  {idx < freeFlowSteps.length - 1 && (
                    <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/free-pyqs"
                className="inline-flex items-center gap-3 px-10 py-5 bg-green-400 text-black font-black text-xl uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
              >
                <BookOpen className="w-6 h-6" />
                Browse Free PYQs
              </Link>
            </div>
          </section>
        )}

        {/* Paid Flow Steps */}
        {activeTab === 'paid' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="text-center mb-12">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-black text-xl uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6 rotate-[2deg]">
                Professional Mock Tests
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                Get Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Experience</span>
              </h2>
              <p className="text-xl text-gray-600 font-medium">Real exam simulation with detailed analytics and expert solutions</p>
            </div>

            <div className="space-y-8">
              {paidFlowSteps.map((step, idx) => (
                <div
                  key={step.step}
                  className={`flex flex-col md:flex-row gap-8 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Step Card */}
                  <div className="flex-1">
                    <div className="relative bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:scale-102 transition-all duration-300">
                      {/* Step Number */}
                      <div 
                        className="absolute -top-4 -left-4 w-14 h-14 rounded-full flex items-center justify-center border-4 border-black font-black text-3xl"
                        style={{ backgroundColor: step.color, color: 'white' }}
                      >
                        {step.step}
                      </div>

                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        {/* Icon */}
                        <div 
                          className="w-24 h-24 rounded-2xl flex items-center justify-center border-4 border-black flex-shrink-0"
                          style={{ backgroundColor: step.color + '20' }}
                        >
                          <step.icon className="w-12 h-12" style={{ color: step.color }} />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-3xl font-black text-black mb-3">{step.title}</h3>
                          <p className="text-lg text-gray-600 font-medium mb-6">{step.description}</p>

                          {/* Details Grid */}
                          <div className="grid sm:grid-cols-2 gap-3">
                            {step.details.map((detail, detailIdx) => (
                              <div key={detailIdx} className="flex items-start gap-2 p-3 bg-gray-50 border-2 border-gray-200 rounded-lg">
                                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: step.color }} />
                                <span className="text-sm font-medium text-gray-700">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="hidden md:flex items-center justify-center flex-shrink-0">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-black rotate-45"
                      style={{ backgroundColor: step.color }}
                    >
                      <ArrowRight className="w-8 h-8 text-white -rotate-45" />
                    </div>
                  </div>

                  {/* Placeholder for alternating layout */}
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/mock-tests"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-black text-xl uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
              >
                <Trophy className="w-6 h-6" />
                View Mock Test Packages
              </Link>
            </div>
          </section>
        )}

        {/* Features Grid */}
        <section className="bg-black py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">Us</span>
              </h2>
              <p className="text-xl text-gray-400 font-medium">Features that make a real difference in your preparation</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white border-4 border-white rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-black mb-6"
                    style={{ backgroundColor: feature.color + '20' }}
                  >
                    <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-2xl font-black text-black mb-3">{feature.title}</h3>
                  <p className="text-gray-600 font-medium">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-black rounded-3xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Benefits</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-white border-2 border-black rounded-xl"
                >
                  <benefit.icon className="w-8 h-8 flex-shrink-0" style={{ color: benefit.color }} />
                  <span className="font-bold text-lg text-black">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Questions</span>
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border-4 border-black rounded-xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-xl font-black text-black mb-3">{faq.q}</h3>
                <p className="text-gray-700 font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 border-4 border-black rounded-3xl p-12 md:p-16 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              READY TO
              <br />
              <span className="text-yellow-400">GET STARTED?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-bold mb-8 max-w-2xl mx-auto">
              Choose your path and start preparing smarter today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/free-pyqs"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-black text-xl rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 uppercase"
              >
                Start Free
              </Link>
              <Link 
                to="/pricing"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white font-black text-xl rounded-none border-4 border-white hover:bg-gray-900 transition-colors uppercase"
              >
                View Pricing
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

export default HowItWorks;