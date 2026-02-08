import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Send,
  CheckCircle,
  Award,
  Users,
  FileText,
  Zap,
  Heart,
  Trophy,
  Target,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import weblogo from "../assets/images/pyqpw.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const examLinks = [
    {name: "Railway Exams", icon: "🚂", popular: true, path: "/all-exams"},
    {name: "UPSC Civil Services", icon: "🏛️", popular: true, path: "/all-exams"},
    {name: "SSC Examinations", icon: "📋", popular: true, path: "/all-exams"},
    {name: "Banking & Finance", icon: "🏦", popular: false, path: "/all-exams"}
    // { name: 'Defence Services', icon: '⚔️', popular: false },
    // { name: 'Teaching Eligibility', icon: '📚', popular: false },
  ];

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Success Stories", path: "/success-stories" },
    { name: "Mock Tests", path: "/mock-tests" },
    { name: "Free PYQs", path: "/free-pyqs" },
    { name: "Blog", path: "/blog" },
  ];

  const supportLinks = [
    { name: "Help Center", path: "/help" },
    { name: "FAQs", path: "/faq" },
    { name: "Contact Us", path: "/contact" },
    { name: "Pricing", path: "/pricing" },
    { name: "Refund Policy", path: "/refund" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Careers", path: "/careers", badge: "Hiring" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "#",
      color: "#1877F2",
      followers: "50K+",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "#",
      color: "#E4405F",
      followers: "75K+",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "#",
      color: "#1DA1F2",
      followers: "40K+",
    },
    {
      name: "Youtube",
      icon: Youtube,
      url: "#",
      color: "#FF0000",
      followers: "100K+",
    },
    {
      name: "Linkedin",
      icon: Linkedin,
      url: "#",
      color: "#0A66C2",
      followers: "25K+",
    },
  ];

  const stats = [
    { value: "250K+", label: "Active Students", icon: Users },
    { value: "100K+", label: "Questions Solved", icon: FileText },
    { value: "98%", label: "Success Rate", icon: Trophy },
    { value: "50+", label: "Exam Categories", icon: Target },
  ];

  return (
    <footer className="bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-white"></div>
      </div>

      {/* Newsletter Section - Bold CTA */}
      <div className="relative border-b-4 border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-black text-sm uppercase mb-6 border-2 border-white rotate-[-2deg]">
                <Sparkles className="w-4 h-4" />
                Free Resources Weekly
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
                GET FREE
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                  STUDY TIPS
                </span>
              </h2>
              <p className="text-xl text-gray-400 font-bold mb-6">
                Join 250,000+ aspirants receiving weekly exam tips, free PYQs,
                and exclusive study materials.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {["👨‍🎓", "👩‍💼", "👨‍💻", "👩‍🎓", "👨‍🏫"].map((emoji, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-black flex items-center justify-center text-2xl"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-white font-black text-lg">
                    250K+ Students
                  </div>
                  <div className="text-gray-400 text-sm">
                    Already subscribed
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="relative">
              <div className="bg-white border-4 border-white shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)] p-8">
                {!isSubscribed ? (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div>
                      <label className="block text-sm font-black uppercase tracking-wider text-gray-700 mb-2">
                        Your Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="w-full pl-12 pr-4 py-4 border-4 border-black focus:outline-none focus:border-blue-600 font-bold text-lg transition-colors"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-black text-white font-black text-lg uppercase border-4 border-black hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Subscribe Now
                      <Send className="w-5 h-5" />
                    </button>
                    <p className="text-xs text-gray-600 font-medium">
                      🔒 We respect your privacy. Unsubscribe anytime.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-black">
                      <CheckCircle className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">
                      You're In! 🎉
                    </h3>
                    <p className="text-gray-600 font-bold">
                      Check your email for the welcome gift!
                    </p>
                  </div>
                )}
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-green-400 text-black font-black text-sm border-4 border-black rotate-12 shadow-lg">
                100% FREE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column - Spans 4 */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="relative">
                <img
                  src={weblogo}
                  alt="Logo"
                  className="h-16 w-auto object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            <p className="text-gray-400 font-medium mb-6 leading-relaxed">
              India's #1 competitive exam preparation platform. Trusted by
              250,000+ aspirants to crack their dream exams.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 text-gray-400">
                <div className="w-10 h-10 bg-white/10 border-2 border-white/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Email Us</div>
                  <Link
                    to="mailto:hello@exampro.com"
                    className="hover:text-blue-400 transition-colors"
                  >
                    hello@exampro.com
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-3 text-gray-400">
                <div className="w-10 h-10 bg-white/10 border-2 border-white/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Call Us</div>
                  <Link
                    to="tel:+911800123456"
                    className="hover:text-blue-400 transition-colors"
                  >
                    +91 1800-123-456
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-3 text-gray-400">
                <div className="w-10 h-10 bg-white/10 border-2 border-white/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Visit Us</div>
                  <p>Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Exams - Spans 3 */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-black text-xl uppercase mb-6 relative inline-block">
              Popular Exams
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </h3>
            <ul className="space-y-2">
              {examLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group flex items-center justify-between p-3 border-2 border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{link.icon}</span>
                      <span className="text-gray-400 group-hover:text-white font-medium transition-colors">
                        {link.name}
                      </span>
                    </div>
                    {link.popular && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-black rounded-none">
                        HOT
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links - Spans 2 */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-black text-xl uppercase mb-6 relative inline-block">
              Quick Links
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-500"></div>
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white font-medium transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-white transition-colors"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support - Spans 3 */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-black text-xl uppercase mb-6 relative inline-block">
              Support
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-orange-500"></div>
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white font-medium transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-white transition-colors"></div>
                      {link.name}
                    </div>
                    {link.badge && (
                      <span className="px-2 py-1 bg-green-400 text-black text-xs font-black rounded-none">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 bg-white/5 border-2 border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            >
              <stat.icon className="w-10 h-10 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-black text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Social Media */}
        <div className="border-t-4 border-white/10 pt-12 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-white font-black text-2xl uppercase mb-2">
              Join Our Community
            </h3>
            <p className="text-gray-400 font-medium">
              Connect with 250K+ aspirants on social media
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                to={social.url}
                className="group relative"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-16 h-16 bg-white/10 border-4 border-white/20 flex items-center justify-center hover:border-white/40 transition-all duration-300 group-hover:scale-110">
                  <social.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 px-2 py-1 bg-white text-black text-xs font-black rounded-none border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity">
                  {social.followers}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t-4 border-white/10 pt-12 mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-6 bg-white/5 border-2 border-white/10">
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center border-4 border-black flex-shrink-0">
                <Award className="w-8 h-8 text-black" />
              </div>
              <div>
                <div className="text-white font-black text-lg">
                  98% Success Rate
                </div>
                <div className="text-gray-400 text-sm">Proven Track Record</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white/5 border-2 border-white/10">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center border-4 border-black flex-shrink-0">
                <Zap className="w-8 h-8 text-black" />
              </div>
              <div>
                <div className="text-white font-black text-lg">
                  Instant Access
                </div>
                <div className="text-gray-400 text-sm">Start Learning Now</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white/5 border-2 border-white/10">
              <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center border-4 border-black flex-shrink-0">
                <Heart className="w-8 h-8 text-black" />
              </div>
              <div>
                <div className="text-white font-black text-lg">
                  Loved by Students
                </div>
                <div className="text-gray-400 text-sm">250K+ Happy Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t-4 border-white/20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 font-medium text-center md:text-left">
              © 2026 All rights reserved. Made with{" "}
              <Heart className="w-4 h-4 inline-block text-red-500 fill-current animate-pulse" />{" "}
              in India
            </div>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white font-medium transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white font-medium transition-colors text-sm"
              >
                Terms of Service
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                to="/cookie"
                className="text-gray-400 hover:text-white font-medium transition-colors text-sm"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-white text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 flex items-center justify-center group z-50"
        aria-label="Scroll to top"
      >
        <ArrowRight className="w-6 h-6 -rotate-90 group-hover:scale-110 transition-transform" />
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;700&display=swap');
        
        * {
          font-family: 'Space Grotesk', sans-serif;
        }

        h1, h2, h3, .font-black {
          font-family: 'Archivo Black', sans-serif;
          letter-spacing: -0.02em;
        }

        .bg-grid-white {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
