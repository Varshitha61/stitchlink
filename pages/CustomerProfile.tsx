import React from 'react';
import { useStore } from '../context/StoreContext';
import { Package, Calendar, Clock } from 'lucide-react';

export const CustomerProfile = () => {
    const { currentUser, orders } = useStore();

    const myOrders = orders.filter(o => o.customerId === currentUser?.id);

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
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8">
                    <div className="flex items-center gap-6">
                        <div className="h-20 w-20 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 text-2xl font-bold">
                            {currentUser?.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">{currentUser?.name}</h1>
                            <p className="text-slate-500">{currentUser?.email}</p>
                            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Active Customer
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-6">Order History</h2>

                <div className="grid gap-6">
                    {myOrders.length === 0 ? (
                        <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                            <Package className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                            <p className="text-slate-500">No orders found yet.</p>
                        </div>
                    ) : (
                        myOrders.map(order => (
                            <div key={order.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 pb-4 border-b border-slate-100">
                                    <div>
                                        <span className="text-sm text-slate-500">Order ID</span>
                                        <p className="font-mono font-bold text-slate-900">{order.id}</p>
                                    </div>
                                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                                        <div className="flex items-center text-sm text-slate-500">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {order.date}
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : 'bg-rose-100 text-rose-800'
                                            }`}>
                                            {order.status}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-sm">
                                            <span className="text-slate-700 font-medium">
                                                {item.quantity}x Design #{item.designId} ({item.fabricColor})
                                            </span>
                                            <span className="text-slate-900">₹{item.priceAtPurchase.toLocaleString('en-IN')}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-900">Total</span>
                                    <span className="text-lg font-bold text-rose-500">₹{order.total.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
