'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Star, ShoppingBag, Heart, Clock, ShieldCheck, Check } from 'lucide-react';
import { useQuickView } from '@/context/QuickViewContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedMode, setSelectedMode] = useState<'buy' | 'rent'>('buy');
  const [rentalDays, setRentalDays] = useState(3);

  if (!quickViewProduct) return null;

  const isWishlisted = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    if (selectedMode === 'rent') {
      addToCart(quickViewProduct, true, rentalDays);
    } else {
      addToCart(quickViewProduct, false);
    }
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-white max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden border border-gold/30 my-8">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-beige hover:bg-gold/20 text-maroon transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Column */}
          <div className="p-6 bg-beige/40 flex flex-col justify-between">
            <div className="aspect-square rounded-xl overflow-hidden border border-gold/20 shadow-xs mb-3 bg-white">
              <img
                src={quickViewProduct.images[selectedImgIndex]?.src || quickViewProduct.images[0].src}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImgIndex === idx ? 'border-gold scale-105 shadow-xs' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-gold font-semibold uppercase tracking-wider mb-1">
                <span>{quickViewProduct.jewelleryType}</span>
                <span>•</span>
                <span>{quickViewProduct.category}</span>
              </div>

              <h2 className="font-serif text-xl font-bold text-maroon">{quickViewProduct.name}</h2>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-2 text-xs text-amber-500 font-semibold">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(quickViewProduct.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span>{quickViewProduct.rating}</span>
                <span className="text-charcoal/50">({quickViewProduct.reviewCount} reviews)</span>
              </div>

              {/* Pricing Tabs (Buy vs Rent) */}
              <div className="mt-4 p-3 bg-beige/60 rounded-xl border border-gold/20">
                <div className="flex rounded-lg bg-white p-1 mb-3 border border-gold/15">
                  <button
                    onClick={() => setSelectedMode('buy')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                      selectedMode === 'buy' ? 'bg-maroon text-white shadow-xs' : 'text-charcoal/70'
                    }`}
                  >
                    Outright Purchase
                  </button>
                  {quickViewProduct.isRentalAvailable && (
                    <button
                      onClick={() => setSelectedMode('rent')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1 ${
                        selectedMode === 'rent' ? 'bg-gold text-maroon shadow-xs' : 'text-charcoal/70'
                      }`}
                    >
                      <Clock className="w-3 h-3" /> Rent Jewellery
                    </button>
                  )}
                </div>

                {selectedMode === 'buy' ? (
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif font-bold text-2xl text-maroon">
                      ₹{quickViewProduct.price.toLocaleString('en-IN')}
                    </span>
                    {quickViewProduct.regularPrice > quickViewProduct.price && (
                      <span className="text-xs text-charcoal/40 line-through">
                        ₹{quickViewProduct.regularPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-serif font-bold text-xl text-maroon">
                        ₹{((quickViewProduct.rentalPricePerDay || 500) * rentalDays).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-charcoal/70 font-medium">
                        (₹{quickViewProduct.rentalPricePerDay}/day)
                      </span>
                    </div>

                    {/* Rental Duration Options */}
                    <div className="mt-2.5">
                      <span className="text-[11px] text-charcoal/70 font-medium block mb-1">
                        Select Rental Duration:
                      </span>
                      <div className="flex gap-2">
                        {[3, 5, 7].map((days) => (
                          <button
                            key={days}
                            onClick={() => setRentalDays(days)}
                            className={`px-3 py-1 rounded text-xs font-semibold border transition-all ${
                              rentalDays === days
                                ? 'bg-maroon text-white border-maroon'
                                : 'bg-white text-charcoal border-gold/30'
                            }`}
                          >
                            {days} Days
                          </button>
                        ))}
                      </div>
                      <p className="text-[10px] text-charcoal/60 mt-1.5">
                        Refundable Security Deposit: ₹{(quickViewProduct.securityDeposit || 2000).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs text-charcoal/80 mt-4 leading-relaxed font-light">
                {quickViewProduct.shortDescription}
              </p>

              <div className="mt-3 space-y-1 text-[11px] text-charcoal/70">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-gold" />
                  <span>Material: {quickViewProduct.specifications.material}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>Quality Guarantee & Free Velvet Pouch Box</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-gold/20 flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-maroon text-white font-bold text-xs rounded-full hover:bg-gold hover:text-maroon transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                {selectedMode === 'rent' ? `Rent for ${rentalDays} Days` : 'Add to Shopping Cart'}
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct)}
                className={`p-3 rounded-full border transition-all ${
                  isWishlisted ? 'border-maroon bg-maroon text-gold' : 'border-gold/40 text-charcoal hover:bg-gold/10'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-gold' : ''}`} />
              </button>
            </div>

            <div className="mt-3 text-center">
              <Link
                href={`/product/${quickViewProduct.slug}`}
                onClick={closeQuickView}
                className="text-xs font-semibold text-gold hover:text-maroon underline"
              >
                View Full Product Details & Specifications →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
