import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { ActiveTab } from '../types';
import { JHLogo } from './JHLogo';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onFilterCategory?: (categoryId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onFilterCategory }) => {
  return (
    <footer className="bg-black text-white border-t border-zinc-900 pt-16 pb-24 lg:pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-900 text-right">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <JHLogo variant="light" size="md" subtext="LUXURY MENSWEAR • NIZWA OMAN" />
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-normal max-w-sm">
              براند أزياء رجالية فاخرة تأسست في نزوى بسلطنة عُمان. نقدم تصاميم مينيمالية مستدامة بجودة تصنيع عالمية ومظهر يعكس الوقار والتميز.
            </p>

            <div className="pt-2 flex items-center gap-3 text-zinc-400">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 border border-zinc-800 hover:border-white hover:text-white transition-colors" aria-label="انستغرام">
                <Instagram size={16} />
              </a>
              <a href="https://wa.me/96890000000" target="_blank" rel="noreferrer" className="p-2 border border-zinc-800 hover:border-white hover:text-white transition-colors" aria-label="واتساب">
                <MessageCircle size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 border border-zinc-800 hover:border-white hover:text-white transition-colors" aria-label="تويتر">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-300">
              أقسام المتجر
            </h4>
            <ul className="space-y-2 text-xs font-medium text-zinc-400">
              <li>
                <button onClick={() => { setActiveTab('shop'); onFilterCategory?.('pants'); }} className="hover:text-white transition-colors">
                  بناطيل الكتان
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('shop'); onFilterCategory?.('tshirts'); }} className="hover:text-white transition-colors">
                  بولو ومحبوكات
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('shop'); onFilterCategory?.('shorts'); }} className="hover:text-white transition-colors">
                  شورتات كاجوال
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('shop'); onFilterCategory?.('shirts'); }} className="hover:text-white transition-colors">
                  قمصان ريسورت
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-300">
              عن البراند والخدمات
            </h4>
            <ul className="space-y-2 text-xs font-medium text-zinc-400">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">
                  عن JH STYLE
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-white transition-colors">
                  التواصل وموقع الفرع
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shipping')} className="hover:text-white transition-colors">
                  سياسة الشحن والتوصيل
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('privacy')} className="hover:text-white transition-colors">
                  سياسة الخصوصية
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('terms')} className="hover:text-white transition-colors">
                  الشروط والأحكام
                </button>
              </li>
            </ul>
          </div>

          {/* Oman Location Note */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-300">
              الفرع الرئيسي
            </h4>
            <div className="text-xs text-zinc-400 space-y-1">
              <p className="font-bold text-white">نزوى، سلطنة عُمان</p>
              <p>السوق المركزي، بالقرب من قلعة نزوى</p>
              <p className="font-mono pt-1 text-zinc-300">OMR • الريال العُماني</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 JH STYLE. All Rights Reserved.</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>DESIGNED FOR NIZWA & GLOBAL ELEGANCE</span>
            <span>•</span>
            <span>OMAN DELIVERY 1-3 DAYS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
