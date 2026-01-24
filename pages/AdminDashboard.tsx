import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Package, TrendingUp, Clock, ArrowRight, ShoppingBag } from 'lucide-react';

export const AdminDashboard = () => {
  const { orders } = useStore();
  const navigate = useNavigate();

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status !== 'DELIVERED').length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const revenueData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 5500 },
    { name: 'Thu', sales: 4500 },
    { name: 'Fri', sales: 6000 },
    { name: 'Sat', sales: 8000 },
    { name: 'Sun', sales: 2000 },
  ];

  const statusDistribution = [
    { name: 'Pending', value: orders.filter(o => o.status === 'PENDING').length },
    { name: 'Processing', value: orders.filter(o => o.status === 'PROCESSING').length },
    { name: 'Shipped', value: orders.filter(o => o.status === 'SHIPPED').length },
    { name: 'Delivered', value: orders.filter(o => o.status === 'DELIVERED').length },
  ].filter(i => i.value > 0);

  // Pastel theme colors
  const COLORS = ['#fb7185', '#f472b6', '#a78bfa', '#34d399'];

  // Get recent 5 orders
  const recentOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200 overflow-hidden">

      {/* --- Unique Background Animation: Gradient Aurora --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-rose-400/20 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-400/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-teal-400/10 blur-[100px] animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Overview of your store's performance</p>
          </div>
          <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString('en-IN')}`} icon={DollarSign} color="from-green-400 to-green-600" shadow="shadow-green-500/20" delay={0} />
          <StatCard title="Total Orders" value={totalOrders.toString()} icon={Package} color="from-rose-400 to-rose-600" shadow="shadow-rose-500/20" delay={100} />
          <StatCard title="Avg. Order Value" value={`₹${avgOrderValue.toLocaleString('en-IN')}`} icon={TrendingUp} color="from-violet-400 to-violet-600" shadow="shadow-violet-500/20" delay={200} />
          <StatCard title="Pending Actions" value={pendingOrders.toString()} icon={Clock} color="from-orange-400 to-orange-600" shadow="shadow-orange-500/20" delay={300} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Charts Section - Spans 2 columns */}
          <div className="xl:col-span-2 space-y-8">
            {/* Revenue Chart */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Weekly Revenue</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" strokeOpacity={0.3} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} prefix="₹" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <Tooltip
                      cursor={{ fill: 'rgba(251, 113, 133, 0.1)' }}
                      contentStyle={{ background: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Bar dataKey="sales" fill="#fb7185" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 animate-slide-up" style={{ animationDelay: '500ms' }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Orders</h2>
                <button onClick={() => navigate('/admin/orders')} className="text-rose-500 hover:text-rose-600 text-sm font-bold flex items-center transition-colors">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Order ID</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {recentOrders.map(order => (
                      <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-4 py-3 text-sm font-bold text-rose-500 whitespace-nowrap">{order.id}</td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">{order.customerName}</td>
                        <td className="px-4 py-3 text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">₹{order.total.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                'bg-blue-100 text-blue-800'
                            }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {recentOrders.length === 0 && (
                  <div className="text-center py-8 text-slate-400 text-sm">No orders yet</div>
                )}
              </div>
            </div>
          </div>

          {/* Side Column */}
          <div className="space-y-8">
            {/* Order Status Pie Chart */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 animate-slide-up" style={{ animationDelay: '600ms' }}>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Order Status</h2>
              <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      cornerRadius={6}
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-slate-900 dark:text-white animate-fade-in">{totalOrders}</span>
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                {statusDistribution.map((entry, index) => (
                  <div key={entry.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">{entry.name}</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action / Promo */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-500/20 animate-slide-up" style={{ animationDelay: '700ms' }}>
              <ShoppingBag className="w-10 h-10 mb-4 text-white/80" />
              <h3 className="text-xl font-bold mb-2">Manage Inventory</h3>
              <p className="text-indigo-100 mb-6 text-sm">Update prices, add new designs, and manage stock availability.</p>
              <button
                onClick={() => navigate('/admin/inventory')}
                className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-colors"
              >
                Go to Inventory
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color, shadow, delay }: any) => (
  <div
    className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md overflow-hidden rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:scale-[1.02] hover:shadow-lg animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`rounded-2xl p-4 bg-gradient-to-br ${color} text-white ${shadow} shadow-lg`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="truncate text-sm font-semibold text-slate-500 dark:text-slate-400">{title}</dt>
            <dd>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);
