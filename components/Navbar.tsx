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

  // Lock scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);


  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-white dark:bg-slate-900 sticky top-0 z-50 transition-colors duration-200 border-b border-rose-100 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">

          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2.5 -ml-2 mr-3 text-slate-700 dark:text-slate-200 hover:text-rose-500 transition-colors focus:outline-none bg-slate-50 dark:bg-slate-800 rounded-lg"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-rose-500 p-2 sm:p-2.5 rounded-xl mr-2 shadow-sm">
                <Scissors className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">StitchLink</span>
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

      {/* Mobile Sidebar / Drawer - Full Screen */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex md:hidden">
          {/* Backdrop with stronger blur */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300"
            onClick={closeMenu}
          ></div>

          {/* Full Screen Content */}
          <div className="relative bg-white/95 dark:bg-slate-900/95 w-full h-full shadow-2xl flex flex-col animate-slide-in overflow-hidden backdrop-blur-xl">
            {/* Header Section */}
            <div className="p-6 border-b border-rose-100/50 dark:border-slate-800/50 flex justify-between items-center bg-transparent sticky top-0 z-10 mx-2">
              <div className="flex items-center">
                <div className="bg-rose-500 p-2.5 rounded-xl mr-3 shadow-lg shadow-rose-500/20">
                  <Scissors className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">StitchLink</span>
              </div>
              <button
                onClick={closeMenu}
                className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition-all hover:rotate-90"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pt-8 pb-12 px-6 space-y-8">
              {/* User Profile Summary (Mobile) - Enhanced */}
              {currentUser && (
                <div className="bg-gradient-to-br from-rose-50 to-white dark:from-slate-800/50 dark:to-slate-900 p-6 rounded-3xl border border-rose-100 dark:border-slate-800 shadow-sm mx-2">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-2xl bg-rose-500 flex items-center justify-center text-white font-bold text-2xl mr-4 shadow-lg shadow-rose-500/30">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-bold text-xl text-slate-900 dark:text-white truncate">{currentUser.name}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold text-rose-500 bg-rose-100 dark:bg-rose-900/40 px-3 py-1 rounded-full uppercase tracking-widest">{currentUser.role}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4 px-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-4 mb-2">Main Menu</p>
                <div className="grid gap-2">
                  <MobileNavLink to="/" onClick={closeMenu} isActive={isActive('/')}>Home</MobileNavLink>
                  <MobileNavLink to="/services" onClick={closeMenu} isActive={isActive('/services')}>Services</MobileNavLink>
                  <MobileNavLink to="/about" onClick={closeMenu} isActive={isActive('/about')}>About Us</MobileNavLink>
                </div>
              </div>

              {currentUser?.role === 'CUSTOMER' && (
                <div className="space-y-4 px-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-4 mb-2">Shopping</p>
                  <div className="grid gap-2">
                    <MobileNavLink to="/catalog" onClick={closeMenu} isActive={isActive('/catalog')}>Catalog</MobileNavLink>
                    <MobileNavLink to="/reviews" onClick={closeMenu} isActive={isActive('/reviews')}>Reviews</MobileNavLink>
                    <MobileNavLink to="/cart" onClick={closeMenu} isActive={isActive('/cart')}>My Cart</MobileNavLink>
                    <MobileNavLink to="/profile" onClick={closeMenu} isActive={isActive('/profile')}>My Profile</MobileNavLink>
                  </div>
                </div>
              )}

              {currentUser?.role === 'ADMIN' && (
                <div className="space-y-4 px-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-4 mb-2">Administration</p>
                  <div className="grid gap-2">
                    <MobileNavLink to="/admin" onClick={closeMenu} isActive={isActive('/admin')} icon={<LayoutDashboard size={20} />}>Dashboard</MobileNavLink>
                    <MobileNavLink to="/admin/orders" onClick={closeMenu} isActive={isActive('/admin/orders')} icon={<List size={20} />}>Orders</MobileNavLink>
                    <MobileNavLink to="/admin/inventory" onClick={closeMenu} isActive={isActive('/admin/inventory')} icon={<Package size={20} />}>Inventory</MobileNavLink>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-rose-100 dark:border-slate-800 space-y-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-900/10 hover:text-rose-500 dark:hover:text-rose-400 font-bold border border-slate-200 dark:border-slate-700 transition-all group"
              >
                <span className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm group-hover:bg-rose-500 group-hover:text-white transition-colors">
                    {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  </div>
                  {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                </span>
                <div className="h-2 w-2 rounded-full bg-rose-500"></div>
              </button>

              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-5 py-4 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-all border border-red-100 dark:border-red-900/30"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out Account
                </button>
              ) : (
                <button
                  onClick={() => { navigate('/login'); closeMenu(); }}
                  className="w-full flex items-center justify-center px-5 py-5 rounded-2xl bg-rose-500 text-white font-bold hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/25 active:scale-[0.98]"
                >
                  Sign In to StitchLink
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
    className={`flex items-center px-5 py-4 rounded-2xl transition-all ${isActive
      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25 font-bold scale-[1.02]'
      : 'text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-800/80 hover:text-rose-500 dark:hover:text-rose-400 font-bold'
      }`}
  >
    {icon && <span className={`mr-4 transition-colors ${isActive ? 'text-white' : 'opacity-70 group-hover:opacity-100'}`}>{icon}</span>}
    <span className="flex-1 text-lg">{children}</span>
    {isActive ? (
      <div className="bg-white/20 p-1 rounded-full">
        <ChevronRight className="h-5 w-5 text-white" />
      </div>
    ) : (
      <ChevronRight className="h-5 w-5 opacity-30 group-hover:opacity-100 transition-opacity" />
    )}
  </Link>

);