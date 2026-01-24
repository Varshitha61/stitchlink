import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Search, Sparkles, X, Loader2 } from 'lucide-react';
import { getDesignRecommendations } from '../services/geminiService';

export const Catalog = () => {
  const { designs } = useStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'ALL'>('ALL');
  const [isAiModalOpen, setAiModalOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);

  const categories = ['ALL', ...Array.from(new Set(designs.map(d => d.category)))];

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setAiLoading(true);
    const recommendedIds = await getDesignRecommendations(aiQuery, designs);
    setAiRecommendations(recommendedIds);
    setAiLoading(false);
  };

  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      design.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'ALL' || design.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-200 py-12 relative overflow-hidden">
      {/* Animated Background Layers */}

      {/* Layer 1: Animated Gradient Waves */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20 animate-gradient-wave"
        style={{
          background: 'linear-gradient(135deg, #fda4af 0%, #c084fc 25%, #5eead4 50%, #fb923c 75%, #fda4af 100%)',
          backgroundSize: '400% 400%',
        }}
      ></div>

      {/* Layer 2: Geometric Grid Pattern */}
      <div className="absolute inset-0 opacity-0 dark:opacity-10 animate-grid-pulse pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(rgba(251, 113, 133, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 113, 133, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Layer 3: Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-rose-400/40 to-violet-400/40 dark:from-rose-400/20 dark:to-violet-400/20 animate-float-up"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              bottom: '-20px',
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 4 + 6}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Layer 4: Radial Glow Pulses */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-radial from-violet-400/30 to-transparent dark:from-violet-400/10 animate-pulse-glow blur-3xl"
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-radial from-rose-400/30 to-transparent dark:from-rose-400/10 animate-pulse-glow blur-3xl"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-gradient-radial from-teal-400/30 to-transparent dark:from-teal-400/10 animate-pulse-glow blur-3xl"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Design Catalog</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Explore premium embroidery patterns for your next project.</p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              onClick={() => setAiModalOpen(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-full shadow-lg text-sm font-bold text-white bg-gradient-to-r from-rose-400 to-violet-400 hover:from-rose-500 hover:to-violet-500 transition-all transform hover:scale-105"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              AI Design Assistant
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-col lg:flex-row gap-4 items-center bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="relative flex-1 w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-2xl border-0 py-3 pl-10 text-slate-900 dark:text-white ring-1 ring-inset ring-slate-200 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-rose-400 sm:text-sm sm:leading-6 bg-slate-50 dark:bg-slate-800"
              placeholder="Search by name, tag, or style..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                  ? 'bg-rose-400 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-400 hover:text-rose-500'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredDesigns.map((design) => (
            <div
              key={design.id}
              className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1"
              onClick={() => navigate(`/product/${design.id}`)}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 h-64 relative">
                <img
                  src={design.image}
                  alt={design.title}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                  Quick View
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                      {design.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold mt-1">{design.category}</p>
                  </div>
                  <p className="text-lg font-bold text-rose-500 dark:text-rose-400">₹{design.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {design.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDesigns.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-slate-50 dark:bg-slate-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No designs found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* AI Modal */}
        {isAiModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all scale-100 border border-white/10">
              <div className="p-6 bg-gradient-to-br from-rose-400 to-violet-400 text-white flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold flex items-center">
                    <Sparkles className="h-6 w-6 mr-2" />
                    AI Design Concierge
                  </h3>
                  <p className="text-rose-50 text-sm mt-1">Describe your vision, get instant matches.</p>
                </div>
                <button onClick={() => setAiModalOpen(false)} className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-8">
                <form onSubmit={handleAiSearch} className="mb-8">
                  <div className="relative group">
                    <input
                      type="text"
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      placeholder="E.g., 'Peacock feather pattern for bridal blouse'..."
                      className="w-full border-2 border-slate-200 dark:border-slate-700 rounded-2xl pl-5 pr-14 py-4 focus:ring-0 focus:border-rose-400 shadow-sm text-slate-900 dark:text-white bg-transparent transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={aiLoading}
                      className="absolute right-3 top-3 p-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 disabled:opacity-50 transition-colors shadow-lg shadow-rose-500/30"
                    >
                      {aiLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                    </button>
                  </div>
                </form>

                {aiRecommendations.length > 0 && (
                  <div className="animate-fade-in">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Recommended for you</h4>
                    <div className="space-y-3">
                      {designs.filter(d => aiRecommendations.includes(d.id)).map(design => (
                        <div
                          key={design.id}
                          onClick={() => {
                            setAiModalOpen(false);
                            navigate(`/product/${design.id}`);
                          }}
                          className="flex items-center p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-rose-50 dark:hover:bg-slate-800 cursor-pointer transition-colors group"
                        >
                          <img src={design.image} alt={design.title} className="h-16 w-16 rounded-xl object-cover shadow-sm group-hover:shadow-md transition-shadow" />
                          <div className="ml-4">
                            <p className="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors">{design.title}</p>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">₹{design.price.toLocaleString('en-IN')}</p>
                          </div>
                          <div className="ml-auto bg-white dark:bg-slate-700 p-2 rounded-full shadow-sm group-hover:bg-rose-500 group-hover:text-white transition-all">
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!aiLoading && aiRecommendations.length === 0 && aiQuery && (
                  <div className="text-center py-8">
                    <p className="text-slate-400">Try specific keywords like "floral", "peacock", or "traditional".</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
)
