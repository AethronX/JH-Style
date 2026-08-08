import React, { useState } from 'react';
import { Product, CategoryId } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/products';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ProductGridProps {
  title: string;
  subtitle?: string;
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  selectedCategory: CategoryId;
  onSelectCategory: (categoryId: CategoryId) => void;
  showFilters?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  subtitle,
  products,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
  selectedCategory,
  onSelectCategory,
  showFilters = true,
}) => {
  const [sortBy, setSortBy] = useState<'newest' | 'bestseller' | 'price-asc' | 'price-desc'>('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter & Sort logic
  let filtered = [...products];
  if (selectedCategory !== 'all') {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  if (sortBy === 'bestseller') {
    filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
  } else if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-zinc-200">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-mono">
              JH STYLE COLLECTION
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-black tracking-tight mt-1">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-zinc-500 mt-1 font-normal">{subtitle}</p>
            )}
          </div>

          {/* Controls Bar */}
          {showFilters && (
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              
              {/* Sort Selector */}
              <div className="flex items-center gap-2 border border-zinc-200 px-3 py-2 bg-white text-xs font-medium text-zinc-800">
                <ArrowUpDown size={14} className="text-zinc-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent focus:outline-none cursor-pointer text-xs font-medium text-black"
                >
                  <option value="newest">الترتيب: الأحدث</option>
                  <option value="bestseller">الترتيب: الأكثر مبيعاً</option>
                  <option value="price-asc">السعر: من الأقل للأعلى</option>
                  <option value="price-desc">السعر: من الأعلى للأقل</option>
                </select>
              </div>

              {/* Mobile Filter Trigger Button */}
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="md:hidden flex items-center gap-2 border border-zinc-200 px-3 py-2 text-xs font-bold text-black"
              >
                <SlidersHorizontal size={14} />
                <span>الفلاتر</span>
              </button>

            </div>
          )}
        </div>

        {/* Category Filter Chips - Desktop & Tablet */}
        {showFilters && (
          <div className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-8 border-b border-zinc-100">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-none border flex items-center gap-2 ${
                selectedCategory === 'all'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-black hover:text-black'
              }`}
            >
              <span>الجميع</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 ${selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
                {products.length}
              </span>
            </button>
            {CATEGORIES.map((cat) => {
              const count = products.filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-bold transition-all rounded-none border flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-zinc-600 border-zinc-200 hover:border-black hover:text-black'
                  }`}
                >
                  <span>{cat.nameAr}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 ${selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Mobile Filter Bottom Sheet / Modal */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end md:hidden">
            <div className="w-full max-w-xs bg-white h-full p-6 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                  <h3 className="font-bold text-lg text-black">فلاتر المتجر</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="text-zinc-500 font-bold"
                  >
                    إغلاق ✕
                  </button>
                </div>

                <div className="py-6 space-y-4">
                  <p className="text-xs font-mono uppercase text-zinc-400">التصنيفات</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => { onSelectCategory('all'); setIsMobileFilterOpen(false); }}
                      className={`w-full text-right py-2 px-3 text-sm font-medium ${
                        selectedCategory === 'all' ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-800'
                      }`}
                    >
                      جميع المنتجات
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => { onSelectCategory(cat.id); setIsMobileFilterOpen(false); }}
                        className={`w-full text-right py-2 px-3 text-sm font-medium ${
                          selectedCategory === cat.id ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-800'
                        }`}
                      >
                        {cat.nameAr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-black text-white font-bold py-3 text-sm uppercase tracking-wider"
              >
                تطبيق الفلاتر
              </button>
            </div>
          </div>
        )}

        {/* Product Cards Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onSelectProduct={onSelectProduct}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-zinc-50 border border-zinc-100">
            <p className="text-base text-zinc-600 font-medium">لا توجد منتجات مطابقة لهذا التصنيف حالياً</p>
            <button
              onClick={() => onSelectCategory('all')}
              className="mt-4 px-6 py-2.5 bg-black text-white text-xs uppercase tracking-wider font-bold"
            >
              عرض جميع المنتجات
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
