import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Clock, Send, User, MessageCircle,
  CheckCircle, AlertCircle, Calendar, Headphones, Globe,
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  HelpCircle, BookOpen, CreditCard, Trophy, Zap
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      primary: 'support@pyqpb.com',
      secondary: 'General inquiries & support',
      response: 'Response within 24 hours',
      color: '#2E5CFF',
      link: 'mailto:support@pyqpb.com',
      availability: 'Always available'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      primary: 'Chat with us now',
      secondary: 'Instant support for urgent issues',
      response: 'Average response: 5 minutes',
      color: '#10B981',
      link: '#',
      availability: '9 AM - 9 PM IST (Mon-Sun)'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      primary: '+91 XXXX-XXX-XXX',
      secondary: 'Call us for immediate assistance',
      response: 'Mon-Sat, 10 AM - 6 PM',
      color: '#FF6B35',
      link: 'tel:+91XXXXXXXXXX',
      availability: 'Business hours only'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      primary: 'Mumbai, Maharashtra',
      secondary: 'India',
      response: 'Visit by appointment only',
      color: '#8B5CF6',
      link: '#',
      availability: 'Mon-Fri, 10 AM - 5 PM'
    }
  ];

  const categories = [
    { value: '', label: 'Select a category' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'account', label: 'Account Issues' },
    { value: 'payment', label: 'Payment & Billing' },
    { value: 'mock-tests', label: 'Mock Tests' },
    { value: 'pyqs', label: 'Free PYQs' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'partnership', label: 'Business & Partnership' }
  ];

  const quickLinks = [
    { icon: HelpCircle, title: 'FAQs', desc: 'Find quick answers', link: '/faqs', color: '#2E5CFF' },
    { icon: BookOpen, title: 'Help Center', desc: 'Browse help articles', link: '/help-center', color: '#10B981' },
    { icon: CreditCard, title: 'Pricing', desc: 'View our plans', link: '/pricing', color: '#FF6B35' },
    { icon: Trophy, title: 'How It Works', desc: 'Learn about platform', link: '/how-it-works', color: '#8B5CF6' }
  ];

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', link: '#', color: '#1877F2' },
    { icon: Twitter, name: 'Twitter', link: '#', color: '#1DA1F2' },
    { icon: Instagram, name: 'Instagram', link: '#', color: '#E4405F' },
    { icon: Linkedin, name: 'LinkedIn', link: '#', color: '#0A66C2' },
    { icon: Youtube, name: 'YouTube', link: '#', color: '#FF0000' }
  ];

  const officeHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 9:00 PM IST', available: true },
    { day: 'Public Holidays', hours: 'Limited support via email', available: false }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', category: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
                <Headphones className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-sm uppercase tracking-tight">We're Here to Help</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                GET IN
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                  TOUCH
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, idx) => (
              <a
                key={idx}
                href={method.link}
                className="group bg-white border-4 border-black rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-black mb-4"
                  style={{ backgroundColor: method.color + '20' }}
                >
                  <method.icon className="w-8 h-8" style={{ color: method.color }} />
                </div>
                <h3 className="text-xl font-black text-black mb-2">{method.title}</h3>
                <p className="font-bold text-lg mb-1" style={{ color: method.color }}>{method.primary}</p>
                <p className="text-sm text-gray-600 font-medium mb-2">{method.secondary}</p>
                <div className="pt-3 border-t-2 border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{method.availability}</span>
                  </div>
                  <p className="text-xs font-bold text-green-600">{method.response}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Main Content - Form & Info */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
                  Send Us a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Message</span>
                </h2>
                <p className="text-lg text-gray-600 font-medium">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                {/* Name */}
                <div className="mb-6">
                  <label className="block text-sm font-black uppercase text-gray-700 mb-3">
                    <User className="w-4 h-4 inline mr-2" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:border-blue-600 font-bold transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="block text-sm font-black uppercase text-gray-700 mb-3">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:border-blue-600 font-bold transition-colors"
                  />
                </div>

                {/* Category */}
                <div className="mb-6">
                  <label className="block text-sm font-black uppercase text-gray-700 mb-3">
                    <BookOpen className="w-4 h-4 inline mr-2" />
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:border-blue-600 font-bold transition-colors"
                  >
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div className="mb-6">
                  <label className="block text-sm font-black uppercase text-gray-700 mb-3">
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Brief subject of your message"
                    className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:border-blue-600 font-bold transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-sm font-black uppercase text-gray-700 mb-3">
                    <Send className="w-4 h-4 inline mr-2" />
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:border-blue-600 font-bold transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-black text-white font-black text-lg uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="mt-6 p-4 bg-green-100 border-4 border-green-600 rounded-lg flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <div className="font-black text-green-900">Message Sent Successfully!</div>
                      <div className="text-sm text-green-700 font-medium">We'll get back to you within 24 hours.</div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="mt-6 p-4 bg-red-100 border-4 border-red-600 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                    <div>
                      <div className="font-black text-red-900">Oops! Something went wrong.</div>
                      <div className="text-sm text-red-700 font-medium">Please try again or email us directly.</div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Right Column - Info */}
            <div className="space-y-8">
              {/* Office Hours */}
              <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-black text-black">Office Hours</h3>
                </div>

                <div className="space-y-4">
                  {officeHours.map((schedule, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
                      <div>
                        <div className="font-bold text-black">{schedule.day}</div>
                        <div className="text-sm text-gray-600 font-medium">{schedule.hours}</div>
                      </div>
                      {schedule.available ? (
                        <div className="px-3 py-1 bg-green-400 text-black font-black text-xs rounded-full border-2 border-black">
                          OPEN
                        </div>
                      ) : (
                        <div className="px-3 py-1 bg-gray-300 text-black font-black text-xs rounded-full border-2 border-black">
                          LIMITED
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-8 h-8 text-orange-600" />
                  <h3 className="text-2xl font-black text-black">Quick Help</h3>
                </div>

                <div className="space-y-3">
                  {quickLinks.map((link, idx) => (
                    <Link
                      key={idx}
                      to={link.link}
                      className="flex items-center gap-4 p-4 bg-gray-50 border-2 border-black rounded-lg hover:scale-102 transition-all duration-300 group"
                    >
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-black flex-shrink-0"
                        style={{ backgroundColor: link.color + '20' }}
                      >
                        <link.icon className="w-6 h-6" style={{ color: link.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="font-black text-black group-hover:text-blue-600 transition-colors">{link.title}</div>
                        <div className="text-xs text-gray-600 font-medium">{link.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-4 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-8 h-8 text-purple-600" />
                  <h3 className="text-2xl font-black text-black">Follow Us</h3>
                </div>

                <p className="text-gray-700 font-medium mb-6">
                  Stay updated with latest exam tips, updates, and announcements on social media.
                </p>

                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, idx) => (
                    <Link
                          key={idx}
                          className="w-14 h-14 rounded-full flex items-center justify-center border-4 border-black hover:scale-110 transition-all duration-300"
                          style={{ backgroundColor: social.color + '20' }} to={social.link}                    >
                      <social.icon className="w-7 h-7" style={{ color: social.color }} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section (Placeholder) */}
        <section className="bg-black py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">Location</span>
              </h2>
              <p className="text-xl text-gray-400 font-medium">Mumbai, Maharashtra, India</p>
            </div>

            <div className="bg-white border-4 border-white rounded-3xl p-8 md:p-12 text-center shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)]">
              <MapPin className="w-24 h-24 mx-auto mb-6 text-purple-600" />
              <h3 className="text-3xl font-black text-black mb-4">Visit Us By Appointment</h3>
              <p className="text-lg text-gray-700 font-medium mb-6 max-w-2xl mx-auto">
                Our office is located in Mumbai, Maharashtra. We welcome visitors by prior appointment only. 
                Please contact us to schedule a meeting.
              </p>
              <a
                href="mailto:support@pyqpb.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-black text-lg uppercase border-4 border-black hover:bg-gray-900 transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Schedule a Visit
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

export default ContactUs;