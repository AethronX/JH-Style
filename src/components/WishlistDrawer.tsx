import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end font-sans text-right"
      >
        {/* Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl border-r border-zinc-200"
        >
          {/* Header */}
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart size={20} className="fill-black text-black" />
              <h2 className="text-lg font-extrabold text-black tracking-tight">قائمة المفضلة ({wishlistProducts.length})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors rounded-full"
              aria-label="إغلاق المفضلة"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length > 0 ? (
              wishlistProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-3 bg-zinc-50 border border-zinc-200 relative">
                  <img
                    src={product.images[0]}
                    alt={product.titleAr}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover bg-white filter grayscale contrast-105"
                  />
                  
                  <div className="flex-1 text-right">
                    <span className="text-[10px] text-zinc-400 font-mono uppercase">JH STYLE</span>
                    <h4 className="text-sm font-bold text-black line-clamp-1">{product.titleAr}</h4>
                    <p className="text-sm font-extrabold text-black font-sans mt-1">
                      {product.price.toFixed(3)} ر.ع.
                    </p>

                    <button
                      onClick={() => {
                        onMoveToCart(product);
                        onRemoveFromWishlist(product);
                      }}
                      className="mt-3 px-3 py-1.5 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag size={13} />
                      <span>نقل إلى السلة</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveFromWishlist(product)}
                    className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                    title="حذف من المفضلة"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-zinc-500">
                <Heart size={40} className="mx-auto text-zinc-300 mb-3" />
                <p className="text-base font-bold text-black">Your wishlist is waiting</p>
                <p className="text-xs text-zinc-500 mt-1">قائمة المفضلة فارغة. احفظ القطع الفاخرة لتسوقها لاحقاً بكل سهولة.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-zinc-100 bg-zinc-50 text-center">
            <p className="text-xs text-zinc-500 mb-2 font-mono">JH STYLE • NIZWA, OMAN</p>
            <button
              onClick={onClose}
              className="w-full bg-black text-white font-bold py-3.5 text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors"
            >
              متابعة التسوق
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
