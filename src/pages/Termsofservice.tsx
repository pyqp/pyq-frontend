import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Shield, Users, CreditCard, Lock, AlertTriangle,
  CheckCircle, XCircle, Scale, BookOpen, Globe, Mail,
  Calendar, Info, ChevronDown, ArrowRight, Zap
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const TermsOfService = () => {
  const [openSection, setOpenSection] = useState<number | null>(1);

  const lastUpdated = 'February 8, 2024';

  const quickNav = [
    { id: 1, title: 'Acceptance of Terms', icon: CheckCircle, color: '#23252b' },
    { id: 2, title: 'User Accounts', icon: Users, color: '#10B981' },
    { id: 3, title: 'Services & Access', icon: BookOpen, color: '#FF6B35' },
    { id: 4, title: 'Payment & Billing', icon: CreditCard, color: '#8B5CF6' },
    { id: 5, title: 'Intellectual Property', icon: Lock, color: '#DC2626' },
    { id: 6, title: 'User Conduct', icon: Shield, color: '#0891B2' },
    { id: 7, title: 'Limitation of Liability', icon: AlertTriangle, color: '#F59E0B' },
    { id: 8, title: 'Termination', icon: XCircle, color: '#EC4899' }
  ];

  const sections = [
    {
      id: 1,
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      color: '#2E5CFF',
      content: [
        {
          heading: 'Agreement to Terms',
          text: 'By accessing or using PYQPB (pyqpb.com), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you must not use our services.'
        },
        {
          heading: 'Who Can Use Our Services',
          text: 'You must be at least 13 years of age to use our services. If you are under 18, you must have permission from a parent or guardian. By using our services, you represent and warrant that you meet these requirements.'
        },
        {
          heading: 'Changes to Terms',
          text: 'We reserve the right to modify these terms at any time. We will notify users of any material changes via email or prominent notice on the website. Your continued use of the service after such modifications constitutes acceptance of the updated terms.'
        },
        {
          heading: 'Binding Agreement',
          text: 'These terms constitute a legally binding agreement between you and PYQPB. By creating an account or using our services, you acknowledge that you have read, understood, and agree to be bound by these terms.'
        }
      ]
    },
    {
      id: 2,
      title: 'User Accounts',
      icon: Users,
      color: '#10B981',
      content: [
        {
          heading: 'Account Creation',
          text: 'To access certain features, you must create an account. You may register using your email address or through third-party authentication (Google). You agree to provide accurate, current, and complete information during registration.'
        },
        {
          heading: 'Account Security',
          text: 'You are responsible for maintaining the confidentiality of your account credentials. You must immediately notify us of any unauthorized use of your account. We are not liable for any loss or damage arising from your failure to protect your account information.'
        },
        {
          heading: 'Account Restrictions',
          text: 'Each user is permitted one account only. Creating multiple accounts to abuse free trials, promotional offers, or refund policies is strictly prohibited and may result in account suspension or termination without refund.'
        },
        {
          heading: 'Account Information',
          text: 'You agree to keep your account information up-to-date. We may suspend or terminate accounts with invalid or outdated information. You can update your information through your account settings at any time.'
        },
        {
          heading: 'Account Termination by User',
          text: 'You may delete your account at any time through account settings. Upon deletion, all your data, including purchase history, credits, and test results, will be permanently deleted within 30 days and cannot be recovered.'
        }
      ]
    },
    {
      id: 3,
      title: 'Services & Access',
      icon: BookOpen,
      color: '#FF6B35',
      content: [
        {
          heading: 'Free Services',
          text: 'We provide free access to the latest year Previous Year Questions (PYQs) with detailed solutions. Free services are provided "as is" without any warranties. We reserve the right to modify, suspend, or discontinue free services at any time without notice.'
        },
        {
          heading: 'Paid Services',
          text: 'Premium mock tests are available through a credit-based system. By purchasing credits, you gain access to professional mock tests with features including real exam simulation, instant results, All India ranking, and detailed analytics.'
        },
        {
          heading: 'Service Availability',
          text: 'We strive to provide uninterrupted service but do not guarantee that our services will be available at all times. We may experience downtime due to maintenance, updates, or circumstances beyond our control. We are not liable for any loss resulting from service interruptions.'
        },
        {
          heading: 'Content Accuracy',
          text: 'While we make every effort to ensure accuracy of questions, answers, and solutions, we do not warrant that all content is error-free. Users should verify important information from official sources. We are not responsible for any consequences arising from reliance on our content.'
        },
        {
          heading: 'Service Modifications',
          text: 'We reserve the right to modify, update, or discontinue any aspect of our services at any time. This includes but is not limited to pricing, features, content, and accessibility. Material changes affecting paid services will be communicated in advance.'
        }
      ]
    },
    {
      id: 4,
      title: 'Payment & Billing',
      icon: CreditCard,
      color: '#8B5CF6',
      content: [
        {
          heading: 'Pricing',
          text: 'All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes. We reserve the right to change pricing at any time. Price changes will not affect purchases already made but will apply to future purchases.'
        },
        {
          heading: 'Payment Processing',
          text: 'Payments are processed securely through Razorpay. We accept credit cards, debit cards, UPI, net banking, and digital wallets. By providing payment information, you authorize us to charge your payment method for all fees incurred.'
        },
        {
          heading: 'Credit System',
          text: 'Purchased credits are non-transferable and can only be used by the account holder. Credits expire based on the package purchased (30/90/180 days). Unused credits expire at the end of the validity period and cannot be refunded or extended.'
        },
        {
          heading: 'Refund Policy',
          text: 'Refunds are available under specific conditions as outlined in our Refund Policy. Generally, refunds are available within 7 days of purchase if you have used 3 or fewer credits and it is your first purchase. Please review our complete Refund Policy for details.'
        },
        {
          heading: 'Failed Transactions',
          text: 'If a payment fails but money is deducted from your account, it will be automatically refunded by the payment gateway within 5-7 business days. Contact our support if the refund is not received within this timeframe.'
        },
        {
          heading: 'Billing Disputes',
          text: 'Any billing disputes must be reported within 30 days of the transaction. Provide your order ID and transaction details to support@pyqpb.com. We will investigate and resolve disputes within 7 business days.'
        }
      ]
    },
    {
      id: 5,
      title: 'Intellectual Property',
      icon: Lock,
      color: '#DC2626',
      content: [
        {
          heading: 'Ownership',
          text: 'All content on PYQPB, including but not limited to text, graphics, logos, questions, solutions, software, and compilations, is the property of PYQPB or its content suppliers and is protected by Indian and international copyright laws.'
        },
        {
          heading: 'License to Use',
          text: 'We grant you a limited, non-exclusive, non-transferable license to access and use our services for personal, non-commercial purposes. This license does not include any right to download, copy, modify, or distribute our content except as explicitly allowed.'
        },
        {
          heading: 'Free PYQ Downloads',
          text: 'You may download free PYQ PDFs for personal study purposes only. Sharing PDFs with friends and family for non-commercial use is permitted. However, commercial distribution, selling, or mass distribution is strictly prohibited.'
        },
        {
          heading: 'Mock Test Content',
          text: 'Mock test questions, answers, and solutions are proprietary content. You may not screenshot, record, copy, or distribute mock test content in any form. Violation may result in account termination and legal action.'
        },
        {
          heading: 'Restrictions',
          text: 'You may not: (a) reverse engineer or decompile our software, (b) remove copyright or proprietary notices, (c) use automated systems to access our services, (d) create derivative works, or (e) use our content for training AI models or competing services.'
        },
        {
          heading: 'Trademark',
          text: 'PYQPB, our logo, and other marks are trademarks of our company. You may not use our trademarks without prior written permission. Any unauthorized use may constitute trademark infringement.'
        }
      ]
    },
    {
      id: 6,
      title: 'User Conduct',
      icon: Shield,
      color: '#0891B2',
      content: [
        {
          heading: 'Acceptable Use',
          text: 'You agree to use our services only for lawful purposes and in accordance with these terms. You are responsible for all activity under your account and must not allow others to use your account.'
        },
        {
          heading: 'Prohibited Activities',
          text: 'You must not: (a) share account credentials, (b) attempt to gain unauthorized access, (c) interfere with service functionality, (d) upload malicious code, (e) harass other users, (f) engage in fraudulent activities, or (g) violate any applicable laws.'
        },
        {
          heading: 'Academic Integrity',
          text: 'You agree not to share mock test questions or answers during an active test session. Cheating, collusion, or any form of academic dishonesty will result in immediate account termination without refund.'
        },
        {
          heading: 'Content Sharing',
          text: 'While we encourage sharing free PYQs for educational purposes, mass distribution for commercial gain is prohibited. Do not create websites, apps, or channels that republish our content without authorization.'
        },
        {
          heading: 'Reporting Violations',
          text: 'If you become aware of any violation of these terms, please report it to support@pyqpb.com. We investigate all reports and take appropriate action, which may include account suspension or termination.'
        }
      ]
    },
    {
      id: 7,
      title: 'Limitation of Liability',
      icon: AlertTriangle,
      color: '#F59E0B',
      content: [
        {
          heading: 'Service Disclaimer',
          text: 'Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that services will be uninterrupted, error-free, or secure, or that defects will be corrected.'
        },
        {
          heading: 'Content Accuracy',
          text: 'We strive for accuracy but make no warranties regarding the accuracy, reliability, or completeness of any content. You should verify important information from official sources. Use of our content is at your own risk.'
        },
        {
          heading: 'Exam Results',
          text: 'We are not responsible for your exam results or outcomes. Our services are educational tools to aid preparation. Success depends on multiple factors including your effort, understanding, and exam performance.'
        },
        {
          heading: 'Limitation of Damages',
          text: 'To the maximum extent permitted by law, PYQPB shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.'
        },
        {
          heading: 'Maximum Liability',
          text: 'Our total liability to you for any claims arising from these terms or your use of services shall not exceed the amount you paid to us in the twelve (12) months preceding the claim, or ₹1,000, whichever is less.'
        },
        {
          heading: 'Third-Party Links',
          text: 'Our services may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of third-party sites. Access them at your own risk.'
        }
      ]
    },
    {
      id: 8,
      title: 'Termination',
      icon: XCircle,
      color: '#EC4899',
      content: [
        {
          heading: 'Termination by You',
          text: 'You may terminate your account at any time by deleting it through account settings. Upon termination, you forfeit all unused credits and access to paid content. No refunds will be provided for voluntary account deletion.'
        },
        {
          heading: 'Termination by Us',
          text: 'We reserve the right to suspend or terminate your account at any time for: (a) violation of these terms, (b) fraudulent activity, (c) abuse of services, (d) non-payment, or (e) any reason we deem necessary to protect our services or other users.'
        },
        {
          heading: 'Effect of Termination',
          text: 'Upon termination, your right to use services immediately ceases. All licenses granted to you terminate, and you must cease all use of our content. Provisions regarding intellectual property, limitation of liability, and dispute resolution survive termination.'
        },
        {
          heading: 'Data Retention',
          text: 'After account termination, we may retain your data for legal, regulatory, or operational purposes. Personal data will be deleted in accordance with our Privacy Policy, typically within 30 days unless required to retain longer.'
        }
      ]
    }
  ];

  const additionalTerms = [
    {
      icon: Globe,
      title: 'Governing Law',
      text: 'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.',
      color: '#2E5CFF'
    },
    {
      icon: Scale,
      title: 'Dispute Resolution',
      text: 'Any disputes arising from these terms or your use of services should first be resolved through good faith negotiation. If unresolved, disputes will be settled through binding arbitration in Mumbai, India.',
      color: '#10B981'
    },
    {
      icon: FileText,
      title: 'Severability',
      text: 'If any provision of these terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect. Invalid provisions will be modified to reflect the parties\' intent.',
      color: '#FF6B35'
    },
    {
      icon: Zap,
      title: 'Force Majeure',
      text: 'We are not liable for any failure to perform obligations due to circumstances beyond our reasonable control, including natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, or internet service failures.',
      color: '#8B5CF6'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'legal@pyqpb.com',
      link: 'mailto:legal@pyqpb.com'
    },
    {
      icon: Globe,
      title: 'Website',
      value: 'www.pyqpb.com',
      link: 'https://www.pyqpb.com'
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
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-grid-pattern"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white shadow-2xl mb-6">
                <Scale className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-sm uppercase tracking-tight">Legal Agreement</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                TERMS OF
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                  SERVICE
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed mb-4">
                Please read these terms carefully before using our services
              </p>

              <div className="flex items-center justify-center gap-2 text-white/70 font-medium">
                <Calendar className="w-5 h-5" />
                <span>Last Updated: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-16">
          <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-black" />
              <h2 className="text-2xl font-black text-black">Quick Navigation</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickNav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setOpenSection(item.id)}
                  className="flex items-center gap-3 p-4 border-4 border-black rounded-xl hover:scale-105 transition-all duration-300 text-left"
                  style={{ 
                    backgroundColor: openSection === item.id ? item.color + '20' : 'white'
                  }}
                >
                  <item.icon className="w-6 h-6 flex-shrink-0" style={{ color: item.color }} />
                  <span className="font-bold text-sm">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="space-y-6">
            {sections.map((section) => (
              <div
                key={section.id}
                className="bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <button
                  onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center border-4 border-black"
                      style={{ backgroundColor: section.color + '20' }}
                    >
                      <section.icon className="w-7 h-7" style={{ color: section.color }} />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-gray-500 uppercase">Section {section.id}</div>
                      <h3 className="text-2xl font-black text-black">{section.title}</h3>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-8 h-8 transition-transform duration-300 ${
                      openSection === section.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSection === section.id ? 'max-h-[5000px]' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 pt-0 space-y-8">
                    {section.content.map((item, idx) => (
                      <div key={idx} className="border-l-4 pl-6" style={{ borderColor: section.color }}>
                        <h4 className="text-xl font-black text-black mb-3">{item.heading}</h4>
                        <p className="text-gray-700 font-medium leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Terms */}
        <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                Additional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Terms</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {additionalTerms.map((term, idx) => (
                <div
                  key={idx}
                  className="bg-white border-4 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-black mb-4"
                    style={{ backgroundColor: term.color + '20' }}
                  >
                    <term.icon className="w-8 h-8" style={{ color: term.color }} />
                  </div>
                  <h3 className="text-2xl font-black text-black mb-3">{term.title}</h3>
                  <p className="text-gray-700 font-medium leading-relaxed">{term.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-yellow-50 border-4 border-yellow-600 rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(202,138,4,1)]">
            <div className="flex items-start gap-4">
              <Info className="w-10 h-10 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-black text-yellow-900 mb-4">Important Notice</h3>
                <div className="space-y-3 text-yellow-900 font-medium leading-relaxed">
                  <p>
                    By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, along with our Privacy Policy and Refund Policy.
                  </p>
                  <p>
                    These terms constitute the entire agreement between you and PYQPB regarding your use of our services. If you do not agree to these terms, you must discontinue use of our services immediately.
                  </p>
                  <p>
                    For any questions regarding these terms, please contact us at legal@pyqpb.com. We recommend saving or printing a copy of these terms for your records.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-black py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Questions About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">Terms?</span>
              </h2>
              <p className="text-xl text-gray-400 font-medium">Our legal team is here to help</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
              {contactInfo.map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.link}
                  className="bg-white border-4 border-white rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] text-center"
                >
                  <contact.icon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <div className="text-sm font-bold text-gray-600 uppercase mb-2">{contact.title}</div>
                  <div className="text-xl font-black text-black">{contact.value}</div>
                </a>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-black text-xl uppercase border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
              >
                Contact Legal Team
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

          h1, h2, h3, h4, .font-black {
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
      <Footer />
    </>
  );
};

export default TermsOfService;