'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Lock, CreditCard, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discountAmount, shippingAmount, totalAmount, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: user?.address?.firstName || 'Lekshmi',
    lastName: user?.address?.lastName || 'DS',
    phone: user?.address?.phone || '+91 94009 76257',
    email: user?.email || 'charmikajewel@gmail.com',
    addressLine1: user?.address?.addressLine1 || 'Karthika, Kuttypady',
    addressLine2: user?.address?.addressLine2 || 'Gandhinagar PO',
    city: user?.address?.city || 'Kottayam',
    state: user?.address?.state || 'Kerala',
    pincode: user?.address?.pincode || '686008',
    country: 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [submitting, setSubmitting] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      clearCart();
      router.push('/order-success');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="py-20 bg-beige min-h-screen text-center">
        <h2 className="font-serif text-2xl font-bold text-maroon">Your cart is empty</h2>
        <button
          onClick={() => router.push('/shop')}
          className="mt-4 px-6 py-2 bg-gold text-maroon font-bold text-xs rounded-full"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 bg-beige min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-bold text-maroon mb-8">Secure Luxury Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping & Billing Details Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-6">
              <h2 className="font-serif text-xl font-bold text-maroon pb-3 border-b border-gold/20 flex items-center gap-2">
                <Truck className="w-5 h-5 text-gold" /> Shipping & Delivery Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gold/30 rounded-xl text-xs focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gold/30 rounded-xl text-xs focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gold/30 rounded-xl text-xs focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gold/30 rounded-xl text-xs focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Flat / House / Building Name *</label>
                <input
                  type="text"
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gold/30 rounded-xl text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gold/30 rounded-xl text-xs focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">State *</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gold/30 rounded-xl text-xs focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">PIN Code *</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gold/30 rounded-xl text-xs focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>

            {/* Payment Gateways */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-4">
              <h2 className="font-serif text-xl font-bold text-maroon pb-3 border-b border-gold/20 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gold" /> Select Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all bg-beige/30 hover:border-gold">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-maroon"
                    />
                    <div>
                      <span className="font-serif font-bold text-sm text-maroon block">UPI Instant Payment (Google Pay / PhonePe / Paytm)</span>
                      <span className="text-[11px] text-charcoal/60">Fastest confirmation with Razorpay gateway</span>
                    </div>
                  </div>
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all bg-beige/30 hover:border-gold">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-maroon"
                    />
                    <div>
                      <span className="font-serif font-bold text-sm text-maroon block">Credit / Debit Card / Net Banking</span>
                      <span className="text-[11px] text-charcoal/60">Visa, Mastercard, RuPay & Top Indian Banks</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-luxury h-fit space-y-6">
            <h2 className="font-serif text-xl font-bold text-maroon pb-3 border-b border-gold/20">
              Your Order
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <img src={item.product.images[0].src} alt="" className="w-10 h-10 object-cover rounded" />
                    <div>
                      <span className="font-bold text-maroon block line-clamp-1">{item.product.name}</span>
                      <span className="text-[10px] text-charcoal/60">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-semibold">
                    ₹
                    {(item.isRental && item.product.rentalPricePerDay
                      ? item.product.rentalPricePerDay * (item.rentalDurationDays || 3) +
                        (item.product.securityDeposit || 0)
                      : item.product.price * item.quantity
                    ).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gold/15 space-y-2 text-xs text-charcoal/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingAmount === 0 ? 'FREE' : `₹${shippingAmount}`}</span>
              </div>
              <div className="flex justify-between font-serif text-lg font-bold text-maroon pt-2 border-t border-gold/20">
                <span>Total Payable</span>
                <span className="text-gold">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-maroon text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-gold hover:text-maroon transition-all flex items-center justify-center gap-2 shadow-luxury disabled:opacity-50"
            >
              {submitting ? 'Confirming Order...' : 'Place Order Now'}
              <Lock className="w-4 h-4 text-gold" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
