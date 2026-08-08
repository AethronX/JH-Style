import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, ProductColor, ProductSize } from '../types';
import { X, Heart, ShoppingBag, MessageCircle, Star, ShieldCheck, Truck, RefreshCw, Ruler, ChevronDown, ChevronUp } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: ProductSize, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product?.colors[0] || { nameAr: 'أسود', nameEn: 'Black', hex: '#000000' }
  );
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product?.sizes[0] || 'M'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<'details' | 'fabric' | 'shipping' | null>('details');

  if (!isOpen || !product) return null;

  const handleWhatsAppOrder = () => {
    const text = `السلام عليكم ورحمة الله، أود طلب المنتج من براند JH STYLE:
📦 المنتج: ${product.titleAr} (${product.titleEn})
🎨 اللون: ${selectedColor.nameAr}
📏 المقاس: ${selectedSize}
🔢 الكمية: ${quantity}
💰 السعر الإجمالي: ${(product.price * quantity).toFixed(3)} ر.ع.

يرجى تزويدي بتفاصيل التوصيل والشحن. شكراً لكم!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/96890000000?text=${encodedText}`, '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6"
      >
        {/* Backdrop overlay click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Container / Mobile Bottom Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white w-full max-w-5xl overflow-hidden shadow-2xl border border-zinc-200 rounded-t-2xl sm:rounded-none max-h-[92vh] sm:max-h-[88vh] flex flex-col text-right font-sans z-10"
        >
          {/* Mobile Bottom Sheet Handle Bar */}
          <div className="sm:hidden w-full flex justify-center py-2.5 bg-zinc-100 border-b border-zinc-200 shrink-0 cursor-grab">
            <div className="w-12 h-1.5 bg-zinc-300 rounded-full" />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 p-2 sm:p-2.5 bg-black text-white hover:bg-zinc-800 transition-colors rounded-full shadow-md"
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>

          <div className="overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Image Gallery (RTL layout) */}
          <div className="lg:col-span-7 p-4 sm:p-6 bg-zinc-50 border-b lg:border-b-0 lg:border-l border-zinc-200 flex flex-col gap-4">
            
            {/* Main Image View */}
            <div className="relative aspect-[3/4] w-full bg-white overflow-hidden border border-zinc-200">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.titleAr}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter grayscale-[15%] contrast-105"
              />
              {product.badge && (
                <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1 uppercase font-mono">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 aspect-[3/4] bg-white border-2 overflow-hidden transition-all ${
                      selectedImageIndex === idx ? 'border-black' : 'border-zinc-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Specs & Ordering Form */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-mono">
                <span className="uppercase">{product.titleEn}</span>
                <div className="flex items-center gap-1 text-black font-bold">
                  <Star size={13} className="fill-black text-black" />
                  <span>{product.rating}</span>
                  <span className="text-zinc-400 font-normal">({product.reviewCount} تقييم)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight leading-snug">
                {product.titleAr}
              </h1>

              {/* Price Display in OMR */}
              <div className="flex items-baseline gap-3 my-4 py-3 border-y border-zinc-100">
                <span className="text-2xl font-black text-black font-sans">
                  {product.price.toFixed(3)} <span className="text-sm font-semibold">ر.ع.</span>
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-zinc-400 line-through font-sans">
                    {product.originalPrice.toFixed(3)} ر.ع.
                  </span>
                )}
                <span className="text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 font-medium mr-auto">
                  شامل الضريبة • متوفر بالمخزن
                </span>
              </div>

              {/* Short Description */}
              <p className="text-sm text-zinc-600 leading-relaxed mb-6 font-normal">
                {product.descriptionAr}
              </p>

              {/* Color Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-black mb-2.5">
                  <span>اللون: <span className="font-normal text-zinc-600">{selectedColor.nameAr}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                        selectedColor.nameAr === color.nameAr ? 'border-black scale-110' : 'border-zinc-200 hover:border-zinc-400'
                      }`}
                      title={color.nameAr}
                    >
                      <span
                        className="block w-full h-full rounded-full border border-black/10"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-black mb-2.5">
                  <span>المقاس: <span className="font-mono text-zinc-600">{selectedSize}</span></span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs text-zinc-600 hover:text-black underline flex items-center gap-1"
                  >
                    <Ruler size={13} />
                    <span>دليل المقاسات</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 text-xs font-bold font-mono transition-all border ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-zinc-800 border-zinc-200 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-black mb-2">الكمية:</label>
                <div className="flex items-center border border-zinc-300 w-32 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 py-2 text-zinc-600 hover:bg-zinc-100 font-bold"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-sm font-sans">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 py-2 text-zinc-600 hover:bg-zinc-100 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Main Action Buttons */}
              <div className="space-y-3 mb-8">
                
                {/* Primary Add to Cart */}
                <button
                  onClick={() => {
                    onAddToCart(product, selectedColor, selectedSize, quantity);
                    onClose();
                  }}
                  className="w-full bg-black text-white font-bold py-4 text-xs sm:text-sm uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 shadow-xl"
                >
                  <ShoppingBag size={18} />
                  <span>إضافة إلى السلة • ADD TO BAG</span>
                </button>

                {/* Secondary Direct WhatsApp Order */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-white text-zinc-900 border border-zinc-300 font-bold py-3.5 text-xs uppercase tracking-widest hover:bg-zinc-50 hover:border-black transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} className="text-emerald-600" />
                  <span>الطلب المباشر عبر واتساب • WHATSAPP</span>
                </button>

                {/* Wishlist Toggle Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`w-full py-2.5 border text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                    isWishlisted
                      ? 'bg-zinc-100 text-black border-zinc-300'
                      : 'bg-white text-zinc-600 border-zinc-200 hover:border-black hover:text-black'
                  }`}
                >
                  <Heart size={14} fill={isWishlisted ? 'black' : 'none'} />
                  <span>{isWishlisted ? 'في المفضلة' : 'حفظ في المفضلة'}</span>
                </button>

              </div>

              {/* Accordions: Product Details, Fabric & Care, Shipping */}
              <div className="space-y-2 border-t border-zinc-200 pt-4">
                
                {/* Details Accordion */}
                <div className="border-b border-zinc-100 pb-2">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'details' ? null : 'details')}
                    className="w-full flex items-center justify-between py-2 text-xs font-bold text-black text-right"
                  >
                    <span>تفاصيل المنتج والقصة</span>
                    {activeAccordion === 'details' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {activeAccordion === 'details' && (
                    <p className="text-xs text-zinc-600 leading-relaxed py-2">
                      {product.descriptionAr}
                    </p>
                  )}
                </div>

                {/* Fabric & Care Accordion */}
                <div className="border-b border-zinc-100 pb-2">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'fabric' ? null : 'fabric')}
                    className="w-full flex items-center justify-between py-2 text-xs font-bold text-black text-right"
                  >
                    <span>الخامة وطريقة العناية</span>
                    {activeAccordion === 'fabric' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {activeAccordion === 'fabric' && (
                    <div className="text-xs text-zinc-600 leading-relaxed py-2 space-y-1">
                      <p>🧵 <strong>الخامة:</strong> {product.fabricAr}</p>
                      <p>🧼 <strong>العناية:</strong> {product.careAr}</p>
                    </div>
                  )}
                </div>

                {/* Shipping Accordion */}
                <div className="border-b border-zinc-100 pb-2">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')}
                    className="w-full flex items-center justify-between py-2 text-xs font-bold text-black text-right"
                  >
                    <span>الشحن والاسترجاع في سلطنة عُمان</span>
                    {activeAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {activeAccordion === 'shipping' && (
                    <div className="text-xs text-zinc-600 leading-relaxed py-2 space-y-1">
                      <p>🚚 <strong>التوصيل:</strong> خلال 1-3 أيام عمل لكافة ولايات السلطنة (نزوى، مسقط، صلالة، صحار...)</p>
                      <p>🔄 <strong>الاسترجاع:</strong> متاح خلال 7 أيام من الاستلام بحالتها الأصلية.</p>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Guarantees */}
            <div className="mt-8 pt-4 border-t border-zinc-100 grid grid-cols-3 gap-2 text-center text-[10px] text-zinc-500 font-mono">
              <div className="flex flex-col items-center">
                <ShieldCheck size={16} className="text-black mb-1" />
                <span>جودة مضمونة</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck size={16} className="text-black mb-1" />
                <span>توصيل لعُمان</span>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCw size={16} className="text-black mb-1" />
                <span>استبدال سهل</span>
              </div>
            </div>

          </div>

        </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
