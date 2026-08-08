import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { Search, X, ArrowLeft } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const popularSearches = [
    'قميص كتان',
    'بولو محبوك',
    'بنطال كتان',
    'شورت كاجوال',
    'جاكيت بليزر',
    'تشكيلة نزوى 2026',
  ];

  const results = query.trim() === ''
    ? []
    : products.filter(
        (p) =>
          p.titleAr.toLowerCase().includes(query.toLowerCase()) ||
          p.titleEn.toLowerCase().includes(query.toLowerCase()) ||
          p.descriptionAr.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-start p-4 sm:p-8 font-sans text-right"
      >
        {/* Search Header Container */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="max-w-4xl mx-auto w-full pt-4 sm:pt-8"
        >
          {/* Top bar with close */}
          <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
              JH STYLE SEARCH & DISCOVERY
            </span>
            <button
              onClick={onClose}
              className="p-2.5 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors rounded-full"
              aria-label="إغلاق البحث"
            >
              <X size={20} />
            </button>
          </div>

          {/* Input Field */}
          <div className="relative mt-8">
            <Search size={26} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن قميص، تيشيرت، بنطال، جاكيت..."
              autoFocus
              className="w-full bg-zinc-900 border-2 border-zinc-700 focus:border-white text-white text-lg sm:text-2xl font-bold pr-14 pl-12 py-5 focus:outline-none transition-colors font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-2"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Popular searches when empty */}
          {!query && (
            <div className="mt-8">
              <p className="text-xs font-mono uppercase text-zinc-400 mb-3 tracking-widest">البحوث الأكثر تداولاً</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-500 text-xs font-medium transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results Display */}
          {query && (
            <div className="mt-8 max-h-[60vh] overflow-y-auto pr-2">
              <p className="text-xs font-mono uppercase text-zinc-400 mb-4">
                نتائج البحث ({results.length})
              </p>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="flex items-center gap-4 p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-500 cursor-pointer transition-all group"
                    >
                      <img
                        src={product.image}
                        alt={product.titleAr}
                        className="w-16 h-20 object-cover bg-zinc-800 border border-zinc-700 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-mono text-zinc-400 block">
                          JH STYLE
                        </span>
                        <h4 className="text-sm font-bold text-white truncate group-hover:text-zinc-200">
                          {product.titleAr}
                        </h4>
                        <p className="text-xs text-zinc-400 truncate mt-0.5 font-mono">
                          {product.titleEn}
                        </p>
                        <p className="text-xs font-bold font-mono text-white mt-1">
                          {product.price.toFixed(3)} ر.ع.
                        </p>
                      </div>
                      <ArrowLeft size={16} className="text-zinc-500 group-hover:text-white transition-transform group-hover:-translate-x-1 shrink-0" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center bg-zinc-900/50 border border-zinc-800">
                  <p className="text-zinc-400 text-sm">لم نجد نتائج مطابقة لـ "{query}"</p>
                  <p className="text-zinc-600 text-xs mt-1">جرّب البحث باسم الفئة مثل "قميص" أو "كتان"</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
