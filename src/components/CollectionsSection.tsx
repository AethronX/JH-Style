import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { CategoryId } from '../types';
import linenPantsImg from '../assets/images/linen_pants_1786180447172.jpg';
import burgundyPoloImg from '../assets/images/burgundy_polo_1786180460135.jpg';
import linenShortsImg from '../assets/images/linen_shorts_1786180473045.jpg';
import navyShirtImg from '../assets/images/navy_shirt_1786180482702.jpg';

interface CollectionsSectionProps {
  onSelectCollection: (categoryId: CategoryId) => void;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
  onSelectCollection,
}) => {
  const collections = [
    {
      id: 'shirts',
      titleAr: 'مجموعة الكتان والأجواء الدافئة',
      titleEn: 'RESORT LINEN COLLECTION',
      descAr: 'تصاميم كتان طبيعية خفيفة تمنحك الانتعاش والأناقة المطلقة في اللقاءات والمناسبات.',
      image: navyShirtImg,
      badge: 'موسم 2026',
    },
    {
      id: 'tshirts',
      titleAr: 'المحبوكات وقمصان البولو الريترو',
      titleEn: 'RETRO KNIT POLOS',
      descAr: 'حياكة مضلعة دقيقة بياقات مفتوحة مستوحاة من أناقة الثمانينات برؤية عصرية.',
      image: burgundyPoloImg,
      badge: 'الأكثر طلبًا',
    },
    {
      id: 'pants',
      titleAr: 'أساسيات الخزانة الفاخرة',
      titleEn: 'THE ESSENTIAL TROUSERS',
      descAr: 'بناطيل بقصات انسيابية مريحة مع حواف ممتازة لطلة يومية راقية.',
      image: linenPantsImg,
      badge: 'أناقة دائمة',
    },
    {
      id: 'shorts',
      titleAr: 'إطلالات العطلة والنزهات',
      titleEn: 'WEEKEND & RESORT SHORTS',
      descAr: 'شورتات كتان بخامات مسامية وتفاصيل مرنة مصممة لراحة استثنائية.',
      image: linenShortsImg,
      badge: 'إصدار محدود',
    },
  ];

  return (
    <section className="py-20 bg-white text-zinc-900 font-sans border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-zinc-200 text-right">
          <div>
            <span className="text-xs font-mono text-zinc-400 tracking-[0.3em] uppercase block mb-2">
              CURATED EDITORIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
              المجموعات الحصرية <span className="font-editorial text-2xl sm:text-3xl font-normal text-zinc-600 uppercase mr-2">• COLLECTIONS</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2 md:mt-0 max-w-sm">
            مجموعات أزياء مصممة بحس تحريري عالٍ لتعكس شخصيتك في كل مناسبة.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCollection(item.id as CategoryId)}
              className="group cursor-pointer relative bg-zinc-900 border border-zinc-200 overflow-hidden text-right shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image background */}
              <div className="aspect-[16/10] sm:aspect-[16/9] relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.titleAr}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-black text-[10px] font-mono tracking-widest px-3 py-1 font-bold uppercase">
                  {item.badge}
                </div>
              </div>

              {/* Text content overlay */}
              <div className="p-6 sm:p-8 bg-black text-white space-y-2 border-t border-zinc-800">
                <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
                  {item.titleEn}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                  {item.titleAr}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal pt-1">
                  {item.descAr}
                </p>

                <div className="pt-4 flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest group-hover:gap-3 transition-all">
                  <span>اكتشف القطع المشاركة</span>
                  <ArrowLeft size={16} className="rotate-180" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
