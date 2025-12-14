import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, ArrowLeft, Check, Info } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { designs, addToCart } = useStore();
  const navigate = useNavigate();
  const [design, setDesign] = useState(designs.find(d => d.id === id));
  
  // Fabric Preview State
  const [fabricColor, setFabricColor] = useState('#FFFFFF');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setDesign(designs.find(d => d.id === id));
  }, [id, designs]);

  if (!design) return <div className="p-8 text-center text-slate-500">Design not found</div>;

  const handleAddToCart = () => {
    addToCart({
      id: `cart-${Date.now()}`,
      designId: design.id,
      design: design,
      fabricColor,
      quantity,
      priceAtPurchase: design.price
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const fabricColors = [
    { name: 'White', value: '#FFFFFF', class: 'bg-white border-slate-200' },
    { name: 'Black', value: '#1a1a1a', class: 'bg-slate-900 border-slate-900' },
    { name: 'Navy', value: '#1e3a8a', class: 'bg-blue-900 border-blue-900' },
    { name: 'Heather Grey', value: '#9ca3af', class: 'bg-slate-400 border-slate-400' },
    { name: 'Red', value: '#dc2626', class: 'bg-red-600 border-red-600' },
    { name: 'Forest Green', value: '#166534', class: 'bg-green-800 border-green-800' },
  ];

  // Base texture image (White linen/cotton)
  const fabricTextureUrl = "https://images.unsplash.com/photo-1594220364949-06385be472fa?q=80&w=2000&auto=format&fit=crop";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate('/catalog')}
        className="mb-8 flex items-center text-sm font-medium text-slate-500 hover:text-rose-500 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Catalog
      </button>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        {/* Preview Section */}
        <div className="product-image-container flex flex-col gap-6">
            <div className="relative w-full aspect-square rounded-[2rem] shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                {/* 1. Base Fabric Texture Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                        backgroundImage: `url(${fabricTextureUrl})`,
                        filter: 'contrast(1.1) brightness(1.05)'
                    }} 
                />

                {/* 2. Color Tint Layer (Multiplies color onto texture) */}
                <div 
                    className="absolute inset-0 transition-colors duration-500 ease-in-out mix-blend-multiply"
                    style={{ backgroundColor: fabricColor }}
                />

                {/* 3. The Design Layer */}
                <div className="absolute inset-0 p-16 flex items-center justify-center">
                    <img 
                        src={design.image} 
                        alt={design.title} 
                        className="max-w-full max-h-full object-contain filter drop-shadow-md transform hover:scale-105 transition-transform duration-500"
                        style={{ mixBlendMode: fabricColor === '#1a1a1a' ? 'normal' : 'multiply' }}
                    />
                </div>

                {/* Badge */}
                <div className="absolute top-6 right-6 bg-white/95 dark:bg-slate-900/90 backdrop-blur px-4 py-2 rounded-xl text-xs font-bold shadow-md text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 z-10">
                    {design.stitches.toLocaleString()} Stitches
                </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 py-3 rounded-lg border border-slate-100 dark:border-slate-800">
                <Info className="h-4 w-4" />
                Visualization mode. Shows approx. placement on {fabricColors.find(c => c.value === fabricColor)?.name} fabric.
            </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">{design.title}</h1>
            <p className="text-3xl font-bold text-rose-500 dark:text-rose-400">₹{design.price.toLocaleString('en-IN')}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-2">Description</h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">{design.description}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
            <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Choose Fabric Color</h3>
                <div className="flex items-center space-x-3">
                    {fabricColors.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => setFabricColor(color.value)}
                            className={`relative h-12 w-12 rounded-full focus:outline-none transition-transform hover:scale-110 ${
                                fabricColor === color.value ? 'ring-2 ring-rose-400 ring-offset-2 scale-110' : ''
                            }`}
                            title={color.name}
                        >
                            <span 
                                className={`absolute inset-0 rounded-full border shadow-sm ${color.value === '#FFFFFF' ? 'border-slate-200' : 'border-transparent'}`} 
                                style={{ backgroundColor: color.value }}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Quantity</h3>
                </div>
                <div className="flex items-center border-2 border-slate-200 dark:border-slate-700 rounded-xl w-40 overflow-hidden">
                    <button 
                        className="px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-lg w-1/3"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >-</button>
                    <div className="flex-1 text-center py-3 font-bold text-slate-900 dark:text-white border-x-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                        {quantity}
                    </div>
                    <button 
                        className="px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-lg w-1/3"
                        onClick={() => setQuantity(quantity + 1)}
                    >+</button>
                </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={added}
              className={`flex w-full items-center justify-center rounded-xl border border-transparent px-8 py-4 text-lg font-bold text-white transition-all transform hover:-translate-y-1 shadow-lg ${
                  added ? 'bg-green-500 hover:bg-green-600 shadow-green-500/30' : 'bg-rose-400 hover:bg-rose-500 shadow-rose-400/30'
              }`}
            >
              {added ? (
                  <>
                    <Check className="h-6 w-6 mr-2" />
                    Added to Order
                  </>
              ) : (
                  <>
                    <ShoppingBag className="h-6 w-6 mr-2" />
                    Add to Order
                  </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
