import { useState } from 'react';
import { 
  Shield, Lock, Eye, Database, Users, Cookie, Mail,
  Globe, FileText, AlertTriangle, CheckCircle, XCircle,
  Calendar, ChevronDown, UserCheck, CreditCard, Bell,
  Smartphone, Cloud, Share2, Trash2, Download, Settings,
  Info, Scale, ArrowRight, TrendingUp, Clock
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const PrivacyPolicy = () => {
  const [openSection, setOpenSection] = useState<number | null>(1);

  const lastUpdated = 'February 8, 2024';
  const effectiveDate = 'January 1, 2024';

  const quickNav = [
    { id: 1, title: 'Information We Collect', icon: Database, color: '#2E5CFF' },
    { id: 2, title: 'How We Use Data', icon: Settings, color: '#10B981' },
    { id: 3, title: 'Data Sharing', icon: Share2, color: '#FF6B35' },
    { id: 4, title: 'Data Security', icon: Lock, color: '#8B5CF6' },
    { id: 5, title: 'Cookies & Tracking', icon: Cookie, color: '#DC2626' },
    { id: 6, title: 'Your Rights', icon: UserCheck, color: '#0891B2' },
    { id: 7, title: 'Children\'s Privacy', icon: Users, color: '#F59E0B' },
    { id: 8, title: 'Changes & Contact', icon: Mail, color: '#EC4899' }
  ];

  const sections = [
    {
      id: 1,
      title: 'Information We Collect',
      icon: Database,
      color: '#2E5CFF',
      content: [
        {
          heading: 'Information You Provide',
          text: 'When you create an account or use our services, you directly provide us with: (a) Personal Information: Name, email address, phone number (optional), date of birth (optional); (b) Account Credentials: Username, password (encrypted); (c) Profile Information: Exam preferences, target exams, study goals; (d) Payment Information: Billing details, transaction history (payment card details are handled by Razorpay and not stored on our servers); (e) Communications: Messages you send to our support team, feedback, survey responses.',
          icon: UserCheck
        },
        {
          heading: 'Information Automatically Collected',
          text: 'When you use our platform, we automatically collect: (a) Device Information: IP address, browser type and version, operating system, device type, unique device identifiers; (b) Usage Information: Pages visited, time spent on pages, features used, mock tests attempted, questions answered; (c) Performance Data: Test scores, rankings, time spent per question, accuracy metrics, subject-wise performance; (d) Log Data: Access times, error logs, crash reports.',
          icon: Smartphone
        },
        {
          heading: 'Information from Third Parties',
          text: 'If you sign up using Google authentication, we receive: (a) Basic profile information (name, email, profile picture) from Google; (b) We do not access your Google account data beyond what\'s necessary for authentication; (c) We may collect information from payment processors (Razorpay) regarding transaction status and verification.',
          icon: Globe
        },
        {
          heading: 'Cookies and Similar Technologies',
          text: 'We use cookies and similar tracking technologies to: (a) Remember your preferences and settings; (b) Understand how you use our services; (c) Improve user experience; (d) Analyze platform performance; (e) Prevent fraud and enhance security. You can control cookie preferences through your browser settings.',
          icon: Cookie
        }
      ]
    },
    {
      id: 2,
      title: 'How We Use Your Data',
      icon: Settings,
      color: '#10B981',
      content: [
        {
          heading: 'Service Delivery',
          text: 'We use your information to: (a) Create and manage your account; (b) Provide access to free PYQs and paid mock tests; (c) Process payments and manage credits; (d) Generate performance reports and analytics; (e) Calculate All India rankings and percentiles; (f) Personalize your learning experience and recommendations.',
          icon: CheckCircle
        },
        {
          heading: 'Communication',
          text: 'We use your contact information to: (a) Send service-related notifications (purchase confirmations, credit updates, test results); (b) Respond to your inquiries and support requests; (c) Send important updates about our services; (d) Send promotional emails (you can opt-out anytime); (e) Conduct surveys and request feedback.',
          icon: Mail
        },
        {
          heading: 'Platform Improvement',
          text: 'We analyze usage data to: (a) Understand user behavior and preferences; (b) Improve platform functionality and user interface; (c) Develop new features and services; (d) Optimize content quality and relevance; (e) Fix bugs and enhance performance; (f) Conduct research and analysis.',
          icon: TrendingUp
        },
        {
          heading: 'Security and Fraud Prevention',
          text: 'We process data to: (a) Detect and prevent fraudulent activities; (b) Protect against unauthorized access; (c) Enforce our Terms of Service; (d) Comply with legal obligations; (e) Resolve disputes and troubleshoot problems.',
          icon: Shield
        },
        {
          heading: 'Legal Compliance',
          text: 'We may use and disclose information as required by law, including: (a) Compliance with legal processes (court orders, subpoenas); (b) Enforcement of our policies and terms; (c) Protection of rights, property, or safety of PYQPB, users, or public; (d) Response to government requests.',
          icon: Scale
        }
      ]
    },
    {
      id: 3,
      title: 'Data Sharing and Disclosure',
      icon: Share2,
      color: '#FF6B35',
      content: [
        {
          heading: 'We Do NOT Sell Your Data',
          text: 'PYQPB does not sell, rent, or trade your personal information to third parties for their marketing purposes. Your privacy is our priority, and we are committed to protecting your data.',
          icon: XCircle
        },
        {
          heading: 'Service Providers',
          text: 'We share limited information with trusted third-party service providers who help us operate our platform: (a) Payment Processors: Razorpay (for processing payments securely); (b) Cloud Hosting: AWS/Google Cloud (for data storage and server hosting); (c) Email Services: For sending transactional and promotional emails; (d) Analytics: Google Analytics (for understanding platform usage). These providers are contractually obligated to protect your data and use it only for specified purposes.',
          icon: Cloud
        },
        {
          heading: 'Business Transfers',
          text: 'If PYQPB undergoes a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity. We will notify you via email and/or prominent notice on our website before your information becomes subject to a different privacy policy.',
          icon: ArrowRight
        },
        {
          heading: 'Legal Requirements',
          text: 'We may disclose your information if required by law or in good faith belief that such action is necessary to: (a) Comply with legal obligations; (b) Protect and defend our rights or property; (c) Prevent fraud or security issues; (d) Protect personal safety of users or public.',
          icon: Scale
        },
        {
          heading: 'Aggregated Data',
          text: 'We may share aggregated, anonymized data that does not identify you personally (e.g., "70% of users scored above 80%"). This helps us with research, trends analysis, and platform improvements.',
          icon: Database
        }
      ]
    },
    {
      id: 4,
      title: 'Data Security',
      icon: Lock,
      color: '#8B5CF6',
      content: [
        {
          heading: 'Security Measures',
          text: 'We implement industry-standard security measures to protect your data: (a) Encryption: All data transmission is encrypted using SSL/TLS (256-bit encryption); (b) Password Security: Passwords are hashed and salted before storage; (c) Access Controls: Strict access controls and authentication for our systems; (d) Regular Audits: Periodic security audits and vulnerability assessments; (e) Secure Servers: Data stored on secure servers with firewalls and intrusion detection.',
          icon: Lock
        },
        {
          heading: 'Payment Security',
          text: 'Payment information is handled securely: (a) We do NOT store your credit/debit card details on our servers; (b) All payment processing is handled by PCI-DSS compliant payment gateway (Razorpay); (c) Payment data is encrypted and tokenized; (d) We only receive transaction confirmation, not card details.',
          icon: CreditCard
        },
        {
          heading: 'Data Backup',
          text: 'Your data is regularly backed up to prevent loss: (a) Automated daily backups; (b) Redundant storage across multiple locations; (c) Disaster recovery procedures in place; (d) Backup data is encrypted and secured.',
          icon: Database
        },
        {
          heading: 'Limitations',
          text: 'While we implement strong security measures, please note: (a) No method of transmission over the internet is 100% secure; (b) You are responsible for maintaining the confidentiality of your account credentials; (c) Notify us immediately if you suspect unauthorized access; (d) We cannot guarantee absolute security but continuously work to improve protection.',
          icon: AlertTriangle
        }
      ]
    },
    {
      id: 5,
      title: 'Cookies and Tracking Technologies',
      icon: Cookie,
      color: '#DC2626',
      content: [
        {
          heading: 'Types of Cookies We Use',
          text: 'Essential Cookies: Required for platform functionality (login, navigation, security). These cannot be disabled. Performance Cookies: Help us understand how you use our platform to improve performance. Functional Cookies: Remember your preferences and settings. Analytics Cookies: Google Analytics and similar tools to analyze usage patterns. Marketing Cookies: Track effectiveness of our campaigns (can be opted out).',
          icon: Cookie
        },
        {
          heading: 'Third-Party Cookies',
          text: 'We use third-party services that may set their own cookies: (a) Google Analytics: For platform usage analytics; (b) Razorpay: For payment processing; (c) Social Media: If you share content on social platforms. These third parties have their own privacy policies governing cookie use.',
          icon: Globe
        },
        {
          heading: 'Local Storage',
          text: 'We may use browser local storage to: (a) Store user preferences; (b) Cache data for better performance; (c) Enable offline functionality; (d) Remember your session. Local storage data remains on your device until cleared.',
          icon: Database
        },
        {
          heading: 'Managing Cookies',
          text: 'You can control cookies through: (a) Browser Settings: Most browsers allow you to refuse cookies or delete existing ones; (b) Opt-Out Tools: Use browser extensions or privacy tools; (c) Account Settings: Manage some preferences in your account settings. Note: Disabling essential cookies may affect platform functionality.',
          icon: Settings
        }
      ]
    },
    {
      id: 6,
      title: 'Your Privacy Rights',
      icon: UserCheck,
      color: '#0891B2',
      content: [
        {
          heading: 'Access Your Data',
          text: 'You have the right to access your personal data. You can: (a) View your profile information in account settings; (b) Request a copy of all data we hold about you; (c) Download your test history and performance reports. Contact us at privacy@pyqpb.com to request a complete data export.',
          icon: Download
        },
        {
          heading: 'Correct Your Data',
          text: 'You can update or correct your information anytime: (a) Edit your profile through account settings; (b) Update email, name, and other details; (c) Contact support for help with corrections. We encourage keeping your information accurate and up-to-date.',
          icon: Settings
        },
        {
          heading: 'Delete Your Data',
          text: 'You have the right to request deletion of your data: (a) Delete your account through account settings; (b) All personal data will be deleted within 30 days; (c) Some data may be retained for legal compliance; (d) Backups may retain data for up to 90 days. Contact privacy@pyqpb.com for specific deletion requests.',
          icon: Trash2
        },
        {
          heading: 'Data Portability',
          text: 'You can request your data in a portable format: (a) Download your test results and performance data; (b) Export account information; (c) Receive data in commonly used formats (CSV, PDF). This allows you to transfer data to another service if desired.',
          icon: Download
        },
        {
          heading: 'Opt-Out of Communications',
          text: 'You can control what communications you receive: (a) Unsubscribe from promotional emails via unsubscribe link; (b) Manage notification preferences in account settings; (c) Continue to receive essential service-related emails. You cannot opt out of critical service communications.',
          icon: Bell
        },
        {
          heading: 'Object to Processing',
          text: 'You may object to certain data processing activities: (a) Marketing and promotional use; (b) Analytics and research (where not essential); (c) Automated decision-making. Contact us to exercise this right.',
          icon: XCircle
        }
      ]
    },
    {
      id: 7,
      title: 'Children\'s Privacy',
      icon: Users,
      color: '#F59E0B',
      content: [
        {
          heading: 'Age Restrictions',
          text: 'Our services are intended for users aged 13 and above. Users under 18 must have parental or guardian consent. We do not knowingly collect personal information from children under 13 years of age without verifiable parental consent.',
          icon: Users
        },
        {
          heading: 'Parental Consent',
          text: 'If you are under 18: (a) You must have permission from a parent/guardian to use our services; (b) Parents/guardians should monitor their child\'s use of our platform; (c) Parents can contact us to review, modify, or delete their child\'s information.',
          icon: UserCheck
        },
        {
          heading: 'What We Collect from Minors',
          text: 'For users under 18 with parental consent, we collect only: (a) Information necessary for account creation; (b) Academic performance data; (c) Minimum necessary data for service delivery. We do not use minor\'s data for marketing purposes.',
          icon: Shield
        },
        {
          heading: 'Parent Rights',
          text: 'Parents/guardians have the right to: (a) Review their child\'s personal information; (b) Request deletion of their child\'s data; (c) Refuse further collection or use of their child\'s information; (d) Contact us at privacy@pyqpb.com for assistance.',
          icon: Lock
        }
      ]
    },
    {
      id: 8,
      title: 'Policy Changes and Contact',
      icon: Mail,
      color: '#EC4899',
      content: [
        {
          heading: 'Changes to This Policy',
          text: 'We may update this Privacy Policy from time to time. When we make changes: (a) We will update the "Last Updated" date; (b) Significant changes will be notified via email; (c) Continued use after changes means acceptance; (d) We recommend reviewing this policy periodically.',
          icon: Calendar
        },
        {
          heading: 'How to Contact Us',
          text: 'For privacy-related questions, concerns, or requests, contact us at: Email: privacy@pyqpb.com; General Support: support@pyqpb.com; Address: Mumbai, Maharashtra, India. We will respond to your inquiry within 7 business days.',
          icon: Mail
        },
        {
          heading: 'Data Protection Officer',
          text: 'For serious privacy concerns or complaints: (a) Contact our Data Protection Officer at privacy@pyqpb.com; (b) Provide detailed description of your concern; (c) We will investigate and respond within 30 days.',
          icon: Shield
        },
        {
          heading: 'Regulatory Compliance',
          text: 'Our privacy practices comply with: (a) Information Technology Act, 2000 (India); (b) Information Technology (Reasonable Security Practices) Rules, 2011; (c) Applicable Indian privacy laws and regulations. We regularly review our practices to ensure compliance.',
          icon: Scale
        }
      ]
    }
  ];

  const dataTypes = [
    { type: 'Personal Info', examples: 'Name, Email, Phone', retained: 'Until account deletion', icon: Users, color: '#2E5CFF' },
    { type: 'Account Data', examples: 'Login credentials, Preferences', retained: 'Until account deletion', icon: Lock, color: '#10B981' },
    { type: 'Payment Info', examples: 'Transaction history, Billing', retained: '7 years (legal requirement)', icon: CreditCard, color: '#FF6B35' },
    { type: 'Usage Data', examples: 'Test scores, Performance', retained: 'Until account deletion', icon: Database, color: '#8B5CF6' },
    { type: 'Technical Data', examples: 'IP address, Device info', retained: '90 days', icon: Smartphone, color: '#DC2626' },
    { type: 'Communications', examples: 'Support messages, Feedback', retained: '2 years', icon: Mail, color: '#0891B2' }
  ];

  const yourChoices = [
    { title: 'Access Data', description: 'Request copy of your data', icon: Download, color: '#2E5CFF' },
    { title: 'Update Info', description: 'Edit your profile anytime', icon: Settings, color: '#10B981' },
    { title: 'Delete Account', description: 'Permanently remove data', icon: Trash2, color: '#DC2626' },
    { title: 'Opt-Out Emails', description: 'Unsubscribe from marketing', icon: Bell, color: '#FF6B35' },
    { title: 'Export Data', description: 'Download in portable format', icon: Download, color: '#8B5CF6' },
    { title: 'Cookie Control', description: 'Manage cookie preferences', icon: Cookie, color: '#0891B2' }
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
                <Shield className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-sm uppercase tracking-tight">Your Privacy Matters</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                PRIVACY
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                  POLICY
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed mb-4">
                We respect your privacy and are committed to protecting your personal data
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/70 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Last Updated: {lastUpdated}</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Effective: {effectiveDate}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-16">
          <div className="bg-gradient-to-br from-blue-400 to-purple-500 border-4 border-black rounded-3xl p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-black flex-shrink-0">
                <Eye className="w-10 h-10 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Privacy at a Glance</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
                    <span className="text-white font-bold">We don't sell your data</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
                    <span className="text-white font-bold">You control your information</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
                    <span className="text-white font-bold">Bank-grade encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-black" />
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
                        <div className="flex items-center gap-3 mb-3">
                          {item.icon && <item.icon className="w-6 h-6" style={{ color: section.color }} />}
                          <h4 className="text-xl font-black text-black">{item.heading}</h4>
                        </div>
                        <p className="text-gray-700 font-medium leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data Retention */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Retention</span>
              </h2>
              <p className="text-xl text-gray-600 font-medium">How long we keep different types of data</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataTypes.map((data, idx) => (
                <div
                  key={idx}
                  className="bg-white border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center border-4 border-black mb-4"
                    style={{ backgroundColor: data.color + '20' }}
                  >
                    <data.icon className="w-7 h-7" style={{ color: data.color }} />
                  </div>
                  <h3 className="text-xl font-black text-black mb-2">{data.type}</h3>
                  <p className="text-sm text-gray-600 font-medium mb-3">{data.examples}</p>
                  <div className="flex items-center gap-2 pt-3 border-t-2 border-gray-100">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-xs font-bold text-gray-700">Retained: {data.retained}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Your Choices */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Choices</span>
            </h2>
            <p className="text-xl text-gray-600 font-medium">You have full control over your data</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {yourChoices.map((choice, idx) => (
              <div
                key={idx}
                className="bg-white border-4 border-black rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center border-4 border-black mb-4"
                  style={{ backgroundColor: choice.color + '20' }}
                >
                  <choice.icon className="w-7 h-7" style={{ color: choice.color }} />
                </div>
                <h3 className="text-xl font-black text-black mb-2">{choice.title}</h3>
                <p className="text-gray-600 font-medium">{choice.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Important Notice */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-blue-50 border-4 border-blue-600 rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
            <div className="flex items-start gap-4">
              <Info className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-black text-blue-900 mb-4">Your Rights Under Indian Law</h3>
                <div className="space-y-3 text-blue-900 font-medium leading-relaxed">
                  <p>
                    Under the Information Technology Act, 2000 and related rules, you have the right to access, correct, and delete your personal information. You may also withdraw consent for data processing at any time.
                  </p>
                  <p>
                    We comply with all applicable Indian privacy laws and regulations. If you have concerns about how your data is being handled, you have the right to file a complaint with relevant authorities.
                  </p>
                  <p>
                    For any privacy-related questions or to exercise your rights, contact our Data Protection Officer at privacy@pyqpb.com.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-black py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Questions About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">Privacy?</span>
              </h2>
              <p className="text-xl text-gray-400 font-medium">We're here to help you understand how we protect your data</p>
            </div>

            <div className="text-center">
              <a
                href="mailto:privacy@pyqpb.com"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-black text-xl uppercase border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
              >
                <Mail className="w-6 h-6" />
                Contact: privacy@pyqpb.com
              </a>
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

export default PrivacyPolicy;