import React from 'react';
import { Shield, Sparkles, MapPin, Feather } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-20 bg-zinc-950 text-white relative overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
            HERITAGE & CRAFTSMANSHIP
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-white tracking-widest mt-2 uppercase">
            JH STYLE — NIZWA OMAN
          </h2>
          <p className="text-xl font-medium text-zinc-300 mt-3">
            من عراقة نزوى إلى أفق الموضة العالمية
          </p>
          <div className="w-12 h-0.5 bg-zinc-700 mx-auto mt-6" />
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="p-6 bg-zinc-900/60 border border-zinc-800 text-right space-y-3">
            <MapPin size={24} className="text-white mb-2" />
            <h3 className="text-base font-bold text-white">نزوى — البداية</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              تأسس البراند في ولاية نزوى، العاصمة الثقافية والتاريخية لسلطنة عُمان، ليستوحي من عراقتها الهيبة والوقار ودمجها مع أساليب الحياكة الفاخرة.
            </p>
          </div>

          <div className="p-6 bg-zinc-900/60 border border-zinc-800 text-right space-y-3">
            <Feather size={24} className="text-white mb-2" />
            <h3 className="text-base font-bold text-white">الخامات الفاخرة</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              نختار بعناية فائقة أنقى أنواع القطن المصري المحبوك، والكتان البيئي الطبيعي، وخيوط الصوف الإيطالية المريحة للبشرة.
            </p>
          </div>

          <div className="p-6 bg-zinc-900/60 border border-zinc-800 text-right space-y-3">
            <Sparkles size={24} className="text-white mb-2" />
            <h3 className="text-base font-bold text-white">المينيماليزم العصري</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              نؤمن بالتصميم الهادئ الخالي من الشعارات المزدحمة. الجمال الحقيقي يكمن في جودة القصة ودقة التفاصيل وحضورك الواثق.
            </p>
          </div>

          <div className="p-6 bg-zinc-900/60 border border-zinc-800 text-right space-y-3">
            <Shield size={24} className="text-white mb-2" />
            <h3 className="text-base font-bold text-white">الالتزام بالجودة</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              كل قطعة تخضع لمراقبة دقيقة قبل وصولها إليك، مع ضمان التوصيل المباشر الموثوق لكافة محافظات ومدن السلطنة.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
