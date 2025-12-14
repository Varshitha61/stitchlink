import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Design, Order, User, CartItem, Review, Notification } from '../types';
import { supabase } from '../lib/supabase';
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

  // Initialize: Check for existing session and fetch data
  useEffect(() => {
    initializeAuth();
    fetchDesigns();
    fetchReviews();
  }, []);

  // Fetch orders when user changes
  useEffect(() => {
    if (currentUser) {
      fetchOrders();
      if (currentUser.email.toLowerCase().includes('admin') || currentUser.email.toLowerCase() === 'varshithasomashekar22@gmail.com') {
        fetchNotifications();
        subscribeToNotifications();
      }
    }
  }, [currentUser]);

  const initializeAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const user: User = {
        id: session.user.id,
        name: session.user.user_metadata.name || session.user.email?.split('@')[0] || 'User',
        email: session.user.email || '',
        role: (session.user.email?.toLowerCase().includes('admin') || session.user.email?.toLowerCase() === 'varshithasomashekar22@gmail.com') ? 'ADMIN' : 'CUSTOMER'
      };
      setCurrentUser(user);
    }
    setLoading(false);
  };

  const fetchDesigns = async () => {
    let { data, error } = await supabase
      .from('designs')
      .select('*')
      .order('created_at', { ascending: false });

    // Sync mock designs to DB (Upsert) to ensure new designs are added
    if (!error) {
      const designsToUpsert = MOCK_DESIGNS.map(d => ({
        id: d.id,
        title: d.title,
        description: d.description,
        price: d.price,
        category: d.category,
        image: d.image,
        tags: d.tags
      }));

      const { error: upsertError } = await supabase
        .from('designs')
        .upsert(designsToUpsert, { onConflict: 'id' });

      if (upsertError) {
        console.error("Error syncing designs:", upsertError);
      } else {
        // Refetch to get latest state
        const { data: newData, error: newError } = await supabase
          .from('designs')
          .select('*')
          .order('created_at', { ascending: false });

        data = newData || [];
        error = newError;
      }
    }

    // MERGE: Combine DB data with MOCK_DESIGNS locally to guarantee new code additions appear
    // even if DB sync fails (e.g. RLS issues)
    const dbDesigns = data || [];
    const dbDesignIds = new Set(dbDesigns.map(d => d.id));

    // Find designs in mock but not in DB (or force overwrite if we want code to be source of truth for dev)
    const missingDesigns = MOCK_DESIGNS.filter(d => !dbDesignIds.has(d.id));

    // Combine: Prefer DB version if exists (to keep price updates etc), else add Missing
    const combinedDesigns = [...dbDesigns, ...missingDesigns];

    setDesigns(combinedDesigns.map(d => ({
      ...d,
      description: d.description || d.title,
      stitches: d.stitches || 1000
    })));
  };

  const fetchOrders = async () => {
    if (!currentUser) return;

    const isAdmin = currentUser.email.toLowerCase().includes('admin') || currentUser.email.toLowerCase() === 'varshithasomashekar22@gmail.com';
    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .order('created_at', { ascending: false });

    if (!isAdmin) {
      query = query.eq('customer_id', currentUser.id);
    }

    const { data, error } = await query;

    if (data && !error) {
      const formattedOrders = data.map(order => ({
        id: order.id,
        customerId: order.customer_id,
        customerName: order.customer_name,
        date: order.date,
        status: order.status,
        total: order.total,
        items: order.order_items.map((item: any) => ({
          designId: item.design_id,
          fabricColor: item.fabric_color,
          quantity: item.quantity,
          priceAtPurchase: item.price_at_purchase
        }))
      }));
      setOrders(formattedOrders);
    }
  };

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    // MERGE: Combine DB reviews with MOCK_REVIEWS
    const dbReviews = data ? data.map(r => ({
      id: r.id,
      designId: r.design_id,
      userId: r.user_id,
      userName: r.user_name,
      rating: r.rating,
      comment: r.comment,
      date: r.date
    })) : [];

    const dbReviewIds = new Set(dbReviews.map(r => r.id));
    const missingReviews = MOCK_REVIEWS.filter(r => !dbReviewIds.has(r.id));

    // Combine
    setReviews([...dbReviews, ...missingReviews]);
  };

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (data && !error) {
      setNotifications(data);
    }
  };

  const subscribeToNotifications = () => {
    const channel = supabase
      .channel('notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications'
      }, (payload) => {
        setNotifications(prev => [payload.new as Notification, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Supabase login error:', error);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const user: User = {
          id: data.user.id,
          name: data.user.user_metadata.name || email.split('@')[0],
          email: data.user.email || email,
          role: (email.toLowerCase().includes('admin') || email.toLowerCase() === 'varshithasomashekar22@gmail.com') ? 'ADMIN' : 'CUSTOMER'
        };
        setCurrentUser(user);
        return { success: true };
      }
      return { success: false, error: 'User not found' };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });

      if (error) {
        console.error('Supabase signup error:', error);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const user: User = {
          id: data.user.id,
          name,
          email,
          role: 'CUSTOMER'
        };
        setCurrentUser(user);
        return { success: true };
      }
      return { success: false, error: 'Signup failed. Please try again.' };
    } catch (error: any) {
      console.error('Signup error:', error);
      return { success: false, error: error.message || 'Signup failed' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setCart([]);
    setOrders([]);
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

      // Insert order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: currentUser.id,
          customer_name: currentUser.name,
          customer_email: currentUser.email,
          total,
          status: 'PENDING'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert order items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        design_id: item.designId,
        design_title: item.design.title,
        quantity: item.quantity,
        fabric_color: item.fabricColor,
        price_at_purchase: item.priceAtPurchase
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Create notification for admin
      await supabase
        .from('notifications')
        .insert({
          type: 'NEW_ORDER',
          order_id: order.id,
          message: `New order #${order.id.slice(0, 8)} from ${currentUser.name} - ₹${total}`
        });

      clearCart();
      await fetchOrders();
    } catch (error) {
      console.error('Place order error:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;

      await fetchOrders();
    } catch (error) {
      console.error('Update order status error:', error);
    }
  };

  const addDesign = async (design: Design) => {
    try {
      const { error } = await supabase
        .from('designs')
        .insert({
          title: design.title,
          category: design.category,
          price: design.price,
          image: design.image,
          tags: design.tags
        });

      if (error) throw error;

      await fetchDesigns();
    } catch (error) {
      console.error('Add design error:', error);
    }
  };

  const addReview = async (review: Review) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          design_id: review.designId,
          user_id: review.userId,
          user_name: review.userName,
          rating: review.rating,
          comment: review.comment,
          date: review.date
        });

      if (error) throw error;

      await fetchReviews();
    } catch (error) {
      console.error('Add review error:', error);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
    } catch (error) {
      console.error('Mark notification as read error:', error);
    }
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