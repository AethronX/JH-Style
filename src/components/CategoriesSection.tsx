import React from 'react';
import { Category } from '../types';
import { ArrowLeft } from 'lucide-react';

interface CategoriesSectionProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-zinc-200 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-mono">
              THE COLLECTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mt-1">
              اكتشف مجموعتك
            </h2>
          </div>
          <p className="text-sm text-zinc-500 max-w-sm mt-2 sm:mt-0 font-normal">
            تصنيفات متكاملة تناسب أسلوب حياتك اليومي والمناسبات الخاصة بأسلوب أنيق.
          </p>
        </div>

        {/* Editorial Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group text-right focus:outline-none flex flex-col"
            >
              {/* Image Box */}
              <div className="relative aspect-[3/4] w-full bg-zinc-100 overflow-hidden mb-3">
                <img
                  src={cat.image}
                  alt={cat.nameAr}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter grayscale contrast-105 img-zoom"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                
                {/* Count Badge */}
                <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5">
                  {cat.itemCount} قطع
                </div>
              </div>

              {/* Title & Arrow */}
              <div className="flex items-center justify-between pt-1 border-t border-zinc-200 group-hover:border-black transition-colors">
                <div>
                  <h3 className="text-sm font-bold text-black group-hover:underline">
                    {cat.nameAr}
                  </h3>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
                    {cat.nameEn}
                  </span>
                </div>
                <ArrowLeft
                  size={14}
                  className="text-zinc-400 group-hover:text-black group-hover:-translate-x-1 transition-all"
                />
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
