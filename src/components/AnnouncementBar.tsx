import React from 'react';
import { Truck, ShieldCheck, MessageCircle } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-black text-white py-2 px-4 text-[11px] font-medium tracking-wider font-sans border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Oman Delivery Status */}
        <div className="hidden md:flex items-center gap-2 text-zinc-400">
          <Truck size={13} className="text-white" />
          <span>توصيل مجاني لجميع ولايات سلطنة عُمان للطلبات فوق 30 ر.ع</span>
        </div>

        {/* Center Main Ticker */}
        <div className="w-full md:w-auto text-center flex items-center justify-center gap-3">
          <span className="bg-zinc-800 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-none font-mono">
            JH EXCLUSIVE
          </span>
          <span className="text-zinc-200">
            تشكيلة الموسم الجديد متوفرة الآن في فرع نزوى والتوصيل السريع
          </span>
        </div>

        {/* Right Currency & WhatsApp Quick Support */}
        <div className="hidden lg:flex items-center gap-5 text-zinc-400">
          <a
            href="https://wa.me/96890000000?text=أهلاً%20JH%20STYLE،%20أود%20الاستفسار%20عن%20التشكيلة%20الجديدة"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <MessageCircle size={13} className="text-emerald-400" />
            <span>خدمة العملاء بالواتساب</span>
          </a>
          <span className="text-zinc-600">|</span>
          <span className="font-mono text-zinc-200 font-bold">OMR (ر.ع)</span>
        </div>

      </div>
    </div>
  );
};
