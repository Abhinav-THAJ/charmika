'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, Sparkles, Gem, Clock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { SearchOverlay } from '@/components/common/SearchOverlay';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, setIsAuthModalOpen } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categoryMenu = [
    { name: 'Necklaces', href: '/shop?category=necklaces' },
    { name: 'Long Haarams', href: '/shop?category=long-haarams' },
    { name: 'Chokers', href: '/shop?category=chokers' },
    { name: 'Temple Jewellery', href: '/shop?category=temple-jewellery' },
    { name: 'AD Stone', href: '/shop?category=ad-stone-jewellery' },
    { name: 'Anti Tarnish', href: '/shop?category=anti-tarnish-jewellery' },
    { name: 'Bangles & Bracelets', href: '/shop?category=bangles-bracelets' },
    { name: 'Earrings', href: '/shop?category=earrings' },
    { name: 'Finger Rings', href: '/shop?category=finger-rings' },
    { name: 'Hip Belts', href: '/shop?category=hip-belts-oddiyanam' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-luxury py-2 border-b border-gold/20'
            : 'bg-beige/80 backdrop-blur-sm py-4 border-b border-gold/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-maroon hover:text-gold transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo */}
            <Link href="/" className="flex flex-col items-center group text-center">
              <div className="flex items-center gap-1.5">
                <Gem className="w-5 h-5 text-gold group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-serif text-2xl lg:text-3xl font-bold tracking-wider text-maroon group-hover:text-gold transition-colors">
                  CHARMIKA
                </span>
              </div>
              <span className="text-[10px] tracking-[0.25em] font-sans font-medium text-gold uppercase mt-0.5">
                By Lekshmi
              </span>
            </Link>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-charcoal hover:text-gold transition-colors relative"
                title="Search Jewellery"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="p-2 text-charcoal hover:text-gold transition-colors relative"
                title="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-charcoal hover:text-gold transition-colors relative"
                title="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-maroon text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center space-x-6 pt-3 mt-2 border-t border-gold/10 text-xs tracking-wider uppercase font-medium">
            <Link
              href="/"
              className={`hover:text-gold transition-colors ${
                pathname === '/' ? 'text-maroon font-bold border-b-2 border-gold pb-1' : 'text-charcoal'
              }`}
            >
              Home
            </Link>

            <Link
              href="/shop?sort=newest"
              className="text-maroon font-semibold hover:text-gold transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-gold" />
              New Arrivals
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('categories')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'categories' ? null : 'categories')}
                className="flex items-center gap-1 text-charcoal group-hover:text-gold transition-colors py-2 font-medium"
              >
                Categories
                <ChevronDown className={`w-3.5 h-3.5 text-gold transition-transform duration-300 ${activeDropdown === 'categories' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'categories' && (
                <div className="absolute top-full -left-4 w-[420px] bg-white rounded-2xl shadow-2xl p-4 z-50 grid grid-cols-2 gap-1.5 border border-gold/40 animate-slide-up">
                  {categoryMenu.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={() => setActiveDropdown(null)}
                      className="px-3.5 py-2.5 text-xs text-charcoal/90 hover:bg-gold/15 hover:text-maroon rounded-xl font-medium transition-all flex items-center justify-between group/item border border-transparent hover:border-gold/20"
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] text-gold font-bold group-hover/item:translate-x-0.5 transition-transform">→</span>
                    </Link>
                  ))}
                  <div className="col-span-2 pt-2 mt-1 border-t border-gold/20 flex justify-between items-center text-[11px]">
                    <span className="text-charcoal/60">Handcrafted in Kottayam</span>
                    <Link
                      href="/shop"
                      onClick={() => setActiveDropdown(null)}
                      className="text-maroon font-bold hover:text-gold uppercase tracking-wider"
                    >
                      View All Products →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Rental Section Link */}
            <Link
              href="/rental"
              className="text-maroon font-semibold hover:text-gold transition-colors flex items-center gap-1 bg-gold/10 px-2.5 py-1 rounded-full border border-gold/30"
            >
              <Clock className="w-3 h-3 text-gold" />
              Rental Jewellery
            </Link>

            {/* Combo Offers Link */}
            <Link
              href="/combos"
              className="hover:text-gold transition-colors text-charcoal"
            >
              Combo Collection
            </Link>

            {/* Offers Link */}
            <Link
              href="/offers"
              className="text-maroon hover:text-gold transition-colors font-bold"
            >
              Offers & Festival
            </Link>

            <Link href="/about" className="hover:text-gold transition-colors text-charcoal">
              About Us
            </Link>

            <Link href="/contact" className="hover:text-gold transition-colors text-charcoal">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-beige h-full shadow-2xl overflow-y-auto p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-gold/20">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="font-serif text-xl font-bold text-maroon">CHARMIKA</span>
                  <span className="block text-[9px] text-gold uppercase tracking-widest">By Lekshmi</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-charcoal">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 flex flex-col space-y-3 text-sm font-medium text-charcoal">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-gold/10">
                  Home
                </Link>

                <Link href="/rental" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-maroon font-bold border-b border-gold/10 flex items-center justify-between">
                  <span>Rental Jewellery</span>
                  <span className="bg-gold text-white text-[10px] px-2 py-0.5 rounded-full">Popular</span>
                </Link>

                <Link href="/combos" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-gold/10">
                  Combo Offers
                </Link>

                <div className="py-2">
                  <span className="text-xs uppercase text-gold font-bold tracking-wider block mb-2">Categories</span>
                  <div className="pl-3 flex flex-col space-y-2 text-xs">
                    {categoryMenu.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="py-1 text-charcoal hover:text-maroon"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link href="/offers" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-gold/10">
                  Offers & Coupons
                </Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-gold/10">
                  About Us
                </Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-gold/10">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-gold/20 text-xs text-charcoal/70 text-center">
              <p className="font-serif font-semibold text-maroon">Charmika By Lekshmi</p>
              <p className="mt-1">Kottayam, Kerala</p>
            </div>
          </div>
        </div>
      )}

      {/* Live Search Modal */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
