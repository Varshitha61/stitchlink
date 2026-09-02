/**
 * StitchLink Project Details — PDF Generator
 * Uses pdfkit (pure JS, no Chrome needed)
 */
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({ margin: 50, size: 'A4' });
const outputPath = path.join(__dirname, 'StitchLink_Project_Details.pdf');
doc.pipe(fs.createWriteStream(outputPath));

// ─── Color palette ────────────────────────────────────────────────
const ROSE   = '#e11d48';
const VIOLET = '#7c3aed';
const SLATE  = '#1e293b';
const GRAY   = '#475569';
const LIGHT  = '#f1f5f9';

// ─── Helpers ──────────────────────────────────────────────────────
function heading1(text) {
  doc.moveDown(0.5)
     .fontSize(22).fillColor(ROSE).font('Helvetica-Bold')
     .text(text)
     .moveDown(0.3);
  // Underline
  doc.moveTo(50, doc.y).lineTo(545, doc.y).lineWidth(1.5).strokeColor(ROSE).stroke();
  doc.moveDown(0.5);
}

function heading2(text) {
  doc.moveDown(0.5)
     .fontSize(14).fillColor(VIOLET).font('Helvetica-Bold')
     .text(text)
     .moveDown(0.3);
}

function heading3(text) {
  doc.moveDown(0.3)
     .fontSize(12).fillColor(SLATE).font('Helvetica-Bold')
     .text(text)
     .moveDown(0.2);
}

function body(text) {
  doc.fontSize(10).fillColor(GRAY).font('Helvetica')
     .text(text, { lineGap: 3 })
     .moveDown(0.2);
}

function bullet(text) {
  doc.fontSize(10).fillColor(GRAY).font('Helvetica')
     .text('  •  ' + text, { lineGap: 3 });
}

function separator() {
  doc.moveDown(0.5)
     .moveTo(50, doc.y).lineTo(545, doc.y).lineWidth(0.5).strokeColor('#cbd5e1').stroke()
     .moveDown(0.5);
}

function badge(text, x, y, color) {
  const padding = 6;
  doc.roundedRect(x, y - 2, doc.widthOfString(text) + padding * 2, 16, 4)
     .fillColor(color || ROSE).fill();
  doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(8)
     .text(text, x + padding, y + 1);
}

// ─── COVER PAGE ───────────────────────────────────────────────────
// Background rect
doc.rect(0, 0, doc.page.width, doc.page.height).fillColor('#0f172a').fill();

// Decorative circles
doc.circle(500, 100, 200).fillColor('#be123c').fillOpacity(0.15).fill().fillOpacity(1);
doc.circle(100, 650, 180).fillColor('#6d28d9').fillOpacity(0.12).fill().fillOpacity(1);

// Logo / Icon area
doc.roundedRect(220, 140, 160, 160, 30).fillColor('#be123c').fillOpacity(0.9).fill().fillOpacity(1);
doc.fontSize(72).fillColor('#ffffff').font('Helvetica-Bold').text('✦', 220, 190, { width: 160, align: 'center' });

// Title
doc.moveDown(0).fontSize(36).fillColor('#ffffff').font('Helvetica-Bold')
   .text('StitchLink', 50, 330, { align: 'center' });
doc.fontSize(16).fillColor('#fda4af').font('Helvetica')
   .text('Premium Embroidery Management System', 50, 380, { align: 'center' });

// Tagline
doc.fontSize(11).fillColor('#94a3b8')
   .text('Full Project Documentation  ·  Technical Deep Dive  ·  2026', 50, 420, { align: 'center' });

// Divider
doc.moveTo(150, 460).lineTo(445, 460).lineWidth(1).strokeColor('#e11d48').strokeOpacity(0.6).stroke().strokeOpacity(1);

// Stack badges row
const stackItems = ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Gemini AI', 'Recharts'];
let bx = 95;
stackItems.forEach(item => {
  doc.roundedRect(bx, 480, doc.widthOfString(item, { fontSize: 9 }) + 14, 18, 4)
     .fillColor('#1e3a8a').fill();
  doc.fontSize(9).fillColor('#93c5fd').font('Helvetica-Bold').text(item, bx + 7, 484);
  bx += doc.widthOfString(item, { fontSize: 9 }) + 22;
});

doc.fontSize(9).fillColor('#64748b').text('Generated: ' + new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), 50, 750, { align: 'center' });

// ─── PAGE 2: OVERVIEW ─────────────────────────────────────────────
doc.addPage();

heading1('1. Project Overview');
body(
  'StitchLink is a modern, full-stack Single Page Application (SPA) designed to bridge the gap between ' +
  'traditional embroidery craftsmanship and digital convenience. It provides a seamless experience for customers ' +
  'to browse visual catalogs, upload and preview embroidery machine code (DST files), and order custom designs. ' +
  'It also offers a powerful, animated admin portal for comprehensive business management.'
);

heading2('What Problem Does It Solve?');
body(
  'Boutique embroidery businesses in India struggle with order tracking, design approvals, and inventory ' +
  'management. StitchLink digitizes these workflows — from browsing designs and placing orders to real-time ' +
  'admin analytics and embroidery file parsing.'
);

separator();

heading1('2. Technology Stack');

const techStack = [
  ['Frontend Framework', 'React 18 with TypeScript — component-based UI with static type safety.'],
  ['Build Tool', 'Vite — extremely fast development server with Hot Module Replacement (HMR). Much faster than Create React App.'],
  ['Styling', 'Tailwind CSS v4 with custom animations (animate-gradient-wave, animate-float-up, animate-grid-pulse, animate-ken-burns) and glassmorphism effects.'],
  ['Icons', 'Lucide React — consistent, scalable SVG icons throughout the app.'],
  ['State Management', 'React Context API (StoreContext + ThemeContext) — global state without Redux.'],
  ['Routing', 'react-router-dom v7 — HashRouter for client-side routing with protected route guards.'],
  ['AI Integration', 'Google Gemini API (@google/genai) — natural language design search assistant.'],
  ['Data Visualization', 'Recharts — Bar charts and Donut/Pie charts for the admin dashboard.'],
  ['Deployment Config', 'vercel.json — configured for Vercel deployment.'],
];

techStack.forEach(([tech, desc]) => {
  doc.moveDown(0.2)
     .fontSize(11).fillColor(SLATE).font('Helvetica-Bold').text(tech + ':  ', { continued: true })
     .fontSize(10).fillColor(GRAY).font('Helvetica').text(desc, { lineGap: 2 });
});

// ─── PAGE 3: WORKFLOWS ────────────────────────────────────────────
doc.addPage();
heading1('3. Application Workflows');

heading2('3.1 Customer Journey');
const customerSteps = [
  ['Home Page', 'Visitor lands on the marketing page. Sees hero, services, testimonials, and Google Maps embed.'],
  ['Login / Signup', 'Clicks "Get Started". Auth form toggles between Login & Signup mode. Role is assigned based on email.'],
  ['Catalog Page', 'Browses designs in a responsive grid. Uses the search bar (real-time filter) or category pills. Can open the AI Design Assistant modal.'],
  ['AI Search', 'Types a natural language query → Gemini API processes it with the full catalog → Returns matching design IDs → Displayed as clickable results.'],
  ['Product Detail', 'Views an embroidery design with a live fabric color preview (CSS mix-blend-multiply). Selects quantity, adds to cart.'],
  ['Cart Page', 'Reviews all cart items, sees total. Removes items if needed. Proceeds to Payment.'],
  ['Payment Page', 'Chooses Card/UPI/COD. Fills card form with live 3D card preview. Submits → 2.5s simulated gateway → confetti success animation → redirected to Profile.'],
  ['Profile Page', 'Views order history filtered by their user ID. Sees order status badges.'],
  ['Reviews Page', 'Reads community reviews. Submits their own via a modal form with interactive star rating.'],
  ['DST Uploader', 'Uploads a Tajima DST binary file → in-browser parser → HTML Canvas stitch preview.'],
];

customerSteps.forEach(([step, desc], i) => {
  doc.moveDown(0.3)
     .fontSize(10).fillColor(ROSE).font('Helvetica-Bold').text(`Step ${i+1}: ${step}`, { continued: false })
     .fontSize(10).fillColor(GRAY).font('Helvetica').text(desc, { lineGap: 2 });
});

separator();

heading2('3.2 Admin Journey');
const adminSteps = [
  ['Admin Login', 'Navigates to /admin/login. Logs in with email containing "admin" or the owner email.'],
  ['Admin Dashboard', 'Sees 4 KPI cards (Revenue, Orders, Avg Value, Pending). Views Weekly Revenue Bar Chart. Views Order Status Donut Chart. Sees last 5 orders.'],
  ['Admin Orders', 'Full order list. Can update status: PENDING → PROCESSING → SHIPPED → DELIVERED.'],
  ['Admin Inventory', 'Manages design catalog. Can edit prices, add new designs via form.'],
];
adminSteps.forEach(([step, desc], i) => {
  doc.moveDown(0.3)
     .fontSize(10).fillColor(VIOLET).font('Helvetica-Bold').text(`Step ${i+1}: ${step}`, { continued: false })
     .fontSize(10).fillColor(GRAY).font('Helvetica').text(desc, { lineGap: 2 });
});

// ─── PAGE 4: DST PARSER ───────────────────────────────────────────
doc.addPage();
heading1('4. DST File Uploader — Technical Deep Dive');

body(
  'This is the most technically advanced feature in StitchLink. It implements a complete binary file parser ' +
  'for the Tajima DST embroidery machine format, entirely in the browser using the Web FileReader API — ' +
  'with no external parsing library.'
);

heading2('What is a DST File?');
bullet('DST = Data Stitch Tajima — the industry-standard machine code for embroidery machines.');
bullet('Binary format: NOT human-readable. Each instruction is encoded in 3 bytes.');
bullet('First 512 bytes = ASCII header (metadata like design name).');
bullet('From byte 512 onwards = stitch data records (3 bytes each).');
doc.moveDown(0.3);

heading2('Parsing Logic — Step by Step');

heading3('Step 1: Header Parsing (Bytes 0–511)');
body('TextDecoder reads the first 512 bytes as ASCII. The label is extracted by looking for the "LA:" tag using a regex: /LA:(.+?)[\\r\\n\\x00]/');

heading3('Step 2: 3-Byte Stitch Record Decoding');
body('For each 3-byte group from offset 512:');
bullet('Bytes are labeled b0, b1, b2.');
bullet('X movement = getX(b2, b1, b0) — uses bitwise AND (&) and bit-shift (<<) to decode packed values.');
bullet('Y movement = getY(b2, b1, b0) — same technique for Y axis.');
bullet('Flag check: (b2 & 0xC0) === 0xC0 → COLOR_CHANGE (new thread)');
bullet('Flag check: (b2 & 0x0C) === 0x0C → JUMP (needle lifts, moves without stitching)');
bullet('Neither flag → STITCH (normal needle stitch, draws a line)');
bullet('End marker: (b2 & 0b11110011) === 0b11110011 → END of pattern');

heading3('Step 3: Dimension Calculation');
body('Tracks minX, maxX, minY, maxY across all STITCH records. DST uses 0.1mm units, so: widthMm = (maxX - minX) / 10');

heading3('Step 4: HTML Canvas Rendering');
bullet('All stitch coordinates are scaled to fit the 600×500 canvas.');
bullet('Y-axis is flipped (DST Y-axis is inverted relative to Canvas Y-axis).');
bullet('STITCH records draw lines using ctx.beginPath(), ctx.moveTo(), ctx.lineTo(), ctx.stroke().');
bullet('COLOR_CHANGE records switch the current stroke color from a thread palette array.');
bullet('JUMP records move the "pen" position without drawing.');

separator();

heading1('5. State Management — StoreContext');
body(
  'There is no Redux. All global state lives in a single React Context (StoreContext.tsx). ' +
  'It wraps the entire app and exposes state + action functions to every page via the useStore() hook.'
);

heading2('State Variables');
const stateVars = [
  ['designs', 'Design[]', 'All embroidery designs. Loaded from mockData.ts on app start.'],
  ['orders', 'Order[]', 'All orders placed in the current session (in memory).'],
  ['currentUser', 'User | null', 'The logged-in user object (name, email, role: CUSTOMER|ADMIN).'],
  ['cart', 'CartItem[]', 'Items currently in the shopping cart.'],
  ['reviews', 'Review[]', 'All design reviews. Pre-populated from mockData.ts.'],
  ['notifications', 'Notification[]', 'Admin notifications triggered when a new order is placed.'],
];
stateVars.forEach(([name, type, desc]) => {
  doc.moveDown(0.2)
     .fontSize(10).fillColor(VIOLET).font('Helvetica-Bold').text(name + ' ', { continued: true })
     .fillColor('#94a3b8').font('Helvetica').text('(' + type + ')  ', { continued: true })
     .fillColor(GRAY).text('— ' + desc, { lineGap: 2 });
});

heading2('Key Action Functions');
const actions = [
  'login(email, password) — Mock auth. Sets currentUser in state. Role determined by email string.',
  'signup(name, email, password) — Creates a new CUSTOMER user in memory.',
  'logout() — Clears currentUser, cart, and notifications.',
  'addToCart(item) / removeFromCart(id) / clearCart() — Cart management.',
  'placeOrder() — Converts cart into an Order object, saves it to state, creates a Notification.',
  'updateOrderStatus(orderId, status) — Admin updates an order\'s lifecycle status.',
  'addDesign(design) — Admin adds a new design to the catalog.',
  'addReview(review) — Customer submits a review, instantly appears in the list.',
];
actions.forEach(a => bullet(a));

// ─── PAGE 5: SECURITY & UI ────────────────────────────────────────
doc.addPage();
heading1('6. Security & Authentication');

body(
  'Note: The current implementation uses mock authentication (no real backend/database). ' +
  'The architecture is designed to easily swap mock functions with real API calls (Supabase, Firebase, or custom Node.js backend).'
);

heading2('Role-Based Route Protection');
body(
  'Every customer and admin page is wrapped in a <ProtectedRoute> component in App.tsx. ' +
  'This component reads currentUser from StoreContext and applies two checks:'
);
bullet('If currentUser is null → redirect to /login.');
bullet('If currentUser.role does not match the page\'s allowedRole → redirect to /.');
body('This means customers cannot access /admin pages, and admins cannot browse the customer /catalog.');

heading2('Environment Variables');
bullet('VITE_GEMINI_API_KEY is stored in .env.local (not committed to Git via .gitignore).');
bullet('Accessed in code as import.meta.env.VITE_GEMINI_API_KEY (Vite\'s env variable system).');

separator();

heading1('7. UI Design System & Animations');
heading2('Core Design Principles');
bullet('Glassmorphism: backdrop-blur-xl + bg-white/80 = frosted glass card effect throughout the app.');
bullet('Dark/Light Mode: Full support via ThemeContext. Users can toggle; system preference is respected.');
bullet('Responsive: Tailwind\'s responsive prefixes (sm:, md:, lg:, xl:) ensure mobile-first layouts.');

heading2('Signature Animations');
const animations = [
  ['animate-ken-burns', 'Home page hero background — slow pan & zoom on the embroidery photo.'],
  ['animate-blob', 'Blurred colored circles that float and morph on the home page background.'],
  ['animate-gradient-wave', 'Shifting 4-color gradient background across protected pages.'],
  ['animate-float-up', 'Tiny particle dots that float upward on catalog, profile, and DST pages.'],
  ['animate-grid-pulse', 'Subtle geometric grid that pulses — visible in dark mode on catalog/admin.'],
  ['animate-thread-dash', 'SVG thread paths with animated stroke-dasharray on the About page.'],
  ['animate-thread-float', 'SVG threads that slowly drift horizontally on the About page.'],
  ['fall (keyframe)', 'Confetti particles falling after successful payment.'],
];
animations.forEach(([name, desc]) => {
  doc.moveDown(0.2)
     .fontSize(10).fillColor('#0ea5e9').font('Helvetica-Bold').text(name + ':  ', { continued: true })
     .fillColor(GRAY).font('Helvetica').text(desc, { lineGap: 2 });
});

separator();

heading1('8. Project Structure');
const structure = [
  '/pages/          — 14 page components (Home, Catalog, Payment, DSTUpload, AdminDashboard, etc.)',
  '/components/     — Shared components like Navbar',
  '/context/        — StoreContext.tsx (global state) + ThemeContext.tsx (dark mode)',
  '/data/           — mockData.ts (sample designs + reviews)',
  '/services/       — geminiService.ts (Gemini AI API calls)',
  '/lib/            — Utility functions',
  '/public/         — Static assets (images)',
  'App.tsx          — Root: Router, ThemeProvider, StoreProvider, all Routes, Footer',
  'types.ts         — TypeScript interfaces (Design, Order, User, CartItem, Review)',
  'vite.config.ts   — Vite build configuration',
  'vercel.json      — Deployment config for Vercel',
  '.env.local       — Secret API keys (not in Git)',
];
structure.forEach(s => bullet(s));

// ─── FINAL PAGE ───────────────────────────────────────────────────
doc.addPage();

// Decorative footer page
doc.rect(0, 0, doc.page.width, doc.page.height).fillColor('#0f172a').fill();
doc.circle(550, 400, 220).fillColor('#7c3aed').fillOpacity(0.1).fill().fillOpacity(1);
doc.circle(50, 200, 180).fillColor('#e11d48').fillOpacity(0.1).fill().fillOpacity(1);

doc.fontSize(28).fillColor('#ffffff').font('Helvetica-Bold')
   .text('StitchLink', 50, 200, { align: 'center' });
doc.fontSize(14).fillColor('#fda4af').font('Helvetica')
   .text('Bridging traditional craftsmanship with digital innovation.', 50, 245, { align: 'center' });

doc.moveTo(150, 290).lineTo(445, 290).lineWidth(1).strokeColor('#e11d48').strokeOpacity(0.5).stroke().strokeOpacity(1);

doc.fontSize(11).fillColor('#94a3b8')
   .text('Built with  React · TypeScript · Vite · Tailwind CSS · Google Gemini AI', 50, 310, { align: 'center' });

doc.fontSize(10).fillColor('#64748b')
   .text('© 2026 StitchLink  ·  All rights reserved', 50, 700, { align: 'center' });

// ─── Finalize ─────────────────────────────────────────────────────
doc.end();
console.log('✅ PDF generated successfully!');
console.log('📄 Saved to: ' + outputPath);
