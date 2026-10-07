import { Product, Category, Review, Coupon } from '@/types';

// Mock Categories based on requirements
export const MOCK_CATEGORIES: Category[] = [];

// Mock Products curated for Charmika By Lekshmi
export const MOCK_PRODUCTS: Product[] = [];

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
    } else {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.error('Failed to fetch categories on client', e);
      }
    }
    return [];
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
        result = [];
      }
    } else {
      // Fetch from internal Next.js API route on the client side
      try {
        const queryParams = new URLSearchParams();
        if (params?.search) queryParams.append('search', params.search);
        if (params?.category && params.category !== 'all') queryParams.append('category', params.category);
        if (params?.type && params.type !== 'all') queryParams.append('type', params.type);
        if (params?.rentalOnly) queryParams.append('rentalOnly', 'true');
        if (params?.combosOnly) queryParams.append('combosOnly', 'true');
        if (params?.minPrice !== undefined) queryParams.append('minPrice', params.minPrice.toString());
        if (params?.maxPrice !== undefined) queryParams.append('maxPrice', params.maxPrice.toString());
        if (params?.sort) queryParams.append('sort', params.sort);
        
        const res = await fetch('/api/products?' + queryParams.toString());
        if (res.ok) {
          result = await res.json();
          return result;
        }
      } catch (e) {
        console.error('Failed to fetch products on client', e);
      }
      result = [];
    }

    if (params?.category && params.category !== 'all') {
      result = result.filter(
        (p) =>
          p.categorySlug === params.category ||
          p.category.toLowerCase() === params.category?.toLowerCase()
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
    } else {
      try {
        const queryParams = new URLSearchParams();
        queryParams.append('search', slug);
        const res = await fetch('/api/products?' + queryParams.toString());
        if (res.ok) {
          const products = await res.json();
          // Find exact match by slug since search might return partial matches
          const exactProduct = products.find((p: Product) => p.slug === slug);
          if (exactProduct) return exactProduct;
          if (products.length > 0) return products[0];
        }
      } catch (e) {
        console.error('Failed to fetch product by slug on client', e);
      }
    }
    return null;
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
