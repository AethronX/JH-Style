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
          ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200 py-3 sm:py-4 shadow-sm'
          : 'bg-white border-b border-zinc-100 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-900 hover:text-black hover:bg-zinc-100 rounded-full transition-colors"
              aria-label="القائمة"
            >
              {isMobileMenuOpen ? <X size={26} strokeWidth={2} /> : <Menu size={26} strokeWidth={2} />}
            </button>

            <button
              onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-right focus:outline-none group py-1 shrink-0"
              aria-label="JH STYLE الرئيسية"
            >
              <JHLogo size={isScrolled ? 'sm' : 'md'} variant="dark" />
            </button>
          </div>

          {/* Center Navigation - Desktop with Mega Menu hover */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <div
                key={link.id}
                onMouseEnter={() => link.hasMega && setIsMegaMenuOpen(true)}
                className="relative py-2"
              >
                <button
                  onClick={link.action}
                  className={`text-base sm:text-lg tracking-wide transition-all relative py-1 px-1 ${
                    activeTab === link.id || (activeTab === 'shop' && link.id === 'shop')
                      ? 'text-black font-extrabold'
                      : 'text-zinc-700 hover:text-black font-semibold'
                  }`}
                >
                  {link.labelAr}
                  {(activeTab === link.id || (activeTab === 'shop' && link.id === 'shop')) && (
                    <span className="absolute bottom-0 right-0 left-0 h-[2.5px] bg-black rounded-full transition-all" />
                  )}
                </button>
              </div>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-zinc-800 hover:text-black transition-colors rounded-full hover:bg-zinc-100 flex items-center justify-center"
              title="بحث"
              aria-label="بحث في المتجر"
            >
              <Search size={22} strokeWidth={2} />
            </button>

            <button
              onClick={onOpenAccount}
              className="p-2.5 text-zinc-800 hover:text-black transition-colors rounded-full hover:bg-zinc-100 hidden sm:flex items-center justify-center"
              title="حسابي والتتبع"
              aria-label="حسابي والتتبع"
            >
              <User size={22} strokeWidth={2} />
            </button>

            <button
              onClick={onOpenWishlist}
              className="p-2.5 text-zinc-800 hover:text-black transition-colors relative rounded-full hover:bg-zinc-100 hidden sm:flex items-center justify-center"
              title="المفضلة"
              aria-label="المفضلة"
            >
              <Heart size={22} strokeWidth={2} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-4 px-1 bg-black text-white text-[10px] font-extrabold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="p-2 sm:p-2.5 text-zinc-900 hover:text-black transition-colors relative rounded-full hover:bg-zinc-100 flex items-center gap-2 group"
              title="حقيبة التسوق"
              aria-label="سلة التسوق"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingBag size={24} strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 min-w-[18px] h-4 px-1 bg-black text-white text-[10px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-sm font-bold text-zinc-900 group-hover:text-black tracking-wider pr-1">
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
          <div className="w-4/5 max-w-xs sm:max-w-sm bg-white h-full p-5 sm:p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="overflow-y-auto">
              {/* Drawer Header with Official Logo */}
              <div className="flex items-center justify-between pb-5 border-b border-zinc-200">
                <JHLogo size="sm" variant="dark" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-zinc-500 hover:text-black rounded-full hover:bg-zinc-100 transition-colors"
                  aria-label="إغلاق القائمة"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Menu Items */}
              <div className="py-5 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 block px-2 mb-2">
                  القائمة الرئيسية
                </span>

                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      link.action();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-right text-sm font-semibold text-zinc-900 py-3 px-3 rounded-lg hover:bg-zinc-100 transition-colors flex items-center justify-between"
                  >
                    <span>{link.labelAr}</span>
                    <ArrowLeft size={16} className="text-zinc-400" />
                  </button>
                ))}

                <button
                  onClick={() => {
                    onOpenAccount();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-right text-sm font-semibold text-zinc-900 py-3 px-3 rounded-lg hover:bg-zinc-100 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-zinc-600" />
                    <span>حسابي وتتبع الطلبات</span>
                  </div>
                  <ArrowLeft size={16} className="text-zinc-400" />
                </button>

                <div className="pt-4 border-t border-zinc-100 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 block px-2 mb-2">
                    معلومات البراند
                  </span>
                  <button
                    onClick={() => {
                      setActiveTab('about');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-right text-xs font-medium text-zinc-700 py-2.5 px-3 rounded-lg hover:bg-zinc-100 block"
                  >
                    قصة البراند (JH STYLE)
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('contact');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-right text-xs font-medium text-zinc-700 py-2.5 px-3 rounded-lg hover:bg-zinc-100 block"
                  >
                    الفروع والموقع في نزوى
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Footer with direct WhatsApp help */}
            <div className="pt-4 border-t border-zinc-200">
              <a
                href="https://wa.me/96890000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg text-xs flex items-center justify-center gap-2 shadow-md hover:bg-emerald-700 transition-colors"
              >
                <span>دعم واستشارات الواتساب المباشرة</span>
              </a>
              <p className="text-[10px] text-zinc-400 text-center mt-3 font-mono">
                نزوى • سلطنة عُمان
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
