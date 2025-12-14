
export interface Design {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tags: string[];
  stitches: number; // Estimated stitch count for pricing
}

export type OrderStatus = 'PENDING' | 'FABRIC_RECEIVED' | 'PROCESSING' | 'QUALITY_CHECK' | 'SHIPPED' | 'DELIVERED';

export interface OrderItem {
  designId: string;
  fabricColor: string;
  quantity: number;
  customNotes?: string;
  priceAtPurchase: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
}

export interface CartItem extends OrderItem {
  id: string; // Temporary ID for cart logic
  design: Design;
}

export type UserRole = 'CUSTOMER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface Review {
  id: string;
  designId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Notification {
  id: string;
  type: 'NEW_ORDER' | 'ORDER_UPDATE';
  orderId: string;
  message: string;
  read: boolean;
  created_at: string;
}
