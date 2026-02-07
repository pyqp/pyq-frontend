import { useState } from 'react';
import { 
  Target, Users, Award, Zap, Heart, CheckCircle, 
  BookOpen, Trophy, Brain, Sparkles, ArrowRight, Shield,
  Rocket, Clock, Globe
} from 'lucide-react';

const About = () => {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  const stats = [
    { value: '250K+', label: 'Active Students', icon: Users, color: '#2E5CFF', description: 'Learning daily' },
    { value: '100K+', label: 'Question Bank', icon: BookOpen, color: '#8B5CF6', description: 'With solutions' },
    { value: '98%', label: 'Success Rate', icon: Trophy, color: '#10B981', description: 'Students selected' },
    { value: '50+', label: 'Exam Categories', icon: Target, color: '#FF6B35', description: 'All covered' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant access to PYQs and mock tests. No waiting, just learning.',
      color: '#FF6B35',
      badge: 'Speed'
    },
    {
      icon: Brain,
      title: 'AI-Powered Analytics',
      description: 'Smart insights into your performance. Know exactly where to improve.',
      color: '#8B5CF6',
      badge: 'Smart'
    },
    {
      icon: Shield,
      title: '100% Accurate',
      description: 'Expert-verified solutions for every question. Zero compromises on quality.',
      color: '#10B981',
      badge: 'Verified'
    },
    {
      icon: Heart,
      title: 'Student First',
      description: 'Built by aspirants, for aspirants. We understand your journey.',
      color: '#DC2626',
      badge: 'Community'
    },
  ];

  const timeline = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'Started with a simple mission: make quality exam prep accessible to all',
      icon: Rocket,
      color: '#2E5CFF'
    },
    {
      year: '2021',
      title: '10K Students',
      description: 'Crossed our first major milestone. The community started growing.',
      icon: Users,
      color: '#8B5CF6'
    },
    {
      year: '2022',
      title: 'AI Integration',
      description: 'Launched AI-powered performance analytics and personalized learning paths',
      icon: Brain,
      color: '#10B981'
    },
    {
      year: '2023',
      title: '100K+ Questions',
      description: 'Built India\'s largest verified PYQ database with expert solutions',
      icon: BookOpen,
      color: '#FF6B35'
    },
    {
      year: '2024',
      title: '250K Students',
      description: 'Became India\'s most trusted competitive exam preparation platform',
      icon: Trophy,
      color: '#DC2626'
    },
  ];

  const team = [
    { 
      name: 'Priya Sharma', 
      role: 'Founder & CEO', 
      avatar: '👩‍💼', 
      expertise: 'UPSC CSE AIR 23',
      description: 'Former civil servant turned edutech entrepreneur'
    },
    { 
      name: 'Rahul Verma', 
      role: 'Head of Content', 
      avatar: '👨‍🏫', 
      expertise: 'SSC Expert',
      description: '10+ years teaching competitive exams'
    },
    { 
      name: 'Anjali Patel', 
      role: 'Tech Lead', 
      avatar: '👩‍💻', 
      expertise: 'IIT Graduate',
      description: 'Building the future of exam prep tech'
    },
    { 
      name: 'Vikram Singh', 
      role: 'Head of Analytics', 
      avatar: '👨‍🔬', 
      expertise: 'Data Scientist',
      description: 'Making learning smarter with AI'
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We set the highest standards for content quality and student experience.',
      color: '#2E5CFF'
    },
    {
      icon: Heart,
      title: 'Empathy',
      description: 'We understand the aspirant journey because we\'ve been there ourselves.',
      color: '#DC2626'
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'We constantly innovate to make exam preparation smarter and easier.',
      color: '#8B5CF6'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in the power of learning together and supporting each other.',
      color: '#10B981'
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply">
        <div className="absolute inset-0 bg-noise"></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-black py-20 md:py-32 overflow-hidden">
        {/* Animated Grid Background */}
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white shadow-2xl mb-6">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-sm uppercase tracking-tight">About Us</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6">
              EMPOWERING
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                INDIA'S
              </span>
              <br />
              ASPIRANTS
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 font-bold max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize competitive exam preparation and help every Indian student achieve their dreams.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border-4 border-black rounded-xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-300 cursor-pointer group"
              onMouseEnter={() => setHoveredStat(stat.label)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <stat.icon 
                className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" 
                style={{ color: stat.color }}
              />
              <div className="text-4xl font-black text-black mb-2">{stat.value}</div>
              <div className="text-sm font-bold text-gray-600 uppercase mb-1">{stat.label}</div>
              <div className={`text-xs font-medium transition-all duration-300 ${
                hoveredStat === stat.label ? 'opacity-100 text-gray-900' : 'opacity-0'
              }`}>
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-6">
              <div className="px-4 py-2 bg-blue-400 text-black font-black text-sm uppercase border-4 border-black rotate-[-2deg]">
                Our Mission
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
              Making Quality Education
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Accessible to All
              </span>
            </h2>
            <p className="text-lg text-gray-600 font-medium leading-relaxed mb-6">
              We believe every student deserves access to world-class exam preparation, regardless of their background or location. Our platform bridges the gap between aspirants and success.
            </p>
            <div className="space-y-4">
              {[
                'Free access to latest PYQs for all students',
                'Expert-verified solutions and explanations',
                'AI-powered personalized learning paths',
                'Community of 250,000+ helping each other'
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center border-2 border-black flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-gray-700 font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-4 border-blue-400 rounded-xl">
                  <Globe className="w-10 h-10 text-blue-600 mb-3" />
                  <div className="text-2xl font-black text-blue-900 mb-1">Pan-India</div>
                  <div className="text-sm text-blue-700 font-medium">Reach</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-400 rounded-xl">
                  <Clock className="w-10 h-10 text-green-600 mb-3" />
                  <div className="text-2xl font-black text-green-900 mb-1">24/7</div>
                  <div className="text-sm text-green-700 font-medium">Available</div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-4 border-purple-400 rounded-xl">
                  <Zap className="w-10 h-10 text-purple-600 mb-3" />
                  <div className="text-2xl font-black text-purple-900 mb-1">Instant</div>
                  <div className="text-sm text-purple-700 font-medium">Access</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-4 border-orange-400 rounded-xl">
                  <Award className="w-10 h-10 text-orange-600 mb-3" />
                  <div className="text-2xl font-black text-orange-900 mb-1">Verified</div>
                  <div className="text-sm text-orange-700 font-medium">Quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-black py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white opacity-5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Why Students <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Love Us</span>
            </h2>
            <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
              We're not just another platform. We're your success partner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 bg-white/5 backdrop-blur-sm border-4 border-white/10 hover:border-white/30 rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" style={{ backgroundColor: feature.color }}></div>
                  <div className="relative p-4 bg-white rounded-xl border-4 border-black">
                    <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                  </div>
                  <div 
                    className="absolute -top-2 -right-2 px-2 py-1 text-white text-xs font-black rounded-full border-2 border-black"
                    style={{ backgroundColor: feature.color }}
                  >
                    {feature.badge}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Journey</span>
          </h2>
          <p className="text-xl text-gray-600 font-medium">From a small idea to India's #1 exam prep platform</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-black transform -translate-x-1/2"></div>

          <div className="space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className={`flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-300">
                    <div className="text-sm font-black uppercase tracking-wider mb-2" style={{ color: item.color }}>
                      {item.year}
                    </div>
                    <h3 className="text-2xl font-black text-black mb-2">{item.title}</h3>
                    <p className="text-gray-600 font-medium">{item.description}</p>
                  </div>
                </div>

                <div className="relative z-10 flex-shrink-0">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-black"
                    style={{ backgroundColor: item.color }}
                  >
                    <item.icon className="w-8 h-8 text-black" />
                  </div>
                </div>

                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 font-medium">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="bg-white border-4 border-black rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1"
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-black mb-6"
                  style={{ backgroundColor: value.color }}
                >
                  <value.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-black text-black mb-3">{value.title}</h3>
                <p className="text-gray-600 font-medium">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Team</span>
          </h2>
          <p className="text-xl text-gray-600 font-medium">Passionate educators and technologists working for your success</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white border-4 border-black rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 group"
            >
              <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">{member.avatar}</div>
              <h3 className="text-xl font-black text-black mb-1">{member.name}</h3>
              <div className="text-purple-600 font-bold text-sm mb-3">{member.role}</div>
              <div className="inline-block px-3 py-1 bg-blue-100 border-2 border-blue-400 rounded-full text-blue-800 font-black text-xs mb-3">
                {member.expertise}
              </div>
              <p className="text-gray-600 text-sm font-medium">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-shift"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            JOIN 250,000+
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
              SUCCESSFUL
            </span>
            <br />
            ASPIRANTS
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-bold mb-8">
            Start your journey to success today. It's 100% free to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-white text-black font-black text-xl rounded-none border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 uppercase flex items-center justify-center gap-2">
              Get Started Free
              <ArrowRight className="w-6 h-6" />
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

        @keyframes gradient-shift {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(50px) translateY(30px); }
        }

        .animate-gradient-shift {
          animation: gradient-shift 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default About;