import React from 'react';
import { ArrowLeft } from 'lucide-react';
import navyShirtImg from '../assets/images/navy_shirt_1786180482702.jpg';

interface HeroProps {
  onShopNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] bg-black text-white flex items-center overflow-hidden">
      
      {/* Editorial Background Image with Studio Lighting Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={navyShirtImg}
          alt="JH STYLE Fashion Editorial"
          className="w-full h-full object-cover object-center opacity-75 filter grayscale-[20%] contrast-110 scale-105 transition-transform duration-1000"
        />
        {/* Soft studio gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl text-right">
          
          {/* Brand Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] uppercase tracking-[0.25em] font-mono mb-6">
            <span>JH STYLE • NIZWA COLLECTION 2026</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-widest text-white uppercase font-sans leading-[1.05] mb-2">
            JH STYLE
          </h1>

          {/* Editorial English Subtext Accent */}
          <span className="text-sm sm:text-base font-editorial italic text-zinc-400 tracking-widest uppercase block mb-3 font-normal">
            The Modern Omani Menswear Edit
          </span>

          {/* Arabic Sub-headline */}
          <p className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-100 tracking-tight mb-6 leading-tight">
            أناقة تُعبّر عنك
          </p>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-lg mb-10 font-normal">
            تصاميم أزياء رجالية معاصرة صُممت بدقة لتجمع بين المينيماليزم العصري وراحة الأقمشة العُمانية الفاخرة.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onShopNow}
              className="px-9 py-4 bg-white text-black font-bold text-sm tracking-wider uppercase hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 group shadow-xl"
            >
              <span>تسوق الآن</span>
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1 rotate-180" />
            </button>

            <button
              onClick={onShopNow}
              className="px-8 py-4 bg-transparent border border-white/40 text-white font-medium text-sm tracking-wider uppercase hover:border-white hover:bg-white/10 transition-all text-center"
            >
              اكتشف المجموعة الجديدة
            </button>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-6 pt-12 mt-12 border-t border-white/15 max-w-md">
            <div>
              <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">الخامات</p>
              <p className="text-xs sm:text-sm font-bold text-white mt-1">كتان وقطن وفاخر</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">التوصيل</p>
              <p className="text-xs sm:text-sm font-bold text-white mt-1">سريع لكل عُمان</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">المقر</p>
              <p className="text-xs sm:text-sm font-bold text-white mt-1">نزوى، سلطنة عُمان</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

