import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowLeft, MessageCircle, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 30.000; // 30 OMR free shipping in Oman
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleWhatsAppCartOrder = () => {
    let text = `السلام عليكم ورحمة الله، أود إتمام طلب السلة التالية من براند JH STYLE:\n\n`;

    cartItems.forEach((item, idx) => {
      text += `${idx + 1}. ${item.product.titleAr}\n   • المقاس: ${item.selectedSize} | اللون: ${item.selectedColor.nameAr}\n   • الكمية: ${item.quantity} | السعر: ${(item.product.price * item.quantity).toFixed(3)} ر.ع.\n\n`;
    });

    text += `💰 إجمالي السلة: ${subtotal.toFixed(3)} ر.ع.\n\nيرجى تأكيد الطلب وتحديد عنوان التوصيل. شكراً لكم!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/96890000000?text=${encodedText}`, '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end font-sans text-right"
      >
        {/* Drawer Container */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg bg-white h-full flex flex-col justify-between shadow-2xl border-r border-zinc-200"
        >
          {/* Header */}
          <div className="p-6 border-b border-zinc-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-black" />
                <h2 className="text-lg font-extrabold text-black tracking-tight">حقيبة التسوق ({cartItems.length})</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors rounded-full"
                aria-label="إغلاق السلة"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-zinc-50 p-3 border border-zinc-200 text-xs">
              <div className="flex items-center justify-between font-medium text-zinc-800 mb-1.5">
                <span className="flex items-center gap-1.5 font-semibold text-zinc-900">
                  <Truck size={15} className="text-black" />
                  {remainingForFreeShipping > 0
                    ? `أضف ${remainingForFreeShipping.toFixed(3)} ر.ع. للحصول على شحن مجاني داخل عُمان`
                    : 'تهانينا! حصلت على شحن مجاني لكافة ولايات عُمان 🎉'}
                </span>
              </div>
              <div className="w-full bg-zinc-200 h-1.5 overflow-hidden">
                <div
                  className="bg-black h-full transition-all duration-500"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-zinc-50 border border-zinc-200 relative">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.titleAr}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover bg-white filter grayscale contrast-105"
                  />

                  <div className="flex-1 text-right">
                    <span className="text-[10px] text-zinc-400 font-mono uppercase">JH STYLE</span>
                    <h4 className="text-sm font-bold text-black line-clamp-1">{item.product.titleAr}</h4>
                    
                    <div className="flex items-center gap-3 text-xs text-zinc-600 mt-1 font-mono">
                      <span>المقاس: <strong>{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span>اللون: <strong>{item.selectedColor.nameAr}</strong></span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-zinc-300 bg-white text-xs">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="px-2.5 py-1 text-zinc-600 hover:bg-zinc-100 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 font-bold font-sans">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="px-2.5 py-1 text-zinc-600 hover:bg-zinc-100 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-extrabold text-black font-sans">
                        {(item.product.price * item.quantity).toFixed(3)} ر.ع.
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(index)}
                    className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                    title="حذف المنتج"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-zinc-500">
                <ShoppingBag size={44} className="mx-auto text-zinc-300 mb-3" />
                <p className="text-base font-bold text-black">Your bag is currently empty</p>
                <p className="text-xs text-zinc-500 mt-1">حقيبة التسوق فارغة حالياً. استكشف التشكيلة الجديدة وأضف قطعك المفضلة.</p>
              </div>
            )}
          </div>

          {/* Footer & Order Actions */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-zinc-200 bg-zinc-50 space-y-3">
              
              {/* Subtotal */}
              <div className="flex items-center justify-between text-base font-bold text-black border-b border-zinc-200 pb-3">
                <span>المجموع الفرعي:</span>
                <span className="text-xl font-extrabold font-sans">{subtotal.toFixed(3)} ر.ع.</span>
              </div>

              <p className="text-[11px] text-zinc-500 text-center font-mono">
                الأسعار شاملة الضريبة • التوصيل يحسب عند إتمام الطلب
              </p>

              {/* Action 1: Standard Checkout Form */}
              <button
                onClick={() => {
                  onProceedToCheckout();
                  onClose();
                }}
                className="w-full bg-black text-white font-bold py-4 text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <span>إتمام الطلب والدفع • CHECKOUT</span>
                <ArrowLeft size={16} className="rotate-180" />
              </button>

              {/* Action 2: Secondary Quick WhatsApp Cart Order */}
              <button
                onClick={handleWhatsAppCartOrder}
                className="w-full bg-white text-zinc-900 border border-zinc-300 font-bold py-3.5 text-xs uppercase tracking-widest hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} className="text-emerald-600" />
                <span>طلب السلة عبر واتساب • WHATSAPP</span>
              </button>

            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
