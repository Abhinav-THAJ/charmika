'use client';

import React from 'react';
import { Phone, Sparkles, Truck, ShieldCheck } from 'lucide-react';

export const TopBanner: React.FC = () => {
  return (
    <div className="bg-maroon-900 text-white text-xs py-2 px-4 border-b border-gold/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1.5 text-gold-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            CHARMIKA BY LEKSHMI
          </span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span className="hidden sm:flex items-center gap-1 text-white/90">
            <Truck className="w-3.5 h-3.5 text-gold" />
            Free Express Shipping on Orders Above ₹3,000
          </span>
        </div>

        <div className="flex items-center space-x-6 text-white/90">
          <span className="hidden lg:flex items-center gap-1 text-white/80">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            100% Certified High-Quality Jewellery & Rentals
          </span>
          <a
            href="tel:+919400976257"
            className="flex items-center gap-1.5 hover:text-gold transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-gold" />
            <span>+91 94009 76257</span>
          </a>
        </div>
      </div>
    </div>
  );
};
