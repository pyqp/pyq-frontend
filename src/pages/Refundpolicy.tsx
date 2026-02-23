import { Link } from 'react-router-dom';
import { 
  Shield, CheckCircle, XCircle, Clock, AlertCircle, 
  FileText, CreditCard, Mail, ArrowRight, HelpCircle,
  DollarSign, Phone, RefreshCw, Award
} from 'lucide-react';

const RefundPolicy = () => {
  const eligibilityCriteria = [
    {
      icon: CheckCircle,
      title: 'First-Time Purchase',
      description: 'Refund is available only for your first purchase on our platform',
      eligible: true
    },
    {
      icon: CheckCircle,
      title: 'Within 7 Days',
      description: 'Request must be made within 7 days of purchase date',
      eligible: true
    },
    {
      icon: CheckCircle,
      title: 'Quality Issues',
      description: 'Technical issues, content errors, or service quality problems',
      eligible: true
    },
    {
      icon: XCircle,
      title: 'More than 3 Credits Used',
      description: 'Refund not available if you\'ve used more than 3 credits',
      eligible: false
    },
    {
      icon: XCircle,
      title: 'After 7 Days',
      description: 'No refunds will be processed after 7-day window',
      eligible: false
    },
    {
      icon: XCircle,
      title: 'Change of Mind',
      description: 'Simple change of preference is not eligible after using credits',
      eligible: false
    }
  ];

  const refundProcess = [
    {
      step: 1,
      title: 'Submit Request',
      description: 'Email us at refund@pyqpb.com with your order ID and reason',
      icon: Mail,
      color: '#2E5CFF',
      duration: '5 minutes'
    },
    {
      step: 2,
      title: 'Verification',
      description: 'Our team reviews your request and checks eligibility',
      icon: FileText,
      color: '#10B981',
      duration: '24-48 hours'
    },
    {
      step: 3,
      title: 'Approval',
      description: 'You\'ll receive email confirmation if request is approved',
      icon: CheckCircle,
      color: '#FF6B35',
      duration: '1-2 hours'
    },
    {
      step: 4,
      title: 'Processing',
      description: 'Refund is initiated to your original payment method',
      icon: RefreshCw,
      color: '#8B5CF6',
      duration: '2-3 days'
    },
    {
      step: 5,
      title: 'Completion',
      description: 'Amount credited to your account (bank dependent)',
      icon: DollarSign,
      color: '#DC2626',
      duration: '5-7 business days'
    }
  ];

  const importantNotes = [
    {
      icon: Clock,
      title: 'Processing Time',
      description: 'Total refund process takes 7-10 business days from approval. Bank processing times may vary.',
      color: '#2E5CFF'
    },
    {
      icon: CreditCard,
      title: 'Original Payment Method',
      description: 'Refunds are issued to the same payment method used for purchase. No cash refunds or alternative methods.',
      color: '#10B981'
    },
    {
      icon: AlertCircle,
      title: 'Account Suspension',
      description: 'Abuse of refund policy may result in account suspension. Multiple refund requests will be investigated.',
      color: '#FF6B35'
    },
    {
      icon: FileText,
      title: 'Documentation Required',
      description: 'You may need to provide screenshots, transaction details, or evidence of technical issues for approval.',
      color: '#8B5CF6'
    }
  ];

  const faqs = [
    {
      question: 'How long do I have to request a refund?',
      answer: 'You have 7 days from the date of purchase to request a refund. After this period, no refund requests will be entertained.'
    },
    {
      question: 'What if I\'ve already used some credits?',
      answer: 'You can request a refund even if you\'ve used up to 3 credits. If you\'ve used more than 3 credits, you are not eligible for a refund. This policy allows you to try our service before committing fully.'
    },
    {
      question: 'Can I get a partial refund?',
      answer: 'No, we do not offer partial refunds. The refund is for the full purchase amount only. If you\'ve used some credits and are still eligible, you\'ll receive the complete amount back.'
    },
    {
      question: 'What payment methods are eligible for refunds?',
      answer: 'All payment methods used on our platform (Credit Card, Debit Card, UPI, Net Banking, Wallets) are eligible for refunds. The amount will be credited back to the same payment source.'
    },
    {
      question: 'Will I get my credits back instead of money?',
      answer: 'No, refunds are processed as monetary refunds only, not as credits. Once a refund is approved, your account credits will be deducted and money will be returned.'
    },
    {
      question: 'What happens to tests I\'ve already unlocked?',
      answer: 'Once a refund is processed, all unlocked tests and access will be immediately revoked. You will no longer be able to access any content purchased with that package.'
    },
    {
      question: 'Can I re-purchase after getting a refund?',
      answer: 'Yes, you can purchase again after receiving a refund. However, please note that refund policy applies only to first-time purchases, so future purchases may not be eligible for refunds.'
    },
    {
      question: 'What if my refund request is rejected?',
      answer: 'If your request is rejected, you\'ll receive an email explaining the reason. You can contact our support team at support@pyqpb.com for further clarification or dispute resolution.'
    }
  ];

  const notEligibleScenarios = [
    'Purchase made more than 7 days ago',
    'More than 3 credits have been used',
    'This is not your first purchase (repeat purchases)',
    'Change of mind without valid technical reason',
    'Already received a refund on previous purchase',
    'Account involved in fraudulent activity',
    'Promotional or discounted packages (as stated in offer terms)',
    'Requests made after account deletion'
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
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-grid-pattern"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white shadow-2xl mb-6">
                <Shield className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-sm uppercase tracking-tight">Your Satisfaction, Our Priority</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                REFUND
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                  POLICY
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed">
                7-Day Money-Back Guarantee • Hassle-Free Process • Customer First Approach
              </p>
            </div>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-16">
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 border-4 border-black rounded-3xl p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-black flex-shrink-0">
                <Award className="w-10 h-10 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-black text-black mb-4">7-Day Money-Back Guarantee</h2>
                <p className="text-lg md:text-xl text-black font-bold leading-relaxed">
                  Try our mock tests risk-free! If you're not satisfied with the quality within 7 days of purchase 
                  and have used 3 or fewer credits, we'll give you a full refund - no questions asked.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Criteria */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Refund <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Eligibility</span>
            </h2>
            <p className="text-xl text-gray-600 font-medium">Check if your purchase qualifies for a refund</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eligibilityCriteria.map((criteria, idx) => (
              <div
                key={idx}
                className={`bg-white border-4 rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${
                  criteria.eligible ? 'border-green-600' : 'border-red-600'
                }`}
              >
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-4 mb-4 ${
                    criteria.eligible ? 'border-green-600 bg-green-100' : 'border-red-600 bg-red-100'
                  }`}
                >
                  <criteria.icon 
                    className="w-8 h-8" 
                    style={{ color: criteria.eligible ? '#10B981' : '#DC2626' }}
                  />
                </div>
                <h3 className="text-xl font-black text-black mb-2">{criteria.title}</h3>
                <p className="text-sm text-gray-700 font-medium">{criteria.description}</p>
                <div className={`mt-4 px-3 py-1 inline-block font-black text-xs uppercase rounded-full border-2 ${
                  criteria.eligible 
                    ? 'bg-green-100 text-green-800 border-green-600' 
                    : 'bg-red-100 text-red-800 border-red-600'
                }`}>
                  {criteria.eligible ? '✓ Eligible' : '✗ Not Eligible'}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Refund Process */}
        <section className="bg-black py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                How to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">Request Refund</span>
              </h2>
              <p className="text-xl text-gray-400 font-medium">Simple 5-step process to get your money back</p>
            </div>

            <div className="space-y-6">
              {refundProcess.map((process, idx) => (
                <div
                  key={idx}
                  className="bg-white border-4 border-white rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:scale-102 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row items-center gap-6 p-8">
                    {/* Step Number */}
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-black font-black text-3xl flex-shrink-0"
                      style={{ backgroundColor: process.color, color: 'white' }}
                    >
                      {process.step}
                    </div>

                    {/* Icon */}
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center border-4 border-black flex-shrink-0"
                      style={{ backgroundColor: process.color + '20' }}
                    >
                      <process.icon className="w-10 h-10" style={{ color: process.color }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-black text-black mb-2">{process.title}</h3>
                      <p className="text-lg text-gray-700 font-medium">{process.description}</p>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-2 px-6 py-3 bg-gray-100 border-2 border-black rounded-full flex-shrink-0">
                      <Clock className="w-5 h-5 text-gray-700" />
                      <span className="font-bold text-gray-700">{process.duration}</span>
                    </div>

                    {/* Arrow */}
                    {idx < refundProcess.length - 1 && (
                      <ArrowRight className="hidden md:block w-8 h-8 text-gray-300 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-black text-xl uppercase border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
              >
                <Mail className="w-6 h-6" />
                Request Refund
              </Link>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Important <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Information</span>
            </h2>
            <p className="text-xl text-gray-600 font-medium">Please read these carefully before requesting a refund</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {importantNotes.map((note, idx) => (
              <div
                key={idx}
                className="bg-white border-4 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center border-4 border-black flex-shrink-0"
                    style={{ backgroundColor: note.color + '20' }}
                  >
                    <note.icon className="w-7 h-7" style={{ color: note.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-black mb-2">{note.title}</h3>
                    <p className="text-gray-700 font-medium leading-relaxed">{note.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Not Eligible Section */}
        <section className="bg-gradient-to-br from-red-50 to-orange-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border-4 border-red-600 rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]">
              <div className="flex items-center gap-4 mb-6">
                <XCircle className="w-10 h-10 text-red-600 flex-shrink-0" />
                <h3 className="text-3xl font-black text-black">Not Eligible for Refund</h3>
              </div>

              <p className="text-gray-700 font-medium mb-6 text-lg">
                The following scenarios do NOT qualify for refunds under any circumstances:
              </p>

              <div className="space-y-3">
                {notEligibleScenarios.map((scenario, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800 font-medium">{scenario}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Refund <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">FAQs</span>
            </h2>
            <p className="text-xl text-gray-600 font-medium">Common questions about our refund policy</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border-4 border-black rounded-xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-black text-black mb-3">{faq.question}</h3>
                    <p className="text-gray-700 font-medium leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 border-4 border-black rounded-3xl p-12 md:p-16 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              NEED HELP WITH
              <br />
              <span className="text-yellow-400">YOUR REFUND?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-bold mb-8 max-w-2xl mx-auto">
              Our support team is here to assist you with any refund-related queries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:refund@pyqpb.com"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-black text-xl rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 uppercase"
              >
                <Mail className="w-6 h-6" />
                Email: refund@pyqpb.com
              </a>
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white font-black text-xl rounded-none border-4 border-white hover:bg-gray-900 transition-colors uppercase"
              >
                <Phone className="w-6 h-6" />
                Contact Support
              </Link>
            </div>
          </div>
        </section>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotestar:wght@400;500;700&display=swap');
          
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
        `}</style>
      </div>
    </>
  );
};

export default RefundPolicy;