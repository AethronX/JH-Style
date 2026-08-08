import React from 'react';
import { Home, Grid, Search, Heart, ShoppingBag } from 'lucide-react';
import { ActiveTab } from '../types';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist,
}) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-zinc-200/90 px-3 pt-2.5 pb-3 shadow-[0_-6px_25px_rgba(0,0,0,0.08)] font-sans">
      <div className="grid grid-cols-5 items-center text-center max-w-md mx-auto">
        
        {/* Home Button */}
        <button
          onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center min-h-[52px] py-1 transition-all rounded-xl relative ${
            activeTab === 'home' ? 'text-black bg-zinc-100/80 font-bold' : 'text-zinc-500 hover:text-black'
          }`}
          aria-label="الرئيسية"
        >
          <Home size={23} strokeWidth={activeTab === 'home' ? 2.3 : 1.8} />
          <span className={`text-[11px] mt-1 tracking-tight ${activeTab === 'home' ? 'font-extrabold' : 'font-medium'}`}>
            الرئيسية
          </span>
          {activeTab === 'home' && (
            <span className="absolute bottom-1 w-1.5 h-1.5 bg-black rounded-full" />
          )}
        </button>

        {/* Shop/Categories Button */}
        <button
          onClick={() => { setActiveTab('shop'); }}
          className={`flex flex-col items-center justify-center min-h-[52px] py-1 transition-all rounded-xl relative ${
            activeTab === 'shop' ? 'text-black bg-zinc-100/80 font-bold' : 'text-zinc-500 hover:text-black'
          }`}
          aria-label="التصنيفات"
        >
          <Grid size={23} strokeWidth={activeTab === 'shop' ? 2.3 : 1.8} />
          <span className={`text-[11px] mt-1 tracking-tight ${activeTab === 'shop' ? 'font-extrabold' : 'font-medium'}`}>
            التصنيفات
          </span>
          {activeTab === 'shop' && (
            <span className="absolute bottom-1 w-1.5 h-1.5 bg-black rounded-full" />
          )}
        </button>

        {/* Search Button */}
        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center min-h-[52px] py-1 text-zinc-600 hover:text-black transition-all rounded-xl"
          aria-label="البحث"
        >
          <Search size={23} strokeWidth={1.8} />
          <span className="text-[11px] mt-1 tracking-tight font-medium">البحث</span>
        </button>

        {/* Wishlist Button */}
        <button
          onClick={onOpenWishlist}
          className="flex flex-col items-center justify-center min-h-[52px] py-1 text-zinc-600 hover:text-black transition-all relative rounded-xl"
          aria-label="المفضلة"
        >
          <div className="relative">
            <Heart size={23} strokeWidth={1.8} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-3 min-w-[18px] h-4.5 px-1 bg-black text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xs">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-1 tracking-tight font-medium">المفضلة</span>
        </button>

        {/* Cart Button */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center min-h-[52px] py-1 text-zinc-950 hover:text-black transition-all relative rounded-xl"
          aria-label="السلة"
        >
          <div className="relative">
            <ShoppingBag size={23} strokeWidth={2.2} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-3 min-w-[18px] h-4.5 px-1 bg-black text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xs animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-1 tracking-tight font-extrabold">السلة</span>
        </button>

      </div>
    </nav>
  );
};
