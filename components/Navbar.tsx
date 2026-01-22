import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useTheme } from '../context/ThemeContext';
import { ShoppingBag, LogOut, Scissors, User, Sun, Moon, Menu, X, ChevronRight, LayoutDashboard, List, Package } from 'lucide-react';

export const Navbar = () => {
  const { currentUser, logout, cart } = useStore();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;
  
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-white dark:bg-slate-900 sticky top-0 z-40 transition-colors duration-200 border-b border-rose-100 dark:border-slate-800 backdrop-blur-md bg-white/80 dark:bg-slate-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 mr-2 text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors focus:outline-none"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-rose-100 dark:bg-rose-900/20 p-2.5 rounded-xl mr-2">
                  <Scissors className="h-6 w-6 text-rose-500" />
              </div>
              <span className="text-2xl font-bold text-slate-800 dark:text-rose-100 tracking-tight">StitchLink</span>
            </div>
          </div>

          {/* Centered Navigation (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-rose-500' : 'text-slate-600 dark:text-slate-300 hover:text-rose-400 dark:hover:text-rose-300'}`}>
              Home
            </Link>
            
            <Link to="/services" className={`text-sm font-medium transition-colors ${isActive('/services') ? 'text-rose-500' : 'text-slate-600 dark:text-slate-300 hover:text-rose-400 dark:hover:text-rose-300'}`}>
              Services
            </Link>
            
            <Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-rose-500' : 'text-slate-600 dark:text-slate-300 hover:text-rose-400 dark:hover:text-rose-300'}`}>
              About Us
            </Link>

            {currentUser?.role === 'CUSTOMER' && (
              <>
                <Link to="/catalog" className={`text-sm font-medium transition-colors ${isActive('/catalog') ? 'text-rose-500' : 'text-slate-600 dark:text-slate-300 hover:text-rose-400 dark:hover:text-rose-300'}`}>
                  Catalog
                </Link>
                <Link to="/reviews" className={`text-sm font-medium transition-colors ${isActive('/reviews') ? 'text-rose-500' : 'text-slate-600 dark:text-slate-300 hover:text-rose-400 dark:hover:text-rose-300'}`}>
                  Reviews
                </Link>
                 <Link to="/profile" className={`text-sm font-medium transition-colors ${isActive('/profile') ? 'text-rose-500' : 'text-slate-600 dark:text-slate-300 hover:text-rose-400 dark:hover:text-rose-300'}`}>
                  My Profile
                </Link>
              </>
            )}
            {currentUser?.role === 'ADMIN' && (
              <>
                <Link to="/admin" className={`text-sm font-medium transition-colors ${isActive('/admin') ? 'text-rose-500' : 'text-slate-600 dark:text-slate-300 hover:text-rose-400 dark:hover:text-rose-300'}`}>
                  Dashboard
                </Link>
                <Link to="/admin/orders" className={`text-sm font-medium transition-colors ${isActive('/admin/orders') ? 'text-rose-500' : 'text-slate-600 dark:text-slate-300 hover:text-rose-400 dark:hover:text-rose-300'}`}>
                  Orders
                </Link>
                <Link to="/admin/inventory" className={`text-sm font-medium transition-colors ${isActive('/admin/inventory') ? 'text-rose-500' : 'text-slate-600 dark:text-slate-300 hover:text-rose-400 dark:hover:text-rose-300'}`}>
                  Inventory
                </Link>
              </>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Theme Toggle (Desktop) */}
            <button 
              onClick={toggleTheme}
              className="hidden md:block p-2 text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 transition-colors rounded-full hover:bg-rose-50 dark:hover:bg-slate-800"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {!currentUser ? (
              <button
                onClick={() => navigate('/login')}
                className="hidden md:block bg-rose-400 text-white hover:bg-rose-500 px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-rose-400/30 hover:shadow-rose-400/40"
              >
                Sign In
              </button>
            ) : (
              <div className="flex items-center gap-4">
                {currentUser.role === 'CUSTOMER' && (
                  <Link to="/cart" className="relative group p-2">
                    <ShoppingBag className="h-6 w-6 text-slate-600 dark:text-slate-300 group-hover:text-rose-500 transition-colors" />
                    {cart.length > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900">
                        {cart.length}
                      </span>
                    )}
                  </Link>
                )}
                
                <div className="hidden md:flex items-center pl-4 border-l border-rose-100 dark:border-slate-700">
                  <div className="flex flex-col items-end mr-3">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{currentUser.name}</span>
                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-900/30 px-2 py-0.5 rounded-full uppercase tracking-wider">{currentUser.role}</span>
                  </div>
                  <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-full hover:bg-rose-50 dark:hover:bg-slate-800">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar / Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
                onClick={closeMenu}
            ></div>

            {/* Sidebar Content */}
            <div className="relative bg-white dark:bg-slate-900 w-[85%] max-w-xs h-full shadow-2xl flex flex-col animate-slide-in overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0 z-10">
                    <div className="flex items-center">
                        <div className="bg-rose-100 dark:bg-rose-900/20 p-2 rounded-lg mr-3">
                            <Scissors className="h-5 w-5 text-rose-500" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">StitchLink</span>
                    </div>
                    <button onClick={closeMenu} className="p-2 -mr-2 text-slate-400 hover:text-rose-500 transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                    {/* User Profile Summary (Mobile) */}
                    {currentUser && (
                        <div className="mb-6 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-500 font-bold text-lg mr-3 shadow-sm">
                                    {currentUser.name.charAt(0)}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="font-bold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
                                    <p className="text-xs font-bold text-rose-500 uppercase tracking-wide">{currentUser.role}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <MobileNavLink to="/" onClick={closeMenu} isActive={isActive('/')}>Home</MobileNavLink>
                        <MobileNavLink to="/services" onClick={closeMenu} isActive={isActive('/services')}>Services</MobileNavLink>
                        <MobileNavLink to="/about" onClick={closeMenu} isActive={isActive('/about')}>About Us</MobileNavLink>
                    </div>

                    {currentUser?.role === 'CUSTOMER' && (
                        <>
                            <div className="pt-6 pb-2">
                                <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Shop</p>
                            </div>
                            <MobileNavLink to="/catalog" onClick={closeMenu} isActive={isActive('/catalog')}>Catalog</MobileNavLink>
                            <MobileNavLink to="/reviews" onClick={closeMenu} isActive={isActive('/reviews')}>Reviews</MobileNavLink>
                            <MobileNavLink to="/cart" onClick={closeMenu} isActive={isActive('/cart')}>My Cart</MobileNavLink>
                            <MobileNavLink to="/profile" onClick={closeMenu} isActive={isActive('/profile')}>My Profile</MobileNavLink>
                        </>
                    )}

                    {currentUser?.role === 'ADMIN' && (
                        <>
                            <div className="pt-6 pb-2">
                                <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Administration</p>
                            </div>
                            <MobileNavLink to="/admin" onClick={closeMenu} isActive={isActive('/admin')} icon={<LayoutDashboard size={18} />}>Dashboard</MobileNavLink>
                            <MobileNavLink to="/admin/orders" onClick={closeMenu} isActive={isActive('/admin/orders')} icon={<List size={18} />}>Orders</MobileNavLink>
                            <MobileNavLink to="/admin/inventory" onClick={closeMenu} isActive={isActive('/admin/inventory')} icon={<Package size={18} />}>Inventory</MobileNavLink>
                        </>
                    )}
                </div>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3 bg-white dark:bg-slate-900">
                    <button 
                        onClick={toggleTheme}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium border border-slate-100 dark:border-slate-700 transition-colors"
                    >
                        <span className="flex items-center gap-3">
                            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                        </span>
                    </button>

                    {currentUser ? (
                         <button 
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        >
                            <LogOut className="h-5 w-5 mr-2" />
                            Sign Out
                        </button>
                    ) : (
                        <button 
                            onClick={() => { navigate('/login'); closeMenu(); }}
                            className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-rose-400 text-white font-bold hover:bg-rose-500 transition-colors shadow-lg shadow-rose-400/20"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </div>
      )}
    </nav>
  );
};

// Helper Component for Mobile Links
const MobileNavLink = ({ to, children, onClick, isActive, icon }: any) => (
    <Link 
        to={to} 
        onClick={onClick}
        className={`flex items-center px-4 py-3 rounded-xl transition-all ${
            isActive 
            ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-500 dark:text-rose-400 font-bold' 
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium'
        }`}
    >
        {icon && <span className="mr-3 opacity-70">{icon}</span>}
        <span className="flex-1">{children}</span>
        {isActive && <ChevronRight className="h-4 w-4" />}
    </Link>
);