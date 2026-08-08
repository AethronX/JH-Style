import React from 'react';
import { ArrowLeft } from 'lucide-react';
import navyShirtImg from '../assets/images/navy_shirt_1786180482702.jpg';

interface EditorialBannerProps {
  onDiscover: () => void;
}

export const EditorialBanner: React.FC<EditorialBannerProps> = ({ onDiscover }) => {
  return (
    <section className="py-16 sm:py-24 bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Box (RTL Layout) */}
          <div className="lg:col-span-6 space-y-6 z-10 text-right">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-mono">
              EDITORIAL CAMPAIGN • 2026
            </span>

            <h2 className="text-4xl sm:text-6xl font-editorial tracking-wider text-white uppercase leading-tight font-normal">
              THE JH STYLE EDIT
            </h2>

            <p className="text-2xl sm:text-3xl font-medium text-zinc-100 tracking-tight">
              تفاصيل تصنع الفرق
            </p>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
              نهج متقدم في صناعة الأزياء الرجالية. نحن ندمج جودة الأقمشة الإيطالية والكتان والقطن الفاخر لتقديم قطع راقية بدقة تامة.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onDiscover}
                className="px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-3 group"
              >
                <span>اكتشف التشكيلة الحصرية</span>
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Fashion Photography */}
          <div className="lg:col-span-6 relative aspect-[4/5] bg-zinc-900 overflow-hidden border border-zinc-800">
            <img
              src={navyShirtImg}
              alt="THE JH STYLE EDIT Editorial"
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[10px] text-zinc-300 font-mono">
              NIZWA STUDIO • SEAMLESS TAILORING
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
