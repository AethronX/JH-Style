export type CategoryId = 'all' | 'shirts' | 'tshirts' | 'pants' | 'shorts' | 'jackets' | 'sets' | 'accessories';

export interface Category {
  id: CategoryId;
  nameAr: string;
  nameEn: string;
  image: string;
  itemCount: number;
}

export interface ProductColor {
  nameAr: string;
  nameEn: string;
  hex: string;
}

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  price: number; // in OMR
  originalPrice?: number; // for discount offers
  category: CategoryId;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  badge?: 'جديد' | 'الأكثر مبيعاً' | 'حصري' | 'عرض خاص';
  descriptionAr: string;
  fabricAr: string;
  careAr: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isOffer?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: ProductSize;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  wilayah: string;
  address: string;
  notes: string;
  paymentMethod: 'cod' | 'bank_transfer';
}

export type ActiveTab = 'home' | 'shop' | 'about' | 'contact' | 'shipping' | 'privacy' | 'terms';
