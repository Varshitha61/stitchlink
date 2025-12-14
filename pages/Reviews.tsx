import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, MessageSquare, ThumbsUp, Plus, X } from 'lucide-react';
import { Review } from '../types';

export const Reviews = () => {
  const { reviews, designs, currentUser, addReview } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [selectedDesignId, setSelectedDesignId] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !selectedDesignId) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      designId: selectedDesignId,
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    addReview(newReview);
    setIsModalOpen(false);
    // Reset form
    setComment('');
    setRating(5);
    setSelectedDesignId('');
  };

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
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Community Reviews</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">See what others are stitching and share your own experience.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 md:mt-0 bg-rose-400 hover:bg-rose-500 text-white px-6 py-3 rounded-full font-bold flex items-center shadow-lg shadow-rose-400/20 transition-all transform hover:-translate-y-1"
          >
            <Plus className="w-5 h-5 mr-2" />
            Write a Review
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => {
            const design = designs.find(d => d.id === review.designId);
            return (
              <div key={review.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-violet-100 dark:from-rose-900/30 dark:to-violet-900/30 flex items-center justify-center text-rose-500 dark:text-rose-400 font-bold mr-3">
                      {review.userName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{review.userName}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-slate-300 dark:text-slate-600'}`} />
                    ))}
                  </div>
                </div>

                {design && (
                  <div className="flex items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl mb-4">
                    <img src={design.image} alt={design.title} className="w-12 h-12 rounded-xl object-cover mr-3" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Reviewing</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{design.title}</p>
                    </div>
                  </div>
                )}

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">"{review.comment}"</p>

                <div className="flex items-center text-slate-400 text-xs gap-4 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button className="flex items-center hover:text-rose-500 transition-colors">
                    <ThumbsUp className="w-3 h-3 mr-1" /> Helpful
                  </button>
                  <button className="flex items-center hover:text-rose-500 transition-colors">
                    <MessageSquare className="w-3 h-3 mr-1" /> Comment
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Write Review Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl max-w-lg w-full p-8 animate-fade-in relative border border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </button>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Write a Review</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Select Design</label>
                  <select
                    required
                    value={selectedDesignId}
                    onChange={(e) => setSelectedDesignId(e.target.value)}
                    className="w-full rounded-2xl border-slate-200 dark:border-slate-700 py-3 px-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-400 outline-none appearance-none"
                  >
                    <option value="">-- Choose a design --</option>
                    {designs.map(d => (
                      <option key={d.id} value={d.id}>{d.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-slate-200 dark:text-slate-700'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Your Experience</label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about the quality, stitching process, etc..."
                    className="w-full rounded-2xl border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-400 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-400 hover:bg-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-rose-400/20 transition-all"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};