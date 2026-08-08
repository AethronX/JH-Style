import React, { useState } from 'react';
import { X, User, Package, MapPin, MessageCircle, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { OMAN_WILAYAT } from '../data/products';

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountDrawer: React.FC<AccountDrawerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'track'>('orders');
  const [orderIdSearch, setOrderIdSearch] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdSearch.trim()) return;

    // Simulate finding order
    setTrackedOrder({
      id: orderIdSearch.toUpperCase(),
      date: '08 أغسطس 2026',
      status: 'قيد التوصيل في ولاية نزوى',
      items: 'بنطال كتان أوف وايت + قميص بولو عنابي',
      total: '34.500 OMR',
      paymentMethod: 'الدفع عند الاستلام',
      eta: 'خلال 24-48 ساعة',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-start font-sans">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 text-right">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-black text-white">
          <div className="flex items-center gap-3">
            <User size={20} className="text-zinc-300" />
            <div>
              <h3 className="font-bold text-sm tracking-wide">حسابي وتتبع الطلبات</h3>
              <p className="text-[10px] text-zinc-400 font-mono">JH STYLE OMAN CUSTOMER CARE</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sub-Tabs Navigation */}
        <div className="grid grid-cols-3 border-b border-zinc-200 bg-zinc-50 text-xs font-bold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-2 border-b-2 transition-colors ${
              activeTab === 'orders' ? 'border-black bg-white text-black' : 'border-transparent text-zinc-500'
            }`}
          >
            الطلبات السابقة
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`py-3 px-2 border-b-2 transition-colors ${
              activeTab === 'track' ? 'border-black bg-white text-black' : 'border-transparent text-zinc-500'
            }`}
          >
            تتبع الشحنة
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-2 border-b-2 transition-colors ${
              activeTab === 'profile' ? 'border-black bg-white text-black' : 'border-transparent text-zinc-500'
            }`}
          >
            بيانات التوصيل
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Tab 1: Orders History */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
                سجل طلبياتك الأخيرة
              </h4>

              <div className="p-4 border border-zinc-200 bg-zinc-50 space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-200">
                  <span className="font-mono font-bold text-black">#JH-89210</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 font-bold">تم التسليم</span>
                </div>
                <p className="text-xs font-medium text-zinc-800">1x قميص كتان كحلي بأكمام قصيرة (M)</p>
                <div className="flex items-center justify-between text-xs text-zinc-500 font-mono pt-1">
                  <span>15.000 OMR</span>
                  <span>نزوى • 02 أغسطس 2026</span>
                </div>
              </div>

              <div className="p-4 border border-zinc-200 bg-white space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-200">
                  <span className="font-mono font-bold text-black">#JH-87002</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 font-bold">تم التسليم</span>
                </div>
                <p className="text-xs font-medium text-zinc-800">1x بنطال كتان أوف وايت مريح (L)</p>
                <div className="flex items-center justify-between text-xs text-zinc-500 font-mono pt-1">
                  <span>18.500 OMR</span>
                  <span>مسقط • 20 يوليو 2026</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Track Order */}
          {activeTab === 'track' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
                تتبع طلبيتك في سلطنة عُمان
              </h4>

              <form onSubmit={handleSearchOrder} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">أدخل رقم الطلب (مثال: JH-89210)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={orderIdSearch}
                      onChange={(e) => setOrderIdSearch(e.target.value)}
                      placeholder="JH-89210"
                      className="flex-1 px-3 py-2.5 border border-zinc-300 text-xs text-left font-mono focus:outline-none focus:border-black"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-black text-white text-xs font-bold hover:bg-zinc-800"
                    >
                      تتبع
                    </button>
                  </div>
                </div>
              </form>

              {trackedOrder && (
                <div className="p-4 bg-black text-white space-y-3 border border-zinc-800 text-right animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-2">
                    <span className="font-mono text-emerald-400 font-bold">{trackedOrder.id}</span>
                    <span className="text-[10px] text-zinc-400">{trackedOrder.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <CheckCircle2 size={16} />
                    <span>{trackedOrder.status}</span>
                  </div>
                  <p className="text-xs text-zinc-300">{trackedOrder.items}</p>
                  <div className="flex justify-between items-center text-xs text-zinc-400 pt-2 border-t border-zinc-800 font-mono">
                    <span>{trackedOrder.total}</span>
                    <span>موعد الوصول: {trackedOrder.eta}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Delivery Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs">
              <h4 className="font-mono font-bold tracking-widest text-zinc-400 uppercase">
                عنوان التوصيل المفضل في عُمان
              </h4>

              <div className="p-4 border border-zinc-200 bg-zinc-50 space-y-2">
                <div className="flex items-center gap-2 font-bold text-black">
                  <MapPin size={16} />
                  <span>العنوان المسجل</span>
                </div>
                <p className="text-zinc-600">المحافظة: الداخلية - ولاية نزوى</p>
                <p className="text-zinc-600">المنطقة: السوق المركزي بالقرب من القلعة</p>
                <p className="text-zinc-600 font-mono">الهاتف: +968 9000 0000</p>
              </div>

              <div className="p-4 border border-zinc-200 bg-white space-y-2">
                <span className="font-bold text-black block">طرق الدفع المفضلة</span>
                <p className="text-zinc-600">الدفع نقداً عند الاستلام (COD) / التحويل البنكي المباشر</p>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer: WhatsApp Support Link */}
        <div className="p-6 bg-zinc-50 border-t border-zinc-200 space-y-3">
          <a
            href="https://wa.me/96890000000?text=أهلاً%20JH%20STYLE،%20أحتاج%20مساعدة%20في%20تتبع%20طلبيتي"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle size={16} />
            <span>تواصل مع خدمة العملاء مباشرة عبر الواتساب</span>
          </a>
          <p className="text-[10px] text-zinc-400 text-center font-mono">
            JH STYLE FLAGSHIP STORE • NIZWA SOUQ OMAN
          </p>
        </div>

      </div>
    </div>
  );
};
