import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Design, Order, User, CartItem, Review, Notification } from '../types';
import { MOCK_DESIGNS, MOCK_REVIEWS } from '../data/mockData';

interface StoreContextType {
  designs: Design[];
  orders: Order[];
  currentUser: User | null;
  cart: CartItem[];
  reviews: Review[];
  notifications: Notification[];
  loading: boolean;

  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  placeOrder: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  addDesign: (design: Design) => Promise<void>;
  addReview: (review: Review) => Promise<void>;
  markNotificationAsRead: (notificationId: string) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children?: ReactNode }) => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize: Load data
  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      fetchDesigns();
      fetchReviews();
      setLoading(false);
    }, 500);
  }, []);

  // Fetch orders when user changes
  useEffect(() => {
    if (currentUser) {
      if (currentUser.email.toLowerCase().includes('admin') || currentUser.email.toLowerCase() === 'varshithasomashekar22@gmail.com') {
        // Admin sees all orders (mock)
      } else {
        // user sees their orders
      }
    }
  }, [currentUser]);

  const fetchDesigns = async () => {
    // Simply use the mock data
    setDesigns(MOCK_DESIGNS.map(d => ({
      ...d,
      description: d.description || d.title,
      stitches: d.stitches || 1000
    })));
  };

  // No-op for mock version as orders are in-memory
  const fetchOrders = async () => { };

  const fetchReviews = async () => {
    // Just use mock reviews
    setReviews(MOCK_REVIEWS);
  };

  const fetchNotifications = async () => {
    // Mock notifications
    setNotifications([
      {
        id: '1',
        type: 'NEW_ORDER',
        orderId: '12345678',
        message: 'New order #12345678 placed successfully',
        read: false,
        created_at: new Date().toISOString()
      }
    ]);
  };

  // No-op for subscriptions
  const subscribeToNotifications = () => {
    return () => { };
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // MOCK LOGIN
      const user: User = {
        id: 'mock-user-id-' + Math.random(),
        name: email.split('@')[0],
        email: email,
        role: (email.toLowerCase().includes('admin') || email.toLowerCase() === 'varshithasomashekar22@gmail.com') ? 'ADMIN' : 'CUSTOMER'
      };
      setCurrentUser(user);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // MOCK SIGNUP
      const user: User = {
        id: 'mock-user-id-' + Math.random(),
        name,
        email,
        role: 'CUSTOMER'
      };
      setCurrentUser(user);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: 'Signup failed' };
    }
  };

  const logout = async () => {
    // MOCK LOGOUT
    setCurrentUser(null);
    setCart([]);
    // Don't clear orders so we can see them in admin immediately after logout/login switch ideally, 
    // but for security feeling we usually clear. Let's clear to simulate session end.
    setNotifications([]);
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const placeOrder = async () => {
    if (!currentUser || cart.length === 0) return;

    try {
      const total = cart.reduce((sum, item) => sum + (item.priceAtPurchase * item.quantity), 0);

      const newOrder: Order = {
        id: `ORD-${Date.now()}`,
        customerId: currentUser.id,
        customerName: currentUser.name,
        date: new Date().toISOString(),
        status: 'PENDING',
        total: total,
        items: cart.map(item => ({
          designId: item.designId,
          fabricColor: item.fabricColor,
          quantity: item.quantity,
          priceAtPurchase: item.priceAtPurchase
        }))
      };

      // MOCK: Add to local state
      setOrders(prev => [newOrder, ...prev]);

      // Add notification
      const newNotif: Notification = {
        id: `NOTIF-${Date.now()}`,
        type: 'NEW_ORDER',
        orderId: newOrder.id,
        message: `New order #${newOrder.id.slice(0, 8)} from ${currentUser.name} - ₹${total}`,
        read: false,
        created_at: new Date().toISOString()
      };
      setNotifications(prev => [newNotif, ...prev]);

      clearCart();
    } catch (error) {
      console.error('Place order error:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const addDesign = async (design: Design) => {
    setDesigns(prev => [design, ...prev]);
  };

  const addReview = async (review: Review) => {
    setReviews(prev => [review, ...prev]);
  };

  const markNotificationAsRead = async (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>;
  }

  return (
    <StoreContext.Provider value={{
      designs,
      orders,
      currentUser,
      cart,
      reviews,
      notifications,
      loading,
      login,
      signup,
      logout,
      addToCart,
      removeFromCart,
      clearCart,
      placeOrder,
      updateOrderStatus,
      addDesign,
      addReview,
      markNotificationAsRead
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};