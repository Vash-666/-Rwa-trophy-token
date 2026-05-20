'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, User, Tag } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const blogPosts = [
  {
    id: 1,
    title: "The History of the 1947 Championship Trophy",
    excerpt: "Discover the fascinating story behind this historic tennis trophy, from its creation in 1947 through 77 years of champions and memorable matches.",
    author: "Tennis History Team",
    date: "2024-05-15",
    readTime: "8 min read",
    category: "History",
    image: "trophy",
    featured: true,
  },
  {
    id: 2,
    title: "Understanding RWA Tokenization: A Complete Guide",
    excerpt: "Learn how Real World Asset tokenization works, why it matters for collectibles, and what it means for the future of ownership.",
    author: "Blockchain Team",
    date: "2024-05-10",
    readTime: "12 min read",
    category: "Education",
    image: "blockchain",
    featured: false,
  },
  {
    id: 3,
    title: "Meet the Champions: The Humberstone Legacy",
    excerpt: "An in-depth look at the Humberstone family, one of the most successful dynasties in the trophy's history, spanning multiple generations.",
    author: "Research Team",
    date: "2024-05-05",
    readTime: "6 min read",
    category: "Profiles",
    image: "players",
    featured: false,
  },
  {
    id: 4,
    title: "From Court to Chain: The Tokenization Process",
    excerpt: "A technical deep-dive into how we transformed a physical tennis trophy into a blockchain-verified digital asset.",
    author: "Tech Team",
    date: "2024-04-28",
    readTime: "10 min read",
    category: "Technical",
    image: "tech",
    featured: false,
  },
  {
    id: 5,
    title: "The Evolution of Ladies Doubles Tennis (1947-1973)",
    excerpt: "Explore how the game changed over the 26 years this trophy was awarded, from wooden rackets to the dawn of the Open Era.",
    author: "Tennis History Team",
    date: "2024-04-20",
    readTime: "9 min read",
    category: "History",
    image: "tennis",
    featured: false,
  },
  {
    id: 6,
    title: "Why Physical Asset Tokenization Matters",
    excerpt: "The case for bringing real-world collectibles onto the blockchain: provenance, liquidity, and democratization of ownership.",
    author: "Strategy Team",
    date: "2024-04-15",
    readTime: "7 min read",
    category: "Education",
    image: "assets",
    featured: false,
  },
];

const categories = [
  { id: 'all', label: 'All Posts', count: blogPosts.length },
  { id: 'History', label: 'History', count: blogPosts.filter(p => p.category === 'History').length },
  { id: 'Education', label: 'Education', count: blogPosts.filter(p => p.category === 'Education').length },
  { id: 'Technical', label: 'Technical', count: blogPosts.filter(p => p.category === 'Technical').length },
  { id: 'Profiles', label: 'Profiles', count: blogPosts.filter(p => p.category === 'Profiles').length },
];

export default function Blog() {
  const featuredPost = blogPosts.find(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

  return (
    <main className="min-h-screen bg-[#0C0F1A]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 border-b border-[#2a3142]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] text-sm font-medium mb-4">
              Insights & Stories
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#F5F1E8] font-['Playfair_Display'] mb-4">
              Blog
            </h1>
            <p className="text-[#F5F1E8]/60 text-lg">
              Stories about tennis history, blockchain technology, and the future of 
              collectible ownership.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="section-padding border-b border-[#2a3142]">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-[#141827] to-[#0C0F1A] border border-[#2a3142]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🏆</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#C9A84C] text-[#0C0F1A] text-sm font-medium">
                    Featured
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-sm text-[#F5F1E8]/60">
                  <span className="px-3 py-1 rounded-full bg-[#C9A84C]/10 text-[#C9A84C]">
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#F5F1E8] font-['Playfair_Display']">
                  {featuredPost.title}
                </h2>
                <p className="text-[#F5F1E8]/70 text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <span className="text-[#F5F1E8]/60">{featuredPost.author}</span>
                </div>
                <Link 
                  href="#" 
                  className="btn-primary inline-flex"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-8 border-b border-[#2a3142] bg-[#141827]/50">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  category.id === 'all'
                    ? 'bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/50'
                    : 'bg-[#0C0F1A] text-[#F5F1E8]/70 border border-[#2a3142] hover:border-[#C9A84C]/30'
                }`}
              >
                {category.label}
                <span className="ml-2 text-[#F5F1E8]/40">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group card card-hover"
              >
                <div className="aspect-video bg-gradient-to-br from-[#1a1f2e] to-[#0C0F1A] flex items-center justify-center relative overflow-hidden">
                  <span className="text-4xl opacity-50 group-hover:scale-110 transition-transform">
                    {post.category === 'History' && '📜'}
                    {post.category === 'Education' && '📚'}
                    {post.category === 'Technical' && '⚙️'}
                    {post.category === 'Profiles' && '👥'}
                  </span>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#141827]/80 text-[#C9A84C] text-xs font-medium border border-[#2a3142]">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-[#F5F1E8]/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#F5F1E8] font-['Playfair_Display'] group-hover:text-[#C9A84C] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#F5F1E8]/60 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#2a3142]">
                    <span className="text-xs text-[#F5F1E8]/50">{post.author}</span>
                    <Link 
                      href="#" 
                      className="text-[#C9A84C] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding border-t border-[#2a3142]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#141827] to-[#0C0F1A] border border-[#2a3142] p-12 lg:p-16 text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10B981]/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <Tag className="w-12 h-12 text-[#C9A84C] mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-[#F5F1E8] font-['Playfair_Display'] mb-4">
                Stay Updated
              </h2>
              <p className="text-[#F5F1E8]/70 mb-8">
                Subscribe to our newsletter for the latest stories, updates, and insights 
                about the Tennis Trophy RWA project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#0C0F1A] border border-[#2a3142] text-[#F5F1E8] placeholder-[#F5F1E8]/40 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                />
                <button className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
