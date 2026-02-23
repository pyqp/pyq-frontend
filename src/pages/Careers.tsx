import { useState } from 'react';
import { 
  Briefcase, Heart, Users, TrendingUp, Coffee, Zap,
  MapPin, Clock, DollarSign, GraduationCap,
  Star, Award, Rocket, Target,
  Code, Palette, Edit, Share2,
  Calendar, Mail, ArrowRight, Search, Filter,
  X, Home, Laptop,
} from 'lucide-react';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
//   const [showApplicationForm, setShowApplicationForm] = useState(false);
//   const [selectedJob, setSelectedJob] = useState<any>(null);

  const departments = [
    { id: 'all', name: 'All Departments', count: 12, icon: Briefcase, color: '#6B7280' },
    { id: 'engineering', name: 'Engineering', count: 5, icon: Code, color: '#2E5CFF' },
    { id: 'design', name: 'Design', count: 2, icon: Palette, color: '#FF6B35' },
    { id: 'product', name: 'Product', count: 2, icon: Rocket, color: '#8B5CF6' },
    { id: 'marketing', name: 'Marketing', count: 2, icon: Share2, color: '#10B981' },
    { id: 'content', name: 'Content', count: 1, icon: Edit, color: '#DC2626' }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'mumbai', name: 'Mumbai' },
    { id: 'remote', name: 'Remote' },
    { id: 'hybrid', name: 'Hybrid' }
  ];

  const jobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'engineering',
      location: 'Mumbai / Hybrid',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹15-25 LPA',
      description: 'Build and scale our exam preparation platform using React, Node.js, and MongoDB. Work on features that impact millions of students.',
      requirements: ['React.js, Node.js, MongoDB expertise', 'RESTful API design', 'Experience with AWS/Cloud', 'Strong problem-solving skills'],
      responsibilities: ['Develop new features', 'Optimize performance', 'Code reviews', 'Mentor junior developers'],
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript'],
      posted: '2 days ago',
      applicants: 45
    },
    {
      id: 2,
      title: 'Frontend Developer',
      department: 'engineering',
      location: 'Mumbai / Remote',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '₹10-18 LPA',
      description: 'Create beautiful, responsive user interfaces with React and Tailwind CSS. Focus on user experience and performance.',
      requirements: ['Strong React.js skills', 'CSS/Tailwind expertise', 'Responsive design', 'Git proficiency'],
      responsibilities: ['Build UI components', 'Implement designs', 'Optimize frontend', 'Cross-browser testing'],
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
      posted: '5 days ago',
      applicants: 67
    },
    {
      id: 3,
      title: 'Backend Engineer',
      department: 'engineering',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '3-6 years',
      salary: '₹12-22 LPA',
      description: 'Design and implement scalable backend services. Work on APIs, databases, and server infrastructure.',
      requirements: ['Node.js/Express expertise', 'Database design (MongoDB/PostgreSQL)', 'Microservices architecture', 'API security'],
      responsibilities: ['Design APIs', 'Database optimization', 'Server maintenance', 'Performance tuning'],
      skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis'],
      posted: '1 week ago',
      applicants: 34
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '4-7 years',
      salary: '₹18-30 LPA',
      description: 'Manage cloud infrastructure, CI/CD pipelines, and ensure platform reliability and scalability.',
      requirements: ['AWS/Cloud expertise', 'Docker & Kubernetes', 'CI/CD tools', 'Linux administration'],
      responsibilities: ['Infrastructure management', 'Deploy automation', 'Monitoring & alerts', 'Security hardening'],
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
      posted: '3 days ago',
      applicants: 28
    },
    {
      id: 5,
      title: 'Mobile App Developer',
      department: 'engineering',
      location: 'Mumbai / Hybrid',
      type: 'Full-time',
      experience: '2-5 years',
      salary: '₹12-20 LPA',
      description: 'Develop native mobile apps for Android and iOS. Create seamless mobile learning experiences.',
      requirements: ['React Native expertise', 'iOS/Android development', 'Mobile UI/UX', 'App Store deployment'],
      responsibilities: ['Build mobile apps', 'Integrate APIs', 'Performance optimization', 'App maintenance'],
      skills: ['React Native', 'JavaScript', 'iOS', 'Android', 'Firebase'],
      posted: '1 week ago',
      applicants: 52
    },
    {
      id: 6,
      title: 'UI/UX Designer',
      department: 'design',
      location: 'Mumbai / Remote',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹10-18 LPA',
      description: 'Design intuitive user interfaces and delightful user experiences for our platform and mobile apps.',
      requirements: ['Figma/Adobe XD expertise', 'User research skills', 'Prototyping', 'Design systems'],
      responsibilities: ['Create designs', 'User research', 'Prototyping', 'Design system maintenance'],
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      posted: '4 days ago',
      applicants: 89
    },
    {
      id: 7,
      title: 'Visual Designer',
      department: 'design',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '₹8-15 LPA',
      description: 'Create stunning visuals, illustrations, and branding materials for marketing and product.',
      requirements: ['Graphic design expertise', 'Illustration skills', 'Brand design', 'Adobe Creative Suite'],
      responsibilities: ['Design graphics', 'Create illustrations', 'Marketing materials', 'Brand consistency'],
      skills: ['Photoshop', 'Illustrator', 'After Effects', 'Figma', 'Branding'],
      posted: '6 days ago',
      applicants: 71
    },
    {
      id: 8,
      title: 'Product Manager',
      department: 'product',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '4-7 years',
      salary: '₹20-35 LPA',
      description: 'Define product strategy and roadmap. Work with engineering, design, and business teams.',
      requirements: ['Product management experience', 'Agile methodology', 'Data-driven decisions', 'Stakeholder management'],
      responsibilities: ['Product roadmap', 'Feature prioritization', 'User research', 'Cross-team coordination'],
      skills: ['Product Strategy', 'Agile', 'Analytics', 'Communication', 'Leadership'],
      posted: '2 days ago',
      applicants: 41
    },
    {
      id: 9,
      title: 'Product Analyst',
      department: 'product',
      location: 'Mumbai / Hybrid',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '₹10-18 LPA',
      description: 'Analyze user behavior, track metrics, and provide insights to drive product decisions.',
      requirements: ['SQL proficiency', 'Data analytics', 'Tools: GA, Mixpanel', 'A/B testing'],
      responsibilities: ['Data analysis', 'Metrics tracking', 'Insights reporting', 'A/B test analysis'],
      skills: ['SQL', 'Google Analytics', 'Excel', 'Tableau', 'Statistics'],
      posted: '5 days ago',
      applicants: 36
    },
    {
      id: 10,
      title: 'Digital Marketing Manager',
      department: 'marketing',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '3-6 years',
      salary: '₹12-20 LPA',
      description: 'Lead digital marketing campaigns across channels. Drive user acquisition and engagement.',
      requirements: ['Digital marketing expertise', 'SEO/SEM knowledge', 'Social media', 'Analytics'],
      responsibilities: ['Campaign management', 'SEO strategy', 'Social media', 'Performance analysis'],
      skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics', 'Content Marketing'],
      posted: '3 days ago',
      applicants: 58
    },
    {
      id: 11,
      title: 'Social Media Specialist',
      department: 'marketing',
      location: 'Mumbai / Remote',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '₹6-12 LPA',
      description: 'Manage social media presence across platforms. Create engaging content and grow community.',
      requirements: ['Social media expertise', 'Content creation', 'Community management', 'Analytics'],
      responsibilities: ['Content creation', 'Community engagement', 'Platform management', 'Analytics reporting'],
      skills: ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'Canva'],
      posted: '1 week ago',
      applicants: 94
    },
    {
      id: 12,
      title: 'Content Writer',
      department: 'content',
      location: 'Remote',
      type: 'Full-time',
      experience: '1-3 years',
      salary: '₹5-10 LPA',
      description: 'Create educational content, blog posts, and study materials for competitive exam preparation.',
      requirements: ['Excellent writing skills', 'Research ability', 'SEO knowledge', 'Subject expertise'],
      responsibilities: ['Write blog posts', 'Create study guides', 'SEO optimization', 'Content editing'],
      skills: ['Writing', 'Research', 'SEO', 'WordPress', 'Subject Knowledge'],
      posted: '4 days ago',
      applicants: 112
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Salary',
      description: 'Industry-leading compensation with performance bonuses',
      color: '#10B981'
    },
    {
      icon: GraduationCap,
      title: 'Learning Budget',
      description: '₹50,000/year for courses, conferences, and books',
      color: '#2E5CFF'
    },
    {
      icon: Home,
      title: 'Work From Home',
      description: 'Flexible remote work options for most roles',
      color: '#FF6B35'
    },
    {
      icon: Heart,
      title: 'Health Insurance',
      description: 'Comprehensive medical coverage for you and family',
      color: '#DC2626'
    },
    {
      icon: Coffee,
      title: 'Free Meals',
      description: 'Complimentary breakfast, lunch, and unlimited snacks',
      color: '#8B5CF6'
    },
    {
      icon: Laptop,
      title: 'Latest Equipment',
      description: 'MacBook/PC, monitor, and accessories of your choice',
      color: '#0891B2'
    },
    {
      icon: Calendar,
      title: 'Paid Time Off',
      description: '25 days vacation + 10 holidays + sick leave',
      color: '#F59E0B'
    },
    {
      icon: Users,
      title: 'Team Events',
      description: 'Quarterly offsites, team outings, and celebrations',
      color: '#EC4899'
    }
  ];

  const cultureValues = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We\'re passionate about democratizing exam preparation and helping millions of students succeed',
      color: '#2E5CFF'
    },
    {
      icon: Rocket,
      title: 'Fast-Paced Growth',
      description: 'Join a rapidly growing startup where your work directly impacts our trajectory',
      color: '#FF6B35'
    },
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with talented, supportive teammates who celebrate wins together',
      color: '#10B981'
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We encourage experimentation, new ideas, and creative problem-solving',
      color: '#8B5CF6'
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'all' || 
      job.location.toLowerCase().includes(selectedLocation);
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDepartment && matchesLocation && matchesSearch;
  });

//   const handleApply = (job: any) => {
//     setSelectedJob(job);
//     setShowApplicationForm(true);
//   };

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

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white shadow-2xl mb-6">
                <Briefcase className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-sm uppercase tracking-tight">Join Our Mission</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                BUILD THE
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                  FUTURE
                </span>
                <br />
                WITH US
              </h1>

              <p className="text-xl md:text-2xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed mb-8">
                Help millions of students achieve their dreams. Join a team that's revolutionizing exam preparation in India.
              </p>

              <div className="flex items-center justify-center gap-6 text-white/70 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>Mumbai & Remote</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span>12 Open Positions</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '50+', label: 'Team Members', icon: Users, color: '#2E5CFF' },
              { value: '250K+', label: 'Active Users', icon: TrendingUp, color: '#10B981' },
              { value: '4.8/5', label: 'Glassdoor Rating', icon: Star, color: '#FF6B35' },
              { value: '₹10Cr+', label: 'Funded', icon: Award, color: '#8B5CF6' }
            ].map((stat, idx) => (
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

        {/* Culture Values */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                Why Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">PYQPB</span>
              </h2>
              <p className="text-xl text-gray-600 font-medium">More than just a job - it's a mission</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cultureValues.map((value, idx) => (
                <div
                  key={idx}
                  className="bg-white border-4 border-black rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-black mb-4"
                    style={{ backgroundColor: value.color + '20' }}
                  >
                    <value.icon className="w-8 h-8" style={{ color: value.color }} />
                  </div>
                  <h3 className="text-xl font-black text-black mb-3">{value.title}</h3>
                  <p className="text-gray-700 font-medium leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Perks & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Benefits</span>
            </h2>
            <p className="text-xl text-gray-600 font-medium">We take care of our team</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white border-4 border-black rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center border-4 border-black mb-4"
                  style={{ backgroundColor: benefit.color + '20' }}
                >
                  <benefit.icon className="w-7 h-7" style={{ color: benefit.color }} />
                </div>
                <h3 className="text-lg font-black text-black mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-700 font-medium">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Job Listings */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Open <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Positions</span>
            </h2>
            <p className="text-xl text-gray-600 font-medium">Find your perfect role</p>
          </div>

          {/* Filters */}
          <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, skills, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-4 text-lg font-bold border-4 border-black focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>
            </div>

            {/* Department Filter */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-5 h-5 text-black" />
                <span className="font-black text-sm uppercase">Department</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDepartment(dept.id)}
                    className={`p-3 border-4 border-black rounded-xl transition-all ${
                      selectedDepartment === dept.id
                        ? 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] scale-105'
                        : 'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:scale-105'
                    }`}
                    style={{ 
                      backgroundColor: selectedDepartment === dept.id ? dept.color + '20' : 'white'
                    }}
                  >
                    <dept.icon className="w-6 h-6 mx-auto mb-2" style={{ color: dept.color }} />
                    <div className="font-black text-xs" style={{ color: dept.color }}>{dept.name}</div>
                    <div className="text-xs text-gray-600 font-bold">{dept.count}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-black" />
                <span className="font-black text-sm uppercase">Location</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc.id)}
                    className={`px-4 py-2 font-bold border-2 border-black rounded-full transition-all ${
                      selectedLocation === loc.id
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedDepartment !== 'all' || selectedLocation !== 'all' || searchQuery) && (
              <div className="mt-4 pt-4 border-t-2 border-gray-200">
                <button
                  onClick={() => {
                    setSelectedDepartment('all');
                    setSelectedLocation('all');
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Jobs */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white border-4 border-black rounded-xl p-12 text-center">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-black text-black mb-2">No Jobs Found</h3>
              <p className="text-gray-600 font-medium mb-6">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => {
                  setSelectedDepartment('all');
                  setSelectedLocation('all');
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-black text-white font-black uppercase border-4 border-black hover:bg-gray-900 transition-colors"
              >
                View All Jobs
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border-4 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:scale-102 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-2xl font-black text-black">{job.title}</h3>
                        <span 
                          className="px-3 py-1 font-black text-xs uppercase rounded-full border-2 border-black"
                          style={{ 
                            backgroundColor: departments.find(d => d.id === job.department)?.color + '20',
                            color: departments.find(d => d.id === job.department)?.color
                          }}
                        >
                          {departments.find(d => d.id === job.department)?.name}
                        </span>
                      </div>

                      <p className="text-gray-700 font-medium mb-4 leading-relaxed">{job.description}</p>

                      <div className="flex flex-wrap gap-4 mb-4 text-sm font-medium text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          <span>{job.experience}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 border-2 border-gray-300 rounded-full text-xs font-bold text-gray-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                        <span>Posted {job.posted}</span>
                        <span>•</span>
                        <span>{job.applicants} applicants</span>
                      </div>
                    </div>

                    <button
                    //   onClick={() => handleApply(job)}
                      className="lg:flex-shrink-0 px-8 py-4 bg-black text-white font-black text-lg uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      Apply Now
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 border-4 border-black rounded-3xl p-12 md:p-16 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              DON'T SEE A
              <br />
              <span className="text-yellow-400">PERFECT FIT?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-bold mb-8 max-w-2xl mx-auto">
              We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <a
              href="mailto:careers@pyqpb.com"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-black text-xl uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
            >
              <Mail className="w-6 h-6" />
              Email: careers@pyqpb.com
            </a>
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
        `}</style>
      </div>
    </>
  );
};

export default Careers;