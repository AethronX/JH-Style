/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem, ProductColor, ProductSize, CategoryId, ActiveTab } from './types';
import { PRODUCTS, CATEGORIES } from './data/products';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { ProductGrid } from './components/ProductGrid';
import { EditorialBanner } from './components/EditorialBanner';
import { ShopTheLook } from './components/ShopTheLook';
import { CollectionsSection } from './components/CollectionsSection';
import { InstagramFeed } from './components/InstagramFeed';
import { TrustBar } from './components/TrustBar';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchOverlay } from './components/SearchOverlay';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountDrawer } from './components/AccountDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { BrandStory } from './components/BrandStory';
import { InfoPages } from './components/InfoPages';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');

  // Cart & Wishlist State with LocalStorage Persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('jh_style_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jh_style_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('jh_style_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('jh_style_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // Modals Visibility States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState<{ isOpen: boolean; message: string; type: 'cart' | 'wishlist' | 'general' }>({
    isOpen: false,
    message: '',
    type: 'cart',
  });

  const showToast = (message: string, type: 'cart' | 'wishlist' | 'general' = 'cart') => {
    setToast({ isOpen: true, message, type });
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, color: ProductColor, size: ProductSize, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.nameAr === color.nameAr &&
          item.selectedSize === size
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }

      return [...prev, { product, selectedColor: color, selectedSize: size, quantity }];
    });

    showToast(`تمت إضافة "${product.titleAr}" إلى حقيبة التسوق`, 'cart');
  };

  const handleQuickAdd = (product: Product) => {
    const defaultColor = product.colors[0] || { nameAr: 'أسود', nameEn: 'Black', hex: '#000000' };
    const defaultSize = product.sizes[0] || 'M';
    handleAddToCart(product, defaultColor, defaultSize, 1);
  };

  const handleUpdateCartQty = (index: number, newQty: number) => {
    if (newQty < 1) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showToast('تم إزالة المنتج من السلة', 'general');
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      showToast(`تم حذف "${product.titleAr}" من المفضلة`, 'general');
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      showToast(`تم حفظ "${product.titleAr}" في المفضلة`, 'wishlist');
    }
  };

  // Filter products for homepage sections
  const newArrivals = PRODUCTS.filter((p) => p.isNew || p.badge === 'جديد');
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller || p.badge === 'الأكثر مبيعاً');

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-black selection:text-white">
      
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartTotalCount}
        wishlistCount={wishlistIds.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onFilterCategory={(catId) => {
          if (catId === 'new') {
            setSelectedCategory('all');
          } else if (catId === 'bestseller') {
            setSelectedCategory('all');
          } else {
            setSelectedCategory(catId as CategoryId);
          }
        }}
      />

      {/* Main Content Render */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeTab === 'home' && (
              <div>
                {/* 3. Hero Section */}
                <Hero onShopNow={() => { setActiveTab('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />

                {/* 4. Shop by Category */}
                <CategoriesSection
                  categories={CATEGORIES}
                  onSelectCategory={(catId) => {
                    setSelectedCategory(catId as CategoryId);
                    setActiveTab('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* 5. New Arrivals (وصل حديثاً) */}
                <ProductGrid
                  title="وصل حديثاً • NEW ARRIVALS"
                  subtitle="أحدث صدارات براند JH STYLE المصممة بعناية فائقة"
                  products={newArrivals.length > 0 ? newArrivals : PRODUCTS.slice(0, 4)}
                  wishlistIds={wishlistIds}
                  onToggleWishlist={handleToggleWishlist}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onQuickAdd={handleQuickAdd}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  showFilters={false}
                />

                {/* 6. Editorial Campaign */}
                <EditorialBanner
                  onDiscover={() => {
                    setActiveTab('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* 7. Best Sellers (الأكثر مبيعاً) */}
                <ProductGrid
                  title="الأكثر طلباً • BEST SELLERS"
                  subtitle="القطع الأكثر إقبالاً من قبل زبائننا في سلطنة عُمان"
                  products={bestSellers.length > 0 ? bestSellers : PRODUCTS.slice(0, 4)}
                  wishlistIds={wishlistIds}
                  onToggleWishlist={handleToggleWishlist}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onQuickAdd={handleQuickAdd}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  showFilters={false}
                />

                {/* 8. Shop The Look */}
                <ShopTheLook
                  products={PRODUCTS}
                  onAddToCart={handleAddToCart}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                />

                {/* 9. Collections */}
                <CollectionsSection
                  onSelectCollection={(catId) => {
                    setSelectedCategory(catId);
                    setActiveTab('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* 10. UGC / Instagram Feed */}
                <InstagramFeed />

                {/* 11. Trust Services */}
                <TrustBar />

                {/* 11b. Brand Heritage Story */}
                <BrandStory />
              </div>
            )}

            {/* Catalog Shop Page */}
            {activeTab === 'shop' && (
              <div className="pt-6">
                <ProductGrid
                  title="جميع تشكيلات الموضة"
                  subtitle="استعرض التشكيلة الكاملة من قمصان الريسورت، البولو المحبوك، بناطيل الكتان، والشورتات"
                  products={PRODUCTS}
                  wishlistIds={wishlistIds}
                  onToggleWishlist={handleToggleWishlist}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onQuickAdd={handleQuickAdd}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  showFilters={true}
                />
              </div>
            )}

            {/* Institutional / Informational Views */}
            {(activeTab === 'about' || activeTab === 'contact' || activeTab === 'shipping' || activeTab === 'privacy' || activeTab === 'terms') && (
              <InfoPages
                page={activeTab}
                onBackToShop={() => {
                  setActiveTab('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 12. Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onFilterCategory={(catId) => {
          setSelectedCategory(catId as CategoryId);
          setActiveTab('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartTotalCount}
        wishlistCount={wishlistIds.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Modals & Slide-overs */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={(p) => handleQuickAdd(p)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={() => setCartItems([])}
      />

      <AccountDrawer
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Toast Notification */}
      <NotificationToast
        message={toast.message}
        type={toast.type}
        isOpen={toast.isOpen}
        onClose={() => setToast({ ...toast, isOpen: false })}
      />

    </div>
  );
}

