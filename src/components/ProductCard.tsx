import React, { useState } from 'react';
import { Product } from '../types';
import { Heart, Plus, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <div className="group relative flex flex-col bg-white text-right font-sans">
      
      {/* Product Image Container */}
      <div
        className="relative aspect-[3/4] w-full bg-zinc-100 overflow-hidden cursor-pointer"
        onClick={() => onSelectProduct(product)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.titleAr}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center transition-opacity duration-500 ease-out ${
            isHovered && product.images.length > 1 ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Secondary Image for smooth crossfade hover */}
        {product.images.length > 1 && (
          <img
            src={secondaryImage}
            alt={`${product.titleAr} - alternative view`}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Badges */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span className="bg-black text-white text-[9px] font-bold tracking-widest px-2 py-0.5 uppercase font-mono">
              {product.badge}
            </span>
          )}
          {hasDiscount && (
            <span className="bg-zinc-900 text-white text-[9px] font-bold tracking-widest px-2 py-0.5 font-mono">
              خصم {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 left-2.5 z-20 p-2 rounded-full transition-all duration-300 ${
            isWishlisted
              ? 'bg-black text-white'
              : 'bg-white/90 text-zinc-800 hover:bg-black hover:text-white shadow-sm'
          }`}
          aria-label="إضافة للمفضلة"
        >
          <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} strokeWidth={1.75} />
        </button>

        {/* Quick Add Overlay on Hover (Desktop) */}
        <div className="absolute inset-x-2.5 bottom-2.5 hidden lg:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="flex-1 bg-black text-white text-[11px] font-bold py-2.5 px-3 uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus size={14} />
            <span>إضافة سريعة</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="bg-white text-black p-2.5 hover:bg-zinc-100 transition-colors shadow-lg"
            title="عرض التفاصيل"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-3 pb-1 flex flex-col gap-1">
        <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono tracking-wider">
          <span className="uppercase">JH STYLE</span>
          <div className="flex items-center gap-1 text-zinc-600">
            <Star size={10} className="fill-black text-black" />
            <span className="font-mono text-[10px]">{product.rating}</span>
          </div>
        </div>

        <h3
          onClick={() => onSelectProduct(product)}
          className="text-xs sm:text-sm font-bold text-black hover:text-zinc-600 cursor-pointer line-clamp-1 transition-colors leading-tight"
        >
          {product.titleAr}
        </h3>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xs sm:text-sm font-extrabold text-black font-sans">
              {product.price.toFixed(3)} <span className="text-[10px] font-semibold text-zinc-500">ر.ع.</span>
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-zinc-400 line-through font-mono">
                {product.originalPrice?.toFixed(3)}
              </span>
            )}
          </div>

          <button
            onClick={() => onQuickAdd(product)}
            className="lg:hidden p-1.5 bg-black text-white hover:bg-zinc-800 transition-colors"
            title="إضافة بالسلة"
            aria-label="إضافة بالسلة"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

    </div>
  );
};

