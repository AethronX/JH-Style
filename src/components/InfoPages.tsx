import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface InfoPagesProps {
  page: 'about' | 'contact' | 'shipping' | 'privacy' | 'terms';
  onBackToShop: () => void;
}

export const InfoPages: React.FC<InfoPagesProps> = ({ page, onBackToShop }) => {
  const [formSent, setFormSent] = useState(false);

  return (
    <div className="py-12 sm:py-20 bg-white min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        
        {/* About Page */}
        {page === 'about' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="border-b border-zinc-200 pb-6">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">ABOUT BRAND</span>
              <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight mt-1">عن براند JH STYLE</h1>
              <p className="text-sm text-zinc-500 mt-2">الأناقة الرجالية الفاخرة ذات البصمة العُمانية المعاصرة.</p>
            </div>

            <div className="prose max-w-none text-zinc-700 space-y-6 leading-relaxed">
              <p className="text-base font-semibold text-black">
                تأسس براند <strong className="font-extrabold text-black">JH STYLE</strong> في ولاية نزوى التاريخية بسلطنة عُمان، بهدف تقديم مفهوم جديد ومبتكر للملابس الرجالية الفاخرة التي تجمع بين هيبة التصميم المينيمالي وجودة الأقمشة العالمية.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-zinc-50 border border-zinc-200">
                  <h3 className="font-bold text-lg text-black mb-2">رؤيتنا</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    أن نكون الوجهة الأولى للرجل الذي يبحث عن التميز بدون مبالغة، عبر تقديم تشكيلات أزياء حصرية تعكس النضج والأناقة الحقيقية.
                  </p>
                </div>

                <div className="p-6 bg-zinc-50 border border-zinc-200">
                  <h3 className="font-bold text-lg text-black mb-2">فلسفتنا في التصميم</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    "Style Without Compromise" — أن تكون أنيقاً دون التنازل عن الراحة أو الجودة أو الأصالة. نركز على الدقة المتناهية في القصات وخياطة التفاصيل الخفية.
                  </p>
                </div>
              </div>

              <p className="text-sm text-zinc-600">
                تسوق مجموعتنا الآن واستمتع بتجربة الشحن السريع الموثوق لكافة ولايات ومحافظات سلطنة عُمان.
              </p>

              <button
                onClick={onBackToShop}
                className="mt-6 px-8 py-3.5 bg-black text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors"
              >
                استكشف التشكيلة في المتجر
              </button>
            </div>
          </div>
        )}

        {/* Contact Page */}
        {page === 'contact' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="border-b border-zinc-200 pb-6">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">LOCATION & CONTACT</span>
              <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight mt-1">تواصل معنا وموقعنا</h1>
              <p className="text-sm text-zinc-500 mt-2">يسعدنا استقبال استفساراتكم وزيارتكم لفرعنا في نزوى.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Info column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-5 bg-zinc-50 border border-zinc-200 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-black shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-black">العنوان في نزوى:</h4>
                      <p className="text-xs text-zinc-600 mt-0.5">نزوى، السوق المركزي / بالقرب من قلعة نزوى التاريخية، سلطنة عُمان.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={20} className="text-black shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-black">الهاتف والواتساب:</h4>
                      <p className="text-xs text-zinc-600 font-mono mt-0.5" dir="ltr">+968 9000 0000</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={20} className="text-black shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-black">البريد الإلكتروني:</h4>
                      <p className="text-xs text-zinc-600 font-mono mt-0.5">contact@jhstyle-oman.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={20} className="text-black shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-black">ساعات العمل:</h4>
                      <p className="text-xs text-zinc-600 mt-0.5">السبت - الخميس: 9:00 صباحاً - 10:00 مساءً</p>
                      <p className="text-xs text-zinc-600">الجمعة: 4:00 عصراً - 10:00 مساءً</p>
                    </div>
                  </div>
                </div>

                {/* Map Preview placeholder */}
                <div className="aspect-video bg-zinc-200 border border-zinc-300 relative overflow-hidden flex flex-col items-center justify-center p-4 text-center">
                  <MapPin size={32} className="text-black mb-2 animate-bounce" />
                  <p className="font-extrabold text-sm text-black">NIZWA STORE LOCATION</p>
                  <p className="text-xs text-zinc-600">نزوى، سلطنة عُمان</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-7 bg-zinc-50 p-6 border border-zinc-200">
                <h3 className="font-extrabold text-lg text-black mb-4">أرسل لنا رسالة مباشرة</h3>
                
                {!formSent ? (
                  <form onSubmit={(e) => { e.preventDefault(); setFormSent(true); }} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-black mb-1">الاسم الكامل</label>
                      <input
                        type="text"
                        required
                        placeholder="أحمد العماني"
                        className="w-full bg-white border border-zinc-300 p-3 text-sm focus:border-black focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black mb-1">رقم الهاتف أو البريد</label>
                      <input
                        type="text"
                        required
                        placeholder="9XXXXXXX"
                        className="w-full bg-white border border-zinc-300 p-3 text-sm focus:border-black focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black mb-1">موضوع الرسالة</label>
                      <input
                        type="text"
                        required
                        placeholder="استفسار عن المقاسات أو الطلب..."
                        className="w-full bg-white border border-zinc-300 p-3 text-sm focus:border-black focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black mb-1">تفاصيل الرسالة</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="اكتب رسالتك هنا..."
                        className="w-full bg-white border border-zinc-300 p-3 text-sm focus:border-black focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-black text-white font-bold py-3.5 text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Send size={15} />
                      <span>إرسال الرسالة</span>
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-12 space-y-3">
                    <p className="text-base font-bold text-black">شكرًا لك! تم إرسال رسالتك بنجاح.</p>
                    <p className="text-xs text-zinc-600">سيتواصل معك فريق JH STYLE في أقرب وقت ممكن.</p>
                    <button
                      onClick={() => setFormSent(false)}
                      className="px-6 py-2 bg-black text-white text-xs font-bold uppercase"
                    >
                      إرسال رسالة أخرى
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Shipping & Returns Page */}
        {page === 'shipping' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="border-b border-zinc-200 pb-6">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">POLICIES</span>
              <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight mt-1">الشحن والاسترجاع</h1>
              <p className="text-sm text-zinc-500 mt-2">معلومات التوصيل لجميع ولايات سلطنة عُمان ودول الخليج.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-zinc-50 border border-zinc-200 space-y-2">
                <Truck size={24} className="text-black" />
                <h3 className="font-bold text-base text-black">توصيل سريع</h3>
                <p className="text-xs text-zinc-600">خلال 1 إلى 3 أيام عمل لجميع ولايات عُمان (مسقط، صلالة، صحار، نزوى...)</p>
              </div>

              <div className="p-6 bg-zinc-50 border border-zinc-200 space-y-2">
                <ShieldCheck size={24} className="text-black" />
                <h3 className="font-bold text-base text-black">شحن مجاني</h3>
                <p className="text-xs text-zinc-600">احصل على شحن مجاني لكافة الطلبات التي تتجاوز قيمتها 30 ر.ع.</p>
              </div>

              <div className="p-6 bg-zinc-50 border border-zinc-200 space-y-2">
                <RotateCcw size={24} className="text-black" />
                <h3 className="font-bold text-base text-black">استبدال مرن</h3>
                <p className="text-xs text-zinc-600">يمكنك طلب الاستبدال أو الاسترجاع خلال 7 أيام من تاريخ الاستلام.</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-zinc-700 leading-relaxed">
              <h3 className="font-bold text-sm text-black">شروط الاسترجاع والاستبدال:</h3>
              <ul className="list-disc list-inside space-y-1 text-zinc-600">
                <li>يجب أن تكون القطعة بحالتها الأصلية مع بطاقة السعر والعبوة الأصلية.</li>
                <li>عدم استخدام أو غسل المنتجات المراد استبدالها.</li>
                <li>يتم استرداد المبلغ بنفس طريقة الدفع الأصلية أو كرصيد متجر.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Privacy & Terms */}
        {(page === 'privacy' || page === 'terms') && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="border-b border-zinc-200 pb-6">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">LEGAL</span>
              <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight mt-1">
                {page === 'privacy' ? 'سياسة الخصوصية' : 'الشروط والأحكام'}
              </h1>
              <p className="text-sm text-zinc-500 mt-2">حقوقك والتزاماتك عند الاستخدام والتسوق من JH STYLE.</p>
            </div>

            <div className="space-y-4 text-xs text-zinc-600 leading-relaxed">
              <p>
                نحن في <strong className="text-black">JH STYLE</strong> نلتزم بحماية خصوصية بياناتك الشخصية بنسبة 100%. يتم استخدام معلوماتك فقط لتجهيز وشحن طلباتك والتواصل معك بشأن التحديثات.
              </p>
              <p>
                جميع الصور والتصاميم والشعارات الواردة في هذا المتجر مملوكة حكماً لبراند JH STYLE ومحمية بموجب قوانين الملكية الفكرية في سلطنة عُمان.
              </p>
            </div>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-zinc-200">
          <button
            onClick={onBackToShop}
            className="px-6 py-3 bg-black text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors"
          >
            العودة للمتجر الرئيسي
          </button>
        </div>

      </div>
    </div>
  );
};
