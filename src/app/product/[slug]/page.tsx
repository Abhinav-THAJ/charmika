'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { WooCommerceService } from '@/services/woocommerce';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';
import {
  Star,
  ShoppingBag,
  Heart,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Share2,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedMode, setSelectedMode] = useState<'buy' | 'rent'>('buy');
  const [rentalDays, setRentalDays] = useState(3);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'care' | 'shipping' | 'reviews'>('desc');

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      const data = await WooCommerceService.getProductBySlug(slug);
      setProduct(data);
      if (data) {
        const related = await WooCommerceService.getProducts({ category: data.categorySlug });
        setRelatedProducts(related.filter((p) => p.id !== data.id).slice(0, 4));
      }
      setLoading(false);
    }
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 bg-beige min-h-screen text-center text-maroon font-serif">
        <p className="animate-pulse">Loading Luxury Piece...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 bg-beige min-h-screen text-center">
        <h2 className="font-serif text-2xl font-bold text-maroon">Product Not Found</h2>
        <Link href="/shop" className="mt-4 inline-block px-6 py-2 bg-gold text-maroon font-bold text-xs rounded-full">
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (selectedMode === 'rent') {
      addToCart(product, true, rentalDays);
    } else {
      addToCart(product, false);
    }
  };

  return (
    <div className="py-10 bg-beige min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-xs text-charcoal/60">
          <Link href="/">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1" />
          <Link href="/shop">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1" />
          <Link href={`/shop?category=${product.categorySlug}`}>{product.category}</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1" />
          <span className="font-semibold text-maroon truncate max-w-xs">{product.name}</span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-gold/20 shadow-luxury">
          {/* Gallery Column */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-gold/30 bg-beige/40 shadow-xs">
              <img
                src={product.images[selectedImgIndex]?.src || product.images[0].src}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                  isWishlisted ? 'bg-maroon text-gold' : 'bg-white/90 text-charcoal hover:bg-gold hover:text-maroon'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-gold' : ''}`} />
              </button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImgIndex === idx ? 'border-gold scale-105 shadow-md' : 'border-gold/20 opacity-70'
                    }`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}          </div>

          {/* Product Details Column */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-end text-xs text-charcoal/50 font-medium mb-2">
                <span>SKU: {product.sku}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-maroon leading-tight">
                {product.name}
              </h1>



              {/* Purchase Price Container */}
              <div className="mt-6 p-4 bg-beige/80 rounded-2xl border border-gold/30">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif font-bold text-3xl text-maroon">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.regularPrice > product.price && (
                      <span className="text-sm text-charcoal/40 line-through">
                        ₹{product.regularPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  {product.stockStatus === 'outofstock' ? (
                    <p className="text-[11px] text-rose-600 font-bold mt-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-600" /> Out of Stock — Currently Unavailable
                    </p>
                  ) : (
                    <p className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> In Stock • Ready for express shipping
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-gold/20">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-maroon text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-gold hover:text-maroon transition-all flex items-center justify-center gap-2 shadow-luxury"
              >
                <ShoppingBag className="w-4 h-4" />
                {selectedMode === 'rent' ? `Book Rental for ${rentalDays} Days` : 'Add to Shopping Cart'}
              </button>

              <a
                href={`https://wa.me/919400976257?text=${encodeURIComponent(
                  `Hello CHARMIKA By Lekshmi! I am interested in inquiring about "${product.name}" (SKU: ${product.sku}). Is it available for purchase or rental?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" /> Inquire About This Piece On WhatsApp
              </a>
            </div>
          </div>
        </div>



        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-maroon mb-6">Complete Your Look</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
