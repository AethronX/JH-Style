import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Ruler, HelpCircle } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'CM' | 'IN'>('CM');

  if (!isOpen) return null;

  const toUnit = (cmVal: number) => {
    if (unit === 'IN') {
      return (cmVal / 2.54).toFixed(1);
    }
    return cmVal.toString();
  };

  const rows = [
    { size: 'XS', shoulder: 42, chest: 96, length: 70, waist: 76 },
    { size: 'S', shoulder: 44, chest: 100, length: 72, waist: 80 },
    { size: 'M', shoulder: 46, chest: 106, length: 74, waist: 86 },
    { size: 'L', shoulder: 48, chest: 112, length: 76, waist: 92 },
    { size: 'XL', shoulder: 50, chest: 118, length: 78, waist: 98 },
    { size: 'XXL', shoulder: 52, chest: 124, length: 80, waist: 104 },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-sans text-right"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white w-full max-w-2xl p-6 sm:p-8 relative border border-zinc-200 shadow-2xl overflow-y-auto max-h-[90vh]"
        >
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 text-zinc-500 hover:text-black transition-colors rounded-full hover:bg-zinc-100"
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>

          <div className="flex items-center justify-between mb-4 border-b border-zinc-200 pb-4">
            <div className="flex items-center gap-2">
              <Ruler size={22} className="text-black" />
              <div>
                <h2 className="text-xl font-extrabold text-black tracking-tight">دليل المقاسات المعياري</h2>
                <p className="text-xs text-zinc-500 font-mono">
                  JH STYLE SIZE & FIT GUIDE
                </p>
              </div>
            </div>

            {/* Unit Toggle CM / IN */}
            <div className="flex items-center bg-zinc-100 p-1 border border-zinc-200 text-xs font-mono font-bold">
              <button
                onClick={() => setUnit('CM')}
                className={`px-3 py-1 transition-all ${
                  unit === 'CM' ? 'bg-black text-white shadow-sm' : 'text-zinc-600 hover:text-black'
                }`}
              >
                CM (سم)
              </button>
              <button
                onClick={() => setUnit('IN')}
                className={`px-3 py-1 transition-all ${
                  unit === 'IN' ? 'bg-black text-white shadow-sm' : 'text-zinc-600 hover:text-black'
                }`}
              >
                IN (إنش)
              </button>
            </div>
          </div>

          <p className="text-xs text-zinc-600 mb-6 leading-relaxed">
            تم إعداد مقاسات قطع JH STYLE بدقة عالية متوافقة مع معايير الفخامة العالمية لتضمن لك المظهر المتميز والراحة التامة أثناء الارتداء.
          </p>

          <div className="overflow-x-auto border border-zinc-200 mb-6">
            <table className="w-full text-center text-xs font-mono">
              <thead>
                <tr className="bg-black text-white uppercase tracking-wider">
                  <th className="p-3 border-b border-zinc-700">المقاس</th>
                  <th className="p-3 border-b border-zinc-700">الكتف ({unit})</th>
                  <th className="p-3 border-b border-zinc-700">الصدر ({unit})</th>
                  <th className="p-3 border-b border-zinc-700">الطول ({unit})</th>
                  <th className="p-3 border-b border-zinc-700">الخصر ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 font-sans">
                {rows.map((row) => (
                  <tr key={row.size} className="hover:bg-zinc-50 transition-colors">
                    <td className="p-3 font-extrabold font-mono text-sm text-black">{row.size}</td>
                    <td className="p-3 text-zinc-700">{toUnit(row.shoulder)}</td>
                    <td className="p-3 text-zinc-700">{toUnit(row.chest)}</td>
                    <td className="p-3 text-zinc-700">{toUnit(row.length)}</td>
                    <td className="p-3 text-zinc-700">{toUnit(row.waist)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure Section */}
          <div className="bg-zinc-50 border border-zinc-200 p-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-bold text-black uppercase mb-3">
              <HelpCircle size={16} />
              <span>كيفية أخذ القياسات بدقة (How to Measure):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-zinc-600">
              <div className="p-2.5 bg-white border border-zinc-200">
                <span className="font-bold text-black block mb-0.5">1. عرض الكتفين:</span>
                قس من النقطة البارزة في الكتف الأيمن مروراً بأعلى الظهر إلى الكتف الأيسر.
              </div>
              <div className="p-2.5 bg-white border border-zinc-200">
                <span className="font-bold text-black block mb-0.5">2. محيط الصدر:</span>
                قس حول أعرض منطقة في الصدر مع إبقاء شريط القياس مستوياً خلف الظهر.
              </div>
              <div className="p-2.5 bg-white border border-zinc-200">
                <span className="font-bold text-black block mb-0.5">3. الطول الكلي:</span>
                من أعلى نقطة في الكتف بجانب الياقة وصولاً إلى نهاية أسفل القطعة.
              </div>
              <div className="p-2.5 bg-white border border-zinc-200">
                <span className="font-bold text-black block mb-0.5">4. الخصر:</span>
                قس حول خط الخصر الطبيعي بمرونة مريحة دون شد الشريط.
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-black text-white font-bold py-3.5 text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors"
          >
            إغلاق دليل المقاسات
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
