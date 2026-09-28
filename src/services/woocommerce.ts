import { Product, Category, Review, Coupon } from '@/types';

// Mock Categories based on requirements
export const MOCK_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Necklaces',
    slug: 'necklaces',
    description: 'Timeless luxury necklaces crafted for regal elegance.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    count: 24,
    featured: true,
  },
  {
    id: 2,
    name: 'Long Haarams',
    slug: 'long-haarams',
    description: 'Traditional long bridal haarams embellished with royal craftsmanship.',
    image: '/images/long-haarams.png',
    count: 18,
    featured: true,
  },
  {
    id: 3,
    name: 'Chokers',
    slug: 'chokers',
    description: 'Modern statement chokers with intricate stone & pearl inlay.',
    image: '/images/chokers.png',
    count: 15,
    featured: true,
  },
  {
    id: 4,
    name: 'Temple Jewellery',
    slug: 'temple-jewellery',
    description: 'Divine heritage motifs handcrafted in antique matte gold finish.',
    image: '/images/temple-jewellery.png',
    count: 32,
    featured: true,
  },
  {
    id: 5,
    name: 'AD Stone Jewellery',
    slug: 'ad-stone-jewellery',
    description: 'Sparkling American Diamond stones with high-clarity radiance.',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800&auto=format&fit=crop',
    count: 28,
    featured: true,
  },
  {
    id: 6,
    name: 'Anti Tarnish Jewellery',
    slug: 'anti-tarnish-jewellery',
    description: 'Waterproof, everyday luxury designs that maintain brilliant shine forever.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
    count: 22,
    featured: true,
  },
  {
    id: 7,
    name: 'Bangles & Bracelets',
    slug: 'bangles-bracelets',
    description: 'Ornate kada bangles and flexible charm bracelets.',
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=800&auto=format&fit=crop',
    count: 20,
    featured: true,
  },
  {
    id: 8,
    name: 'Earrings',
    slug: 'earrings',
    description: 'Jhumkas, chandbalis, studs and cascading drop earrings.',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop',
    count: 35,
    featured: true,
  },
  {
    id: 9,
    name: 'Finger Rings',
    slug: 'finger-rings',
    description: 'Adjustable solitaire and floral statement rings.',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop',
    count: 16,
  },
  {
    id: 10,
    name: 'Hip Belts (Oddiyanam)',
    slug: 'hip-belts-oddiyanam',
    description: 'Royal bridal waist belts for traditional grandeur.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    count: 10,
  },
  {
    id: 11,
    name: 'Maang Tikkas',
    slug: 'maang-tikkas',
    description: 'Elegant fore-head jewelry to complete your ethnic look.',
    image: 'https://images.unsplash.com/photo-1611591475281-b3ed997a61d1?q=80&w=800&auto=format&fit=crop',
    count: 14,
  },
];

// Mock Products curated for Charmika By Lekshmi
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 101,
    name: 'Royal Heritage Temple Nakshi Haaram',
    slug: 'royal-heritage-temple-nakshi-haaram',
    sku: 'CBL-TH-001',
    price: 18499,
    regularPrice: 22999,
    salePrice: 18499,
    onSale: true,
    isNew: true,
    isBestSeller: true,
    isRentalAvailable: true,
    rentalPricePerDay: 899,
    securityDeposit: 3000,
    stockStatus: 'instock',
    rating: 4.9,
    reviewCount: 42,
    category: 'Temple Jewellery',
    categorySlug: 'temple-jewellery',
    jewelleryType: 'Temple Jewellery',
    shortDescription: 'Exquisite handcrafted Lakshmi motif long haaram in antique 22k gold polish with ruby cabochons & emerald accents.',
    description: 'Imbued with royal heritage, the Royal Heritage Temple Nakshi Haaram is a centerpiece of artisanal brilliance. Hand-carved with Goddess Lakshmi motifs framed by mythological peacocks, this long necklace is designed for brides who cherish timeless tradition.',
    images: [
      { id: 1, src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop', alt: 'Royal Heritage Temple Haaram Front View' },
      { id: 2, src: 'https://images.unsplash.com/photo-1611591475281-b3ed997a61d1?q=80&w=1000&auto=format&fit=crop', alt: 'Royal Heritage Temple Haaram Detail' },
      { id: 3, src: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop', alt: 'Model wearing Temple Haaram' },
    ],
    specifications: {
      material: 'Brass base alloy with 22kt Gold Plating',
      plating: 'Antique Matte Gold',
      stoneType: 'Synthetic Rubies, Emeralds & South Sea Pearls',
      weight: '145 grams',
      dimensions: 'Necklace Length: 28 inches (Adjustable dori)',
      careInstructions: 'Keep away from moisture, direct perfume spray, and store in an airtight pouch.',
    },
    reviewsList: [
      {
        id: 'rev-1',
        author: 'Anjali Menon',
        rating: 5,
        date: '2026-06-14',
        comment: 'Absolutely breathtaking piece! Wore it for my wedding reception and received endless compliments.',
        verified: true,
      },
      {
        id: 'rev-2',
        author: 'Priya Varma',
        rating: 5,
        date: '2026-07-02',
        comment: 'The rental service was smooth and seamless. The jewellery arrived in pristine condition with safety box.',
        verified: true,
      },
    ],
  },
  {
    id: 102,
    name: 'Celestial AD Diamond Cascading Choker Set',
    slug: 'celestial-ad-diamond-cascading-choker-set',
    sku: 'CBL-AD-002',
    price: 12999,
    regularPrice: 15999,
    salePrice: 12999,
    onSale: true,
    isNew: true,
    isBestSeller: true,
    isRentalAvailable: true,
    rentalPricePerDay: 649,
    securityDeposit: 2500,
    stockStatus: 'instock',
    rating: 4.8,
    reviewCount: 36,
    category: 'Chokers',
    categorySlug: 'chokers',
    jewelleryType: 'AD Stone',
    shortDescription: 'Ultra-luminous CZ & AD stone collar choker with emerald drop accents and matching drop earrings.',
    description: 'Embrace high-society sophistication with our Celestial AD Diamond Cascading Choker Set. Crafted with micro-pave AAA grade cubic zirconia stones set in platinum-rhodium finish.',
    images: [
      { id: 1, src: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop', alt: 'Celestial AD Choker Front' },
      { id: 2, src: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop', alt: 'Earrings Pair' },
    ],
    specifications: {
      material: 'Copper alloy with Rhodium & Rose Gold plating',
      plating: 'High-polish Silver Rhodium',
      stoneType: 'AAA+ Cubic Zirconia / American Diamonds',
      weight: '98 grams',
      dimensions: 'Choker Diameter: 14 cm (Flexible back strap)',
      careInstructions: 'Avoid direct contact with alcohol based products.',
    },
  },
  {
    id: 103,
    name: 'Maharani Bridal Kundan & Pearl Combo Set',
    slug: 'maharani-bridal-kundan-pearl-combo-set',
    sku: 'CBL-CM-003',
    price: 26999,
    regularPrice: 34999,
    salePrice: 26999,
    onSale: true,
    isBestSeller: true,
    isRentalAvailable: true,
    rentalPricePerDay: 1299,
    securityDeposit: 5000,
    isCombo: true,
    comboSaveAmount: 8000,
    stockStatus: 'instock',
    rating: 5.0,
    reviewCount: 58,
    category: 'Combo Collection',
    categorySlug: 'combo-collection',
    jewelleryType: 'Kundan',
    shortDescription: 'Complete 5-piece bridal ensemble: Choker, Long Haaram, Earrings, Maang Tikka & Pair of Bangles.',
    description: 'The ultimate royal bridal experience. This signature Maharani Set includes a heavy Meenakari hand-painted back choker, a cascading long pearl haaram, matching chandelier earrings, Maang Tikka, and handcrafted kada bangles.',
    images: [
      { id: 1, src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop', alt: 'Maharani Bridal Set' },
      { id: 2, src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop', alt: 'Bridal Set Close up' },
    ],
    specifications: {
      material: 'Pure Brass with Handcrafted Meenakari & Gold Foil',
      plating: '22k Micro Gold Electroplate',
      stoneType: 'Glass Kundan, Uncut Emerald Glass, Basra Pearls',
      weight: '320 grams total set',
      dimensions: 'Complete 5-piece Bridal Box',
      careInstructions: 'Wipe with soft cotton after use.',
    },
  },
  {
    id: 104,
    name: 'Everyday Luxe Anti-Tarnish Gold Snake Chain',
    slug: 'everyday-luxe-anti-tarnish-gold-snake-chain',
    sku: 'CBL-AT-004',
    price: 2499,
    regularPrice: 3199,
    salePrice: 2499,
    onSale: true,
    isNew: true,
    stockStatus: 'outofstock',
    rating: 4.7,
    reviewCount: 19,
    category: 'Anti Tarnish Jewellery',
    categorySlug: 'anti-tarnish-jewellery',
    jewelleryType: 'Anti Tarnish',
    shortDescription: '18k Gold PVD coated stainless steel waterproof chain. Sweatproof, tarnish-proof, hypoallergenic.',
    description: 'Designed for the modern woman on the go. Shower, swim, and shine without worrying about fading or skin irritation.',
    images: [
      { id: 1, src: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop', alt: 'Anti Tarnish Chain' },
    ],
    specifications: {
      material: '316L Surgical Grade Stainless Steel',
      plating: '18k Real Gold PVD Vacuum Coating',
      stoneType: 'None',
      weight: '18 grams',
      dimensions: '18 inches + 2 inch extension',
      careInstructions: '100% Waterproof. Easy soap water rinse.',
    },
  },
  {
    id: 105,
    name: 'Antique Peacock Oddiyanam (Hip Belt)',
    slug: 'antique-peacock-oddiyanam-hip-belt',
    sku: 'CBL-HB-005',
    price: 14500,
    regularPrice: 17999,
    salePrice: 14500,
    onSale: true,
    isRentalAvailable: true,
    rentalPricePerDay: 750,
    securityDeposit: 3000,
    stockStatus: 'instock',
    rating: 4.9,
    reviewCount: 27,
    category: 'Hip Belts (Oddiyanam)',
    categorySlug: 'hip-belts-oddiyanam',
    jewelleryType: 'Temple Jewellery',
    shortDescription: 'Traditional adjustable waist belt with dancing peacock engravings and ghungroo drop beads.',
    description: 'Accentuating the bridal silhouette, this classical Kerala & Tamil style Oddiyanam features adjustable side links to comfortably fit waist sizes from 26 to 42 inches.',
    images: [
      { id: 1, src: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=1000&auto=format&fit=crop', alt: 'Peacock Oddiyanam' },
    ],
    specifications: {
      material: 'Copper base alloy with antique dull gold polish',
      plating: 'Matte Temple Gold',
      stoneType: 'Ruby & Emerald doublet stones',
      weight: '160 grams',
      dimensions: 'Adjustable length 26" - 42"',
      careInstructions: 'Store flat in a padded box.',
    },
  },
  {
    id: 106,
    name: 'Emerald Royale AD Drop Jhumkas',
    slug: 'emerald-royale-ad-drop-jhumkas',
    sku: 'CBL-ER-006',
    price: 4999,
    regularPrice: 6499,
    salePrice: 4999,
    onSale: true,
    isBestSeller: true,
    isRentalAvailable: true,
    rentalPricePerDay: 299,
    securityDeposit: 1000,
    stockStatus: 'instock',
    rating: 4.8,
    reviewCount: 49,
    category: 'Earrings',
    categorySlug: 'earrings',
    jewelleryType: 'AD Stone',
    shortDescription: 'Grand dome jhumkas encircled with sparkling diamonds and hanging teardrop emerald stones.',
    description: 'Statement jhumkas designed to capture light from every angle. Lightweight construction ensures maximum comfort during festive dance nights.',
    images: [
      { id: 1, src: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop', alt: 'Emerald AD Jhumkas' },
    ],
    specifications: {
      material: 'Brass base alloy',
      plating: 'High-gloss White Gold Rhodium',
      stoneType: 'Hand-set AAA CZ & Hydro Emeralds',
      weight: '42 grams pair',
      dimensions: 'Length: 3.5 inches',
      careInstructions: 'Keep in a dry case.',
    },
  },
  {
    id: 107,
    name: 'Kottayam Grace Pearl & Ruby Short Choker',
    slug: 'kottayam-grace-pearl-ruby-short-choker',
    sku: 'CBL-NK-007',
    price: 8999,
    regularPrice: 10999,
    salePrice: 8999,
    onSale: true,
    isNew: true,
    isRentalAvailable: true,
    rentalPricePerDay: 450,
    securityDeposit: 1800,
    stockStatus: 'instock',
    rating: 4.9,
    reviewCount: 21,
    category: 'Necklaces',
    categorySlug: 'necklaces',
    jewelleryType: 'Gold Plated',
    shortDescription: 'Traditional Kerala Palakka motif choker re-imagined with freshwater pearl clusters.',
    description: 'Dedicated to our roots in Kottayam, this choker merges Kerala heritage green palakka leaf motifs with lustrous pearl strands.',
    images: [
      { id: 1, src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop', alt: 'Kottayam Grace Choker' },
    ],
    specifications: {
      material: 'Brass with 24k Gold Electroplating',
      plating: '24kt Micro Gold',
      stoneType: 'Green Palakka Glass & Cultured Pearls',
      weight: '65 grams',
      dimensions: '14 inches choker with silk thread drawstring',
      careInstructions: 'Avoid moisture contact.',
    },
  },
  {
    id: 108,
    name: 'Regal Ruby Floral Statement Ring',
    slug: 'regal-ruby-floral-statement-ring',
    sku: 'CBL-RG-008',
    price: 1899,
    regularPrice: 2499,
    salePrice: 1899,
    onSale: true,
    stockStatus: 'instock',
    rating: 4.6,
    reviewCount: 14,
    category: 'Finger Rings',
    categorySlug: 'finger-rings',
    jewelleryType: 'AD Stone',
    shortDescription: 'Over-sized floral cocktail ring with rubies and brilliant solitaire center stone.',
    description: 'An eye-catching ring that adds instant glamour to saree drapes and lehenga skirts.',
    images: [
      { id: 1, src: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop', alt: 'Floral Statement Ring' },
    ],
    specifications: {
      material: 'Brass alloy',
      plating: 'Rose Gold Finish',
      stoneType: 'Synthetic Ruby & Cubic Zirconia',
      weight: '14 grams',
      dimensions: 'Adjustable size (Fits sizes 12 to 20)',
      careInstructions: 'Wipe dry with cloth.',
    },
  },
];

export const MOCK_COUPONS: Coupon[] = [
  { code: 'WELCOME10', discountType: 'percentage', amount: 10, minSpend: 0 },
  { code: 'CHARMIKA10', discountType: 'percentage', amount: 10, minSpend: 2000 },
  { code: 'ROYAL500', discountType: 'fixed', amount: 500, minSpend: 5000 },
  { code: 'BRIDAL15', discountType: 'percentage', amount: 15, minSpend: 15000 },
];

export class WooCommerceService {
  private static baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL || '';
  private static consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
  private static consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

  // Internal helper for fetching from Woo API securely
  private static async fetchWooAPI(endpoint: string) {
    // Only fetch if keys are available
    if (!this.baseUrl || !this.consumerKey || !this.consumerSecret) return null;
    
    try {
      const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
      const url = `${this.baseUrl.replace(/\/$/, '')}/wp-json/wc/v3/${endpoint}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        // Cache revalidation time (e.g., 60 seconds)
        next: { revalidate: 60 }
      });
      
      if (!response.ok) return null;
      return await response.json();
    } catch (e) {
      console.error('WooCommerce Fetch Error:', e);
      return null;
    }
  }

  // Map WooCommerce product schema to our custom Product schema
  private static mapWooProduct(wooProduct: any): Product {
    const getAttribute = (name: string) => {
      const attr = wooProduct.attributes?.find((a: any) => a.name.toLowerCase() === name.toLowerCase());
      return attr ? attr.options[0] : '';
    };
    const getMeta = (key: string) => {
      const meta = wooProduct.meta_data?.find((m: any) => m.key === key);
      return meta ? meta.value : null;
    };

    return {
      id: wooProduct.id,
      name: wooProduct.name,
      slug: wooProduct.slug,
      sku: wooProduct.sku || `SKU-${wooProduct.id}`,
      price: parseFloat(wooProduct.price || '0'),
      regularPrice: parseFloat(wooProduct.regular_price || wooProduct.price || '0'),
      salePrice: wooProduct.sale_price ? parseFloat(wooProduct.sale_price) : undefined,
      onSale: wooProduct.on_sale,
      isNew: getAttribute('New') === 'Yes',
      isBestSeller: getAttribute('Bestseller') === 'Yes',
      isRentalAvailable: getAttribute('Rental Available') === 'Yes',
      rentalPricePerDay: parseFloat(getMeta('_rental_price') || '0'),
      securityDeposit: parseFloat(getMeta('_security_deposit') || '0'),
      stockStatus: wooProduct.stock_status,
      rating: parseFloat(wooProduct.average_rating || '0'),
      reviewCount: wooProduct.rating_count || 0,
      category: wooProduct.categories?.[0]?.name || 'Uncategorized',
      categorySlug: wooProduct.categories?.[0]?.slug || 'uncategorized',
      jewelleryType: getAttribute('Jewellery Type') as any || 'Gold Plated',
      shortDescription: wooProduct.short_description?.replace(/<[^>]+>/g, '') || '',
      description: wooProduct.description?.replace(/<[^>]+>/g, '') || '',
      images: wooProduct.images?.length ? wooProduct.images.map((img: any) => ({
        id: img.id,
        src: img.src,
        alt: img.alt || wooProduct.name
      })) : [{ id: 1, src: '/images/placeholder.jpg', alt: wooProduct.name }],
      specifications: {
        material: getAttribute('Material') || '',
        plating: getAttribute('Plating') || '',
        stoneType: getAttribute('Stone Type') || '',
        weight: wooProduct.weight ? `${wooProduct.weight} g` : '',
        dimensions: wooProduct.dimensions ? `${wooProduct.dimensions.length}x${wooProduct.dimensions.width}x${wooProduct.dimensions.height}` : '',
        careInstructions: getAttribute('Care Instructions') || 'Wipe with soft cloth.',
      },
    };
  }

  // Get All Categories
  static async getCategories(): Promise<Category[]> {
    if (typeof window === 'undefined') {
      const wooCategories = await this.fetchWooAPI('products/categories?hide_empty=true');
      if (wooCategories && Array.isArray(wooCategories) && wooCategories.length > 0) {
        return wooCategories.map((c: any) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description || '',
          image: c.image?.src || '',
          count: c.count,
          featured: c.name.toLowerCase().includes('featured')
        }));
      }
    }
    return MOCK_CATEGORIES;
  }

  // Get Products with optional filters
  static async getProducts(params?: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    type?: string;
    rentalOnly?: boolean;
    combosOnly?: boolean;
    sort?: string;
  }): Promise<Product[]> {
    let result: Product[] = [];
    
    // Only attempt real API fetch if on the server
    if (typeof window === 'undefined') {
      let query = 'products?per_page=100';
      if (params?.search) query += `&search=${encodeURIComponent(params.search)}`;
      
      const wooProducts = await this.fetchWooAPI(query);
      if (wooProducts && Array.isArray(wooProducts) && wooProducts.length > 0) {
        result = wooProducts.map(p => this.mapWooProduct(p));
      } else {
        result = [...MOCK_PRODUCTS];
      }
    } else {
      // If called on client, fallback to mock data (client shouldn't have API keys)
      result = [...MOCK_PRODUCTS];
    }

    if (params?.category && params.category !== 'all') {
      result = result.filter(
        (p) =>
          p.categorySlug === params.category ||
          p.category.toLowerCase() === params.category?.toLowerCase()
      );
    }

    if (params?.search && result === MOCK_PRODUCTS) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    if (params?.type && params.type !== 'all') {
      result = result.filter((p) => p.jewelleryType === params.type);
    }

    if (params?.rentalOnly) {
      result = result.filter((p) => p.isRentalAvailable);
    }

    if (params?.combosOnly) {
      result = result.filter((p) => p.isCombo);
    }

    if (params?.minPrice !== undefined) {
      result = result.filter((p) => p.price >= (params.minPrice || 0));
    }

    if (params?.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= (params.maxPrice || Infinity));
    }

    if (params?.sort) {
      switch (params.sort) {
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
        default:
          result.sort((a, b) => b.reviewCount - a.reviewCount);
      }
    }

    return result;
  }

  // Get Single Product by Slug
  static async getProductBySlug(slug: string): Promise<Product | null> {
    if (typeof window === 'undefined') {
      const wooProducts = await this.fetchWooAPI(`products?slug=${slug}`);
      if (wooProducts && Array.isArray(wooProducts) && wooProducts.length > 0) {
        return this.mapWooProduct(wooProducts[0]);
      }
    }
    const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return product || null;
  }

  // Get Rental Products
  static async getRentalProducts(): Promise<Product[]> {
    const products = await this.getProducts();
    return products.filter((p) => p.isRentalAvailable);
  }

  // Get Combo Offers
  static async getComboProducts(): Promise<Product[]> {
    const products = await this.getProducts();
    return products.filter((p) => p.isCombo || p.price > 10000);
  }

  // Verify Coupon
  static verifyCoupon(code: string, cartSubtotal: number): { valid: boolean; coupon?: Coupon; message?: string } {
    const coupon = MOCK_COUPONS.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (!coupon) {
      return { valid: false, message: 'Invalid coupon code.' };
    }
    if (coupon.minSpend && cartSubtotal < coupon.minSpend) {
      return { valid: false, message: `Minimum spend of ₹${coupon.minSpend} required for code ${coupon.code}.` };
    }
    return { valid: true, coupon, message: `Coupon ${coupon.code} applied successfully!` };
  }
}
