import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, HelpCircle, ChevronDown, CheckCircle, Info,
  User, CreditCard, Trophy, FileText, Settings,
  BookOpen, Clock,
  MessageCircle, Mail, Star, Filter, X
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const [showOnlyPopular, setShowOnlyPopular] = useState(false);

  const categories = [
    { id: 'all', name: 'All FAQs', icon: BookOpen, color: '#6B7280', count: 35 },
    { id: 'general', name: 'General', icon: Info, color: '#2E5CFF', count: 5 },
    { id: 'account', name: 'Account', icon: User, color: '#10B981', count: 6 },
    { id: 'payment', name: 'Payment', icon: CreditCard, color: '#FF6B35', count: 8 },
    { id: 'mock-tests', name: 'Mock Tests', icon: Trophy, color: '#8B5CF6', count: 8 },
    { id: 'pyqs', name: 'PYQs', icon: FileText, color: '#0891B2', count: 5 },
    { id: 'technical', name: 'Technical', icon: Settings, color: '#DC2626', count: 3 }
  ];

  const faqs = [
    // General (5)
    {
      id: 1,
      category: 'general',
      question: 'What is PYQPB and what services do you offer?',
      answer: 'PYQPB (Previous Year Questions Practice Bank) is India\'s leading exam preparation platform. We offer two main services: 1) FREE access to latest year previous year questions (PYQs) with detailed solutions for 50+ competitive exams, and 2) PAID professional mock tests with real exam simulation, instant results, All India ranking, and detailed performance analytics. Our mission is to make quality exam preparation accessible and affordable for every aspirant.',
      popular: true,
      tags: ['Platform', 'Services', 'Overview']
    },
    {
      id: 2,
      category: 'general',
      question: 'Which exams do you cover?',
      answer: 'We cover 50+ major competitive exams across 6 categories: Railway (RRB NTPC, Group D, JE, ALP), UPSC (CSE Prelims, Mains, CDS, NDA), SSC (CGL, CHSL, MTS, CPO, GD), Banking (IBPS PO, SBI PO, RBI, Clerk), Defence (NDA, CDS, AFCAT), and Teaching (CTET, UGC NET, TET). New exams are added regularly based on user demand.',
      popular: true,
      tags: ['Exams', 'Coverage', 'Categories']
    },
    {
      id: 3,
      category: 'general',
      question: 'Do I need to create an account to access free PYQs?',
      answer: 'No! You can browse, download, and practice all free PYQs without creating an account. However, creating a free account lets you track your practice history, save favorite questions, and get personalized recommendations. Account is only required for purchasing and using paid mock tests.',
      popular: true,
      tags: ['Account', 'Free', 'PYQs']
    },
    {
      id: 4,
      category: 'general',
      question: 'Is there a mobile app available?',
      answer: 'Currently, we offer a fully responsive mobile website that works perfectly on all devices. You can access all features - browsing PYQs, taking mock tests, viewing analytics - directly from your mobile browser. We\'re working on native Android and iOS apps which will be launched soon. Meanwhile, you can add our website to your home screen for an app-like experience.',
      popular: false,
      tags: ['Mobile', 'App', 'Responsive']
    },
    {
      id: 5,
      category: 'general',
      question: 'How is PYQPB different from other exam prep platforms?',
      answer: 'Key differences: 1) Latest year PYQs are 100% FREE forever (others charge), 2) Credit-based system - buy once, use on any exam (no forced subscriptions), 3) Real-time All India ranking with actual students, 4) Professional mock tests designed by subject experts, 5) Transparent pricing with money-back guarantee, 6) No hidden charges or auto-renewals.',
      popular: false,
      tags: ['Comparison', 'Features', 'Benefits']
    },

    // Account & Login (6)
    {
      id: 6,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Creating an account is simple: 1) Click "Sign Up" in the top-right corner, 2) Choose Email or Google signup, 3) For Email: Enter your details and verify with OTP sent to your email, 4) For Google: Click "Continue with Google" and authorize access, 5) Complete your profile with name and exam preferences. That\'s it! Your account is ready to use.',
      popular: true,
      tags: ['Signup', 'Registration', 'Account Creation']
    },
    {
      id: 7,
      category: 'account',
      question: 'I forgot my password. What should I do?',
      answer: 'To reset your password: 1) Click "Forgot Password" on the login page, 2) Enter your registered email address, 3) Click "Send Reset Link", 4) Check your email for the reset link (also check spam folder), 5) Click the link (valid for 1 hour), 6) Set a new strong password with at least 8 characters, 7) Login with your new password. If you don\'t receive the email within 5 minutes, contact support.',
      popular: true,
      tags: ['Password', 'Reset', 'Forgot Password']
    },
    {
      id: 8,
      category: 'account',
      question: 'Can I change my email address or phone number?',
      answer: 'Yes! To change your email: 1) Login and go to Profile Settings, 2) Click "Edit Profile", 3) Enter new email address, 4) Verify with OTP sent to new email, 5) Confirm change. For phone number: Follow the same steps in Profile Settings. Note: You\'ll need to verify the new contact info before the change is finalized for security reasons.',
      popular: false,
      tags: ['Profile', 'Email', 'Phone', 'Update']
    },
    {
      id: 9,
      category: 'account',
      question: 'How do I link my Google account?',
      answer: 'If you created an account with email and want to add Google login: 1) Go to Settings > Account > Linked Accounts, 2) Click "Link Google Account", 3) Sign in with your Google account, 4) Authorize access. Now you can login with either email/password or Google. If you created account with Google, it\'s already linked and you can optionally set a password for email login.',
      popular: false,
      tags: ['Google', 'OAuth', 'Link Account']
    },
    {
      id: 10,
      category: 'account',
      question: 'Can I have multiple accounts?',
      answer: 'While technically possible, we recommend using only one account per person. Our terms of service prohibit creating multiple accounts to abuse free trials or promotional offers. If you have multiple accounts accidentally, contact support to merge them. Your credits, test history, and profile data can be consolidated into one account.',
      popular: false,
      tags: ['Multiple Accounts', 'Policy', 'Terms']
    },
    {
      id: 11,
      category: 'account',
      question: 'How do I delete my account permanently?',
      answer: 'To delete your account: 1) Go to Settings > Account > Delete Account, 2) Read the warning carefully - this action is IRREVERSIBLE, 3) Click "Delete My Account", 4) Confirm by entering your password, 5) All your data including credits, test history, and profile will be permanently deleted within 30 days. Active subscriptions will be cancelled and no refunds will be issued. We recommend downloading your test reports before deletion.',
      popular: false,
      tags: ['Delete', 'Deactivate', 'Remove Account']
    },

    // Payment & Credits (8)
    {
      id: 12,
      category: 'payment',
      question: 'What payment methods are accepted?',
      answer: 'We accept all major payment methods through our secure partner Razorpay: Credit Cards (Visa, Mastercard, Amex, RuPay), Debit Cards (all major banks), Net Banking (all major banks), UPI (GPay, PhonePe, Paytm, BHIM), Digital Wallets (Paytm, Mobikwik, Freecharge), and EMI options for purchases above ₹3,000. All transactions are secured with 256-bit SSL encryption and PCI DSS compliance.',
      popular: true,
      tags: ['Payment', 'Methods', 'Razorpay']
    },
    {
      id: 13,
      category: 'payment',
      question: 'How does the credit system work?',
      answer: 'Our credit system is simple and flexible: 1) Buy a package and receive credits (1 credit = 1 mock test unlock), 2) Credits are universal - use them on ANY exam across ANY category, 3) Once you unlock a test with 1 credit, you can attempt it UNLIMITED times within validity, 4) Unused credits remain valid based on your package (30/90/180 days), 5) Example: Buy 5-test package, use 2 credits on SSC CGL, 3 on Banking PO - total flexibility!',
      popular: true,
      tags: ['Credits', 'System', 'How It Works']
    },
    {
      id: 14,
      category: 'payment',
      question: 'When do credits expire?',
      answer: 'Credit validity depends on your package: Trial Pack (1 test) = 30 days validity, Best Value (5 tests) = 90 days validity, Max Value (10 tests) = 180 days validity. Validity starts from purchase date. Important: Tests already unlocked can be accessed unlimited times until the end of validity period. Plan your purchases based on your preparation timeline.',
      popular: true,
      tags: ['Expiry', 'Validity', 'Duration']
    },
    {
      id: 15,
      category: 'payment',
      question: 'Can I get a refund if I\'m not satisfied?',
      answer: 'Yes! We offer a 7-day money-back guarantee. If you\'re unsatisfied with our mock tests, email support@pyqpb.com within 7 days of purchase with your order ID. We\'ll process a full refund within 5-7 business days to your original payment method. No questions asked! Note: Refunds are only for first-time purchases and not available if you\'ve used more than 3 credits.',
      popular: true,
      tags: ['Refund', 'Money Back', 'Guarantee']
    },
    {
      id: 16,
      category: 'payment',
      question: 'I paid but didn\'t receive credits. What to do?',
      answer: 'This rarely happens, but if it does: 1) Check your email for payment confirmation from Razorpay, 2) Wait 10 minutes - sometimes there\'s a slight delay, 3) Refresh your dashboard page, 4) If still not credited, contact support@pyqpb.com with: Transaction ID, Payment screenshot, Registered email, Order ID. We\'ll resolve it within 2 hours during business hours (9 AM - 9 PM IST). Your money is safe!',
      popular: false,
      tags: ['Payment Failed', 'Credits Not Received', 'Issue']
    },
    {
      id: 17,
      category: 'payment',
      question: 'Can I transfer credits to another user?',
      answer: 'No, credits are non-transferable and tied to your account only. This policy prevents misuse and ensures fair usage. However, you can: 1) Use credits on any exam category yourself, 2) Gift someone a package by purchasing for their email, 3) Contact support for special cases like account migration.',
      popular: false,
      tags: ['Transfer', 'Credits', 'Gift']
    },
    {
      id: 18,
      category: 'payment',
      question: 'Do you offer discounts or coupon codes?',
      answer: 'Yes! We regularly offer: 1) Seasonal discounts during exam seasons (Jan, June, Oct), 2) Festival offers (Diwali, New Year, Independence Day), 3) First-time user coupons, 4) Referral rewards - refer friends and earn credits, 5) Bulk purchase discounts for coaching centers. Subscribe to our newsletter or follow us on social media to never miss a deal!',
      popular: false,
      tags: ['Discount', 'Coupon', 'Offers']
    },
    {
      id: 19,
      category: 'payment',
      question: 'How do I download my payment invoice?',
      answer: 'To download your invoice: 1) Login to your account, 2) Go to Dashboard > Payment History, 3) Find the transaction you need invoice for, 4) Click "View Details", 5) Click "Download Invoice" button, 6) A PDF invoice will be downloaded with GST details (if applicable), transaction ID, and payment breakdown. You can also request invoices via email at support@pyqpb.com.',
      popular: false,
      tags: ['Invoice', 'Receipt', 'Download']
    },

    // Mock Tests (8)
    {
      id: 20,
      category: 'mock-tests',
      question: 'How do I unlock and start a mock test?',
      answer: 'To unlock and take a test: 1) Go to Mock Tests page, 2) Browse by exam category or search for specific test, 3) Click on test to view details (syllabus, duration, questions), 4) Click "Unlock with 1 Credit" (requires login and sufficient credits), 5) Once unlocked, click "Start Test" anytime you\'re ready, 6) Test opens in full-screen mode with timer, 7) Answer questions and submit. Pro tip: Read instructions carefully before starting!',
      popular: true,
      tags: ['Start Test', 'Unlock', 'Begin']
    },
    {
      id: 21,
      category: 'mock-tests',
      question: 'Can I pause a test and resume later?',
      answer: 'No, tests cannot be paused. Once started, the timer runs continuously to simulate real exam conditions. However: 1) If your browser crashes or you lose internet, you have 5 minutes to rejoin, 2) After 5 minutes, test auto-submits with answered questions, 3) Your progress is saved every 30 seconds, 4) This strict policy ensures fair ranking among all test-takers.',
      popular: true,
      tags: ['Pause', 'Resume', 'Test Rules']
    },
    {
      id: 22,
      category: 'mock-tests',
      question: 'How many times can I attempt a test?',
      answer: 'UNLIMITED! Once you unlock a test with 1 credit, you can attempt it as many times as you want within the validity period. Benefits: 1) Practice until you perfect it, 2) Each attempt is saved separately, 3) Track your improvement over time, 4) Compare scores across attempts, 5) Best score is highlighted. Use this to your advantage!',
      popular: true,
      tags: ['Attempts', 'Retake', 'Unlimited']
    },
    {
      id: 23,
      category: 'mock-tests',
      question: 'When and how do I get my test results?',
      answer: 'Results are INSTANT! Immediately after clicking "Submit Test": 1) See your total score, correct/incorrect/unattempted count, 2) View All India Rank and percentile, 3) Section-wise performance breakdown, 4) Time analysis per question, 5) Subject-wise accuracy, 6) Compare with average scores, 7) Access detailed solutions, 8) Download scorecard PDF. Everything is available instantly - no waiting!',
      popular: true,
      tags: ['Results', 'Score', 'Ranking']
    },
    {
      id: 24,
      category: 'mock-tests',
      question: 'How is All India Ranking calculated?',
      answer: 'Your rank is calculated in real-time based on: 1) Your total score in the test, 2) Compared with all other students who attempted that EXACT test, 3) If scores are tied, the student who finished faster gets better rank, 4) Rankings update dynamically as more students take the test, 5) You can see your rank improving as you retake tests with better scores. It\'s genuine ranking with real students!',
      popular: true,
      tags: ['Ranking', 'AIR', 'Calculation']
    },
    {
      id: 25,
      category: 'mock-tests',
      question: 'Can I review solutions before submitting the test?',
      answer: 'No, solutions are only available AFTER submitting the test. This prevents cheating and maintains test integrity. However: 1) You can mark questions for review during test, 2) Navigate between questions freely, 3) Change answers before submit, 4) See question palette status. After submission, you get full access to solutions, explanations, and your performance analysis.',
      popular: false,
      tags: ['Solutions', 'Review', 'Access']
    },
    {
      id: 26,
      category: 'mock-tests',
      question: 'Are tests available in Hindi or other languages?',
      answer: 'Yes! Most tests are available in both English and Hindi. Some tests for specific exams also offer regional languages like Tamil, Telugu, Bengali, Marathi, Gujarati. You can select your preferred language before starting the test. Language cannot be changed mid-test, so choose carefully. We\'re continuously adding more language options.',
      popular: false,
      tags: ['Language', 'Hindi', 'Regional']
    },
    {
      id: 27,
      category: 'mock-tests',
      question: 'Can I download or print the test questions?',
      answer: 'No, test questions cannot be downloaded or printed. This protects our intellectual property and prevents unauthorized sharing. However, you CAN: 1) Download your scorecard as PDF, 2) Take unlimited screenshots for personal notes (not sharing), 3) Access the test online anytime within validity, 4) Review solutions online unlimited times. For offline practice, use our free PYQs which are downloadable.',
      popular: false,
      tags: ['Download', 'Print', 'Offline']
    },

    // Free PYQs (5)
    {
      id: 28,
      category: 'pyqs',
      question: 'Are PYQs really 100% free with no hidden costs?',
      answer: 'YES! Absolutely 100% FREE with ZERO hidden costs! You can: 1) Browse all latest year (2024) PYQs without login, 2) Download PDFs for offline study, 3) Practice online unlimited times, 4) Access detailed solutions and explanations, 5) Share PDFs with friends (we encourage it!), 6) No credit card required, no trials, no limits. Our mission is to make quality education accessible to everyone!',
      popular: true,
      tags: ['Free', 'PYQs', 'No Cost']
    },
    {
      id: 29,
      category: 'pyqs',
      question: 'How do I download PYQ PDFs?',
      answer: 'Downloading is super easy: 1) Go to Free PYQs page, 2) Use filters or search to find your exam, 3) Click on the paper you want, 4) Click "Download PDF" button, 5) File downloads instantly - no login needed! PDF includes: Questions, detailed solutions, explanations, shortcuts, and exam pattern analysis. You can download unlimited papers!',
      popular: true,
      tags: ['Download', 'PDF', 'How To']
    },
    {
      id: 30,
      category: 'pyqs',
      question: 'Can I practice PYQs online instead of downloading?',
      answer: 'Yes! You have both options: 1) DOWNLOAD: Get PDF for offline study, printing, annotations, 2) PRACTICE ONLINE: Solve questions on platform with instant answer checking, see solutions immediately, track your score, get time taken stats. Online practice is great for active learning while PDFs are good for reference and offline revision.',
      popular: true,
      tags: ['Online Practice', 'Web Practice', 'Digital']
    },
    {
      id: 31,
      category: 'pyqs',
      question: 'Why are only 2024 papers free? What about older years?',
      answer: 'We provide latest year papers (2024) for free because: 1) Recent papers show current exam trends, 2) Latest pattern and difficulty level, 3) Most relevant for upcoming exams. Older years (2023, 2022, 2021, etc.) require significant server costs, maintenance, and resources - these are available in our affordable paid mock test packages which include 10+ years of questions.',
      popular: false,
      tags: ['Latest Year', 'Free Policy', 'Why']
    },
    {
      id: 32,
      category: 'pyqs',
      question: 'How often do you add new PYQs?',
      answer: 'We update PYQs regularly: 1) Within 7 days of exam being held, 2) Solutions added within 48 hours of answer key release, 3) Quality checked by subject experts, 4) Updated for any corrections or clarifications. Subscribe to notifications or follow us on social media to get alerts when new papers are uploaded. We cover 50+ exams year-round!',
      popular: false,
      tags: ['Updates', 'New PYQs', 'Frequency']
    },

    // Technical (3)
    {
      id: 33,
      category: 'technical',
      question: 'The website is slow or not loading. What should I do?',
      answer: 'Try these troubleshooting steps: 1) Clear browser cache and cookies (Settings > Privacy > Clear Browsing Data), 2) Try a different browser (we recommend Chrome or Firefox), 3) Check your internet speed (minimum 2 Mbps required), 4) Disable VPN or proxy if using, 5) Disable browser extensions temporarily, 6) Try incognito/private mode, 7) Restart your router. If issue persists, contact support with your browser name, version, and operating system.',
      popular: true,
      tags: ['Slow', 'Loading', 'Performance']
    },
    {
      id: 34,
      category: 'technical',
      question: 'I\'m getting payment errors. What could be wrong?',
      answer: 'Payment errors can happen due to: 1) Insufficient bank balance, 2) Daily transaction limit exceeded, 3) Incorrect CVV/OTP, 4) Bank server downtime, 5) Network timeout during processing, 6) Card not enabled for online transactions. Solutions: Wait 15 minutes and retry, try different payment method, check with your bank, use UPI instead of card. If money was deducted but order failed, it will be auto-refunded in 5-7 days. Contact support if urgent.',
      popular: true,
      tags: ['Payment Error', 'Transaction Failed', 'Fix']
    },
    {
      id: 35,
      category: 'technical',
      question: 'Does the platform work on mobile phones and tablets?',
      answer: 'Yes! Our platform is fully responsive and optimized for: Smartphones (Android & iOS), Tablets (iPad, Android tablets), Desktop/Laptop (Windows, Mac, Linux), All modern browsers (Chrome, Firefox, Safari, Edge). Features work seamlessly: Take tests in full-screen, Download PDFs, View analytics, Make payments. We recommend: Screen size minimum 5 inches, Good internet (2G+), Latest browser version, Horizontal orientation for tests.',
      popular: false,
      tags: ['Mobile', 'Tablet', 'Compatibility']
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
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPopular = !showOnlyPopular || faq.popular;
    return matchesCategory && matchesSearch && matchesPopular;
  });

  const stats = [
    { value: '35+', label: 'Total FAQs', icon: HelpCircle, color: '#2E5CFF' },
    { value: '6', label: 'Categories', icon: BookOpen, color: '#10B981' },
    { value: '100%', label: 'Answered', icon: CheckCircle, color: '#FF6B35' },
    { value: '24/7', label: 'Support', icon: Clock, color: '#8B5CF6' }
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
                <span className="font-bold text-sm uppercase tracking-tight">Your Questions, Answered</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                FREQUENTLY
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                  ASKED
                </span>
                <br />
                QUESTIONS
              </h1>

              <p className="text-xl md:text-2xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed mb-8">
                Everything you need to know about our platform, services, and policies
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search FAQs by question, answer, or tag..."
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

        {/* Categories & Filters */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-6 h-6 text-black" />
                <span className="font-black text-xl">Filter by Category</span>
              </div>
              
              <button
                onClick={() => setShowOnlyPopular(!showOnlyPopular)}
                className={`flex items-center gap-2 px-4 py-2 font-black text-sm uppercase border-2 border-black transition-all ${
                  showOnlyPopular
                    ? 'bg-yellow-400 text-black'
                    : 'bg-white text-black hover:bg-gray-50'
                }`}
              >
                <Star className={`w-4 h-4 ${showOnlyPopular ? 'fill-black' : ''}`} />
                Popular Only
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
                  <category.icon 
                    className="w-8 h-8 mx-auto mb-2" 
                    style={{ color: category.color }} 
                  />
                  <div className="font-black text-xs mb-1" style={{ color: category.color }}>
                    {category.name}
                  </div>
                  <div className="text-xs text-gray-600 font-bold">{category.count}</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs List */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black text-black">
              {selectedCategory === 'all' ? 'All Questions' : categories.find(c => c.id === selectedCategory)?.name}
              <span className="text-gray-400 ml-3">({filteredFaqs.length})</span>
            </h2>

            {(selectedCategory !== 'all' || showOnlyPopular || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setShowOnlyPopular(false);
                  setSearchQuery('');
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </button>
            )}
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="bg-white border-4 border-black rounded-xl p-12 text-center">
              <HelpCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-black text-black mb-2">No FAQs Found</h3>
              <p className="text-gray-600 font-medium mb-6">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setShowOnlyPopular(false);
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
                  className={`bg-white border-4 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                    faq.popular ? 'ring-4 ring-yellow-400 ring-offset-2' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-start gap-4 flex-1 pr-4">
                      <div className="flex-shrink-0 mt-1">
                        {faq.popular && (
                          <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        )}
                        {!faq.popular && (
                          <HelpCircle className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-black text-lg text-black mb-2">{faq.question}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {faq.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-medium text-gray-600"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ChevronDown 
                      className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                        openFaqs.includes(faq.id) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaqs.includes(faq.id) ? 'max-h-[500px]' : 'max-h-0'
                    }`}
                  >
                    <div className="p-6 pt-0 border-t-2 border-gray-100">
                      <div className="flex items-start gap-3 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <p className="text-gray-700 font-medium leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Still Need Help */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 border-4 border-black rounded-3xl p-12 md:p-16 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              DIDN'T FIND
              <br />
              <span className="text-yellow-400">YOUR ANSWER?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-bold mb-8 max-w-2xl mx-auto">
              Our support team is ready to help you with any question
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/help-center"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-black text-xl rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 uppercase"
              >
                <MessageCircle className="w-6 h-6" />
                Contact Support
              </Link>
              <a 
                href="mailto:support@pyqpb.com"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white font-black text-xl rounded-none border-4 border-white hover:bg-gray-900 transition-colors uppercase"
              >
                <Mail className="w-6 h-6" />
                Email Us
              </a>
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

export default FAQs;