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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-zinc-200/80 px-2 pt-2 pb-2 sm:pb-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] font-sans">
      <div className="grid grid-cols-5 items-center text-center max-w-md mx-auto">
        
        {/* Home Button */}
        <button
          onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-all relative ${
            activeTab === 'home' ? 'text-black' : 'text-zinc-500 hover:text-black'
          }`}
          aria-label="الرئيسية"
        >
          <Home size={20} strokeWidth={activeTab === 'home' ? 2.2 : 1.6} />
          <span className={`text-[10px] mt-1 tracking-tight ${activeTab === 'home' ? 'font-bold' : 'font-normal'}`}>
            الرئيسية
          </span>
          {activeTab === 'home' && (
            <span className="absolute bottom-0 w-1 h-1 bg-black rounded-full" />
          )}
        </button>

        {/* Shop/Categories Button */}
        <button
          onClick={() => { setActiveTab('shop'); }}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-all relative ${
            activeTab === 'shop' ? 'text-black' : 'text-zinc-500 hover:text-black'
          }`}
          aria-label="التصنيفات"
        >
          <Grid size={20} strokeWidth={activeTab === 'shop' ? 2.2 : 1.6} />
          <span className={`text-[10px] mt-1 tracking-tight ${activeTab === 'shop' ? 'font-bold' : 'font-normal'}`}>
            التصنيفات
          </span>
          {activeTab === 'shop' && (
            <span className="absolute bottom-0 w-1 h-1 bg-black rounded-full" />
          )}
        </button>

        {/* Search Button */}
        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-zinc-500 hover:text-black transition-all"
          aria-label="البحث"
        >
          <Search size={20} strokeWidth={1.6} />
          <span className="text-[10px] mt-1 tracking-tight font-normal">البحث</span>
        </button>

        {/* Wishlist Button */}
        <button
          onClick={onOpenWishlist}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-zinc-500 hover:text-black transition-all relative"
          aria-label="المفضلة"
        >
          <div className="relative">
            <Heart size={20} strokeWidth={1.6} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-normal">المفضلة</span>
        </button>

        {/* Cart Button */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-zinc-900 hover:text-black transition-all relative"
          aria-label="السلة"
        >
          <div className="relative">
            <ShoppingBag size={20} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-semibold">السلة</span>
        </button>

      </div>
    </nav>
  );
};
