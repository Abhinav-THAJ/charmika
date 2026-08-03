import type { Metadata } from 'next';
import '@/styles/globals.css';
import { TopBanner } from '@/components/layout/TopBanner';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { AuthModal } from '@/components/account/AuthModal';
import { WhatsAppFloat } from '@/components/common/WhatsAppFloat';
import { BackToTop } from '@/components/common/BackToTop';
import { Preloader } from '@/components/common/Preloader';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import { QuickViewProvider } from '@/context/QuickViewContext';
import { ToastProvider } from '@/context/ToastContext';

export const metadata: Metadata = {
  title: 'CHARMIKA By Lekshmi | Premium Luxury Jewellery & Rental Store',
  description:
    'Handcrafted Temple Nakshi Haarams, Chokers, AD Stone Jewellery & Exclusive Rental Jewellery for Weddings & Events in Kottayam, Kerala.',
  keywords: [
    'Charmika By Lekshmi',
    'Luxury Jewellery Kerala',
    'Rental Jewellery Kottayam',
    'Temple Jewellery',
    'AD Stone Chokers',
    'Long Haarams',
    'Bridal Jewellery Rental',
    'Anti Tarnish Jewellery',
  ],
  authors: [{ name: 'Lekshmi D.S' }],
  openGraph: {
    title: 'CHARMIKA By Lekshmi | Luxury Jewellery',
    description: 'Elegance That Tells Your Story',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-gold selection:text-maroon">
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <QuickViewProvider>
                  <div className="flex flex-col min-h-screen bg-beige">
                    <TopBanner />
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />

                    {/* Drawers & Floating Action Overlays */}
                    <Preloader />
                    <CartDrawer />
                    <QuickViewModal />
                    <AuthModal />
                    <WhatsAppFloat />
                    <BackToTop />
                  </div>
                </QuickViewProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
