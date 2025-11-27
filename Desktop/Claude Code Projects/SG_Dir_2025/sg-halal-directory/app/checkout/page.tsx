'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const plans: Record<string, { name: string; price: number; period: string; features: string[] }> = {
  free: {
    name: 'Basic',
    price: 0,
    period: 'Forever Free',
    features: ['Basic business listing', 'Contact information', 'MUIS certification badge'],
  },
  professional: {
    name: 'Professional',
    price: 29,
    period: '/month',
    features: ['15 photos', 'Priority search placement', 'Analytics dashboard', '3 coupons/month'],
  },
  premium: {
    name: 'Premium',
    price: 79,
    period: '/month',
    features: ['Unlimited photos', 'Featured listing badge', 'Homepage spotlight', 'Dedicated account manager'],
  },
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') || 'professional';
  const plan = plans[planId] || plans.professional;

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [formData, setFormData] = useState({
    email: '',
    businessName: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    billingAddress: '',
    postalCode: '',
    country: 'Singapore',
    agreeTerms: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const monthlyPrice = plan.price;
  const annualPrice = Math.round(plan.price * 10); // 2 months free
  const currentPrice = billingCycle === 'monthly' ? monthlyPrice : annualPrice;
  const savings = billingCycle === 'annual' ? monthlyPrice * 2 : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({ ...formData, cardNumber: formatted });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value.replace('/', ''));
    setFormData({ ...formData, expiry: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStatus('idle');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPaymentStatus('success');
    } catch {
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (plan.price === 0) {
    return (
      <div className="min-h-screen bg-[#f6f8f7] flex items-center justify-center py-12">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="w-16 h-16 bg-[#17cf73]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[#17cf73] text-3xl">check_circle</span>
            </div>
            <h1 className="text-2xl font-bold text-[#343A40] mb-4">No Payment Required</h1>
            <p className="text-gray-600 mb-6">
              The Basic plan is completely free! Simply submit your business listing to get started.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#17cf73] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#13ec80] transition-colors"
            >
              <span className="material-symbols-outlined">add_business</span>
              Submit Your Business
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-[#f6f8f7] flex items-center justify-center py-12">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="w-20 h-20 bg-[#17cf73]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[#17cf73] text-4xl">celebration</span>
            </div>
            <h1 className="text-2xl font-bold text-[#343A40] mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for upgrading to {plan.name}. Your account has been activated.
            </p>
            <div className="bg-[#f6f8f7] rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Plan</span>
                <span className="font-semibold text-[#343A40]">{plan.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Billing</span>
                <span className="font-semibold text-[#343A40]">{billingCycle === 'monthly' ? 'Monthly' : 'Annual'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-bold text-[#17cf73]">${currentPrice}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              A confirmation email has been sent to {formData.email}
            </p>
            <div className="space-y-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#17cf73] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#13ec80] transition-colors"
              >
                <span className="material-symbols-outlined">dashboard</span>
                Go to Dashboard
              </Link>
              <Link
                href="/directory"
                className="inline-flex items-center justify-center gap-2 w-full bg-gray-100 text-[#343A40] px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                <span className="material-symbols-outlined">explore</span>
                Browse Directory
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8f7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#17cf73]">HalalSG</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="material-symbols-outlined text-[#17cf73]">lock</span>
              Secure Checkout
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <h1 className="text-2xl font-bold text-[#343A40] mb-6">Complete Your Purchase</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Account Information */}
                  <div>
                    <h2 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#17cf73] text-white rounded-full flex items-center justify-center text-sm">1</span>
                      Account Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#343A40] mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17cf73] focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="businessName" className="block text-sm font-medium text-[#343A40] mb-2">
                          Business Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="businessName"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17cf73] focus:border-transparent"
                          placeholder="Your Business Name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Billing Cycle */}
                  <div>
                    <h2 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#17cf73] text-white rounded-full flex items-center justify-center text-sm">2</span>
                      Billing Cycle
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setBillingCycle('monthly')}
                        className={`p-4 rounded-lg border-2 text-left transition-colors ${
                          billingCycle === 'monthly'
                            ? 'border-[#17cf73] bg-[#17cf73]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-[#343A40]">Monthly</div>
                        <div className="text-2xl font-bold text-[#343A40]">${monthlyPrice}<span className="text-sm font-normal text-gray-500">/mo</span></div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setBillingCycle('annual')}
                        className={`p-4 rounded-lg border-2 text-left transition-colors relative ${
                          billingCycle === 'annual'
                            ? 'border-[#17cf73] bg-[#17cf73]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="absolute -top-2 -right-2 bg-[#17cf73] text-white text-xs font-semibold px-2 py-1 rounded-full">
                          Save ${savings}
                        </div>
                        <div className="font-semibold text-[#343A40]">Annual</div>
                        <div className="text-2xl font-bold text-[#343A40]">${annualPrice}<span className="text-sm font-normal text-gray-500">/yr</span></div>
                        <div className="text-xs text-[#17cf73]">2 months free!</div>
                      </button>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h2 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#17cf73] text-white rounded-full flex items-center justify-center text-sm">3</span>
                      Payment Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-[#343A40] mb-2">
                          Name on Card <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17cf73] focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-[#343A40] mb-2">
                          Card Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleCardNumberChange}
                            required
                            maxLength={19}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17cf73] focus:border-transparent pr-20"
                            placeholder="1234 5678 9012 3456"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                            <span className="text-xl">💳</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium text-[#343A40] mb-2">
                            Expiry Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleExpiryChange}
                            required
                            maxLength={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17cf73] focus:border-transparent"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-[#343A40] mb-2">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            required
                            maxLength={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17cf73] focus:border-transparent"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div>
                    <h2 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#17cf73] text-white rounded-full flex items-center justify-center text-sm">4</span>
                      Billing Address
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="billingAddress" className="block text-sm font-medium text-[#343A40] mb-2">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="billingAddress"
                          name="billingAddress"
                          value={formData.billingAddress}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17cf73] focus:border-transparent"
                          placeholder="123 Street Name, #01-01"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-[#343A40] mb-2">
                            Postal Code <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            required
                            maxLength={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17cf73] focus:border-transparent"
                            placeholder="123456"
                          />
                        </div>
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-[#343A40] mb-2">
                            Country
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17cf73] focus:border-transparent"
                          >
                            <option value="Singapore">Singapore</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Submit */}
                  <div className="space-y-4 pt-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        required
                        className="mt-1 w-4 h-4 text-[#17cf73] border-gray-300 rounded focus:ring-[#17cf73]"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to the{' '}
                        <Link href="/terms" className="text-[#17cf73] hover:underline">Terms of Service</Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-[#17cf73] hover:underline">Privacy Policy</Link>
                      </span>
                    </label>

                    {paymentStatus === 'error' && (
                      <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                        <span className="material-symbols-outlined">error</span>
                        Payment failed. Please check your card details and try again.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isProcessing || !formData.agreeTerms}
                      className="w-full flex items-center justify-center gap-2 bg-[#17cf73] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#13ec80] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <span className="material-symbols-outlined animate-spin">progress_activity</span>
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined">lock</span>
                          Pay ${currentPrice} Now
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      Your payment is secure and encrypted. You can cancel anytime.
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <h2 className="text-lg font-bold text-[#343A40] mb-4">Order Summary</h2>

                <div className="border border-[#17cf73] rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#17cf73]/10 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#17cf73]">workspace_premium</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#343A40]">{plan.name} Plan</h3>
                      <p className="text-sm text-gray-500">{billingCycle === 'monthly' ? 'Monthly' : 'Annual'} billing</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <span className="material-symbols-outlined text-[#17cf73] text-sm">check</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{plan.name} Plan ({billingCycle})</span>
                    <span className="text-[#343A40]">${billingCycle === 'monthly' ? monthlyPrice : monthlyPrice * 12}</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <div className="flex justify-between text-[#17cf73]">
                      <span>Annual Discount (2 months free)</span>
                      <span>-${savings}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-[#343A40]">Total</span>
                      <span className="text-[#17cf73]">${currentPrice}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {billingCycle === 'monthly' ? 'Billed monthly' : 'Billed annually'}
                    </p>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-4 justify-center">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span className="material-symbols-outlined text-sm">lock</span>
                      SSL Secured
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span className="material-symbols-outlined text-sm">verified_user</span>
                      PCI Compliant
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span className="material-symbols-outlined text-sm">autorenew</span>
                      Cancel Anytime
                    </div>
                  </div>
                </div>

                {/* Money Back Guarantee */}
                <div className="mt-6 bg-[#17cf73]/10 rounded-lg p-4 text-center">
                  <span className="material-symbols-outlined text-[#17cf73] text-2xl mb-2">verified</span>
                  <p className="font-semibold text-[#343A40] text-sm">30-Day Money-Back Guarantee</p>
                  <p className="text-xs text-gray-600 mt-1">Not satisfied? Get a full refund within 30 days.</p>
                </div>

                {/* Need Help */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Need help?</p>
                  <Link href="/contact" className="text-[#17cf73] text-sm font-medium hover:underline">
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <Suspense fallback={
        <div className="min-h-screen bg-[#f6f8f7] flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined animate-spin text-4xl text-[#17cf73]">progress_activity</span>
            <p className="mt-4 text-gray-600">Loading checkout...</p>
          </div>
        </div>
      }>
        <CheckoutContent />
      </Suspense>
    </>
  );
}
