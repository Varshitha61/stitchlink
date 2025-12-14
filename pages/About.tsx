import React from 'react';

export const About = () => {
    return (
        <div className="bg-white dark:bg-slate-950 transition-colors duration-200 relative overflow-hidden">

            {/* Flying Thread Animation Layer */}
            <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Thread 1 - Rose */}
                    <path
                        d="M -100 200 Q 200 100, 500 300 T 1200 400"
                        stroke="#fb7185"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="20 10"
                        className="animate-thread-dash"
                        style={{ animationDelay: '0s' }}
                    />
                    <path
                        d="M -100 200 Q 200 100, 500 300 T 1200 400"
                        stroke="#fb7185"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="20 10"
                        className="animate-thread-float"
                        opacity="0.6"
                    />

                    {/* Thread 2 - Violet */}
                    <path
                        d="M 1500 100 Q 1000 250, 600 150 T -200 300"
                        stroke="#c084fc"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="15 8"
                        className="animate-thread-dash"
                        style={{ animationDelay: '1s', animationDuration: '4s' }}
                    />
                    <path
                        d="M 1500 100 Q 1000 250, 600 150 T -200 300"
                        stroke="#c084fc"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="15 8"
                        className="animate-thread-float"
                        style={{ animationDuration: '25s' }}
                        opacity="0.5"
                    />

                    {/* Thread 3 - Teal */}
                    <path
                        d="M -150 500 Q 300 400, 700 600 T 1400 500"
                        stroke="#5eead4"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="25 12"
                        className="animate-thread-dash"
                        style={{ animationDelay: '2s', animationDuration: '3.5s' }}
                    />
                    <path
                        d="M -150 500 Q 300 400, 700 600 T 1400 500"
                        stroke="#5eead4"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="25 12"
                        className="animate-thread-float"
                        style={{ animationDuration: '22s', animationDelay: '3s' }}
                        opacity="0.7"
                    />

                    {/* Thread 4 - Orange */}
                    <path
                        d="M 1600 600 Q 1100 500, 500 700 T -100 650"
                        stroke="#fb923c"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="18 9"
                        className="animate-thread-dash"
                        style={{ animationDelay: '1.5s', animationDuration: '3.8s' }}
                    />
                    <path
                        d="M 1600 600 Q 1100 500, 500 700 T -100 650"
                        stroke="#fb923c"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="18 9"
                        className="animate-thread-float"
                        style={{ animationDuration: '18s', animationDelay: '1s' }}
                        opacity="0.6"
                    />

                    {/* Thread 5 - Rose (diagonal) */}
                    <path
                        d="M -100 800 Q 400 650, 800 850 T 1500 900"
                        stroke="#fda4af"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="22 11"
                        className="animate-thread-dash"
                        style={{ animationDelay: '0.5s', animationDuration: '4.2s' }}
                    />
                    <path
                        d="M -100 800 Q 400 650, 800 850 T 1500 900"
                        stroke="#fda4af"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="22 11"
                        className="animate-thread-float"
                        style={{ animationDuration: '24s', animationDelay: '2s' }}
                        opacity="0.5"
                    />
                </svg>
            </div>

            {/* Hero */}
            <div className="relative py-24 bg-rose-50 dark:bg-slate-900 overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-violet-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight">
                        Honoring Tradition,<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-violet-400">Empowering Artisans</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
                        StitchLink bridges the gap between the rich heritage of Indian embroidery and modern digital efficiency. From the intricate Zardosi of the North to the vibrant Kanjeevaram weaves of the South, we help you manage it all.
                    </p>
                </div>
            </div>

            {/* Story Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-rose-200 rounded-[2.5rem] rotate-3 group-hover:rotate-1 transition-transform duration-500"></div>
                            <img
                                src="/images/artisan.jpg"
                                alt="Indian Embroidery Artisan"
                                className="relative rounded-[2.5rem] shadow-2xl w-full h-auto object-cover border-4 border-white dark:border-slate-800"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Our Journey</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">
                                StitchLink was founded in 2023 with a vision to organize the unorganized sector of boutique embroidery. We observed that talented Karigars (artisans) and boutique owners struggled with order tracking, design approvals, and inventory management.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg">
                                We built a platform that speaks the language of design. Whether it's tracking a bridal Lehenga order or managing bulk Kurtis, StitchLink provides clarity and control, allowing you to focus on the art while we handle the data.
                            </p>
                            <div className="grid grid-cols-2 gap-8 border-t border-slate-100 dark:border-slate-800 pt-8">
                                <div>
                                    <p className="text-4xl font-extrabold text-rose-400 mb-2">500+</p>
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">Boutiques Partnered</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-extrabold text-violet-400 mb-2">10k+</p>
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">Designs Digitized</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm">
                            <h3 className="font-bold text-xl mb-4 text-rose-500">Heritage</h3>
                            <p className="text-slate-600 dark:text-slate-400">Preserving traditional techniques like Aari, Chikankari, and Phulkari.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm">
                            <h3 className="font-bold text-xl mb-4 text-violet-500">Innovation</h3>
                            <p className="text-slate-600 dark:text-slate-400">Bringing AI and digital tracking to centuries-old crafts.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm">
                            <h3 className="font-bold text-xl mb-4 text-teal-500">Empowerment</h3>
                            <p className="text-slate-600 dark:text-slate-400">Helping small business owners scale without chaos.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
