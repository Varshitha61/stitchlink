# StitchLink - Premium Embroidery Management System 🧵✨

StitchLink is a modern, full-stack web application designed to bridge the gap between traditional embroidery craftsmanship and digital convenience. It provides a seamless experience for customers to browse visual catalogs and order custom designs, while offering a powerful, animated admin portal for business management.

![StitchLink Banner](https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=1200&auto=format&fit=crop)

## 🚀 Key Features

### 🛍️ Customer Experience
- **Visual Catalog**: dynamic, filtered browsing of embroidery designs with "Quick View" capabilities.
- **AI Design Assistant**: Integrated Gemini AI to recommend designs based on natural language queries (e.g., "peacock feather pattern for bridal blouse").
- **Smart Cart & Secure Checkout**:
  - Real-time cart management.
  - **Visual Payment Page**: Interactive 3D credit card component with bank-grade security visuals.
  - Smooth checkout flow with success animations.

### 🔐 Admin Command Center
- **Unified Premium UI**: Glassmorphism aesthetic with consistent, fluid background animations across all pages.
- **Dashboard**: Real-time sales analytics, "Weekly Revenue" charts, and recent order tracking.
- **Order Management**: "Digital Stream" animated interface for tracking order status (Pending → Processing → Completed).
- **Inventory Control**: "Geometric Grid" animated interface for managing thousands of design patterns easily.

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (with custom animations & glassmorphism)
- **Icons**: Lucide React
- **State Management**: React Context API
- **AI Integration**: Google Gemini API
- **Data Visualization**: Recharts

## 🏃‍♂️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/stitchlink.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🎨 UI & Animations
The project features a custom animation suite configured in `tailwind.config` (via script injection), including:
- `animate-gradient-wave`
- `animate-float-up` (Particles)
- `animate-grid-pulse`
- `perspective-3d` card interactions

## 📄 License
This project is licensed under the MIT License.
