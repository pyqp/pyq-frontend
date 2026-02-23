import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  Search, Calendar, Clock, ArrowRight, TrendingUp,
  BookOpen, Filter, X, Star, Eye, MessageCircle, Loader2
} from 'lucide-react';
import apiClient from '../api/Client';
import toast from 'react-hot-toast';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  author: { name: string; avatar?: string };
  category: string;
  tags: string[];
  readTimeMinutes: number;
  views: number;
  publishedAt: string;
}

const Blog = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  // If slug exists, show single post view
  if (slug) return <BlogPost slug={slug} />;

  // Otherwise show listing
  return <BlogList />;
};

// ─── Single Post View ─────────────────────────────────────────────────────────
const BlogPost = ({ slug }: { slug: string }) => {
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get(`/blog/${slug}`)
      .then(({ data }) => setPost(data.data))
      .catch(() => { toast.error('Post not found'); navigate('/blog'); })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!post) return null;

  const categoryColors: Record<string, string> = {
    'exam_tips': '#FF6B35',
    'current_affairs': '#8B5CF6',
    'strategy': '#DC2626',
    'success_stories': '#10B981',
    'news': '#DC2626',
    'general': '#6B7280',
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/blog" className="inline-flex items-center gap-2 text-blue-600 font-bold mb-8 hover:underline">
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Blog
        </Link>

        <article className="bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {post.coverImage && (
            <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover border-4 border-black mb-6" />
          )}

          <div className="flex items-center gap-3 mb-4">
            <span 
              className="px-3 py-1 font-black text-xs uppercase border-2 border-black rounded-full"
              style={{ backgroundColor: (categoryColors[post.category] || '#6B7280') + '20', color: categoryColors[post.category] || '#6B7280' }}
            >
              {post.category.replace(/_/g, ' ')}
            </span>
            <div className="flex items-center gap-4 text-sm text-gray-600 font-medium">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTimeMinutes} min</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-black mb-4">{post.title}</h1>

          <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-gray-200">
            <div className="text-3xl">{post.author.avatar || '👤'}</div>
            <div>
              <div className="font-black text-black">{post.author.name}</div>
              <div className="text-sm text-gray-600 font-medium">Expert Contributor</div>
            </div>
          </div>

          <div 
            className="prose prose-lg max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
          />

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-6 border-t-2 border-gray-200">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-white border-2 border-black rounded-full text-xs font-bold text-gray-700">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

// ─── Blog Listing ─────────────────────────────────────────────────────────────
const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    { id: 'all', name: 'All Posts', icon: '📚', count: 0, color: '#6B7280' },
    { id: 'exam_tips', name: 'Exam Tips', icon: '💡', count: 0, color: '#FF6B35' },
    { id: 'study-guides', name: 'Study Guides', icon: '📖', count: 0, color: '#2E5CFF' },
    { id: 'success_stories', name: 'Success Stories', icon: '🏆', count: 0, color: '#10B981' },
    { id: 'current_affairs', name: 'Current Affairs', icon: '📰', count: 0, color: '#8B5CF6' },
    { id: 'strategy', name: 'Strategy', icon: '🎯', count: 0, color: '#DC2626' }
  ];

  useEffect(() => {
    setLoading(true);
    const params: any = { page, limit: 9 };
    if (selectedCategory !== 'all') params.category = selectedCategory;

    apiClient.get('/blog', { params })
      .then(({ data }) => {
        setPosts(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
      })
      .catch(() => toast.error('Failed to load posts'))
      .finally(() => setLoading(false));
  }, [selectedCategory, page]);

  const filteredPosts = searchQuery
    ? posts.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    : posts;

  const featuredPost = posts[0];

  const trendingTopics = [
    'SSC CGL 2024',
    'UPSC Strategy',
    'Mock Test Tips',
    'Current Affairs',
    'RRB NTPC',
    'Time Management'
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

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="floating-element absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="floating-element-delayed absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full opacity-20 blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white shadow-2xl mb-6">
                <BookOpen className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-sm uppercase tracking-tight">Expert Insights & Tips</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                EXAM PREP
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                  BLOG
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed mb-8">
                Expert tips, study strategies, and success stories to help you ace competitive exams
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles, topics, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 text-lg font-bold border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-12">
          <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-6 h-6 text-black" />
                <span className="font-black text-xl">Categories</span>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-black text-white font-black text-sm uppercase border-2 border-black"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
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
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <div className="font-black text-sm mb-1" style={{ color: category.color }}>
                      {category.name}
                    </div>
                    <div className="text-xs text-gray-600 font-bold">{posts.length} Posts</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && !searchQuery && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <h2 className="text-3xl font-black text-black">Featured Post</h2>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-4 border-black rounded-3xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center p-16">
                  <div className="text-9xl">🎯</div>
                  <div className="absolute top-4 right-4 px-4 py-2 bg-yellow-400 text-black font-black text-sm uppercase border-2 border-black rounded-full rotate-12">
                    Featured
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span 
                      className="px-3 py-1 font-black text-xs uppercase border-2 border-black rounded-full"
                      style={{ backgroundColor: categories.find(c => c.id === featuredPost.category)?.color + '20', color: categories.find(c => c.id === featuredPost.category)?.color }}
                    >
                      {featuredPost.category.replace(/_/g, ' ')}
                    </span>
                    <div className="flex items-center gap-4 text-sm text-gray-600 font-medium">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTimeMinutes} min</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-black text-black mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>

                  <p className="text-lg text-gray-700 font-medium mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white border-2 border-black rounded-full text-xs font-bold text-gray-700">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t-2 border-black/10">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{featuredPost.author.avatar || '👤'}</div>
                      <div>
                        <div className="font-black text-black">{featuredPost.author.name}</div>
                        <div className="text-sm text-gray-600 font-medium">Expert Contributor</div>
                      </div>
                    </div>

                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-black uppercase border-4 border-black hover:bg-orange-500 transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>

                  <div className="flex items-center gap-6 mt-4 text-sm text-gray-600 font-medium">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{featuredPost.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-black">
              {selectedCategory === 'all' ? 'All Posts' : categories.find(c => c.id === selectedCategory)?.name}
              <span className="text-gray-400 ml-3">({filteredPosts.length})</span>
            </h2>

            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
                Clear Filter
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="bg-white border-4 border-black rounded-xl p-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-black text-black mb-2">No Posts Found</h3>
              <p className="text-gray-600 font-medium mb-6">
                Try adjusting your search or browse all posts
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-black text-white font-black uppercase border-4 border-black hover:bg-gray-900 transition-colors"
              >
                View All Posts
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <div
                  key={post._id}
                  className="bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:scale-102 transition-all duration-300 group"
                >
                  {/* Image/Icon Header */}
                  <div 
                    className="relative h-48 flex items-center justify-center"
                    style={{ 
                      backgroundColor: categories.find(c => c.id === post.category)?.color + '20'
                    }}
                  >
                    <div className="text-7xl group-hover:scale-110 transition-transform">
                      {post.coverImage ? <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" /> : '📝'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span 
                        className="px-3 py-1 font-black text-xs uppercase border-2 border-black rounded-full"
                        style={{ 
                          backgroundColor: categories.find(c => c.id === post.category)?.color + '20',
                          color: categories.find(c => c.id === post.category)?.color
                        }}
                      >
                        {post.category.replace(/_/g, ' ')}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTimeMinutes} min</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-black mb-3 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-600 font-medium mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-medium text-gray-600">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Author & Stats */}
                    <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="text-2xl">{post.author.avatar || '👤'}</div>
                        <div className="text-xs">
                          <div className="font-bold text-black">{post.author.name}</div>
                          <div className="text-gray-500">{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                        </div>
                      </div>

                      <Link
                        to={`/blog/${post.slug}`}
                        className="p-2 bg-black text-white rounded-full border-2 border-black group-hover:bg-blue-600 transition-colors"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* View & Comment Count */}
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 font-medium">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Trending Topics Sidebar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-4 border-black rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h3 className="text-2xl font-black text-black">Trending Topics</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {trendingTopics.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(topic)}
                  className="px-4 py-2 bg-white text-black font-bold border-2 border-black rounded-full hover:bg-purple-600 hover:text-white transition-colors"
                >
                  #{topic}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 border-4 border-black rounded-3xl p-12 md:p-16 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              NEVER MISS
              <br />
              <span className="text-yellow-400">AN UPDATE!</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-bold mb-8 max-w-2xl mx-auto">
              Subscribe to get the latest exam tips, study guides, and success stories delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 px-6 py-4 text-lg font-bold border-4 border-black focus:outline-none"
              />
              <button className="px-8 py-4 bg-white text-black font-black text-lg uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                Subscribe
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

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </>
  );
};

export default Blog;