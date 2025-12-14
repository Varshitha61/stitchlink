import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Plus, Search, Edit2, Trash2, X, Upload, Filter, Tag } from 'lucide-react';
import { Design } from '../types';

export const AdminInventory = () => {
    const { designs, addDesign } = useStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [newDesign, setNewDesign] = useState<{
        title: string;
        category: string;
        price: string;
        description: string;
        image: string;
        stitches: string;
        tagsInput: string;
    }>({
        title: '',
        category: '',
        price: '',
        description: '',
        image: '',
        stitches: '',
        tagsInput: ''
    });

    const filteredDesigns = designs.filter(d =>
        d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddDesign = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newDesign.title || !newDesign.price) {
            alert("Title and Price are required!");
            return;
        }

        // Convert tags string to array
        const tagsArray = newDesign.tagsInput.split(',').map(t => t.trim()).filter(t => t !== '');

        const design: Design = {
            id: `d-${Date.now()}`,
            title: newDesign.title,
            description: newDesign.description || 'No description provided.',
            price: parseFloat(newDesign.price) || 0,
            category: newDesign.category || 'Uncategorized',
            image: newDesign.image || 'https://images.unsplash.com/photo-1550920455-d36c2f37c532?q=80&w=1000',
            tags: tagsArray,
            stitches: parseInt(newDesign.stitches) || 0
        };

        addDesign(design);
        setIsModalOpen(false);
        // Reset
        setNewDesign({ title: '', category: '', price: '', description: '', image: '', stitches: '', tagsInput: '' });
    };

    return (
        <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200 overflow-hidden">

            {/* --- Unified Animation: Catalog Style --- */}

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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Design Inventory</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your catalog of embroidery patterns</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Design
                    </button>
                </div>

                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by title or category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                        <button className="px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
                            <thead className="bg-slate-50/50 dark:bg-slate-800/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Design</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Stats</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredDesigns.map(design => (
                                    <tr key={design.id} className="hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-16 w-16 flex-shrink-0 relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm group-hover:shadow-md transition-all">
                                                    <img className="h-full w-full object-cover" src={design.image} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-bold text-slate-900 dark:text-white">{design.title}</div>
                                                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                                                        <Tag className="w-3 h-3 mr-1" />
                                                        {design.tags.slice(0, 3).join(', ')}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                                                {design.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                            <div className="font-medium">{design.stitches.toLocaleString()} stitches</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white">
                                            ₹{design.price.toLocaleString('en-IN')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mr-3 p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Design Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 dark:border-slate-800 max-h-[90vh] flex flex-col animate-scale-up">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add New Design</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 transition-colors p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="overflow-y-auto p-6">
                                <form id="add-design-form" onSubmit={handleAddDesign} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Title <span className="text-rose-500">*</span></label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            value={newDesign.title}
                                            onChange={(e) => setNewDesign({ ...newDesign, title: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Category</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                                value={newDesign.category}
                                                onChange={(e) => setNewDesign({ ...newDesign, category: e.target.value })}
                                                placeholder="e.g. Floral"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Price (₹) <span className="text-rose-500">*</span></label>
                                            <input
                                                required
                                                type="number"
                                                step="0.01"
                                                className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                                value={newDesign.price}
                                                onChange={(e) => setNewDesign({ ...newDesign, price: e.target.value })}
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Stitch Count</label>
                                        <input
                                            type="number"
                                            className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            value={newDesign.stitches}
                                            onChange={(e) => setNewDesign({ ...newDesign, stitches: e.target.value })}
                                            placeholder="e.g. 15000"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Image URL</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="url"
                                                className="flex-1 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                                value={newDesign.image}
                                                onChange={(e) => setNewDesign({ ...newDesign, image: e.target.value })}
                                                placeholder="https://..."
                                            />
                                            <button type="button" className="px-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 transition-colors">
                                                <Upload className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Tags</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            value={newDesign.tagsInput}
                                            onChange={(e) => setNewDesign({ ...newDesign, tagsInput: e.target.value })}
                                            placeholder="floral, traditional, red (comma separated)"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Description</label>
                                        <textarea
                                            rows={3}
                                            className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all"
                                            value={newDesign.description}
                                            onChange={(e) => setNewDesign({ ...newDesign, description: e.target.value })}
                                        />
                                    </div>
                                </form>
                            </div>

                            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                <button
                                    form="add-design-form"
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
                                >
                                    Create Design
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};