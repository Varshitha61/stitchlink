import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { AdminLogin } from './pages/AdminLogin';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { CustomerProfile } from './pages/CustomerProfile';
import { Reviews } from './pages/Reviews';
import { Payment } from './pages/Payment';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminOrders } from './pages/AdminOrders';
import { AdminInventory } from './pages/AdminInventory';
import { ShoppingBag, Scissors, Twitter, Instagram, Linkedin, Facebook, MapPin } from 'lucide-react';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRole }: React.PropsWithChildren<{ allowedRole: 'CUSTOMER' | 'ADMIN' }>) => {
  const { currentUser } = useStore();
  
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== allowedRole) return <Navigate to="/" replace />;
  
  return <>{children}</>;
};

// Cart Page Component
const Cart = () => {
  const { cart, removeFromCart } = useStore();
  const navigate = useNavigate();
  
  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white dark:bg-slate-950 transition-colors">
        <div className="bg-rose-50 dark:bg-slate-800 p-6 rounded-full mb-4">
             <ShoppingBag className="h-12 w-12 text-rose-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your cart is empty</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Looks like you haven't added any designs yet.</p>
        <button 
            onClick={() => navigate('/catalog')}
            className="mt-6 px-6 py-2 bg-rose-400 text-white rounded-xl font-bold shadow-md hover:bg-rose-500 transition-all"
        >
            Browse Catalog
        </button>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + (item.priceAtPurchase * item.quantity), 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Shopping Cart</h1>
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {cart.map((item) => (
            <li key={item.id} className="p-6 flex items-center flex-col sm:flex-row gap-4">
              <img src={item.design.image} alt={item.design.title} className="h-24 w-24 object-cover rounded-xl border border-slate-100 dark:border-slate-700" />
              <div className="sm:ml-6 flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.design.title}</h3>
                <div className="flex items-center justify-center sm:justify-start mt-1">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mr-4">Color: <span className="inline-block w-3 h-3 rounded-full border border-slate-300 ml-1 align-middle" style={{backgroundColor: item.fabricColor}}></span></p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                </div>
              </div>
              <div className="text-center sm:text-right w-full sm:w-auto flex flex-row sm:flex-col justify-between items-center sm:items-end">
                <p className="text-lg font-bold text-slate-900 dark:text-white">₹{(item.priceAtPurchase * item.quantity).toLocaleString('en-IN')}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-500 hover:text-red-700 font-medium mt-0 sm:mt-2">Remove</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase font-bold">Total Amount</p>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">₹{total.toLocaleString('en-IN')}</p>
            <p className="text-xs text-slate-400 mt-1">Excluding taxes & shipping</p>
          </div>
          <button 
            onClick={() => navigate('/payment')}
            className="w-full sm:w-auto bg-rose-400 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-rose-500 transition-colors shadow-lg shadow-rose-400/20"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

const Footer = () => (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pt-16 pb-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="space-y-4">
                    <div className="flex items-center">
                        <Scissors className="h-6 w-6 text-rose-500 mr-2" />
                        <span className="text-xl font-bold text-slate-900 dark:text-white">StitchLink</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                        Empowering embroidery businesses with digital tools for the modern age.
                    </p>
                    <div className="flex items-start text-sm text-slate-500 dark:text-slate-400 mt-4">
                         <MapPin className="h-4 w-4 mr-2 mt-0.5 text-rose-500 shrink-0" />
                         <span>Fashion Street,<br/>Mumbai, India</span>
                    </div>
                    <div className="flex space-x-4 pt-4">
                        <a href="#" className="text-slate-400 hover:text-rose-500"><Twitter className="h-5 w-5"/></a>
                        <a href="#" className="text-slate-400 hover:text-rose-500"><Instagram className="h-5 w-5"/></a>
                        <a href="#" className="text-slate-400 hover:text-rose-500"><Linkedin className="h-5 w-5"/></a>
                        <a href="#" className="text-slate-400 hover:text-rose-500"><Facebook className="h-5 w-5"/></a>
                    </div>
                </div>
                
                <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4">Company</h3>
                    <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                        <li><a href="#" className="hover:text-rose-500">About Us</a></li>
                        <li><a href="#" className="hover:text-rose-500">Contact</a></li>
                        <li><a href="#" className="hover:text-rose-500">Careers</a></li>
                        <li><a href="#" className="hover:text-rose-500">Team</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4">Designs</h3>
                    <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                        <li><a href="#" className="hover:text-rose-500">New Arrivals</a></li>
                        <li><a href="#" className="hover:text-rose-500">Trending</a></li>
                        <li><a href="#" className="hover:text-rose-500">Custom Orders</a></li>
                        <li><a href="#" className="hover:text-rose-500">Bulk Pricing</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4">Resources</h3>
                    <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                        <li><a href="#" className="hover:text-rose-500">Blog</a></li>
                        <li><a href="#" className="hover:text-rose-500">Help Center</a></li>
                        <li><a href="#" className="hover:text-rose-500">Tutorials</a></li>
                        <li><a href="#" className="hover:text-rose-500">FAQs</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
                <p>&copy; 2023 StitchLink. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300">Privacy Policy</a>
                    <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
);

const AppContent = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col font-sans transition-colors duration-200">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Customer Routes */}
          <Route path="/catalog" element={
            <ProtectedRoute allowedRole="CUSTOMER"><Catalog /></ProtectedRoute>
          } />
          <Route path="/product/:id" element={
            <ProtectedRoute allowedRole="CUSTOMER"><ProductDetail /></ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute allowedRole="CUSTOMER"><Cart /></ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute allowedRole="CUSTOMER"><Payment /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute allowedRole="CUSTOMER"><CustomerProfile /></ProtectedRoute>
          } />
          <Route path="/reviews" element={
            <ProtectedRoute allowedRole="CUSTOMER"><Reviews /></ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRole="ADMIN"><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute allowedRole="ADMIN"><AdminOrders /></ProtectedRoute>
          } />
          <Route path="/admin/inventory" element={
            <ProtectedRoute allowedRole="ADMIN"><AdminInventory /></ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <StoreProvider>
          <AppContent />
        </StoreProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
