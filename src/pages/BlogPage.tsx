import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Tag, Facebook, Twitter, Instagram, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publish_date: string;
  category: string;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  post_count: number;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [archiveMonths, setArchiveMonths] = useState<string[]>([]);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    generateArchiveMonths();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('publish_date', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else if (data) {
      setPosts(data);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*');

    if (error) {
      console.error('Error fetching categories:', error);
    } else if (data) {
      setCategories(data);
    }
  };

  const generateArchiveMonths = () => {
    // Generate last 12 months for archive
    const months = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(format(date, 'MMMM yyyy'));
    }
    setArchiveMonths(months);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <SEO 
        title="Blogg"
        description="Tips och råd om flytt, städning och mycket mer. Expertråd från Transist för en smidigare flytt och ett renare hem."
        type="website"
        canonical="https://transist.se/blogg"
      />

      {/* Hero Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transist Blogg
            </h1>
            <p className="text-xl text-white/90">
              Tips, råd och inspiration för din flytt och städning. Här delar vi med 
              oss av vår expertis för att göra din upplevelse så smidig som möjligt.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Search Bar (Mobile) */}
            <div className="lg:hidden mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Sök i bloggen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            {/* Blog Posts */}
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <Link to={`/blogg/${post.slug}`}>
                    <img
                      src={`https://source.unsplash.com/800x400/?${post.category}`}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(post.publish_date), 'd MMM yyyy')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="h-4 w-4" />
                        {post.category}
                      </span>
                    </div>
                    <Link to={`/blogg/${post.slug}`}>
                      <h2 className="text-2xl font-bold mb-3 hover:text-primary transition">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Link 
                      to={`/blogg/${post.slug}`}
                      className="inline-flex items-center text-primary font-semibold hover:text-primary-hover transition group"
                    >
                      <span>Läs mer</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* About Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-4">Om Bloggen</h2>
              <p className="text-gray-600 mb-4">
                Välkommen till Transists blogg! Här delar vi med oss av vår expertis 
                inom flytt och städning. Få värdefulla tips, guider och inspiration 
                för att göra din flytt så smidig som möjligt.
              </p>
              <Link 
                to="/om-oss"
                className="text-primary font-semibold hover:text-primary-hover transition"
              >
                Läs mer om oss →
              </Link>
            </div>

            {/* Search */}
            <div className="hidden lg:block bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-4">Sök</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Sök i bloggen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-4">Kategorier</h2>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left py-1 ${
                      !selectedCategory ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'
                    } transition`}
                  >
                    Alla kategorier
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`w-full text-left py-1 ${
                        selectedCategory === category.slug ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'
                      } transition`}
                    >
                      {category.name} ({category.post_count})
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Archive */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-4">Arkiv</h2>
              <ul className="space-y-2">
                {archiveMonths.map((month) => (
                  <li key={month}>
                    <Link
                      to={`/blogg/arkiv/${month.toLowerCase().replace(' ', '-')}`}
                      className="text-gray-600 hover:text-primary transition"
                    >
                      {month}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-4">Följ Oss</h2>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/transistab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="https://twitter.com/transistab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="https://instagram.com/transistab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Transist. Alla rättigheter förbehållna.</p>
            <p className="mt-2">
              Kontakta oss: <a href="mailto:info@transist.se" className="text-primary hover:text-primary-hover">info@transist.se</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;