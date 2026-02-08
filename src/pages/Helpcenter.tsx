import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, BookOpen, CreditCard, Trophy, FileText, Shield,
  MessageCircle, Mail, Phone, ChevronDown, ChevronRight,
  HelpCircle, Info, User, Settings, Star
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen, color: '#6B7280', count: 28 },
    { id: 'account', name: 'Account & Login', icon: User, color: '#2E5CFF', count: 6 },
    { id: 'payment', name: 'Payment & Credits', icon: CreditCard, color: '#10B981', count: 8 },
    { id: 'mock-tests', name: 'Mock Tests', icon: Trophy, color: '#FF6B35', count: 7 },
    { id: 'pyqs', name: 'Free PYQs', icon: FileText, color: '#8B5CF6', count: 4 },
    { id: 'technical', name: 'Technical Issues', icon: Settings, color: '#DC2626', count: 3 }
  ];

  const faqs = [
    // Account & Login
    {
      id: 1,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Creating an account is simple! Click on "Sign Up" in the top right corner, then choose to sign up with your email or Google account. If using email, you\'ll receive an OTP for verification. Enter the OTP and complete your profile. That\'s it - your account is ready!',
      popular: true
    },
    {
      id: 2,
      category: 'account',
      question: 'I forgot my password. How do I reset it?',
      answer: 'Click on "Forgot Password" on the login page. Enter your registered email address and click "Send Reset Link". You\'ll receive an email with a password reset link valid for 1 hour. Click the link and set your new password. For security, make sure to use a strong password with at least 8 characters.',
      popular: true
    },
    {
      id: 3,
      category: 'account',
      question: 'Can I change my registered email address?',
      answer: 'Yes! Go to your Profile Settings from the dashboard. Click "Edit Profile" and update your email address. You\'ll need to verify the new email with an OTP before the change takes effect. This ensures account security.',
      popular: false
    },
    {
      id: 4,
      category: 'account',
      question: 'Why am I not receiving OTP emails?',
      answer: 'First, check your spam/junk folder. If not there, ensure you entered the correct email address. Sometimes emails can be delayed by 2-3 minutes. If you still don\'t receive it, click "Resend OTP" after 60 seconds. Contact support if the issue persists.',
      popular: false
    },
    {
      id: 5,
      category: 'account',
      question: 'Can I use Google login instead of email?',
      answer: 'Absolutely! You can sign up or log in using your Google account. It\'s faster and you don\'t need to remember a separate password. Click "Continue with Google" on the login/signup page and authorize access. Your account will be linked to your Google email.',
      popular: false
    },
    {
      id: 6,
      category: 'account',
      question: 'How do I delete my account?',
      answer: 'We\'re sorry to see you go! To delete your account, go to Settings > Account > Delete Account. You\'ll need to confirm this action. Please note: all your data, credits, and purchase history will be permanently deleted and cannot be recovered. Active subscriptions will be cancelled.',
      popular: false
    },

    // Payment & Credits
    {
      id: 7,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods through Razorpay including Credit Cards, Debit Cards, Net Banking, UPI (GPay, PhonePe, Paytm), and Wallets. All payments are secured with 256-bit SSL encryption and are processed instantly.',
      popular: true
    },
    {
      id: 8,
      category: 'payment',
      question: 'How does the credit system work?',
      answer: 'When you purchase a package, you receive credits equal to the number of tests (1 credit = 1 mock test). Credits are universal - you can use them on ANY exam category. Once you unlock a test with 1 credit, you can attempt it unlimited times within the validity period.',
      popular: true
    },
    {
      id: 9,
      category: 'payment',
      question: 'When do my credits expire?',
      answer: 'Credit validity depends on your package: Trial (1 test) - 30 days, Best Value (5 tests) - 90 days, Max Value (10 tests) - 180 days. The countdown starts from your purchase date. Tests already unlocked can be accessed until the end of validity period.',
      popular: true
    },
    {
      id: 10,
      category: 'payment',
      question: 'Can I get a refund?',
      answer: 'Yes! We offer a 7-day money-back guarantee on all packages. If you\'re not satisfied with the quality, contact us within 7 days of purchase for a full refund. Refunds are processed within 5-7 business days to your original payment method.',
      popular: true
    },
    {
      id: 11,
      category: 'payment',
      question: 'I made a payment but didn\'t receive credits. What should I do?',
      answer: 'Don\'t worry! First, check your email for payment confirmation. Credits are usually added instantly, but can take up to 10 minutes in rare cases. If you still don\'t see them, contact our support team with your transaction ID or payment screenshot.',
      popular: false
    },
    {
      id: 12,
      category: 'payment',
      question: 'Can I transfer credits to another account?',
      answer: 'No, credits are non-transferable and tied to your account only. This is to prevent misuse and ensure fair usage. However, you can use your credits on any exam category within your own account.',
      popular: false
    },
    {
      id: 13,
      category: 'payment',
      question: 'Do you offer student discounts?',
      answer: 'We regularly run promotional offers and discounts during exam seasons and festivals. Follow us on social media or subscribe to our newsletter to get notified about special deals and discount codes.',
      popular: false
    },
    {
      id: 14,
      category: 'payment',
      question: 'How can I download my payment invoice?',
      answer: 'Go to your Dashboard > Payment History. Click on the transaction you want an invoice for, then click "Download Invoice". A PDF will be generated with all payment details including GST breakdown (if applicable).',
      popular: false
    },

    // Mock Tests
    {
      id: 15,
      category: 'mock-tests',
      question: 'How do I start a mock test?',
      answer: 'Browse available tests from the Mock Tests page. Click on any test to see details. If you have credits, click "Unlock with 1 Credit". Once unlocked, click "Start Test" whenever you\'re ready. The test will open in full-screen mode with a timer.',
      popular: true
    },
    {
      id: 16,
      category: 'mock-tests',
      question: 'Can I pause a test and resume later?',
      answer: 'No, once you start a test, the timer runs continuously and cannot be paused. This simulates real exam conditions. However, if you close the browser accidentally, you can resume from where you left off within 5 minutes. After that, the test auto-submits.',
      popular: true
    },
    {
      id: 17,
      category: 'mock-tests',
      question: 'How many times can I attempt a test?',
      answer: 'Once you unlock a test, you can attempt it unlimited times within your package validity period. Each attempt is saved separately, so you can track your improvement over time. There\'s no limit on the number of attempts.',
      popular: true
    },
    {
      id: 18,
      category: 'mock-tests',
      question: 'When will I get my test results?',
      answer: 'Results are generated instantly after you submit the test! You\'ll see your score, All India rank, percentile, and detailed performance analysis immediately. Solutions and explanations are also available right away.',
      popular: true
    },
    {
      id: 19,
      category: 'mock-tests',
      question: 'How is All India Ranking calculated?',
      answer: 'Your rank is calculated based on your score compared to all other students who have attempted that specific test. Rankings update in real-time as more students take the test. Higher scores get better ranks.',
      popular: false
    },
    {
      id: 20,
      category: 'mock-tests',
      question: 'Can I review my answers after submitting?',
      answer: 'Yes! After submission, you can review all questions, see correct answers, your selected answers, and detailed explanations. You can also see time spent on each question and subject-wise performance breakdown.',
      popular: false
    },
    {
      id: 21,
      category: 'mock-tests',
      question: 'Are mock tests available in multiple languages?',
      answer: 'Currently, our mock tests are available in English and Hindi for most exams. We\'re working on adding more regional languages. You can select your preferred language before starting the test.',
      popular: false
    },

    // Free PYQs
    {
      id: 22,
      category: 'pyqs',
      question: 'Are PYQs really 100% free?',
      answer: 'Yes! All previous year questions for the latest year (2024) are completely free. No hidden charges, no credit card required. You can download PDFs or practice online unlimited times without any restrictions.',
      popular: true
    },
    {
      id: 23,
      category: 'pyqs',
      question: 'How do I download PYQ PDFs?',
      answer: 'Go to the Free PYQs page, browse or search for your exam. Click on any PYQ paper to view details, then click the "Download PDF" button. The file will download immediately. No login required for downloading.',
      popular: true
    },
    {
      id: 24,
      category: 'pyqs',
      question: 'Can I practice PYQs online?',
      answer: 'Absolutely! Besides downloading, you can practice PYQs online directly on our platform. Select a paper, click "Practice Online", and solve questions with instant answer checking. Solutions are provided for each question.',
      popular: false
    },
    {
      id: 25,
      category: 'pyqs',
      question: 'Why are only 2024 papers free?',
      answer: 'We provide the latest year papers for free to help students access recent exam patterns and questions. Older years (2023, 2022, etc.) require significant resources to maintain and are included in our paid mock test packages.',
      popular: false
    },

    // Technical Issues
    {
      id: 26,
      category: 'technical',
      question: 'The website is loading slowly. What should I do?',
      answer: 'Try these steps: 1) Clear your browser cache and cookies, 2) Try a different browser (Chrome recommended), 3) Check your internet connection, 4) Disable browser extensions temporarily. If issues persist, contact our support team.',
      popular: false
    },
    {
      id: 27,
      category: 'technical',
      question: 'I\'m getting an error during payment. Help!',
      answer: 'Payment errors can occur due to: 1) Insufficient balance, 2) Bank server issues, 3) Card limit exceeded, 4) Network timeout. Try again after 15 minutes or use a different payment method. If money was deducted but credits not received, contact support immediately.',
      popular: false
    },
    {
      id: 28,
      category: 'technical',
      question: 'Can I use the platform on mobile?',
      answer: 'Yes! Our platform is fully responsive and works perfectly on mobile phones and tablets. We recommend using Chrome or Safari browsers for the best experience. You can take tests, download PYQs, and access all features on mobile.',
      popular: false
    }
  ];

  const toggleFaq = (id: number) => {
    if (openFaqs.includes(id)) {
      setOpenFaqs(openFaqs.filter(faqId => faqId !== id));
    } else {
      setOpenFaqs([...openFaqs, id]);
    }
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFaqs = faqs.filter(faq => faq.popular);

  const quickLinks = [
    { title: 'Getting Started Guide', icon: BookOpen, link: '/how-it-works', color: '#2E5CFF' },
    { title: 'Pricing & Packages', icon: CreditCard, link: '/pricing', color: '#10B981' },
    { title: 'Mock Test Demo', icon: Trophy, link: '/mock-tests', color: '#FF6B35' },
    { title: 'Free PYQs', icon: FileText, link: '/free-pyqs', color: '#8B5CF6' }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'support@pyqpb.com',
      subtitle: 'Response within 24 hours',
      color: '#2E5CFF',
      action: 'mailto:support@pyqpb.com'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our team',
      subtitle: 'Available 9 AM - 9 PM IST',
      color: '#10B981',
      action: '#'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: '+91 XXX XXX XXXX',
      subtitle: 'Mon-Sat, 10 AM - 6 PM',
      color: '#FF6B35',
      action: 'tel:+91XXXXXXXXXX'
    }
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
                <HelpCircle className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-sm uppercase tracking-tight">We're Here to Help</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                HELP
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                  CENTER
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed mb-8">
                Find answers to common questions, guides, and get support
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for help articles, FAQs, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 text-lg font-bold border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.link}
                className="group bg-white border-4 border-black rounded-xl p-6 hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center border-4 border-black mb-4"
                  style={{ backgroundColor: link.color + '20' }}
                >
                  <link.icon className="w-7 h-7" style={{ color: link.color }} />
                </div>
                <h3 className="text-lg font-black text-black mb-2">{link.title}</h3>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-600 group-hover:text-black transition-colors">
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
              Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Category</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
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
                <category.icon 
                  className="w-10 h-10 mx-auto mb-3" 
                  style={{ color: category.color }} 
                />
                <div className="font-black text-sm mb-1" style={{ color: category.color }}>
                  {category.name}
                </div>
                <div className="text-xs text-gray-600 font-bold">{category.count} FAQs</div>
              </button>
            ))}
          </div>
        </section>

        {/* Popular FAQs */}
        {selectedCategory === 'all' && searchQuery === '' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <h2 className="text-3xl font-black text-black">Popular Questions</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {popularFaqs.slice(0, 6).map((faq) => (
                <div
                  key={faq.id}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 border-4 border-black rounded-xl p-6 hover:scale-102 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <HelpCircle className="w-6 h-6 flex-shrink-0 text-orange-600 mt-1" />
                    <h3 className="text-lg font-black text-black leading-tight">{faq.question}</h3>
                  </div>
                  <p className="text-sm text-gray-700 font-medium leading-relaxed line-clamp-3 mb-4">
                    {faq.answer}
                  </p>
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    Read Full Answer
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black text-black">
              {selectedCategory === 'all' ? 'All Questions' : categories.find(c => c.id === selectedCategory)?.name}
              <span className="text-gray-400 ml-3">({filteredFaqs.length})</span>
            </h2>

            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 hover:text-black transition-colors"
              >
                Clear Filter
              </button>
            )}
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="bg-white border-4 border-black rounded-xl p-12 text-center">
              <HelpCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-black text-black mb-2">No Results Found</h3>
              <p className="text-gray-600 font-medium mb-6">
                Try adjusting your search or browse all categories
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-black text-white font-black uppercase border-4 border-black hover:bg-gray-900 transition-colors"
              >
                View All FAQs
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white border-4 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <span className="font-black text-lg text-black pr-4">{faq.question}</span>
                    </div>
                    <ChevronDown 
                      className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                        openFaqs.includes(faq.id) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaqs.includes(faq.id) ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="p-6 pt-0 border-t-2 border-gray-100">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <p className="text-gray-700 font-medium leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Contact Support */}
        <section className="bg-black py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Still Need <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">Help?</span>
              </h2>
              <p className="text-xl text-gray-400 font-medium">Our support team is ready to assist you</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {contactMethods.map((method, idx) => (
                <a
                  key={idx}
                  href={method.action}
                  className="bg-white border-4 border-white rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] text-center"
                >
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-black mb-6 mx-auto"
                    style={{ backgroundColor: method.color + '20' }}
                  >
                    <method.icon className="w-10 h-10" style={{ color: method.color }} />
                  </div>
                  <h3 className="text-2xl font-black text-black mb-2">{method.title}</h3>
                  <p className="text-lg font-bold mb-1" style={{ color: method.color }}>{method.description}</p>
                  <p className="text-sm text-gray-600 font-medium">{method.subtitle}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Helpful Resources */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-4 border-black rounded-3xl p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
                Helpful <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Resources</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: BookOpen, title: 'User Guide', desc: 'Complete platform guide', link: '/how-it-works' },
                { icon: Trophy, title: 'Mock Test Tips', desc: 'Maximize your scores', link: '/blog' },
                { icon: CreditCard, title: 'Payment Guide', desc: 'Secure transactions', link: '/pricing' },
                { icon: Shield, title: 'Privacy Policy', desc: 'Your data is safe', link: '/privacy' }
              ].map((resource, idx) => (
                <Link
                  key={idx}
                  to={resource.link}
                  className="flex flex-col items-center text-center p-6 bg-white border-2 border-black rounded-xl hover:scale-105 transition-all duration-300"
                >
                  <resource.icon className="w-12 h-12 text-purple-600 mb-3" />
                  <h3 className="font-black text-lg text-black mb-1">{resource.title}</h3>
                  <p className="text-sm text-gray-600 font-medium">{resource.desc}</p>
                </Link>
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

          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default HelpCenter;