import React from 'react';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import linenPantsImg from '../assets/images/linen_pants_1786180447172.jpg';
import burgundyPoloImg from '../assets/images/burgundy_polo_1786180460135.jpg';
import linenShortsImg from '../assets/images/linen_shorts_1786180473045.jpg';
import navyShirtImg from '../assets/images/navy_shirt_1786180482702.jpg';

export const InstagramFeed: React.FC = () => {
  const posts = [
    {
      id: 1,
      image: navyShirtImg,
      likes: '1.2k',
      comments: '48',
      tag: 'Nizwa Studio',
    },
    {
      id: 2,
      image: burgundyPoloImg,
      likes: '942',
      comments: '31',
      tag: 'Retro Polo',
    },
    {
      id: 3,
      image: linenPantsImg,
      likes: '2.4k',
      comments: '89',
      tag: 'Relaxed Linen',
    },
    {
      id: 4,
      image: linenShortsImg,
      likes: '1.8k',
      comments: '56',
      tag: 'Summer Vibe',
    },
  ];

  return (
    <section className="py-20 bg-zinc-50 text-zinc-900 font-sans border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="max-w-xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-[10px] font-mono tracking-widest uppercase">
            <Instagram size={13} />
            <span>INSTAGRAM EDITORIAL</span>
          </div>
          <h2 className="text-3xl font-extrabold text-black font-serif tracking-tight">
            شاركونا إطلالاتكم عبر @JHSTYLE.OM
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            من قلب نزوى إلى كافة أنحاء سلطنة عُمان، استلهم طريقة تنسيق القطع الفاخرة من مجتمع زبائننا المميزين.
          </p>
        </div>

        {/* 4-Column Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square bg-zinc-900 overflow-hidden border border-zinc-200 block shadow-sm"
            >
              <img
                src={post.image}
                alt="JH STYLE Instagram"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />

              {/* Hover Dark Overlay with Stats */}
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 gap-3">
                <Instagram size={24} className="text-white" />
                <div className="flex items-center gap-4 text-xs font-mono font-bold">
                  <span className="flex items-center gap-1">
                    <Heart size={14} className="fill-white" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    {post.comments}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase border-t border-zinc-700 pt-2 w-full text-center">
                  #{post.tag}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* CTA Link */}
        <div className="mt-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white hover:bg-zinc-800 text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-md"
          >
            <Instagram size={16} />
            <span>متابعة صفحة انستغرام الرسمي</span>
          </a>
        </div>

      </div>
    </section>
  );
};
