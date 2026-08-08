import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ArrowLeft, User } from 'lucide-react';
import { ActiveTab, CategoryId } from '../types';
import { MegaMenu } from './MegaMenu';
import { JHLogo } from './JHLogo';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAccount?: () => void;
  onFilterCategory?: (categoryId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onFilterCategory,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', labelAr: 'الرئيسية', action: () => { setActiveTab('home'); } },
    { id: 'new', labelAr: 'الجديد', action: () => { setActiveTab('shop'); onFilterCategory?.('new'); } },
    {
      id: 'shop',
      labelAr: 'الملابس',
      action: () => { setActiveTab('shop'); onFilterCategory?.('all'); },
      hasMega: true,
    },
    { id: 'bestseller', labelAr: 'الأكثر مبيعاً', action: () => { setActiveTab('shop'); onFilterCategory?.('bestseller'); } },
    { id: 'offers', labelAr: 'العروض', action: () => { setActiveTab('shop'); onFilterCategory?.('offers'); } },
  ];

  const handleSelectCategoryFromMega = (catId: CategoryId) => {
    setActiveTab('shop');
    onFilterCategory?.(catId);
    setIsMegaMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 relative ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200 py-3.5 shadow-sm'
          : 'bg-white border-b border-zinc-100 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo - Typography based luxury logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-zinc-900 hover:text-black transition-colors"
              aria-label="القائمة"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <button
              onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-right focus:outline-none group py-1"
              aria-label="JH STYLE الرئيسية"
            >
              <JHLogo size={isScrolled ? 'sm' : 'md'} variant="dark" />
            </button>
          </div>

          {/* Center Navigation - Desktop with Mega Menu hover */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.id}
                onMouseEnter={() => link.hasMega && setIsMegaMenuOpen(true)}
                className="relative py-1"
              >
                <button
                  onClick={link.action}
                  className={`text-sm font-medium tracking-wide transition-all relative ${
                    activeTab === link.id || (activeTab === 'shop' && link.id === 'shop')
                      ? 'text-black font-semibold'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  {link.labelAr}
                  {(activeTab === link.id || (activeTab === 'shop' && link.id === 'shop')) && (
                    <span className="absolute bottom-0 right-0 left-0 h-[1.5px] bg-black transition-all" />
                  )}
                </button>
              </div>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={onOpenSearch}
              className="p-2 text-zinc-800 hover:text-black transition-colors rounded-full hover:bg-zinc-100"
              title="بحث"
              aria-label="بحث في المتجر"
            >
              <Search size={20} strokeWidth={1.75} />
            </button>

            <button
              onClick={onOpenAccount}
              className="p-2 text-zinc-800 hover:text-black transition-colors rounded-full hover:bg-zinc-100 hidden sm:flex"
              title="حسابي والتتبع"
              aria-label="حسابي والتتبع"
            >
              <User size={20} strokeWidth={1.75} />
            </button>

            <button
              onClick={onOpenWishlist}
              className="p-2 text-zinc-800 hover:text-black transition-colors relative rounded-full hover:bg-zinc-100 hidden sm:flex"
              title="المفضلة"
              aria-label="المفضلة"
            >
              <Heart size={20} strokeWidth={1.75} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="p-2 text-zinc-900 hover:text-black transition-colors relative rounded-full hover:bg-zinc-100 flex items-center gap-2 group"
              title="حقيبة التسوق"
              aria-label="سلة التسوق"
            >
              <div className="relative">
                <ShoppingBag size={21} strokeWidth={1.75} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-xs font-semibold text-zinc-900 group-hover:text-black tracking-wider">
                السلة
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onSelectCategory={handleSelectCategoryFromMega}
      />

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-start">
          <div className="w-4/5 max-w-sm bg-white h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
                <div>
                  <span className="font-extrabold text-xl tracking-[0.2em] text-black">JH STYLE</span>
                  <p className="text-[10px] text-zinc-500 tracking-widest mt-0.5">NIZWA, OMAN</p>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-zinc-500 hover:text-black"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      link.action();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-right text-base font-medium text-zinc-900 py-2.5 px-2 hover:bg-zinc-50 transition-colors flex items-center justify-between border-b border-zinc-50"
                  >
                    <span>{link.labelAr}</span>
                    <ArrowLeft size={16} className="text-zinc-400 rotate-180" />
                  </button>
                ))}

                <button
                  onClick={() => {
                    setActiveTab('about');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-right text-base font-medium text-zinc-700 py-2.5 px-2 hover:bg-zinc-50"
                >
                  عن البراند (JH STYLE)
                </button>

                <button
                  onClick={() => {
                    setActiveTab('contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-right text-base font-medium text-zinc-700 py-2.5 px-2 hover:bg-zinc-50"
                >
                  التواصل والموقع في نزوى
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-100 text-center">
              <p className="text-xs text-zinc-500">أناقة رجالية عصرية عُمانية</p>
              <p className="text-[11px] text-zinc-400 mt-1">نزوى، سلطنة عُمان</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
