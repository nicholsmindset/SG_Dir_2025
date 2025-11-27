import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pricing & Membership - Singapore Halal Directory',
  description: 'Choose the perfect membership plan for your halal business. From free basic listings to premium packages with advanced features and priority placement.',
  openGraph: {
    title: 'Membership Plans - Singapore Halal Directory',
    description: 'Grow your halal business with our flexible membership plans.',
  },
};

const plans = [
  {
    id: 'free',
    name: 'Basic',
    price: 0,
    period: 'Forever Free',
    description: 'Perfect for businesses just getting started',
    features: [
      { text: 'Basic business listing', included: true },
      { text: 'Business name & address', included: true },
      { text: 'Contact information', included: true },
      { text: 'Operating hours', included: true },
      { text: 'MUIS certification badge', included: true },
      { text: 'Customer reviews', included: true },
      { text: 'Photo gallery (up to 3)', included: true },
      { text: 'Priority placement', included: false },
      { text: 'Featured listing', included: false },
      { text: 'Analytics dashboard', included: false },
      { text: 'Promotional coupons', included: false },
      { text: 'Social media links', included: false },
    ],
    cta: 'Get Started Free',
    popular: false,
    color: 'gray',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 29,
    period: '/month',
    description: 'For growing businesses looking to expand reach',
    features: [
      { text: 'Everything in Basic', included: true },
      { text: 'Photo gallery (up to 15)', included: true },
      { text: 'Social media links', included: true },
      { text: 'Menu/product showcase', included: true },
      { text: 'Priority search placement', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'Customer messaging', included: true },
      { text: 'Promotional coupons (3/month)', included: true },
      { text: 'Featured listing', included: false },
      { text: 'Homepage spotlight', included: false },
      { text: 'Dedicated account manager', included: false },
      { text: 'Custom branding', included: false },
    ],
    cta: 'Start Professional',
    popular: true,
    color: 'green',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 79,
    period: '/month',
    description: 'Maximum visibility for established businesses',
    features: [
      { text: 'Everything in Professional', included: true },
      { text: 'Unlimited photo gallery', included: true },
      { text: 'Featured listing badge', included: true },
      { text: 'Homepage spotlight rotation', included: true },
      { text: 'Unlimited promotional coupons', included: true },
      { text: 'Advanced analytics & insights', included: true },
      { text: 'Priority customer support', included: true },
      { text: 'Custom branding options', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Event promotion support', included: true },
      { text: 'Multi-location management', included: true },
      { text: 'API access for integrations', included: true },
    ],
    cta: 'Go Premium',
    popular: false,
    color: 'purple',
  },
];

const faqs = [
  {
    question: 'Can I upgrade or downgrade my plan anytime?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you\'ll get immediate access to new features. When downgrading, changes take effect at the end of your current billing period.',
  },
  {
    question: 'Is there a contract or commitment?',
    answer: 'No long-term contracts. All paid plans are billed monthly and you can cancel anytime. We also offer annual plans with 2 months free.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, AMEX), PayNow, and bank transfers for annual plans.',
  },
  {
    question: 'Do you offer discounts for multiple locations?',
    answer: 'Yes! Businesses with multiple locations get 20% off when managing all locations under one Premium account. Contact us for custom enterprise pricing.',
  },
  {
    question: 'What\'s included in the free plan?',
    answer: 'The free Basic plan includes a complete business listing with your name, address, contact info, operating hours, and up to 3 photos. You also get the MUIS certification badge and customer reviews.',
  },
  {
    question: 'How does the Featured listing work?',
    answer: 'Featured listings appear at the top of search results and category pages with a special badge. Premium members get automatic featured placement, while Professional members can purchase featured spots.',
  },
];

export default function PricingPage() {
  const pricingSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Membership Plans - Singapore Halal Directory',
    description: 'Choose the perfect membership plan for your halal business',
    offers: plans.filter(p => p.price > 0).map(plan => ({
      '@type': 'Offer',
      name: plan.name,
      price: plan.price,
      priceCurrency: 'SGD',
      description: plan.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />

      <Header />

      <div className="min-h-screen bg-[#f6f8f7]">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#17cf73] via-emerald-500 to-teal-600 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl md:text-2xl text-green-50 mb-8">
                Choose the plan that fits your business needs. Upgrade anytime.
              </p>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="material-symbols-outlined">verified</span>
                <span className="font-medium">30-day money-back guarantee on all paid plans</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 -mt-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden relative ${
                    plan.popular ? 'ring-2 ring-[#17cf73] scale-105 md:scale-110' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-[#17cf73] text-white text-center py-2 text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <div className={`p-6 md:p-8 ${plan.popular ? 'pt-12' : ''}`}>
                    <h3 className="text-2xl font-bold text-[#343A40] mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl md:text-5xl font-bold text-[#343A40]">
                        {plan.price === 0 ? 'Free' : `$${plan.price}`}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-500 ml-1">{plan.period}</span>
                      )}
                      {plan.price === 0 && (
                        <span className="text-gray-500 ml-2 text-sm">{plan.period}</span>
                      )}
                    </div>
                    <Link
                      href={plan.price === 0 ? '/submit' : `/checkout?plan=${plan.id}`}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                        plan.popular
                          ? 'bg-[#17cf73] text-white hover:bg-[#13ec80]'
                          : plan.price === 0
                          ? 'bg-gray-100 text-[#343A40] hover:bg-gray-200'
                          : 'bg-[#343A40] text-white hover:bg-gray-700'
                      }`}
                    >
                      {plan.cta}
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 p-6 md:p-8">
                    <p className="text-sm font-semibold text-[#343A40] mb-4">What's included:</p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span
                            className={`material-symbols-outlined text-lg mt-0.5 ${
                              feature.included ? 'text-[#17cf73]' : 'text-gray-300'
                            }`}
                          >
                            {feature.included ? 'check_circle' : 'cancel'}
                          </span>
                          <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Annual Discount Banner */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-4xl">savings</span>
                  <div className="text-left">
                    <p className="font-bold text-xl">Save 20% with Annual Billing</p>
                    <p className="text-purple-200">Get 2 months free when you pay yearly</p>
                  </div>
                </div>
                <Link
                  href="/contact?subject=annual-billing"
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                >
                  Contact for Annual Plans
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#343A40] mb-4">Compare Plans</h2>
              <p className="text-gray-600">See what each plan offers at a glance</p>
            </div>
            <div className="max-w-5xl mx-auto overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-[#343A40]">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-[#343A40]">Basic</th>
                    <th className="text-center py-4 px-4 font-semibold text-[#17cf73]">Professional</th>
                    <th className="text-center py-4 px-4 font-semibold text-purple-600">Premium</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-700">Photo Gallery</td>
                    <td className="py-4 px-4 text-center">3 photos</td>
                    <td className="py-4 px-4 text-center">15 photos</td>
                    <td className="py-4 px-4 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-4 text-gray-700">Search Placement</td>
                    <td className="py-4 px-4 text-center">Standard</td>
                    <td className="py-4 px-4 text-center">Priority</td>
                    <td className="py-4 px-4 text-center">Featured</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-700">Promotional Coupons</td>
                    <td className="py-4 px-4 text-center">
                      <span className="material-symbols-outlined text-gray-300">close</span>
                    </td>
                    <td className="py-4 px-4 text-center">3 per month</td>
                    <td className="py-4 px-4 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-4 text-gray-700">Analytics Dashboard</td>
                    <td className="py-4 px-4 text-center">
                      <span className="material-symbols-outlined text-gray-300">close</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="material-symbols-outlined text-[#17cf73]">check</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="material-symbols-outlined text-[#17cf73]">check</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-700">Homepage Spotlight</td>
                    <td className="py-4 px-4 text-center">
                      <span className="material-symbols-outlined text-gray-300">close</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="material-symbols-outlined text-gray-300">close</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="material-symbols-outlined text-[#17cf73]">check</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-4 text-gray-700">Dedicated Account Manager</td>
                    <td className="py-4 px-4 text-center">
                      <span className="material-symbols-outlined text-gray-300">close</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="material-symbols-outlined text-gray-300">close</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="material-symbols-outlined text-[#17cf73]">check</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-700">Support</td>
                    <td className="py-4 px-4 text-center">Email</td>
                    <td className="py-4 px-4 text-center">Email + Chat</td>
                    <td className="py-4 px-4 text-center">Priority 24/7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#343A40] mb-4">Trusted by Businesses</h2>
              <p className="text-gray-600">See what our members are saying</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="material-symbols-outlined text-yellow-400 text-lg">star</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The Professional plan helped us reach so many new customers. The analytics dashboard is invaluable for understanding what works."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#17cf73]/10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#17cf73]">person</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#343A40]">Ahmad Rahman</p>
                    <p className="text-sm text-gray-500">Nasi Lemak Express</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="material-symbols-outlined text-yellow-400 text-lg">star</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Being featured on the homepage brought us 3x more customers. The Premium plan is worth every cent for our business."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-blue-600">person</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#343A40]">Fatimah Binte Ali</p>
                    <p className="text-sm text-gray-500">Halal Delights Bakery</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="material-symbols-outlined text-yellow-400 text-lg">star</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Started with the free plan and upgraded as my business grew. The transition was seamless and support was excellent."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-purple-600">person</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#343A40]">Mohamed Ismail</p>
                    <p className="text-sm text-gray-500">Kampung Kitchen</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#343A40] mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600">Everything you need to know about our plans</p>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-[#343A40]">
                        {faq.question}
                        <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                          expand_more
                        </span>
                      </summary>
                      <div className="px-6 pb-6 text-gray-600">
                        {faq.answer}
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#17cf73] to-emerald-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
              Join thousands of halal businesses already reaching more customers through Singapore Halal Directory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/submit"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#17cf73] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors shadow-lg"
              >
                <span className="material-symbols-outlined">add_business</span>
                List Your Business Free
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors border-2 border-white/30"
              >
                <span className="material-symbols-outlined">support_agent</span>
                Talk to Sales
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
