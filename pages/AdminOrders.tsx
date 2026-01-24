import React from 'react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus } from '../types';
import { ChevronDown, Package, Clock, Truck, CheckCircle } from 'lucide-react';

const STATUS_FLOW: OrderStatus[] = ['PENDING', 'FABRIC_RECEIVED', 'PROCESSING', 'QUALITY_CHECK', 'SHIPPED', 'DELIVERED'];

export const AdminOrders = () => {
  const { orders, updateOrderStatus } = useStore();

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'FABRIC_RECEIVED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PROCESSING': return 'bg-violet-100 text-violet-800 border-violet-200';
      case 'QUALITY_CHECK': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'SHIPPED': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'DELIVERED': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-3 h-3 mr-1" />;
      case 'SHIPPED': return <Truck className="w-3 h-3 mr-1" />;
      case 'DELIVERED': return <CheckCircle className="w-3 h-3 mr-1" />;
      default: return <Package className="w-3 h-3 mr-1" />;
    }
  }

  const handleStatusChange = (orderId: string, currentStatus: OrderStatus) => {
    const currentIndex = STATUS_FLOW.indexOf(currentStatus);
    if (currentIndex < STATUS_FLOW.length - 1) {
      updateOrderStatus(orderId, STATUS_FLOW[currentIndex + 1]);
    }
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Order Management</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Track and update customer orders in real-time.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Order ID</th>
                  <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Items</th>
                  <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Total</th>
                  <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative px-6 py-5"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-rose-500 group-hover:text-rose-600 transition-colors">#{order.id.slice(0, 8)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{order.customerName}</div>
                      <div className="text-xs text-slate-400">Customer</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-bold text-slate-500">
                            {item.quantity}
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-bold text-slate-500">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white">
                      ₹{order.total.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)} uppercase tracking-wide`}>
                        {getStatusIcon(order.status)}
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {order.status !== 'DELIVERED' && (
                        <button
                          onClick={() => handleStatusChange(order.id, order.status)}
                          className="bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-600 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md flex items-center ml-auto"
                        >
                          Next Stage <ChevronDown className="ml-2 h-3 w-3" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
