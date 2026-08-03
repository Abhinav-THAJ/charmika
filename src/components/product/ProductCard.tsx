'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useQuickView } from '@/context/QuickViewContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { openQuickView } = useQuickView();

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-gold/15 shadow-xs hover:shadow-luxury transition-all duration-300 flex flex-col justify-between">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-beige/40">
        <img
          src={product.images[0].src}
          alt={product.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/long-haarams.png';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.stockStatus === 'outofstock' ? (
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
              Out of Stock
            </span>
          ) : (
            <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> In Stock
            </span>
          )}
          {product.onSale && (
            <span className="bg-maroon text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
              Sale
            </span>
          )}
          {product.isNew && (
            <span className="bg-gold text-maroon-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" /> New
            </span>
          )}
        </div>

        {/* Action Overlay Buttons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-2 z-10 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
              isWishlisted ? 'bg-maroon text-gold' : 'bg-white/90 text-charcoal hover:bg-gold hover:text-maroon'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-gold' : ''}`} />
          </button>

          <button
            onClick={() => openQuickView(product)}
            className="p-2 bg-white/90 text-charcoal hover:bg-gold hover:text-maroon rounded-full backdrop-blur-md transition-all shadow-md"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add To Cart Slide-up Button */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
          <button
            onClick={() => addToCart(product, false)}
            className="w-full py-2 bg-maroon hover:bg-gold hover:text-maroon text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <div>


          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif text-sm font-semibold text-maroon hover:text-gold transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] text-charcoal/60 line-clamp-1 mt-1 font-light">
            {product.shortDescription}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-gold/10">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-bold text-base text-maroon">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.regularPrice > product.price && (
                <span className="text-xs text-charcoal/40 line-through">
                  ₹{product.regularPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <Link
              href={`/product/${product.slug}`}
              className="text-[11px] font-semibold text-gold hover:text-maroon underline underline-offset-2 transition-colors"
            >
              Details
            </Link>
          </div>

          {/* Add to Cart + Buy Now Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => addToCart(product, false)}
              className="flex-1 py-2 bg-beige border border-gold/40 hover:bg-gold hover:border-gold text-maroon text-[11px] font-semibold rounded-lg transition-all flex items-center justify-center gap-1 shadow-xs"
            >
              <ShoppingBag className="w-3 h-3" />
              Add to Cart
            </button>
            <Link
              href="/checkout"
              onClick={() => addToCart(product, false)}
              className="flex-1 py-2 bg-maroon hover:bg-gold hover:text-maroon text-white text-[11px] font-semibold rounded-lg transition-all flex items-center justify-center gap-1 shadow-xs"
            >
              ⚡ Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
