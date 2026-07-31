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
            )}

            <div className="p-4 bg-beige/60 rounded-xl border border-gold/20 flex items-center justify-between text-xs text-charcoal/80">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-gold" /> Guaranteed Quality & Anti-Tarnish Finish
              </span>
              <button className="text-gold hover:text-maroon flex items-center gap-1 font-bold">
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>
          </div>

          {/* Product Details Column */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-gold font-bold uppercase tracking-wider mb-2">
                <span>{product.jewelleryType}</span>
                <span className="text-charcoal/50">SKU: {product.sku}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-maroon leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3 text-xs text-amber-500 font-semibold">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span>{product.rating} / 5</span>
                <span className="text-charcoal/50">({product.reviewCount} customer reviews)</span>
              </div>

              {/* Purchase vs Rental Option Switcher */}
              <div className="mt-6 p-4 bg-beige/80 rounded-2xl border border-gold/30">
                <div className="flex rounded-xl bg-white p-1 mb-4 border border-gold/20 shadow-xs">
                  <button
                    onClick={() => setSelectedMode('buy')}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                      selectedMode === 'buy' ? 'bg-maroon text-white shadow-md' : 'text-charcoal/70 hover:text-maroon'
                    }`}
                  >
                    Buy Outright
                  </button>
                  {product.isRentalAvailable && (
                    <button
                      onClick={() => setSelectedMode('rent')}
                      className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        selectedMode === 'rent' ? 'bg-gold text-maroon-950 shadow-md' : 'text-charcoal/70 hover:text-maroon'
                      }`}
                    >
                      <Clock className="w-4 h-4" /> Rent For Event
                    </button>
                  )}
                </div>

                {selectedMode === 'buy' ? (
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
                      <span className="bg-gold/20 text-maroon text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        Taxes Included
                      </span>
                    </div>
                    <p className="text-[11px] text-green-700 font-medium mt-1">In Stock • Ready for express shipping</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="font-serif font-bold text-2xl text-maroon">
                          ₹{((product.rentalPricePerDay || 500) * rentalDays).toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-charcoal/70 block">
                          Total Rental Fee for {rentalDays} Days (₹{product.rentalPricePerDay}/day)
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5">
                        Select Rental Period:
                      </label>
                      <div className="flex gap-3">
                        {[3, 5, 7].map((days) => (
                          <button
                            key={days}
                            onClick={() => setRentalDays(days)}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                              rentalDays === days
                                ? 'bg-maroon text-white border-maroon shadow-xs'
                                : 'bg-white text-charcoal border-gold/30 hover:border-gold'
                            }`}
                          >
                            {days} Days
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-gold/20 text-[11px] text-charcoal/80 space-y-1">
                      <p className="font-semibold text-maroon">Rental Security Terms:</p>
                      <p>• Refundable Deposit: ₹{(product.securityDeposit || 2000).toLocaleString('en-IN')}</p>
                      <p>• Free prepaid return pouch included in delivery box</p>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-xs text-charcoal/80 mt-4 leading-relaxed font-light">
                {product.description}
              </p>
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

        {/* Specifications & Reviews Tabbed Section */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-gold/20 shadow-xs">
          <div className="flex overflow-x-auto border-b border-gold/20 pb-2 space-x-6 text-xs uppercase font-bold tracking-wider">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'desc' ? 'border-gold text-maroon font-bold' : 'border-transparent text-charcoal/60'
              }`}
            >
              Description & Craft
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'specs' ? 'border-gold text-maroon font-bold' : 'border-transparent text-charcoal/60'
              }`}
            >
              Technical Specs
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'care' ? 'border-gold text-maroon font-bold' : 'border-transparent text-charcoal/60'
              }`}
            >
              Jewellery Care Guide
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'shipping' ? 'border-gold text-maroon font-bold' : 'border-transparent text-charcoal/60'
              }`}
            >
              Shipping & Rental Returns
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'reviews' ? 'border-gold text-maroon font-bold' : 'border-transparent text-charcoal/60'
              }`}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="py-6 text-xs text-charcoal/80 leading-relaxed font-light">
            {activeTab === 'desc' && (
              <div className="space-y-3">
                <p>{product.description}</p>
                <p>
                  Handcrafted by master artisans adhering to royal South Indian jewellery traditions. Every curve, stone inlay, and gold polish layer is meticulously inspected to ensure your occasion shines brightly.
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-beige/40 p-4 rounded-xl border border-gold/15">
                <div><strong>Material:</strong> {product.specifications.material}</div>
                <div><strong>Plating:</strong> {product.specifications.plating}</div>
                <div><strong>Stones:</strong> {product.specifications.stoneType}</div>
                <div><strong>Weight:</strong> {product.specifications.weight}</div>
                <div><strong>Dimensions:</strong> {product.specifications.dimensions}</div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-2">
                <p>• {product.specifications.careInstructions}</p>
                <p>• Avoid direct contact with perfume, hairsprays, and sanitizers.</p>
                <p>• Clean with a soft dry cotton cloth after wearing and store in CHARMIKA velvet casing.</p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-3">
                <p className="font-semibold text-maroon">Domestic Express Shipping:</p>
                <p>• Ships within 24 hours from Kottayam, Kerala. Delivery within 2-4 business days nationwide.</p>
                <p className="font-semibold text-maroon mt-3">Rental Return Procedure:</p>
                <p>• Place the jewellery back into the provided velvet safety case on the final rental date. Affix the prepaid return shipping label included in your box. Pickup will be initiated automatically by courier.</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {product.reviewsList && product.reviewsList.length > 0 ? (
                  product.reviewsList.map((rev) => (
                    <div key={rev.id} className="p-4 bg-beige/40 rounded-xl border border-gold/15 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-serif font-bold text-maroon">{rev.author}</span>
                        <span className="text-[10px] text-charcoal/50">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs italic">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p>Be the first customer to write a review for this royal piece!</p>
                )}
              </div>
            )}
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
