'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Gem, MapPin, Phone, Mail, Instagram, Facebook, ShieldCheck, Award, RefreshCw, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-maroon-950 text-white pt-16 pb-8 border-t-2 border-gold/40 relative overflow-hidden">
      {/* Subtle Gold Background Accent */}
      <div className="absolute inset-0 bg-luxury-radial pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Brand Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-gold/20 text-center">
          <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-gold/10">
            <Award className="w-8 h-8 text-gold mb-2" />
            <h4 className="font-serif text-sm font-bold text-gold">Heritage Craftsmanship</h4>
            <p className="text-xs text-white/70 mt-1">Handpicked luxury designs blending traditional Indian artistry & modern glamour.</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-gold/10">
            <ShieldCheck className="w-8 h-8 text-gold mb-2" />
            <h4 className="font-serif text-sm font-bold text-gold">Flexible Rental System</h4>
            <p className="text-xs text-white/70 mt-1">Rent grand bridal sets for your special days at a fraction of purchase cost.</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-gold/10">
            <RefreshCw className="w-8 h-8 text-gold mb-2" />
            <h4 className="font-serif text-sm font-bold text-gold">Sanitized & Safe Delivery</h4>
            <p className="text-xs text-white/70 mt-1">Inspected, anti-tarnish protected, and safely shipped in velvet cases.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-gold/20">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2">
                <Gem className="w-6 h-6 text-gold" />
                <span className="font-serif text-2xl font-bold text-white">CHARMIKA</span>
              </div>
              <span className="text-[10px] tracking-[0.3em] font-sans font-medium text-gold uppercase block mt-0.5">
                By Lekshmi
              </span>
            </Link>

            <p className="text-xs text-white/70 leading-relaxed font-light max-w-sm">
              CHARMIKA By Lekshmi was born from a passion for timeless jewellery and the confidence it instills in every woman. We offer fine heritage pieces for outright purchase and premium event rentals.
            </p>

            <div className="pt-2 space-y-2 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Karthika, Kuttypady, Gandhinagar PO, Kottayam, Kerala 686008</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href="tel:+919400976257" className="hover:text-gold transition-colors font-medium">
                  +91 94009 76257
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:charmikajewel@gmail.com" className="hover:text-gold transition-colors">
                  charmikajewel@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/shop" className="hover:text-gold transition-colors">
                  All Jewellery
                </Link>
              </li>
              <li>
                <Link href="/rental" className="hover:text-gold transition-colors text-gold font-semibold">
                  Rental Jewellery
                </Link>
              </li>
              <li>
                <Link href="/combos" className="hover:text-gold transition-colors">
                  Combo Collections
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-gold transition-colors">
                  Festival Deals & Offers
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  About Founder Lekshmi D.S
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Store Contact & Maps
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/shop?category=necklaces" className="hover:text-gold transition-colors">
                  Necklaces & Haarams
                </Link>
              </li>
              <li>
                <Link href="/shop?category=chokers" className="hover:text-gold transition-colors">
                  Chokers Set
                </Link>
              </li>
              <li>
                <Link href="/shop?category=temple-jewellery" className="hover:text-gold transition-colors">
                  Temple Nakshi Work
                </Link>
              </li>
              <li>
                <Link href="/shop?category=ad-stone-jewellery" className="hover:text-gold transition-colors">
                  AD Stone Jewellery
                </Link>
              </li>
              <li>
                <Link href="/shop?category=anti-tarnish-jewellery" className="hover:text-gold transition-colors">
                  Anti Tarnish Daily Wear
                </Link>
              </li>
              <li>
                <Link href="/shop?category=hip-belts-oddiyanam" className="hover:text-gold transition-colors">
                  Hip Belts (Oddiyanam)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider mb-4">
              Newsletter
            </h4>
            <p className="text-xs text-white/70 mb-3 font-light">
              Subscribe to receive exclusive royal collection launches, private rental access & ₹500 discount vouchers.
            </p>

            {subscribed ? (
              <div className="p-3 bg-gold/20 border border-gold/40 rounded text-xs text-gold font-medium">
                Thank you! Use coupon code <span className="font-bold underline">CHARMIKA10</span> for 10% off your order!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Your Email Address"
                    required
                    className="w-full px-3 py-2 bg-white/10 text-white placeholder-white/40 rounded border border-gold/30 text-xs focus:outline-none focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-gold text-maroon-950 font-bold rounded text-xs hover:bg-white transition-colors flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/10 hover:bg-gold hover:text-maroon rounded-full transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/10 hover:bg-gold hover:text-maroon rounded-full transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-white/50 space-y-3 sm:space-y-0">
          <p>© {new Date().getFullYear()} CHARMIKA By Lekshmi (Charmika Jewels). All Rights Reserved.</p>
          <div className="flex space-x-4">
            <span className="hover:text-gold cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gold cursor-pointer">Terms & Conditions</span>
            <span>•</span>
            <span className="hover:text-gold cursor-pointer">Rental Policy</span>
            <span>•</span>
            <span className="hover:text-gold cursor-pointer">Return Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
