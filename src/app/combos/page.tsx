import React from 'react';
import { WooCommerceService } from '@/services/woocommerce';
import { ProductCard } from '@/components/product/ProductCard';
import { Tag, Sparkles, ShieldCheck } from 'lucide-react';

export default async function CombosPage() {
  const comboProducts = await WooCommerceService.getComboProducts();

  return (
    <div className="py-12 bg-beige min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gold/30 shadow-luxury mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold flex items-center justify-center gap-1.5 mb-2">
            <Tag className="w-4 h-4 text-gold" /> Save Up To ₹8,000 On Sets
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-maroon">
            Bridal Combo Collections
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 max-w-xl mx-auto mt-2 font-light">
            Complete bridal & festive matching sets including Chokers, Long Haarams, Earrings, Maang Tikkas & Bangles packed in custom luxury gift boxes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {comboProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
