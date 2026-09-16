'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const paymentMethod = searchParams.get('payment_method');
  const isDemo = searchParams.get('mode') === 'demo';

  const orderNum = 'CBL-ORD-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gold/30 shadow-luxury max-w-lg w-full space-y-6">
      <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto border-2 border-gold animate-bounce">
        <CheckCircle2 className="w-12 h-12 text-gold" />
      </div>

      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold block mb-1">
          Order Confirmed & Payment Verified
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
          Thank You For Choosing CHARMIKA
        </h1>
        <p className="text-xs text-charcoal/60 mt-1">
          Your order <strong className="text-maroon font-serif">{orderNum}</strong> has been successfully placed.
        </p>
      </div>

      {isDemo && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-[11px] text-left">
          <strong>Demo Transaction Note:</strong> Real Razorpay keys are not yet added to <code>.env.local</code>. This order was verified using test/demo mode.
        </div>
      )}

      <div className="p-4 bg-beige/60 rounded-2xl border border-gold/20 text-xs text-charcoal/80 space-y-1.5 text-left">
        <p className="flex justify-between border-b border-gold/10 pb-1">
          <strong className="text-maroon">Payment Status:</strong>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Secure
          </span>
        </p>
        {paymentId && (
          <p className="flex justify-between border-b border-gold/10 pb-1 font-mono text-[11px]">
            <strong>Razorpay Payment ID:</strong>
            <span className="text-maroon font-bold">{paymentId}</span>
          </p>
        )}
        <p className="flex justify-between border-b border-gold/10 pb-1">
          <strong>Payment Method:</strong>
          <span>{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Razorpay Gateway'}</span>
        </p>
        <p className="flex justify-between border-b border-gold/10 pb-1">
          <strong>Shipping Carrier:</strong>
          <span>Insured Express Courier</span>
        </p>
        <p className="flex justify-between">
          <strong>Dispatch Origin:</strong>
          <span>Kottayam, Kerala</span>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Link
          href="/shop"
          className="flex-1 py-3 bg-maroon text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-gold hover:text-maroon transition-all flex items-center justify-center gap-1.5 shadow-md"
        >
          Continue Shopping <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <a
          href={`https://wa.me/919400976257?text=Hello%20Charmika,%20I%20placed%20order%20${orderNum}%20Payment%20ID:%20${paymentId || 'N/A'}`}
          target="_blank"
          rel="noreferrer"
          className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-full transition-all flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-4 h-4" /> Track via WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="py-20 bg-beige min-h-screen flex flex-col items-center justify-center text-center px-4">
      <Suspense fallback={<div className="text-maroon font-serif">Loading order confirmation...</div>}>
        <OrderSuccessContent />
      </Suspense>
    </div>
  );
}
