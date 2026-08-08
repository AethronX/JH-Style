import React, { useEffect } from 'react';
import { CheckCircle2, ShoppingBag, Heart } from 'lucide-react';

interface NotificationToastProps {
  message: string;
  type?: 'cart' | 'wishlist' | 'general';
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  type = 'cart',
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 sm:bottom-6 sm:left-6 sm:translate-x-0 z-50 bg-black text-white px-5 py-3.5 shadow-2xl border border-zinc-700 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
      {type === 'cart' && <ShoppingBag size={18} className="text-white shrink-0" />}
      {type === 'wishlist' && <Heart size={18} className="text-white fill-white shrink-0" />}
      {type === 'general' && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}

      <span className="text-xs font-bold tracking-wide font-sans">{message}</span>
    </div>
  );
};
