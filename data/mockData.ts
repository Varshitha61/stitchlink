
import { Design, Order, User, Review } from '../types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Priya Sharma', email: 'priya@example.com', role: 'CUSTOMER' },
  { id: 'u2', name: 'Aisha Khan', email: 'aisha@studio.com', role: 'CUSTOMER' },
  { id: 'u3', name: 'Rahul Verma', email: 'rahul@fashion.co', role: 'CUSTOMER' },
  { id: 'u4', name: 'Sneha Patel', email: 'sneha@boutique.net', role: 'CUSTOMER' },
  { id: 'admin1', name: 'Admin', email: 'admin@stitchlink.com', role: 'ADMIN' }
];

export const MOCK_DESIGNS: Design[] = [
  {
    id: 'd1',
    title: 'Kashmiri Aari Floral',
    description: 'Intricate Kashmiri Aari work featuring vibrant floral motifs, perfect for Shawls and Kurtis.',
    price: 2500.00,
    category: 'Traditional',
    image: '/images/kashmiri-aari.jpg',
    tags: ['kashmiri', 'aari', 'floral', 'heavy', 'traditional'],
    stitches: 45000
  },
  {
    id: 'd2',
    title: 'Rajasthani Mirror Work',
    description: 'Bright and colorful embroidery with real mirror inserts (Shisha work) for Chaniya Cholis.',
    price: 1800.00,
    category: 'Traditional',
    image: '/images/rajasthani-mirror.jpg',
    tags: ['rajasthani', 'mirror', 'colorful', 'festive'],
    stitches: 32000
  },
  {
    id: 'd3',
    title: 'Golden Zardosi Peacock',
    description: 'Luxurious Zardosi gold thread work depicting a royal peacock. Ideal for bridal Lehengas.',
    price: 5500.00,
    category: 'Bridal',
    image: '/images/golden-zardosi-peacock.jpg',
    tags: ['zardosi', 'gold', 'peacock', 'bridal', 'heavy'],
    stitches: 60000
  },
  {
    id: 'd4',
    title: 'Phulkari Geometric',
    description: 'Traditional Punjabi Phulkari pattern with geometric shapes in bright floss silk thread.',
    price: 1200.00,
    category: 'Traditional',
    image: '/images/phulkari-geometric.jpg',
    tags: ['punjabi', 'phulkari', 'geometric', 'colorful'],
    stitches: 28000
  },
  {
    id: 'd5',
    title: 'Lucknowi Chikankari',
    description: 'Subtle and elegant white-on-white Chikankari embroidery for summer Kurtas.',
    price: 1500.00,
    category: 'Casual',
    image: '/images/lucknowi-chikankari.jpg',
    tags: ['lucknowi', 'chikankari', 'elegant', 'white', 'simple'],
    stitches: 15000
  },
  {
    id: 'd6',
    title: 'South Temple Border',
    description: 'Traditional temple border design inspired by Kanjeevaram sarees.',
    price: 2200.00,
    category: 'Saree',
    image: '/images/south-temple-border.jpg',
    tags: ['temple', 'south indian', 'border', 'gold'],
    stitches: 35000
  },
  {
    id: 'd7',
    title: 'Modern Abstract Paisleys',
    description: 'Contemporary take on the classic Paisley motif with neon accents.',
    price: 950.00,
    category: 'Modern',
    image: '/images/modern-abstract-paisleys.jpg',
    tags: ['paisley', 'modern', 'neon', 'fusion'],
    stitches: 12000
  },
  {
    id: 'd8',
    title: 'Bridal Blouse Back',
    description: 'Heavy Maggam work design for blouse back neck with stone embellishments.',
    price: 3500.00,
    category: 'Blouse',
    image: '/images/bridal-blouse-back.jpg',
    tags: ['maggam', 'blouse', 'bridal', 'stone work'],
    stitches: 42000
  },
  {
    id: 'd9',
    title: 'Bengali Kantha Work',
    description: 'Traditional Bengali Kantha embroidery featuring running stitch motifs of flora and fauna on silk.',
    price: 3200.00,
    category: 'Traditional',
    image: '/images/kantha-stitch.png',
    tags: ['kantha', 'bengali', 'traditional', 'handwork'],
    stitches: 38000
  },
  {
    id: 'd10',
    title: 'Royal Banarasi Brocade',
    description: 'Luxurious Banarasi fabric pattern with intricate gold zari brocade work.',
    price: 6800.00,
    category: 'Bridal',
    image: '/images/banarasi-brocade.png',
    tags: ['banarasi', 'brocade', 'zari', 'royal', 'bridal'],
    stitches: 75000
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-001',
    customerId: 'u2',
    customerName: 'Aisha Khan',
    date: '2023-10-25',
    status: 'DELIVERED',
    total: 4000.00,
    items: [
      { designId: 'd1', fabricColor: '#FFFFFF', quantity: 1, priceAtPurchase: 2500.00 },
      { designId: 'd5', fabricColor: '#000000', quantity: 1, priceAtPurchase: 1500.00 }
    ]
  },
  {
    id: 'ord-002',
    customerId: 'u3',
    customerName: 'Rahul Verma',
    date: '2023-10-28',
    status: 'PROCESSING',
    total: 5500.00,
    items: [
      { designId: 'd3', fabricColor: '#800020', quantity: 1, priceAtPurchase: 5500.00 }
    ]
  },
  {
    id: 'ord-003',
    customerId: 'u4',
    customerName: 'Sneha Patel',
    date: '2023-10-30',
    status: 'PENDING',
    total: 3600.00,
    items: [
      { designId: 'd2', fabricColor: '#FFD700', quantity: 2, priceAtPurchase: 1800.00 }
    ]
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    designId: 'd1',
    userId: 'u2',
    userName: 'Aisha Khan',
    rating: 5,
    comment: 'The detailing on the Kashmiri floral is exquisite. Looks just like hand embroidery.',
    date: '2023-10-28'
  },
  {
    id: 'r2',
    designId: 'd3',
    userId: 'u4',
    userName: 'Sneha Patel',
    rating: 5,
    comment: 'Used this for my sister\'s wedding lehenga. The zardosi effect is very realistic.',
    date: '2023-11-01'
  },
  {
    id: 'r3',
    designId: 'd5',
    userId: 'u1',
    userName: 'Priya Sharma',
    rating: 4,
    comment: 'Beautiful Chikankari, but density is high so use a stabilizer.',
    date: '2023-11-05'
  },
  {
    id: 'r4',
    designId: 'd9',
    userId: 'u3',
    userName: 'Rahul Verma',
    rating: 5,
    comment: 'The Kantha stitch work is incredibly detailed. The colors are exactly as shown.',
    date: '2023-11-10'
  },
  {
    id: 'r5',
    designId: 'd10',
    userId: 'u4',
    userName: 'Sneha Patel',
    rating: 5,
    comment: 'Absolutely stunning Banarasi brocade. The gold zari shines beautifully.',
    date: '2023-11-12'
  }
];
