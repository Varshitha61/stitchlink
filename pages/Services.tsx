import React from 'react';
import { PenTool, Layers, LayoutTemplate, Truck, Zap, ShieldCheck } from 'lucide-react';

export const Services = () => {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-200 py-20 relative overflow-hidden">
      {/* Animated Background Layers */}

      {/* Layer 1: Animated Gradient Waves */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20 animate-gradient-wave"
        style={{
          background: 'linear-gradient(135deg, #fda4af 0%, #c084fc 25%, #5eead4 50%, #fb923c 75%, #fda4af 100%)',
          backgroundSize: '400% 400%',
        }}
      ></div>

      {/* Layer 2: Geometric Grid Pattern */}
      <div className="absolute inset-0 opacity-0 dark:opacity-10 animate-grid-pulse pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(rgba(251, 113, 133, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 113, 133, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Layer 3: Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-rose-400/40 to-violet-400/40 dark:from-rose-400/20 dark:to-violet-400/20 animate-float-up"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              bottom: '-20px',
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 4 + 6}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Layer 4: Radial Glow Pulses */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-radial from-violet-400/30 to-transparent dark:from-violet-400/10 animate-pulse-glow blur-3xl"
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-radial from-rose-400/30 to-transparent dark:from-rose-400/10 animate-pulse-glow blur-3xl"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-gradient-radial from-teal-400/30 to-transparent dark:from-teal-400/10 animate-pulse-glow blur-3xl"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <p className="text-rose-500 font-bold mb-4 tracking-widest uppercase text-xs bg-rose-50 dark:bg-rose-900/20 inline-block px-3 py-1 rounded-full">Our Expertise</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">Tailored for Your Boutique</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light">
            We provide specialized services to help you manage intricate custom orders, bulk production, and client communications seamlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="relative overflow-hidden group p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 animate-fade-in">
            {/* Digitizing Background: Digital Grid */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
              <PenTool className="w-8 h-8 text-rose-500 dark:text-rose-400 group-hover:animate-draw-stroke" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Custom Pattern Digitizing</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              We convert hand-drawn sketches into precise machine files (DST, PES). Perfect for creating custom logos, bridal blouse patterns, and intricate sherwani motifs.
            </p>
          </div>

          {/* Service 2 */}
          <div className="relative overflow-hidden group p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 animate-fade-in">
            {/* Order Management Background: Vertical Lines */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[linear-gradient(to_right,#8b5cf620_1px,transparent_1px)] bg-[size:40px_100%]"></div>
            <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
              <Layers className="w-8 h-8 text-violet-500 dark:text-violet-400 group-hover:animate-stack-slide" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Order Management</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Keep track of every stage: 'Fabric Received', 'Cutting', 'Embroidery', 'Stitching', and 'Finishing'. No more lost orders or missed deadlines.
            </p>
          </div>

          {/* Service 3 */}
          <div className="relative overflow-hidden group p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 animate-fade-in">
            {/* Design Library Background: Rotating Pattern */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 overflow-hidden">
              <div className="absolute inset-[-50%] bg-[radial-gradient(circle,#14b8a620_2px,transparent_2px)] bg-[size:20px_20px] animate-spin-slow"></div>
            </div>
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
              <LayoutTemplate className="w-8 h-8 text-teal-500 dark:text-teal-400 group-hover:animate-grid-reveal" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Design Library</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Access our curated library of Indian traditional designs including Paisley, Peacock, Lotus, and Mandala patterns ready for your machines.
            </p>
          </div>

          {/* Service 4 */}
          <div className="relative overflow-hidden group p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 animate-fade-in">
            {/* Pickup Background: Moving Stripes */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[linear-gradient(45deg,#f9731620_25%,transparent_25%,transparent_50%,#f9731620_50%,#f9731620_75%,transparent_75%,transparent)] bg-[size:40px_40px] animate-pan-diagonal"></div>
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
              <Truck className="w-8 h-8 text-orange-500 dark:text-orange-400 group-hover:animate-drive-right" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Fabric Pickup & Delivery</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              We partner with local courier services to handle fabric pickup from clients and safe delivery of the finished embroidered garments.
            </p>
          </div>

          {/* Service 5 */}
          <div className="relative overflow-hidden group p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 animate-fade-in">
            {/* Urgent Orders Background: Pulsing Burst */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,#3b82f630_0%,transparent_70%)] animate-pulse"></div>
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
              <Zap className="w-8 h-8 text-blue-500 dark:text-blue-400 group-hover:animate-flash-pulse" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Urgent Wedding Orders</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Specialized workflow for bridal season. Prioritize heavy Lehengas and Sherwanis to ensure on-time delivery for the big day.
            </p>
          </div>

          {/* Service 6 */}
          <div className="relative overflow-hidden group p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 animate-fade-in">
            {/* Quality Check Background: Scanning Line */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-pink-500/50 to-transparent blur-sm animate-scan-down"></div>
            </div>
            <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
              <ShieldCheck className="w-8 h-8 text-pink-500 dark:text-pink-400 group-hover:animate-check-scale" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Quality Check</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Every thread count matters. We perform 3-stage quality checks: Fabric Inspection, Embroidery Finishing, and Final Steam Pressing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
