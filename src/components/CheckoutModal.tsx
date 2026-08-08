import React, { useState } from 'react';
import { CartItem, CheckoutFormData } from '../types';
import { OMAN_WILAYAT } from '../data/products';
import { X, CheckCircle, Truck, ShieldCheck, CreditCard, Banknote, MessageCircle } from 'lucide-react';
import { JHLogo } from './JHLogo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    wilayah: 'نزوى (الداخلية)',
    address: '',
    notes: '',
    paymentMethod: 'cod',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 30 ? 0 : 2.000; // 2 OMR shipping if below 30
  const grandTotal = subtotal + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('يرجى ملء جميع الحقول المطلوبة (الاسم الكامل، رقم الهاتف، العنوان).');
      return;
    }

    const randomRef = `JH-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(randomRef);
    setIsSubmitted(true);
    onClearCart();
  };

  const sendWhatsAppConfirmation = () => {
    let text = `السلام عليكم ورحمة الله، تم تقديم طلب جديد على متجر JH STYLE:\n`;
    text += `🔖 رقم الطلب: ${orderRef}\n`;
    text += `👤 الاسم: ${formData.fullName}\n`;
    text += `📱 الهاتف: ${formData.phone}\n`;
    text += `📍 الولاية/العنوان: ${formData.wilayah} - ${formData.address}\n`;
    text += `💳 طريقة الدفع: ${formData.paymentMethod === 'cod' ? 'الدفع عند الاستلام' : 'تحويل بنكي'}\n\n`;
    text += `💰 المبلغ الإجمالي: ${grandTotal.toFixed(3)} ر.ع.\n\nيرجى تأكيد تجهيز الشحنة. شكراً لكم!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/96890000000?text=${encodedText}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      
      <div className="relative bg-white w-full max-w-4xl overflow-hidden shadow-2xl border border-zinc-200 my-auto p-6 sm:p-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2 text-zinc-400 hover:text-black transition-colors"
          aria-label="إغلاق"
        >
          <X size={22} />
        </button>

        {!isSubmitted ? (
          <div>
            
            {/* Header */}
            <div className="border-b border-zinc-200 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-right">
              <div>
                <JHLogo size="sm" subtext="CHECKOUT & EXPRESS DELIVERY" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-black tracking-tight">
                  إتمام الطلب والتوصيل
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  توصيل سريع لكافة ولايات ومحافظات سلطنة عُمان خلال 1-3 أيام عمل.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form Input Fields */}
              <div className="lg:col-span-7 space-y-4 text-right">
                
                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    الاسم الكامل <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="مثال: أحمد بن علي البوسعيدي"
                    className="w-full bg-zinc-50 border border-zinc-300 focus:border-black p-3 text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      رقم الهاتف (عُمان) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="9XXXXXXX"
                      className="w-full bg-zinc-50 border border-zinc-300 focus:border-black p-3 text-sm focus:outline-none transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black mb-1">الولاية / المحافظة</label>
                    <select
                      value={formData.wilayah}
                      onChange={(e) => setFormData({ ...formData, wilayah: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-300 focus:border-black p-3 text-sm focus:outline-none transition-colors"
                    >
                      {OMAN_WILAYAT.map((w, i) => (
                        <option key={i} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    العنوان التفصيلي (المنطقة/الحي/رقم الشارع/المنزل) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="مثال: نزوى - الحي التراثي، بجانب قلعة نزوى"
                    className="w-full bg-zinc-50 border border-zinc-300 focus:border-black p-3 text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black mb-1">ملاحظات الطلب (اختياري)</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="أي تعليمات خاصة بالتوصيل..."
                    className="w-full bg-zinc-50 border border-zinc-300 focus:border-black p-3 text-sm focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Payment Method Selector */}
                <div className="pt-4 border-t border-zinc-200">
                  <label className="block text-xs font-bold text-black mb-3">طريقة الدفع:</label>
                  <div className="grid grid-cols-2 gap-3">
                    
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className={`p-3.5 border text-right transition-all flex items-center gap-3 ${
                        formData.paymentMethod === 'cod'
                          ? 'bg-black text-white border-black font-bold'
                          : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-black'
                      }`}
                    >
                      <Banknote size={20} />
                      <div>
                        <p className="text-xs font-bold">الدفع عند الاستلام</p>
                        <p className="text-[10px] opacity-75 font-normal">نقداً لمندوب التوصيل</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'bank_transfer' })}
                      className={`p-3.5 border text-right transition-all flex items-center gap-3 ${
                        formData.paymentMethod === 'bank_transfer'
                          ? 'bg-black text-white border-black font-bold'
                          : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-black'
                      }`}
                    >
                      <CreditCard size={20} />
                      <div>
                        <p className="text-xs font-bold">تحويل بنكي عُماني</p>
                        <p className="text-[10px] opacity-75 font-normal">بنك مسقط / الوطني</p>
                      </div>
                    </button>

                  </div>
                </div>

              </div>

              {/* Order Summary Column */}
              <div className="lg:col-span-5 bg-zinc-50 p-6 border border-zinc-200 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-black border-b border-zinc-200 pb-3 mb-4 text-right">
                    ملخص الطلب ({cartItems.length} قطع)
                  </h3>

                  <div className="space-y-3 max-h-48 overflow-y-auto mb-4 pr-1">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-right border-b border-zinc-100 pb-2">
                        <div>
                          <p className="font-bold text-black">{item.product.titleAr}</p>
                          <p className="text-[10px] text-zinc-500 font-mono">
                            المقاس: {item.selectedSize} | العدد: {item.quantity}
                          </p>
                        </div>
                        <span className="font-extrabold text-black font-sans">
                          {(item.product.price * item.quantity).toFixed(3)} ر.ع.
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 border-t border-zinc-200 pt-3 text-xs text-right font-medium">
                    <div className="flex justify-between">
                      <span className="text-zinc-600">المجموع الفرعي:</span>
                      <span className="font-bold font-sans">{subtotal.toFixed(3)} ر.ع.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">رسوم الشحن والتوصيل:</span>
                      <span className="font-bold font-sans">
                        {shippingFee === 0 ? 'مجاناً' : `${shippingFee.toFixed(3)} ر.ع.`}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-black text-black pt-2 border-t border-zinc-300">
                      <span>الإجمالي النهائي:</span>
                      <span className="font-sans text-lg">{grandTotal.toFixed(3)} ر.ع.</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white font-bold py-4 text-sm uppercase tracking-wider hover:bg-zinc-800 transition-colors mt-6 shadow-lg"
                >
                  تأكيد وإرسال الطلب
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Order Success Confirmation Screen */
          <div className="text-center py-12 px-4 space-y-6">
            <CheckCircle size={60} className="mx-auto text-black" />
            
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">ORDER CONFIRMED</span>
              <h2 className="text-3xl font-black text-black mt-1">تم إرسال طلبك بنجاح!</h2>
              <p className="text-sm text-zinc-600 mt-2">
                شكراً لتسوقك من <strong className="text-black">JH STYLE</strong>. رقم طلبك المرجعي هو:
              </p>
              <div className="inline-block bg-zinc-100 border border-zinc-300 text-black text-lg font-mono font-extrabold px-6 py-2 mt-3">
                {orderRef}
              </div>
            </div>

            <div className="max-w-md mx-auto bg-zinc-50 border border-zinc-200 p-4 text-xs text-right space-y-1.5 font-sans">
              <p>👤 <strong>الاسم:</strong> {formData.fullName}</p>
              <p>📱 <strong>الهاتف:</strong> {formData.phone}</p>
              <p>📍 <strong>العنوان:</strong> {formData.wilayah} - {formData.address}</p>
              <p>💰 <strong>الإجمالي:</strong> {grandTotal.toFixed(3)} ر.ع.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
              <button
                onClick={sendWhatsAppConfirmation}
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-950 text-emerald-100 border border-emerald-800 font-bold text-xs uppercase tracking-wider hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} className="text-emerald-400" />
                <span>إرسال تفاصيل الطلب للواتساب</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 bg-black text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors"
              >
                العودة للمتجر
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
