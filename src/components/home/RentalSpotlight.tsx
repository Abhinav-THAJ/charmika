'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/services/woocommerce';
import { ProductCard } from '@/components/product/ProductCard';

export const RentalSpotlight: React.FC = () => {
  const rentalProducts = MOCK_PRODUCTS.filter((p) => p.isRentalAvailable).slice(0, 4);

  return (
    <section className="py-16 bg-gradient-to-b from-maroon-950 to-maroon-900 text-white relative overflow-hidden border-y border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {/* Info Column */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/20 rounded-full text-gold text-xs font-semibold uppercase tracking-wider border border-gold/40">
              <Clock className="w-3.5 h-3.5" />
              Special Rental Service
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Wear Royal Luxury For Your Special Event
            </h2>

            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              Why buy expensive heavy bridal sets for a one-day function? At <strong className="text-gold">CHARMIKA By Lekshmi</strong>, you can rent certified grand Temple Nakshi haarams, Kundan combos & AD chokers starting from just <span className="text-gold font-bold">₹299/day</span>.
            </p>

            <ul className="space-y-2.5 text-xs text-white/90 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold" /> Flexible 3, 5, or 7-day rental slots
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold" /> 100% Sanitized & Velvet Box packaging
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold" /> Instant refundable security deposit payout
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/rental"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-maroon-950 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-luxury"
              >
                Browse All Rental Jewellery
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Rental Showcase Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rentalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
