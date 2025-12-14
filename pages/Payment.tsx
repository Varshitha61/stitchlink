import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { CreditCard, Wallet, Truck, Lock, CheckCircle, ArrowLeft, Loader2, ShieldCheck, Calendar, User } from 'lucide-react';

export const Payment = () => {
    const { cart, placeOrder, currentUser } = useStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [method, setMethod] = useState('card');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Card State
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [cardFocused, setCardFocused] = useState(false);

    const subtotal = cart.reduce((sum, item) => sum + (item.priceAtPurchase * item.quantity), 0);
    const tax = subtotal * 0.05; // 5% GST
    const shipping = subtotal > 2000 ? 0 : 150;
    const total = subtotal + tax + shipping;

    useEffect(() => {
        if (cart.length === 0 && !paymentSuccess) {
            navigate('/cart');
        }
    }, [cart, navigate, paymentSuccess]);

    // Format Card Number
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, '');
        val = val.substring(0, 16);
        val = val.replace(/(\d{4})/g, '$1 ').trim();
        setCardNumber(val);
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length >= 2) {
            val = val.substring(0, 2) + '/' + val.substring(2, 4);
        }
        setCardExpiry(val);
    };

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate Payment Gateway Delay
        setTimeout(() => {
            placeOrder();
            setLoading(false);
            setPaymentSuccess(true);

            // Redirect to profile after showing success message
            setTimeout(() => {
                navigate('/profile');
            }, 3000);
        }, 2500);
    };

    if (cart.length === 0 && !paymentSuccess) return null;

    if (paymentSuccess) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center animate-fade-in relative overflow-hidden">
                {/* Success Confetti Animation */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: ['#f43f5e', '#8b5cf6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)],
                                left: `${Math.random() * 100}%`,
                                top: '-10%',
                                animation: `fall ${Math.random() * 3 + 2}s linear forwards`
                            }}
                        ></div>
                    ))}
                </div>

                <div className="w-28 h-28 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 animate-check-scale relative z-10">
                    <CheckCircle className="w-14 h-14 text-green-500" />
                </div>
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 animate-slide-up">Payment Successful!</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    Your order has been placed successfully. You will receive a confirmation email at <span className="font-bold text-slate-900 dark:text-white">{currentUser?.email}</span> shortly.
                </p>
                <div className="flex items-center text-sm text-slate-400 animate-pulse">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Redirecting to your orders...
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200 overflow-hidden">

            {/* --- Secure Background Animation --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Subtle Gradient Blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-rose-500/5 mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/5 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

                {/* Grid Pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
                <button
                    onClick={() => navigate('/cart')}
                    className="mb-8 flex items-center text-sm font-medium text-slate-500 hover:text-rose-500 transition-colors group"
                >
                    <div className="p-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mr-3 group-hover:border-rose-200 shadow-sm">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    Back to Cart
                </button>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Payment Details Column */}
                    <div className="animate-slide-up">
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="p-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg">
                                    <Lock className="w-5 h-5" />
                                </span>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Secure Checkout</h1>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 ml-12">Complete your purchase with bank-grade security.</p>
                        </div>

                        <form onSubmit={handlePayment} className="space-y-8">
                            {/* Payment Methods */}
                            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Select Payment Method</h3>
                                <div className="space-y-4">
                                    <label className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-300 relative overflow-hidden group ${method === 'card' ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-900/20 shadow-md ring-1 ring-rose-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-rose-300 bg-white dark:bg-slate-900'}`}>
                                        <input type="radio" name="payment" value="card" checked={method === 'card'} onChange={() => setMethod('card')} className="sr-only" />
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${method === 'card' ? 'border-rose-500 bg-rose-500' : 'border-slate-300 dark:border-slate-600'}`}>
                                            {method === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                        </div>
                                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg mr-4">
                                            <CreditCard className={`w-6 h-6 ${method === 'card' ? 'text-rose-500' : 'text-slate-500'}`} />
                                        </div>
                                        <span className="font-bold text-slate-900 dark:text-white">Credit / Debit Card</span>
                                        {method === 'card' && <div className="absolute right-0 top-0 w-20 h-20 bg-rose-500/10 rounded-bl-[100px] -mr-10 -mt-10 pointer-events-none"></div>}
                                    </label>

                                    <label className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-300 ${method === 'upi' ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-900/20 shadow-md ring-1 ring-rose-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-rose-300 bg-white dark:bg-slate-900'}`}>
                                        <input type="radio" name="payment" value="upi" checked={method === 'upi'} onChange={() => setMethod('upi')} className="sr-only" />
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${method === 'upi' ? 'border-rose-500 bg-rose-500' : 'border-slate-300 dark:border-slate-600'}`}>
                                            {method === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                        </div>
                                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg mr-4">
                                            <Wallet className={`w-6 h-6 ${method === 'upi' ? 'text-rose-500' : 'text-slate-500'}`} />
                                        </div>
                                        <span className="font-bold text-slate-900 dark:text-white">UPI / Net Banking</span>
                                    </label>

                                    <label className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-300 ${method === 'cod' ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-900/20 shadow-md ring-1 ring-rose-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-rose-300 bg-white dark:bg-slate-900'}`}>
                                        <input type="radio" name="payment" value="cod" checked={method === 'cod'} onChange={() => setMethod('cod')} className="sr-only" />
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${method === 'cod' ? 'border-rose-500 bg-rose-500' : 'border-slate-300 dark:border-slate-600'}`}>
                                            {method === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                        </div>
                                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg mr-4">
                                            <Truck className={`w-6 h-6 ${method === 'cod' ? 'text-rose-500' : 'text-slate-500'}`} />
                                        </div>
                                        <span className="font-bold text-slate-900 dark:text-white">Cash on Delivery</span>
                                    </label>
                                </div>
                            </div>

                            {/* Visual Card Component & Form */}
                            {method === 'card' && (
                                <div className="animate-fade-in-up space-y-6">
                                    {/* Visual Card */}
                                    <div className="relative h-56 w-full max-w-sm mx-auto perspective-1000 transform transition-transform hover:scale-105 duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-2xl overflow-hidden text-white p-6 flex flex-col justify-between border border-slate-700/50">
                                            {/* decorative blob */}
                                            <div className="absolute -top-24 -right-24 w-60 h-60 bg-rose-500/20 rounded-full blur-3xl"></div>
                                            <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-violet-500/20 rounded-full blur-3xl"></div>

                                            <div className="flex justify-between items-start relative z-10">
                                                <div className="w-12 h-8 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-md opacity-80" /> {/* Chip */}
                                                <div className="italic font-serif font-bold tracking-widest opacity-50">VISA</div>
                                            </div>

                                            <div className="relative z-10 space-y-6">
                                                <div className="font-mono text-2xl tracking-[0.2em] drop-shadow-md py-2">
                                                    {cardNumber || '•••• •••• •••• ••••'}
                                                </div>

                                                <div className="flex justify-between items-end font-mono">
                                                    <div>
                                                        <div className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Card Holder</div>
                                                        <div className="tracking-widest uppercase">{cardName || 'YOUR NAME'}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Expires</div>
                                                        <div className="tracking-widest">{cardExpiry || 'MM/YY'}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800">
                                        <div className="space-y-5">
                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Card Number</label>
                                                <div className="relative">
                                                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <input
                                                        type="text"
                                                        value={cardNumber}
                                                        onChange={handleCardNumberChange}
                                                        placeholder="0000 0000 0000 0000"
                                                        maxLength={19}
                                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all font-mono"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Cardholder Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <input
                                                        type="text"
                                                        value={cardName}
                                                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                                        placeholder="JOHN DOE"
                                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Expiry Date</label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                        <input
                                                            type="text"
                                                            value={cardExpiry}
                                                            onChange={handleExpiryChange}
                                                            placeholder="MM/YY"
                                                            maxLength={5}
                                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">CVV</label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                        <input
                                                            type="password"
                                                            value={cardCvv}
                                                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                                            placeholder="123"
                                                            maxLength={3}
                                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-bold py-4.5 rounded-2xl shadow-xl shadow-rose-500/20 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99] gap-3"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        <span>Processing Secure Payment...</span>
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-5 h-5" />
                                        <span>Pay ₹{total.toLocaleString('en-IN')} securely</span>
                                    </>
                                )}
                            </button>

                            <div className="flex items-center justify-center text-xs text-slate-400 font-medium">
                                <ShieldCheck className="w-4 h-4 mr-1 text-green-500" />
                                256-bit SSL Encrypted Payment
                            </div>
                        </form>
                    </div>

                    {/* Order Summary Column */}
                    <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-8 sticky top-24 border border-slate-100 dark:border-slate-800 shadow-xl">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                                Order Summary
                                <span className="ml-auto text-sm font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                    {cart.length} items
                                </span>
                            </h3>

                            <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map(item => (
                                    <div key={item.id} className="flex gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl transition-colors">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                                            <img src={item.design.image} alt={item.design.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 py-1">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">{item.design.title}</h4>
                                            <p className="text-xs text-slate-500 mb-2">Qty: {item.quantity} | {item.fabricColor}</p>
                                            <p className="text-sm font-bold text-rose-500">₹{(item.priceAtPurchase * item.quantity).toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-dashed border-slate-200 dark:border-slate-700 pt-6 space-y-3">
                                <div className="flex justify-between text-slate-600 dark:text-slate-400 text-sm">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-slate-400 text-sm">
                                    <span>Shipping</span>
                                    <span className={shipping === 0 ? "text-green-500 font-bold" : ""}>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-slate-400 text-sm">
                                    <span>GST (5%)</span>
                                    <span>₹{tax.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-slate-900 dark:text-white font-bold text-xl pt-4 border-t border-slate-200 dark:border-slate-700 mt-2">
                                    <span>Total to Pay</span>
                                    <span>₹{total.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
