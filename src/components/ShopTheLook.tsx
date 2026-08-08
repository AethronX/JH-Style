import React, { useState } from 'react';
import { ShoppingBag, Check, Plus, Sparkles } from 'lucide-react';
import { Product, ProductColor, ProductSize } from '../types';
import navyShirtImg from '../assets/images/navy_shirt_1786180482702.jpg';
import linenPantsImg from '../assets/images/linen_pants_1786180447172.jpg';

interface ShopTheLookProps {
  products: Product[];
  onAddToCart: (product: Product, color: ProductColor, size: ProductSize, quantity?: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ShopTheLook: React.FC<ShopTheLookProps> = ({
  products,
  onAddToCart,
  onSelectProduct,
}) => {
  // Find top and bottom items for the look
  const topProduct = products.find((p) => p.id === 'jh-004') || products[3] || products[0];
  const bottomProduct = products.find((p) => p.id === 'jh-001') || products[0];

  const [addedTop, setAddedTop] = useState(false);
  const [addedBottom, setAddedBottom] = useState(false);
  const [addedFullLook, setAddedFullLook] = useState(false);

  const totalPrice = (topProduct ? topProduct.price : 0) + (bottomProduct ? bottomProduct.price : 0);

  const handleAddFullOutfit = () => {
    if (topProduct) {
      onAddToCart(
        topProduct,
        topProduct.colors[0] || { nameAr: 'كحلي', nameEn: 'Navy', hex: '#1b2a47' },
        topProduct.sizes[1] || 'M',
        1
      );
    }
    if (bottomProduct) {
      onAddToCart(
        bottomProduct,
        bottomProduct.colors[0] || { nameAr: 'أوف وايت', nameEn: 'Off-White', hex: '#f0ede6' },
        bottomProduct.sizes[1] || 'M',
        1
      );
    }
    setAddedFullLook(true);
    setTimeout(() => setAddedFullLook(false), 3000);
  };

  return (
    <section className="py-20 bg-zinc-950 text-white font-sans border-y border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-zinc-800 pb-6 text-right">
          <div>
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono tracking-[0.3em] uppercase mb-2">
              <Sparkles size={14} className="text-white" />
              <span>THE CURATED OUTFIT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              تسوق الإطلالة الكاملة <span className="font-editorial text-2xl sm:text-3xl font-normal text-zinc-400 uppercase mr-2">• SHOP THE LOOK</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 md:mt-0 max-w-md">
            نسقنا لك هذه الإطلالة الكتان الكلاسيكية الراقية لطقس عُمان الدافئ، يمكنك طلب القطع منفردة أو إضافتها بالكامل بضغطة واحدة.
          </p>
        </div>

        {/* Main Grid: Left Editorial Photo with Hotspots, Right Items List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Model Image with interactive hotspots */}
          <div className="lg:col-span-6 relative aspect-[3/4] bg-zinc-900 border border-zinc-800 overflow-hidden group">
            <img
              src={navyShirtImg}
              alt="JH STYLE Full Outfit Look"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
            />
            
            {/* Interactive Hotspot 1: Top Shirt */}
            <div className="absolute top-[35%] right-[45%] z-20 group/pin">
              <button
                onClick={() => onSelectProduct(topProduct)}
                className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white text-white flex items-center justify-center animate-pulse hover:scale-110 transition-transform shadow-2xl"
                title={topProduct.titleAr}
              >
                <Plus size={16} />
              </button>
              <div className="absolute top-10 right-0 bg-black/95 text-white p-3 border border-zinc-700 text-right w-48 shadow-2xl hidden group-hover/pin:block animate-in fade-in duration-200">
                <p className="text-xs font-bold">{topProduct.titleAr}</p>
                <p className="text-xs font-mono text-zinc-300 mt-0.5">{topProduct.price.toFixed(3)} OMR</p>
              </div>
            </div>

            {/* Interactive Hotspot 2: Linen Pants */}
            <div className="absolute top-[70%] right-[50%] z-20 group/pin">
              <button
                onClick={() => onSelectProduct(bottomProduct)}
                className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white text-white flex items-center justify-center animate-pulse hover:scale-110 transition-transform shadow-2xl"
                title={bottomProduct.titleAr}
              >
                <Plus size={16} />
              </button>
              <div className="absolute top-10 right-0 bg-black/95 text-white p-3 border border-zinc-700 text-right w-48 shadow-2xl hidden group-hover/pin:block animate-in fade-in duration-200">
                <p className="text-xs font-bold">{bottomProduct.titleAr}</p>
                <p className="text-xs font-mono text-zinc-300 mt-0.5">{bottomProduct.price.toFixed(3)} OMR</p>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-zinc-800 text-[10px] text-zinc-300 font-mono">
              EDITORIAL NO. 04 • NIZWA LOOKBOOK
            </div>
          </div>

          {/* Right Column: Individual Outfit Items List & Master CTA */}
          <div className="lg:col-span-6 space-y-6 text-right">
            
            <div className="space-y-4">
              
              {/* Item 1: Top Shirt */}
              {topProduct && (
                <div className="p-4 bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-4 transition-all hover:border-zinc-700">
                  <div className="flex items-center gap-4">
                    <img
                      src={topProduct.images[0]}
                      alt={topProduct.titleAr}
                      className="w-16 h-20 object-cover bg-zinc-800 border border-zinc-700"
                    />
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                        TOP • القطعة العلوية
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{topProduct.titleAr}</h4>
                      <p className="text-xs font-mono text-zinc-300 mt-1">{topProduct.price.toFixed(3)} OMR</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(topProduct, topProduct.colors[0], topProduct.sizes[0], 1);
                      setAddedTop(true);
                      setTimeout(() => setAddedTop(false), 2000);
                    }}
                    className="px-4 py-2.5 bg-zinc-800 hover:bg-white hover:text-black text-white text-xs font-bold transition-colors flex items-center gap-2 border border-zinc-700 shrink-0"
                  >
                    {addedTop ? (
                      <>
                        <Check size={14} className="text-emerald-400" />
                        <span>تمت الإضافة</span>
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        <span>إضافة القطعة</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Item 2: Bottom Pants */}
              {bottomProduct && (
                <div className="p-4 bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-4 transition-all hover:border-zinc-700">
                  <div className="flex items-center gap-4">
                    <img
                      src={bottomProduct.images[0]}
                      alt={bottomProduct.titleAr}
                      className="w-16 h-20 object-cover bg-zinc-800 border border-zinc-700"
                    />
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                        BOTTOM • القطعة السفلية
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{bottomProduct.titleAr}</h4>
                      <p className="text-xs font-mono text-zinc-300 mt-1">{bottomProduct.price.toFixed(3)} OMR</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(bottomProduct, bottomProduct.colors[0], bottomProduct.sizes[0], 1);
                      setAddedBottom(true);
                      setTimeout(() => setAddedBottom(false), 2000);
                    }}
                    className="px-4 py-2.5 bg-zinc-800 hover:bg-white hover:text-black text-white text-xs font-bold transition-colors flex items-center gap-2 border border-zinc-700 shrink-0"
                  >
                    {addedBottom ? (
                      <>
                        <Check size={14} className="text-emerald-400" />
                        <span>تمت الإضافة</span>
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        <span>إضافة القطعة</span>
                      </>
                    )}
                  </button>
                </div>
              )}

            </div>

            {/* Master Add Full Outfit Box */}
            <div className="p-6 bg-white text-black space-y-4 shadow-2xl border border-white">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <div>
                  <h3 className="font-extrabold text-base uppercase font-serif">إجمالي الإطلالة الكاملة</h3>
                  <p className="text-xs text-zinc-600 mt-0.5">يشمل القميص + البنطال الكتان بالكامل</p>
                </div>
                <div className="text-left font-mono font-black text-xl">
                  {totalPrice.toFixed(3)} <span className="text-xs">OMR</span>
                </div>
              </div>

              <button
                onClick={handleAddFullOutfit}
                className="w-full py-4 bg-black text-white hover:bg-zinc-800 text-xs font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                {addedFullLook ? (
                  <>
                    <Check size={18} className="text-emerald-400" />
                    <span>تمت إضافة الإطلالة بالكامل للحقيبة</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>تسوق الإطلالة بالكامل الآن ({totalPrice.toFixed(3)} OMR)</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-zinc-500 text-center font-mono">
                FREE EXPRESS SHIPPING ACROSS ALL OMAN WILAYATS
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
