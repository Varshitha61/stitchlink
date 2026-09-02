# StitchLink - Premium Embroidery Management System 🧵✨

## 1. Project Overview
StitchLink is a modern, full-stack web application designed to bridge the gap between traditional embroidery craftsmanship and digital convenience. It provides a seamless experience for customers to browse visual catalogs, upload and preview embroidery machine code (DST files), and order custom designs. It also offers a powerful, animated admin portal for business management.

## 2. Technical Stack
- **Frontend Framework**: React 18 with TypeScript.
- **Build Tool**: Vite for fast development and optimized production builds.        
    - **Styling**: Tailwind CSS, heavily utilizing custom animations (e.g., `animate-gradient-wave`, `animate-float-up`, `animate-grid-pulse`) and glassmorphism.
- **Icons**: Lucide React for consistent, scalable vector icons.
- **State Management**: React Context API (`StoreContext`, `ThemeContext`).
- **Routing**: `react-router-dom` for client-side routing.
- **AI Integration**: Google Gemini API (`@google/genai`) for an AI-powered design assistant.
- **Data Visualization**: Recharts for interactive admin dashboards.

## 3. Workflows and Pin-to-Point Details

### 3.1 Customer Workflow
1. **Catalog Browsing**: Customers can browse a dynamic, filtered catalog of embroidery designs with "Quick View" capabilities.
2. **AI Assistant**: Customers can search for designs using natural language (e.g., "peacock feather pattern for bridal blouse"). The app queries the Gemini AI to recommend matching designs from the catalog.
3. **Cart Management**: Users can add items to their cart, select fabric colors, and modify quantities.
4. **Secure Checkout & Payment**:
   - The user proceeds to checkout where shipping (free over ₹2000) and GST (5%) are calculated.
   - **Payment Methods**: Credit/Debit Card, UPI / Net Ba      nking, and Cash on Delivery.
   - **Visual Payment UI**: The card payment features an interactive 3D credit card component. The payment process simulates a bank-grade secure gateway (256-bit SSL UI representation) and completes with a success animation before redirecting to the user profile.

### 3.2 DST File Upload & Parsing Workflow
One of the most advanced technical features is the in-browser parser for Tajima DST embroidery files.
1. **File Upload**: Users drop or upload a `.dst` binary file.
2. **Binary Parsing**:
   - The app reads the first 512 bytes as the ASCII header to extract metadata (e.g., Design Label `LA:`).
   - From byte 512 onwards, it reads 3-byte records.
   - It decodes the relative X and Y needle movements and bitwise flags (Stitch, Jump, Color Change/Stop).
   - The parser tracks minimum and maximum bounds to calculate the physical dimensions (in mm, based on 0.1mm units).
3. **Canvas Rendering**:
   - The parsed stitches are scaled to fit an HTML `<canvas>`.
   - The Y-axis is inverted to map from DST coordinates to the canvas display.
   - Color changes are assigned a thread palette array for a realistic visualization of the embroidery.

### 3.3 Admin Command Center Workflow
The admin portal is a comprehensive tool for store management:
1. **Admin Login**: Secure login for staff/owners.
2. **Admin Dashboard**:
   - Displays KPI cards: Total Revenue, Total Orders, Average Order Value, and Pending Actions.
   - Renders a "Weekly Revenue" Bar Chart and an "Order Status" Pie Chart using `recharts`.
3. **Order Management**: Features a digital stream animated interface for tracking order status transitions (Pending → Processing → Shipped → Delivered).
4. **Inventory Management**: An interactive interface to manage thousands of design patterns, adjust pricing, and control stock.

## 4. Design & UI Aesthetics
The app is built with a premium visual identity:
- **Glassmorphism**: Backdrop blur and transparent card backgrounds across pages.
- **Dark/Light Mode**: Full support for system and manual theme toggling via `ThemeContext`.
- **Micro-animations**: Hover effects, loading spinners, and successful checkout confetti.
- **Background Animations**: Dynamic aurora gradients, floating particles, and pulse glows implemented purely in CSS/Tailwind.

## 5. Security & Authentication
- **Protected Routes**: React components are wrapped in a `<ProtectedRoute>` component that verifies the user's role (`CUSTOMER` vs `ADMIN`). Unauthorized users are redirected to login pages.
- **Environment Variables**: Sensitive keys (like `VITE_GEMINI_API_KEY`) are kept in `.env.local`.

---
*Document Generated for StitchLink Project*
