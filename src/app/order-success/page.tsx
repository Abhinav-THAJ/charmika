'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage() {
  const orderNum = 'CBL-ORD-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="py-20 bg-beige min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gold/30 shadow-luxury max-w-lg w-full space-y-6">
        <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto border-2 border-gold animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-gold" />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold block mb-1">
            Order Confirmed
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
            Thank You For Choosing CHARMIKA
          </h1>
          <p className="text-xs text-charcoal/60 mt-1">
            Your order <strong className="text-maroon font-serif">{orderNum}</strong> has been successfully placed.
          </p>
        </div>

        <div className="p-4 bg-beige/60 rounded-2xl border border-gold/20 text-xs text-charcoal/80 space-y-1 text-left">
          <p><strong>Shipping Carrier:</strong> Insured Courier</p>
          <p><strong>Estimated Delivery:</strong> 3 Business Days</p>
          <p><strong>Dispatch Origin:</strong> Kottayam, Kerala</p>
          <p><strong>Confirmation Email:</strong> Sent to your inbox</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/shop"
            className="flex-1 py-3 bg-maroon text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-gold hover:text-maroon transition-all flex items-center justify-center gap-1.5 shadow-md"
          >
            Continue Shopping <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href={`https://wa.me/919400976257?text=Hello%20Charmika,%20I%20placed%20order%20${orderNum}`}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-full transition-all flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4" /> Track via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
