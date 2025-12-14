import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, MapPin, Clock, Phone, Star } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-200 font-sans">

      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Animated Background Elements */}
        {/* Custom Background Image with Ken Burns Effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/90 z-10"></div>
          <img src="./nathana-reboucas-iCPaPcsO-mM-unsplash.jpg" alt="Hero Background" className="w-full h-full object-cover animate-ken-burns opacity-40 ml-auto" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-rose-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Text Content */}
            <div className="text-center lg:text-left z-10 animate-fade-in">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-rose-100 dark:border-slate-700 text-rose-500 dark:text-rose-400 text-sm font-bold mb-8 shadow-sm hover:scale-105 transition-transform">
                <span className="flex h-2 w-2 rounded-full bg-rose-400 mr-2 animate-pulse"></span>
                #1 Embroidery Platform in India
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-8">
                Design. Stitch. <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-violet-400 relative inline-block">
                  Deliver.
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Manage your boutique's embroidery orders, visualize traditional designs on fabric, and delight your customers with modern efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <button
                  onClick={() => navigate('/login')}
                  className="px-10 py-4 bg-rose-400 hover:bg-rose-500 text-white rounded-full font-bold text-lg shadow-xl shadow-rose-300/40 dark:shadow-none transition-all hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  Get Started
                </button>
                <button
                  onClick={() => navigate('/catalog')}
                  className="px-10 py-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-white hover:text-rose-500 dark:hover:text-rose-400 rounded-full font-bold text-lg border border-slate-200 dark:border-slate-700 hover:border-rose-200 transition-all flex items-center justify-center group shadow-sm hover:shadow-md"
                >
                  <span className="mr-2 group-hover:bg-rose-50 dark:group-hover:bg-rose-900/20 rounded-full p-1 transition-colors"><Activity className="w-5 h-5" /></span>
                  Explore Designs
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative lg:ml-10 perspective-1000 animate-slide-in">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-white dark:bg-slate-800 border-8 border-white dark:border-slate-800 transform rotate-2 hover:rotate-0 transition-all duration-700">
                <img
                  src="/images/hero-embroidery.jpg"
                  alt="Embroidery Design"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Decor elements */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-violet-200 dark:bg-violet-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-50 animate-blob"></div>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-rose-200 dark:bg-rose-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Workflow Section */}
      <section className="py-24 bg-rose-50 dark:bg-slate-900/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10" style={{ backgroundImage: 'radial-gradient(#fb7185 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div className="relative order-2 lg:order-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl transform hover:rotate-1 transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src="/images/simple-solutions.jpg"
                  alt="Modernize Your Craft"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="font-bold text-2xl mb-1">Modernize Your Craft</p>
                  <p className="text-sm opacity-90">Digital tools for traditional art.</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6 animate-scale-up">Simple Solutions.</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-light">
                From taking measurements to delivering the final stitched Kurti, our platform handles the boring stuff so you can focus on creativity.
              </p>

              <div className="space-y-8">
                {[
                  { title: "Browse Catalog", desc: "Select from exclusive Indian designs." },
                  { title: "Customize Fabric", desc: "Visualize thread colors on Silk, Cotton, or Georgette." },
                  { title: "Track Order", desc: "Real-time updates for you and your clients." }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start group hover:translate-x-2 transition-transform duration-300 animate-fade-in" style={{ animationDelay: `${(idx + 1) * 200}ms` }}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-rose-400 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-rose-300/30 group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </div>
                    <div className="ml-6">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors">{step.title}</h4>
                      <p className="text-slate-500 dark:text-slate-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map / Location Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-rose-500 font-bold mb-3 tracking-widest uppercase text-xs animate-fade-in">Contact Us</p>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white animate-scale-up">Visit Our Studio</h2>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700 flex flex-col lg:flex-row h-[500px]">
            {/* Info Side */}
            <div className="lg:w-1/3 p-10 flex flex-col justify-center bg-white dark:bg-slate-800 relative z-10">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">StitchLink HQ</h3>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-rose-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-slate-900 dark:text-white font-bold">Address</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Plot 45, Fashion Street,<br />Mumbai, Maharashtra 400050</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5 text-rose-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-slate-900 dark:text-white font-bold">Working Hours</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Mon - Sat: 10:00 AM - 8:00 PM<br />Sun: Closed</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="w-5 h-5 text-rose-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-slate-900 dark:text-white font-bold">Contact</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">+91 98765 43210<br />namaste@stitchlink.in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Side (Google Maps Embed) */}
            <div className="lg:w-2/3 relative bg-slate-200 min-h-[400px] lg:min-h-full">
              <iframe
                title="StitchLink Location"
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?q=Fashion+Street+Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-16 animate-scale-up">Happy <span className="text-rose-500">Customers</span></h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Anjali Gupta", role: "Boutique Owner", text: "StitchLink transformed how I manage my bridal orders. No more confusion with tailors!", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
              { name: "Rajesh Kumar", role: "Fabric Wholesaler", text: "The inventory tracking is superb. I know exactly how much silk thread is left in stock.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
              { name: "Meera Reddy", role: "Home Business", text: "The design catalog with Indian patterns is exactly what I needed for my clients.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" }
            ].map((t, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 text-left hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-rose-100 dark:hover:shadow-rose-900/20 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-white dark:border-slate-600 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg">{t.name}</h4>
                    <p className="text-xs text-rose-500 font-bold uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-base italic leading-relaxed">"{t.text}"</p>
                <div className="flex text-yellow-400 gap-1 mt-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-r from-rose-400 to-violet-400 rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between text-white shadow-2xl shadow-rose-200 dark:shadow-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-300 opacity-20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

            <div className="mb-8 md:mb-0 relative z-10">
              <h2 className="text-4xl font-extrabold mb-3">Start your journey today</h2>
              <p className="text-rose-50 text-lg">Join 500+ boutiques across India.</p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="relative z-10 px-10 py-4 bg-white text-rose-500 rounded-full font-bold shadow-xl hover:bg-rose-50 transition-colors text-lg"
            >
              Sign Up Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
