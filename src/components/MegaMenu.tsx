import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { CategoryId } from '../types';
import burgundyPoloImg from '../assets/images/burgundy_polo_1786180460135.jpg';
import navyShirtImg from '../assets/images/navy_shirt_1786180482702.jpg';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryId: CategoryId) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="hidden lg:block absolute top-full right-0 left-0 bg-white border-b border-zinc-200 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-12 gap-8 text-right">
          
          {/* Column 1: Tops / العلوي */}
          <div className="col-span-3 space-y-4">
            <h3 className="text-xs font-mono font-bold tracking-[0.25em] text-zinc-400 uppercase">
              القطع العلوية • TOPS
            </h3>
            <ul className="space-y-3 text-sm font-medium text-zinc-800">
              <li>
                <button
                  onClick={() => { onSelectCategory('shirts'); onClose(); }}
                  className="hover:text-black hover:translate-x-[-4px] transition-all flex items-center gap-2 group w-full justify-start text-right"
                >
                  <span className="w-1.5 h-1.5 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>قمصان ريسورت فاخرة</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategory('tshirts'); onClose(); }}
                  className="hover:text-black hover:translate-x-[-4px] transition-all flex items-center gap-2 group w-full justify-start text-right"
                >
                  <span className="w-1.5 h-1.5 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>بولو محبوك وريترو</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategory('tshirts'); onClose(); }}
                  className="hover:text-black hover:translate-x-[-4px] transition-all flex items-center gap-2 group w-full justify-start text-right text-zinc-500"
                >
                  <span className="w-1.5 h-1.5 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>تيشيرتات قطنية أوفرسايز</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Bottoms / السفلي */}
          <div className="col-span-3 space-y-4">
            <h3 className="text-xs font-mono font-bold tracking-[0.25em] text-zinc-400 uppercase">
              القطع السفلية • BOTTOMS
            </h3>
            <ul className="space-y-3 text-sm font-medium text-zinc-800">
              <li>
                <button
                  onClick={() => { onSelectCategory('pants'); onClose(); }}
                  className="hover:text-black hover:translate-x-[-4px] transition-all flex items-center gap-2 group w-full justify-start text-right"
                >
                  <span className="w-1.5 h-1.5 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>بناطيل كتان مريحة</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategory('shorts'); onClose(); }}
                  className="hover:text-black hover:translate-x-[-4px] transition-all flex items-center gap-2 group w-full justify-start text-right"
                >
                  <span className="w-1.5 h-1.5 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>شورتات صيفية كاجوال</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategory('all'); onClose(); }}
                  className="hover:text-black hover:translate-x-[-4px] transition-all flex items-center gap-2 group w-full justify-start text-right text-zinc-500"
                >
                  <span className="w-1.5 h-1.5 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>أطقم متناسقة (Sets)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Discover / اكتشف */}
          <div className="col-span-3 space-y-4 border-r border-zinc-100 pr-6">
            <h3 className="text-xs font-mono font-bold tracking-[0.25em] text-zinc-400 uppercase flex items-center gap-1.5">
              <Sparkles size={13} className="text-black" />
              <span>اكتشف التشكيلات</span>
            </h3>
            <ul className="space-y-3 text-sm font-medium text-zinc-800">
              <li>
                <button
                  onClick={() => { onSelectCategory('all'); onClose(); }}
                  className="hover:text-black transition-colors flex items-center justify-between w-full"
                >
                  <span>وصل حديثاً (New Season)</span>
                  <span className="text-[10px] bg-black text-white px-2 py-0.5 font-mono">NEW</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategory('all'); onClose(); }}
                  className="hover:text-black transition-colors flex items-center justify-between w-full"
                >
                  <span>الأكثر طلباً في عُمان</span>
                  <span className="text-[10px] bg-zinc-100 text-zinc-800 px-2 py-0.5 font-mono">HOT</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategory('all'); onClose(); }}
                  className="hover:text-black transition-colors flex items-center justify-between w-full"
                >
                  <span>مجموعة الكتان للطقس الدافئ</span>
                  <ArrowLeft size={14} className="rotate-180 text-zinc-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Editorial Card Preview */}
          <div className="col-span-3">
            <div className="relative aspect-[4/3] bg-zinc-900 group overflow-hidden border border-zinc-200">
              <img
                src={navyShirtImg}
                alt="JH STYLE Editorial"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-white">
                <span className="text-[9px] font-mono tracking-widest text-zinc-300 uppercase">
                  EDITORIAL CAMPAIGN 2026
                </span>
                <p className="text-sm font-bold mt-1">THE RESORT COLLECTION</p>
                <button
                  onClick={() => { onSelectCategory('all'); onClose(); }}
                  className="mt-2 text-[11px] underline underline-offset-4 text-zinc-200 hover:text-white font-medium flex items-center gap-1"
                >
                  <span>استكشف التشكيلة</span>
                  <ArrowLeft size={12} className="rotate-180" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
