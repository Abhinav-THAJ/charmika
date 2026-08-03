'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Sparkles, Truck, Gift } from 'lucide-react';

export const TopBanner: React.FC = () => {
  return (
    <div className="bg-maroon-900 text-white text-xs py-2 px-4 border-b border-gold/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1.5 text-gold font-bold animate-pulse">
            <Gift className="w-3.5 h-3.5 text-gold" />
            NEW CUSTOMER?
          </span>
          <Link
            href="/offers"
            className="flex items-center gap-1 text-white/90 hover:text-gold transition-colors font-medium"
          >
            Use code{' '}
            <span className="font-mono font-bold text-gold bg-white/10 px-1.5 py-0.5 rounded mx-1 tracking-wider">
              WELCOME10
            </span>
            for 10% OFF your first order!
          </Link>
        </div>

        <div className="flex items-center space-x-5 text-white/90">
          <span className="hidden lg:flex items-center gap-1 text-white/70">
            <Truck className="w-3.5 h-3.5 text-gold" />
            Free Shipping All Over India
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
