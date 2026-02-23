import { useState, useEffect } from 'react';   // ← added useEffect
import { 
  Check, X, Shield, Zap, Award, Users,
  Star, HelpCircle, ChevronDown,
  Target, Trophy, Sparkles, Lock,
  Loader2, Tag                                  // ← added Loader2, Tag
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';  // ← added useNavigate
import { packageApi }  from '../api/Package.api';      // ← added
import { useAuth }     from '../context/AuthContext';   // ← added
import { useRazorpay } from '../hooks/Userazorpay';    // ← added
import toast           from 'react-hot-toast';          // ← added

// ─────────────────────────────────────────────────────────────────────────────
//  BACKEND WIRING ONLY — every className, layout, copy is your original code.
//
//  3 things changed:
//  1. pricingPlans fetched from packageApi.getAll() — not a static array.
//     PKG_UI maps backend name (STARTER/VALUE/PRO) → your original card data.
//  2. "Get Started" Link → <button> wired to useRazorpay.
//     Not logged in? redirects to /login.  Loading? shows spinner.
//  3. Offer-code bar added above the cards (your original had no hook for it).
// ─────────────────────────────────────────────────────────────────────────────

// Maps backend package name → your original static UI shape
const PKG_UI: Record<string, {
  id: string; badge: string; popular: boolean; color: string;
  originalPrice: number; savings: number; description: string;
  features: { text: string; included: boolean }[];
}> = {
  STARTER: {
    id: 'trial', badge: 'Try First', popular: false, color: '#8B5CF6',
    originalPrice: 199, savings: 0,
    description: 'Perfect for first-time users',
    features: [
      { text: 'Access to 10 mock tests',        included: true  },
      { text: 'Detailed performance report',     included: true  },
      { text: 'Answer key with solutions',       included: true  },
      { text: 'All India rank comparison',       included: false },
      { text: 'Expert video solutions',          included: false },
      { text: 'AI-powered weak area detection',  included: false },
      { text: 'Valid for 30 days',               included: true  },
    ],
  },
  VALUE: {
    id: 'value', badge: 'Most Popular', popular: true, color: '#FF6B35',
    originalPrice: 995, savings: 496,
    description: 'Best for serious preparation',
    features: [
      { text: 'Access to 50 mock tests',         included: true  },
      { text: 'Advanced analytics dashboard',    included: true  },
      { text: 'All India rank comparison',       included: true  },
      { text: 'Expert video solutions',          included: true  },
      { text: 'AI-powered weak area detection',  included: true  },
      { text: 'Performance tracking graphs',     included: true  },
      { text: 'Valid for 1 year',                included: true  },
    ],
  },
  PRO: {
    id: 'max', badge: 'Best Savings', popular: false, color: '#10B981',
    originalPrice: 1990, savings: 1191,
    description: 'Maximum practice, maximum savings',
    features: [
      { text: 'Access to 100 mock tests',        included: true  },
      { text: 'Premium analytics & insights',    included: true  },
      { text: 'All India rank tracking',         included: true  },
      { text: 'Personalized improvement plan',   included: true  },
      { text: 'Expert doubt resolution',         included: true  },
      { text: 'Priority customer support',       included: true  },
      { text: 'Valid for 18 months',             included: true  },
    ],
  },
};

const Pricing = () => {
  const navigate            = useNavigate();
  const { isAuthenticated } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // ── backend state (new) ────────────────────────────────────────────────────
  const [rawPackages, setRawPackages]   = useState<any[]>([]);
  const [loadingPkgs, setLoadingPkgs]   = useState(true);
  const [buying, setBuying]             = useState<string | null>(null);
  const [offerCode, setOfferCode]       = useState('');
  const [offerApplied, setOfferApplied] = useState(false);

  const { initiatePayment } = useRazorpay({
    onSuccess: (_paymentId, creditsAdded) => {
      setBuying(null);
      toast.success(`🎉 ${creditsAdded} credits added! Redirecting...`);
      setTimeout(() => navigate('/dashboard'), 1500);
    },
    onFailure: () => setBuying(null),
    onDismiss: () => setBuying(null),
  });

  useEffect(() => {
    packageApi.getAll()
      .then(({ data }) => setRawPackages(data.data))
      .catch(() => toast.error('Could not load packages'))
      .finally(() => setLoadingPkgs(false));
  }, []);

  // Merge backend row with your original UI shape
  const pricingPlans = rawPackages.map((pkg: any) => {
    const ui = PKG_UI[pkg.name] ?? PKG_UI.STARTER;
    return { ...ui, _id: pkg._id, name: pkg.displayName ?? pkg.name, credits: pkg.credits, price: pkg.price };
  });

  const handleBuy = async (plan: any) => {
    if (!isAuthenticated) {
      toast('Please login to purchase', { icon: '🔒' });
      navigate('/login', { state: { from: '/pricing' } });
      return;
    }
    if (buying) return;
    setBuying(plan._id);
    await initiatePayment(plan._id, offerApplied ? offerCode.trim().toUpperCase() : undefined);
    setBuying(null);
  };
  // ── end backend state ──────────────────────────────────────────────────────

  // ── Your original static data — zero changes ──────────────────────────────
  const comparisonFeatures = [
    { category: 'Mock Tests', features: [
      { name: 'Number of tests', trial: '1 test', value: '5 tests', max: '10 tests' },
      { name: 'Real exam interface', trial: true, value: true, max: true },
      { name: 'Timer with auto-submit', trial: true, value: true, max: true },
      { name: 'Unlimited attempts', trial: true, value: true, max: true },
      { name: 'Question navigation', trial: true, value: true, max: true },
    ]},
    { category: 'Performance Analysis', features: [
      { name: 'Basic score report', trial: true, value: true, max: true },
      { name: 'All India ranking', trial: false, value: true, max: true },
      { name: 'Subject-wise analysis', trial: false, value: true, max: true },
      { name: 'Time management insights', trial: false, value: true, max: true },
      { name: 'Accuracy metrics', trial: false, value: true, max: true },
      { name: 'Performance graphs', trial: false, value: true, max: true },
      { name: 'Peer comparison', trial: false, value: false, max: true },
    ]},
    { category: 'Learning Support', features: [
      { name: 'Answer key', trial: true, value: true, max: true },
      { name: 'Text solutions', trial: true, value: true, max: true },
      { name: 'Video solutions', trial: false, value: true, max: true },
      { name: 'AI weak area detection', trial: false, value: true, max: true },
      { name: 'Personalized study plan', trial: false, value: false, max: true },
      { name: 'Expert doubt resolution', trial: false, value: false, max: true },
    ]},
    { category: 'Validity & Support', features: [
      { name: 'Validity period', trial: '30 days', value: '90 days', max: '180 days' },
      { name: 'Email support', trial: true, value: true, max: true },
      { name: 'Priority support', trial: false, value: false, max: true },
      { name: 'Money-back guarantee', trial: true, value: true, max: true },
    ]},
  ];

  const faqs = [
    { question: 'How does the credit system work?', answer: "When you purchase a package, you receive credits equal to the number of tests (1 credit = 1 mock test). You can use these credits on ANY mock test across ANY exam category. Credits don't expire within the validity period, and you can attempt each test unlimited times after unlocking it." },
    { question: 'Can I use credits on different exams?', answer: "Yes! Your credits are universal. You can buy the 5-test package and use 2 credits on SSC CGL, 2 on RRB NTPC, and 1 on Banking PO. Mix and match across all 50+ exams as you wish." },
    { question: 'What happens after I unlock a test?', answer: "Once you unlock a test using 1 credit, you can attempt it unlimited times within the validity period. You can review solutions, check your performance, and retake the test to improve your score - all without using additional credits." },
    { question: 'Is the All India Ranking real?', answer: "Yes! Your rank is calculated based on your score compared to all other students who have attempted that specific test. Rankings update in real-time as more students take the test." },
    { question: "What if I'm not satisfied?", answer: "We offer a 7-day money-back guarantee on all packages. If you're not satisfied with the quality of our mock tests, contact us within 7 days of purchase for a full refund - no questions asked." },
    { question: 'Are the mock tests similar to actual exams?', answer: "Our mock tests are designed by subject matter experts and closely follow the latest exam patterns, difficulty levels, and syllabus. They replicate the actual exam interface including timer, question types, and marking scheme." },
    { question: 'Can I download the questions or solutions?', answer: "You can view and practice questions online and review solutions within the platform. For offline study, we recommend taking screenshots or notes. The content is meant for online practice to ensure freshness and prevent sharing." },
    { question: 'Do credits expire?', answer: "Credits remain valid for the duration specified in your package (30/90/180 days from purchase date). After expiry, unused credits will be forfeited. However, tests already unlocked can be accessed until the end of the validity period." },
  ];

  const testimonials = [
    { name: 'Amit Sharma', exam: 'SSC CGL', rank: 'AIR 89', avatar: '👨‍💼', rating: 5, quote: 'The 5-test package was perfect. I could practice across different sections and the analytics helped me improve my weak areas systematically.' },
    { name: 'Priya Patel', exam: 'IBPS PO', rank: 'Selected', avatar: '👩‍💼', rating: 5, quote: 'Best investment for exam prep! The All India ranking feature kept me motivated and competitive. Got selected in first attempt.' },
    { name: 'Rahul Kumar', exam: 'RRB NTPC', rank: 'AIR 156', avatar: '👨‍🎓', rating: 5, quote: "I bought the trial first, loved it, then upgraded to 10-test package. The unlimited attempts feature is a game-changer!" },
  ];

  const trustBadges = [
    { icon: Shield, text: '256-bit SSL Encrypted',  color: '#10B981' },
    { icon: Lock,   text: 'Razorpay Secure Payment', color: '#2E5CFF' },
    { icon: Award,  text: '7-Day Money Back',         color: '#FF6B35' },
    { icon: Users,  text: '250K+ Happy Users',         color: '#8B5CF6' },
  ];

  return (
    <>
      <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
        {/* Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply">
          <div className="absolute inset-0 bg-noise"></div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-black py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-grid-pattern"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="floating-element absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="floating-element-delayed absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full opacity-20 blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white shadow-2xl mb-6">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-sm uppercase tracking-tight">Simple & Transparent Pricing</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                CHOOSE YOUR<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">PRACTICE</span><br />
                PLAN
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed mb-8">
                Flexible credit-based system. Buy once, use on any exam. No subscriptions, no hidden fees.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                {trustBadges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <badge.icon className="w-5 h-5" style={{ color: badge.color }} />
                    <span className="text-white font-medium text-sm">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 mb-16">

          {/* Offer code bar */}
          <div className="max-w-md mx-auto mb-8 flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={offerCode}
                onChange={e => { setOfferCode(e.target.value.toUpperCase()); setOfferApplied(false); }}
                placeholder="OFFER CODE (optional)"
                className="w-full pl-9 pr-4 py-3 border-4 border-black font-bold text-sm uppercase tracking-widest focus:outline-none focus:border-blue-600 bg-white"
              />
            </div>
            <button
              onClick={() => { if (offerCode.trim()) { setOfferApplied(true); toast.success('Code applied at checkout'); } }}
              className="px-5 py-3 bg-black text-white font-black text-sm uppercase border-4 border-black hover:bg-gray-800 transition-colors"
            >
              Apply
            </button>
          </div>
          {offerApplied && (
            <p className="text-center text-green-600 font-bold text-sm mb-4">
              ✓ Code <span className="font-black">{offerCode}</span> will be applied at checkout
            </p>
          )}

          {/* Cards */}
          {loadingPkgs ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-10 h-10 animate-spin text-black" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <div
                  key={plan._id}
                  className={`relative bg-white border-4 border-black rounded-2xl p-8 transition-all duration-300 ${
                    plan.popular
                      ? 'transform scale-105 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'
                      : 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:scale-105'
                  }`}
                >
                  {plan.popular && (
                    <div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 text-white font-black text-sm uppercase border-4 border-black rotate-[-2deg]"
                      style={{ backgroundColor: plan.color }}
                    >
                      {plan.badge}
                    </div>
                  )}
                  {!plan.popular && (
                    <div className="text-center mb-4">
                      <span
                        className="inline-block px-4 py-1 text-xs font-black uppercase border-2 border-black rounded-full"
                        style={{ color: plan.color, borderColor: plan.color }}
                      >
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6 mt-4">
                    <h3 className="text-2xl font-black text-black mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-600 font-medium mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <div className="text-6xl font-black text-black mb-2">₹{plan.price}</div>
                      {plan.savings > 0 && (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-gray-400 line-through text-lg">₹{plan.originalPrice}</span>
                          <span className="px-3 py-1 bg-green-400 text-black font-black text-xs rounded-full border-2 border-black">
                            Save ₹{plan.savings}
                          </span>
                        </div>
                      )}
                    </div>
                    <div
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-3 border-black mb-6"
                      style={{ backgroundColor: plan.color + '20' }}
                    >
                      <Trophy className="w-5 h-5" style={{ color: plan.color }} />
                      <span className="font-black text-lg">{plan.credits} {plan.credits === 1 ? 'Credit' : 'Credits'}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                        ) : (
                          <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-300" />
                        )}
                        <span className={`text-sm font-medium ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Only change from your original: Link → button wired to Razorpay */}
                  <button
                    onClick={() => handleBuy(plan)}
                    disabled={!!buying}
                    className="block w-full py-4 font-black text-lg uppercase border-4 border-black transition-all duration-200 text-center hover:translate-x-1 hover:translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                    style={{
                      backgroundColor: plan.popular ? plan.color : 'black',
                      color:           plan.popular ? 'black'    : 'white',
                      boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)',
                    }}
                    onMouseEnter={e => { if (!buying) e.currentTarget.style.boxShadow = '3px 3px 0px 0px rgba(0,0,0,1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '6px 6px 0px 0px rgba(0,0,0,1)'; }}
                  >
                    {buying === plan._id
                      ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Processing...</span>
                      : 'Get Started →'
                    }
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Money Back Guarantee */}
          <div className="max-w-3xl mx-auto mt-12 p-6 bg-green-100 border-4 border-green-600 rounded-xl text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-green-600" />
              <div className="text-2xl font-black text-green-900">7-Day Money Back Guarantee</div>
            </div>
            <p className="text-green-800 font-medium">
              Try any package risk-free. Not satisfied? Get 100% refund within 7 days - no questions asked.
            </p>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-white border-y-4 border-black">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Detailed <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Comparison</span>
            </h2>
            <p className="text-xl text-gray-600 font-medium">Compare features across all plans</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-4 border-black">
              <thead>
                <tr className="bg-black text-white">
                  <th className="text-left p-4 font-black text-lg border-r-4 border-white">Features</th>
                  <th className="p-4 font-black text-lg border-r-4 border-white">Trial Pack</th>
                  <th className="p-4 font-black text-lg border-r-4 border-white bg-orange-500 text-black">Best Value ⭐</th>
                  <th className="p-4 font-black text-lg">Max Value</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category, catIdx) => (
                  <>
                    <tr key={`cat-${catIdx}`} className="bg-gray-100">
                      <td colSpan={4} className="p-4 font-black text-lg border-t-4 border-black">{category.category}</td>
                    </tr>
                    {category.features.map((feature, featIdx) => (
                      <tr key={`feat-${catIdx}-${featIdx}`} className="border-t-2 border-gray-300">
                        <td className="p-4 font-medium text-gray-700 border-r-2 border-gray-300">{feature.name}</td>
                        <td className="p-4 text-center border-r-2 border-gray-300">
                          {typeof feature.trial === 'boolean' ? (feature.trial ? <Check className="w-6 h-6 text-green-600 mx-auto" /> : <X className="w-6 h-6 text-gray-300 mx-auto" />) : <span className="font-bold text-black">{feature.trial}</span>}
                        </td>
                        <td className="p-4 text-center border-r-2 border-gray-300 bg-orange-50">
                          {typeof feature.value === 'boolean' ? (feature.value ? <Check className="w-6 h-6 text-green-600 mx-auto" /> : <X className="w-6 h-6 text-gray-300 mx-auto" />) : <span className="font-bold text-black">{feature.value}</span>}
                        </td>
                        <td className="p-4 text-center">
                          {typeof feature.max === 'boolean' ? (feature.max ? <Check className="w-6 h-6 text-green-600 mx-auto" /> : <X className="w-6 h-6 text-gray-300 mx-auto" />) : <span className="font-bold text-black">{feature.max}</span>}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Works</span>
              </h2>
              <p className="text-xl text-gray-600 font-medium">Simple 4-step process</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Choose Package',  description: 'Select the number of credits you need',   icon: Target, color: '#2E5CFF' },
                { step: '2', title: 'Secure Payment',  description: 'Pay safely via Razorpay gateway',         icon: Lock,   color: '#10B981' },
                { step: '3', title: 'Get Credits',     description: 'Credits added to your account instantly', icon: Zap,    color: '#FF6B35' },
                { step: '4', title: 'Start Practicing',description: 'Use credits on any mock test you want',   icon: Trophy, color: '#8B5CF6' },
              ].map((item, idx) => (
                <div key={idx} className="relative bg-white border-4 border-black rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center border-4 border-black font-black text-2xl" style={{ backgroundColor: item.color, color: 'white' }}>
                    {item.step}
                  </div>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-black mb-4 mx-auto" style={{ backgroundColor: item.color + '20' }}>
                    <item.icon className="w-8 h-8" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-xl font-black text-black mb-2 text-center">{item.title}</h3>
                  <p className="text-gray-600 font-medium text-center">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 font-medium">Everything you need to know</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border-4 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <span className="text-left font-black text-lg text-black">{faq.question}</span>
                  </div>
                  <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="p-6 pt-0 text-gray-700 font-medium leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600 font-medium mb-4">Still have questions?</p>
            <Link to="/about" className="inline-block px-8 py-4 bg-black text-white font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
              Contact Support
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-black py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                What Students <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">Say</span>
              </h2>
              <p className="text-xl text-gray-400 font-medium">Real results from real students</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-white border-4 border-white rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-1 hover:translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-gray-700 font-medium italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-black text-black text-lg">{testimonial.name}</div>
                      <div className="text-purple-600 font-bold text-sm">{testimonial.exam}</div>
                      <div className="inline-block px-2 py-1 bg-yellow-400 text-black font-black text-xs rounded-full border-2 border-black mt-1">{testimonial.rank}</div>
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
              READY TO<br /><span className="text-yellow-400">START WINNING?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-bold mb-8 max-w-2xl mx-auto">
              Join 250,000+ students preparing smarter with our mock tests
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/mock-tests" className="inline-block px-10 py-5 bg-white text-black font-black text-xl rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 uppercase">
                Choose Your Plan
              </Link>
              <Link to="/free-pyqs" className="inline-block px-10 py-5 bg-black text-white font-black text-xl rounded-none border-4 border-white hover:bg-white hover:text-black transition-all duration-300 uppercase">
                Try Free First
              </Link>
            </div>
          </div>
        </section>

        {/* Your exact styles */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;700&display=swap');
          * { font-family: 'Space Grotesk', sans-serif; }
          h1, h2, h3, .font-black { font-family: 'Archivo Black', sans-serif; letter-spacing: -0.02em; }
          .bg-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); opacity: 0.5; }
          .bg-grid-pattern { background-image: linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px); background-size: 50px 50px; }
          @keyframes float { 0%,100%{transform:translateY(0px) translateX(0px)} 50%{transform:translateY(-20px) translateX(10px)} }
          @keyframes float-delayed { 0%,100%{transform:translateY(0px) translateX(0px)} 50%{transform:translateY(20px) translateX(-10px)} }
          .floating-element { animation: float 8s ease-in-out infinite; }
          .floating-element-delayed { animation: float-delayed 10s ease-in-out infinite; }
        `}</style>
      </div>
    </>
  );
};

export default Pricing;