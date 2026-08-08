import React from 'react';
import { Truck, ShieldCheck, RefreshCw, MessageCircle } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: <Truck size={18} strokeWidth={1.5} />,
      title: 'OMAN DELIVERY',
      titleAr: 'توصيل عُمان',
      desc: '1–3 أيام عمل لكل الولايات',
    },
    {
      icon: <RefreshCw size={18} strokeWidth={1.5} />,
      title: 'EASY EXCHANGE',
      titleAr: 'استبدال ميسر',
      desc: 'خلال 7 أيام من الاستلام',
    },
    {
      icon: <ShieldCheck size={18} strokeWidth={1.5} />,
      title: 'GUARANTEED QUALITY',
      titleAr: 'جودة فاخرة',
      desc: 'أقمشة كتان وقطن عُمانية',
    },
    {
      icon: <MessageCircle size={18} strokeWidth={1.5} />,
      title: 'WHATSAPP SUPPORT',
      titleAr: 'دعم الواتساب',
      desc: 'مساعدة واستشارات فورية',
    },
  ];

  return (
    <section className="py-10 bg-zinc-950 text-white font-sans border-t border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-right">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3.5">
              <div className="p-2.5 bg-zinc-900 text-zinc-300 border border-zinc-800 shrink-0">
                {item.icon}
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                  {item.title}
                </span>
                <h4 className="text-xs font-bold text-white">{item.titleAr}</h4>
                <p className="text-[11px] text-zinc-400 font-normal leading-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

