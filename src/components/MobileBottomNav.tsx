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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 px-3 py-2 shadow-lg">
      <div className="grid grid-cols-5 items-center text-center">
        
        <button
          onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'home' ? 'text-black font-semibold' : 'text-zinc-500 hover:text-black'
          }`}
        >
          <Home size={19} strokeWidth={activeTab === 'home' ? 2.2 : 1.75} />
          <span className="text-[10px] mt-1 tracking-tight">الرئيسية</span>
        </button>

        <button
          onClick={() => { setActiveTab('shop'); }}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'shop' ? 'text-black font-semibold' : 'text-zinc-500 hover:text-black'
          }`}
        >
          <Grid size={19} strokeWidth={activeTab === 'shop' ? 2.2 : 1.75} />
          <span className="text-[10px] mt-1 tracking-tight">التصنيفات</span>
        </button>

        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center py-1 text-zinc-500 hover:text-black transition-colors"
        >
          <Search size={19} strokeWidth={1.75} />
          <span className="text-[10px] mt-1 tracking-tight">البحث</span>
        </button>

        <button
          onClick={onOpenWishlist}
          className="flex flex-col items-center justify-center py-1 text-zinc-500 hover:text-black transition-colors relative"
        >
          <div className="relative">
            <Heart size={19} strokeWidth={1.75} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">المفضلة</span>
        </button>

        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center py-1 text-zinc-900 hover:text-black transition-colors relative"
        >
          <div className="relative">
            <ShoppingBag size={19} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-medium">السلة</span>
        </button>

      </div>
    </div>
  );
};
