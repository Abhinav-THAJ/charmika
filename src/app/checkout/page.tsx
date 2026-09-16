'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Lock, CreditCard, Truck, AlertCircle } from 'lucide-react';

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

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

  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'payu' | 'cod'>('payu');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // If payment method is Cash on Delivery
      if (paymentMethod === 'cod') {
        setTimeout(() => {
          clearCart();
          router.push('/order-success?payment_method=cod');
        }, 1000);
        return;
      }

      // If payment method is PayU
      if (paymentMethod === 'payu') {
        const txnid = `txn${Date.now()}`;
        const amount = totalAmount.toString();
        const productinfo = 'Charmika Jewellery Order';
        
        const hashRes = await fetch('/api/payu/hash', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ txnid, amount, productinfo, firstname: formData.firstName, email: formData.email })
        });
        const hashData = await hashRes.json();
        
        if (hashData.success) {
          const form = document.createElement('form');
          form.method = 'POST';
          // Automatically switches between test and live based on PAYU_ENV in .env.local
          form.action = hashData.isTest
            ? 'https://test.payu.in/_payment'
            : 'https://secure.payu.in/_payment';
          
          const appendInput = (name: string, value: string) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = value;
            form.appendChild(input);
          };
          
          appendInput('key', hashData.key);
          appendInput('txnid', txnid);
          appendInput('amount', amount);
          appendInput('productinfo', productinfo);
          appendInput('firstname', formData.firstName);
          appendInput('email', formData.email);
          appendInput('phone', formData.phone);
          appendInput('surl', `${window.location.origin}/api/payu/success`);
          appendInput('furl', `${window.location.origin}/api/payu/success`);
          appendInput('hash', hashData.hash);
          
          document.body.appendChild(form);
          form.submit();
        } else {
           setError('Failed to initiate PayU payment. Please try again.');
           setSubmitting(false);
        }
        return;
      }

      // 1. Load Razorpay Checkout SDK Script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        setError('Razorpay SDK failed to load. Please check your internet connection.');
        setSubmitting(false);
        return;
      }

      // 2. Call server backend API to create Razorpay Order
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
          notes: {
            customer_name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            address: `${formData.addressLine1}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
          },
        }),
      });

      const orderData = await orderRes.json();

      if (!orderData.success) {
        setError(orderData.error || 'Failed to create payment order. Please try again.');
        setSubmitting(false);
        return;
      }

      // 3. Fallback Demo Mode if Razorpay Key is not configured yet in .env.local
      if (orderData.isDemo) {
        const verifyRes = await fetch('/api/razorpay/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: orderData.orderId,
            razorpay_payment_id: `pay_demo_${Date.now()}`,
            razorpay_signature: 'demo_sig',
            isDemo: true,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          clearCart();
          router.push(
            `/order-success?payment_id=${verifyData.paymentId}&mode=demo`
          );
        } else {
          setError('Demo payment verification failed.');
          setSubmitting(false);
        }
        return;
      }

      // 4. Open standard Razorpay Checkout Modal
      const options: any = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'CHARMIKA JEWELLERY',
        description: 'Payment for Fine & Fashion Jewellery Order',
        order_id: orderData.orderId,
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#800020', // Charmika Maroon
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              clearCart();
              router.push(
                `/order-success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}`
              );
            } else {
              setError(
                verifyData.error || 'Payment signature verification failed.'
              );
              setSubmitting(false);
            }
          } catch (err: any) {
            setError(
              'Payment verification error: ' + (err?.message || 'Unknown error')
            );
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setSubmitting(false);
          },
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err: any) {
      console.error('Razorpay payment error:', err);
      setError(
        'An error occurred while initializing payment. Please try again.'
      );
      setSubmitting(false);
    }
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

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl flex items-center gap-3 text-xs">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <div className="flex-1">{error}</div>
          </div>
        )}

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
              <h2 className="font-serif text-xl font-bold text-maroon pb-3 border-b border-gold/20 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gold" /> Select Payment Method
                </span>
                <span className="flex items-center gap-1 text-[11px] font-sans font-normal text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Secure Checkout
                </span>
              </h2>

              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'payu' ? 'border-maroon bg-gold/10' : 'border-gold/20 bg-beige/30 hover:border-gold'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'payu'}
                      onChange={() => setPaymentMethod('payu')}
                      className="accent-maroon"
                    />
                    <div>
                      <span className="font-serif font-bold text-sm text-maroon block">PayU Secure Checkout (UPI, Cards, NetBanking)</span>
                      <span className="text-[11px] text-charcoal/60">Fast & seamless payments</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-gold bg-maroon px-2 py-0.5 rounded">RECOMMENDED</span>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'razorpay' ? 'border-maroon bg-gold/10' : 'border-gold/20 bg-beige/30 hover:border-gold'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="accent-maroon"
                    />
                    <div>
                      <span className="font-serif font-bold text-sm text-maroon block">Razorpay Instant Gateway (UPI, GPay, PhonePe, Cards, NetBanking)</span>
                      <span className="text-[11px] text-charcoal/60">Instant verification with 100% buyer protection</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-gold bg-maroon px-2 py-0.5 rounded">RECOMMENDED</span>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-maroon bg-gold/10' : 'border-gold/20 bg-beige/30 hover:border-gold'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-maroon"
                    />
                    <div>
                      <span className="font-serif font-bold text-sm text-maroon block">Cash on Delivery (COD)</span>
                      <span className="text-[11px] text-charcoal/60">Pay cash upon delivery at your doorstep</span>
                    </div>
                  </div>
                </label>
              </div>

              {/* WELCOME10 First Order Promo */}
              <div className="flex items-center gap-3 bg-gold/10 border border-gold/30 rounded-2xl px-4 py-3 mt-1">
                <span className="text-2xl shrink-0">🎁</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-maroon">New Customer? Get 10% OFF!</p>
                  <p className="text-[11px] text-charcoal/60 mt-0.5">
                    Apply code{' '}
                    <span className="font-mono font-bold text-maroon bg-white px-1.5 py-0.5 rounded border border-gold/30 tracking-wider">
                      WELCOME10
                    </span>{' '}
                    in your cart for 10% off — no minimum spend.
                  </p>
                </div>
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
              {submitting ? 'Processing Payment...' : paymentMethod === 'payu' ? 'Pay Now with PayU' : paymentMethod === 'razorpay' ? 'Pay Now with Razorpay' : 'Place COD Order'}
              <Lock className="w-4 h-4 text-gold" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
