import React from 'react';
import Link from 'next/link';
import { WooCommerceService } from '@/services/woocommerce';
import { ProductCard } from '@/components/product/ProductCard';
import { Sparkles, ChevronRight, ArrowRight, ShieldCheck, Gem } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'New Arrivals | Exclusive Jewellery Designs | Charmika By Lekshmi',
  description: 'Explore the latest handcrafted luxury jewellery arrivals from Charmika By Lekshmi. Fresh bridal haarams, chokers, bangles, and anti-tarnish jewels.',
};

export default async function NewArrivalsPage() {
  const products = await WooCommerceService.getNewArrivalProducts();

  return (
    <div className="py-10 bg-beige min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Header */}
        <div className="mb-6 flex items-center text-xs text-charcoal/60">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1" />
          <span className="font-semibold text-maroon">New Arrivals</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 text-white rounded-3xl p-8 sm:p-12 border border-gold/30 shadow-luxury mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/20 rounded-full text-gold text-xs font-semibold uppercase tracking-wider border border-gold/40">
              <Sparkles className="w-3.5 h-3.5" />
              Latest Studio Additions
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Exclusive New Arrivals
            </h1>

            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              Discover our newest handcrafted masterpieces. From authentic antique gold-plated nakshi haarams to modern anti-tarnish daily essentials, curated by Lekshmi.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-gold">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> 100% Quality Guaranteed</span>
              <span className="flex items-center gap-1.5"><Gem className="w-4 h-4" /> Handcrafted In Kerala</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> Limited Edition Drops</span>
            </div>
          </div>
        </div>

        {/* Header & Product Count */}
        <div className="flex justify-between items-center pb-4 mb-8 border-b border-gold/20">
          <div>
            <h2 className="font-serif text-2xl font-bold text-maroon">
              Fresh From Our Workshop
            </h2>
            <p className="text-xs text-charcoal/60 mt-1">
              Showing products exclusively tagged under New Arrivals.
            </p>
          </div>
          <span className="text-xs font-bold text-maroon bg-white px-3.5 py-1.5 rounded-full border border-gold/30 shadow-xs">
            {products.length} {products.length === 1 ? 'Design' : 'Designs'}
          </span>
        </div>

        {/* Product Grid or Empty State */}
        {products.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-16 text-center border border-gold/20 shadow-xs max-w-xl mx-auto my-12">
            <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/30">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-maroon mb-2">
              Curating New Arrivals
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed mb-6 font-light">
              We are currently updating our new arrivals catalogue. Select products under the <strong className="text-maroon font-semibold">"New Arrivals"</strong> category in WooCommerce to showcase them exclusively here.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 bg-maroon text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-gold hover:text-maroon transition-all shadow-md"
            >
              Explore Complete Catalogue
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
