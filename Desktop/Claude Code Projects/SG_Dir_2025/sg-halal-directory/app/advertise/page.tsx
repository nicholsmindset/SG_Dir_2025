'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const adPackages = [
  {
    id: 'spotlight',
    name: 'Homepage Spotlight',
    price: 199,
    period: '/week',
    description: 'Premium placement on our homepage reaching 50K+ monthly visitors',
    icon: 'star',
    color: 'yellow',
    features: [
      'Featured position on homepage',
      'Highlighted business card',
      'Click-through to your listing',
      'Performance analytics',
      'Average 5,000+ impressions/week',
    ],
  },
  {
    id: 'banner',
    name: 'Category Banner',
    price: 149,
    period: '/week',
    description: 'Banner ad at the top of specific category pages',
    icon: 'ad_group',
    color: 'blue',
    features: [
      'Banner ad (728x90)',
      'Choose target category',
      'Link to your website',
      'Impression tracking',
      'Average 3,000+ views/week',
    ],
  },
  {
    id: 'featured',
    name: 'Featured Listing',
    price: 49,
    period: '/week',
    description: 'Boost your listing to the top of search results',
    icon: 'trending_up',
    color: 'green',
    features: [
      'Top of search results',
      'Featured badge on listing',
      'Priority in nearby searches',
      'Click-through analytics',
      'Average 2x more visibility',
    ],
  },
  {
    id: 'newsletter',
    name: 'Newsletter Sponsor',
    price: 299,
    period: '/issue',
    description: 'Reach our engaged subscriber base directly in their inbox',
    icon: 'mail',
    color: 'purple',
    features: [
      'Featured in weekly newsletter',
      '15,000+ email subscribers',
      'Dedicated section for your business',
      'Include special offer or coupon',
      'Average 35% open rate',
    ],
  },
];

const stats = [
  { value: '50K+', label: 'Monthly Visitors' },
  { value: '15K+', label: 'Newsletter Subscribers' },
  { value: '5,000+', label: 'Listed Businesses' },
  { value: '28', label: 'Districts Covered' },
];

const testimonials = [
  {
    quote: "The homepage spotlight brought us incredible visibility. We saw a 40% increase in walk-in customers that month.",
    author: "Sarah Tan",
    business: "Halal Bites Cafe",
    location: "Tampines",
  },
  {
    quote: "Newsletter sponsorship was perfect for our Ramadan promotion. The engagement was better than any other platform we've tried.",
    author: "Irfan Abdullah",
    business: "Rasa Sayang Restaurant",
    location: "Geylang",
  },
  {
    quote: "The featured listing doubled our online inquiries. Great ROI for a small business like ours.",
    author: "Nurul Hassan",
    business: "Sweet Treats Bakery",
    location: "Jurong",
  },
];

export default function AdvertisePage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    message: '',
    budget: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        businessName: '',
        contactName: '',
        email: '',
        phone: '',
        website: '',
        message: '',
        budget: '',
      });
      setSelectedPackage(null);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; light: string }> = {
      yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-100' },
      blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-100' },
      green: { bg: 'bg-[#17cf73]', text: 'text-[#17cf73]', light: 'bg-[#17cf73]/10' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-100' },
    };
    return colors[color] || colors.green;
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#f6f8f7]">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#17cf73] via-emerald-500 to-teal-600 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Advertise With Us
              </h1>
              <p className="text-xl md:text-2xl text-green-50 mb-8">
                Reach Singapore's Muslim community through the most trusted halal directory
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                    <div className="text-green-100 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ad Packages */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#343A40] mb-4">Advertising Packages</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose from our range of advertising options designed to help your halal business reach more customers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {adPackages.map((pkg) => {
                const colors = getColorClasses(pkg.color);
                return (
                  <div
                    key={pkg.id}
                    className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all cursor-pointer ${
                      selectedPackage === pkg.id ? 'ring-2 ring-[#17cf73] shadow-lg' : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    <div className={`${colors.bg} p-4 text-white`}>
                      <span className="material-symbols-outlined text-3xl">{pkg.icon}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-[#343A40] mb-2">{pkg.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-[#343A40]">${pkg.price}</span>
                        <span className="text-gray-500 text-sm">{pkg.period}</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className={`material-symbols-outlined text-sm ${colors.text}`}>check</span>
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="px-6 pb-6">
                      <button
                        className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                          selectedPackage === pkg.id
                            ? 'bg-[#17cf73] text-white'
                            : `${colors.light} ${colors.text} hover:opacity-80`
                        }`}
                      >
                        {selectedPackage === pkg.id ? 'Selected' : 'Select Package'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Advertise Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-[#343A40] mb-6">Why Advertise on HalalSG?</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-[#17cf73]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[#17cf73]">groups</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-[#343A40] mb-1">Targeted Audience</h3>
                        <p className="text-gray-600 text-sm">
                          Reach Singapore's Muslim community actively searching for halal businesses and services.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-blue-600">verified</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-[#343A40] mb-1">Trusted Platform</h3>
                        <p className="text-gray-600 text-sm">
                          We're the go-to resource for MUIS-certified halal businesses, building trust with your audience.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-purple-600">analytics</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-[#343A40] mb-1">Measurable Results</h3>
                        <p className="text-gray-600 text-sm">
                          Track impressions, clicks, and conversions with our detailed analytics dashboard.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-orange-600">support_agent</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-[#343A40] mb-1">Dedicated Support</h3>
                        <p className="text-gray-600 text-sm">
                          Our team helps optimize your campaigns for maximum impact and ROI.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#17cf73] to-emerald-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Audience Demographics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Age 25-44</span>
                        <span className="font-bold">65%</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full">
                        <div className="h-2 bg-white rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Mobile Users</span>
                        <span className="font-bold">78%</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full">
                        <div className="h-2 bg-white rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Return Visitors</span>
                        <span className="font-bold">45%</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full">
                        <div className="h-2 bg-white rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Average Session</span>
                        <span className="font-bold">4.5 min</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full">
                        <div className="h-2 bg-white rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-green-50 text-sm">
                      Our audience actively seeks halal businesses, making them highly engaged and ready to convert.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#343A40] mb-4">Success Stories</h2>
              <p className="text-gray-600">Hear from businesses that have advertised with us</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm p-6">
                  <span className="material-symbols-outlined text-[#17cf73] text-3xl mb-4">format_quote</span>
                  <p className="text-gray-600 mb-6">{testimonial.quote}</p>
                  <div>
                    <p className="font-bold text-[#343A40]">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.business}</p>
                    <p className="text-sm text-[#17cf73]">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-white" id="contact-form">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#343A40] mb-4">Get Started</h2>
                <p className="text-gray-600">
                  Fill out the form below and our advertising team will contact you within 24 hours
                </p>
              </div>
              <div className="bg-[#f6f8f7] rounded-xl p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        placeholder="Your business name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contactName" className="block text-sm font-medium text-[#343A40] mb-2">
                        Contact Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17cf73] focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#343A40] mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17cf73] focus:border-transparent"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#343A40] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17cf73] focus:border-transparent"
                        placeholder="+65 9123 4567"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-[#343A40] mb-2">
                        Website (if any)
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17cf73] focus:border-transparent"
                        placeholder="https://yourbusiness.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-[#343A40] mb-2">
                        Monthly Budget <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17cf73] focus:border-transparent"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-200">Under $200</option>
                        <option value="200-500">$200 - $500</option>
                        <option value="500-1000">$500 - $1,000</option>
                        <option value="1000-plus">$1,000+</option>
                      </select>
                    </div>
                  </div>

                  {selectedPackage && (
                    <div className="bg-[#17cf73]/10 border border-[#17cf73]/20 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#17cf73]">check_circle</span>
                        <span className="font-medium text-[#343A40]">
                          Selected Package: {adPackages.find(p => p.id === selectedPackage)?.name}
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#343A40] mb-2">
                      Tell us about your advertising goals
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17cf73] focus:border-transparent resize-none"
                      placeholder="What are you hoping to achieve with advertising? Any specific campaigns or promotions?"
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                      <span className="material-symbols-outlined">check_circle</span>
                      Thank you! Our advertising team will contact you within 24 hours.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                      <span className="material-symbols-outlined">error</span>
                      Something went wrong. Please try again or email us at ads@halalsg.com
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#17cf73] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#13ec80] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">send</span>
                        Submit Inquiry
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#17cf73] to-emerald-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Reach More Customers?
            </h2>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
              Start advertising today and connect with Singapore's growing Muslim community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#17cf73] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors shadow-lg"
              >
                <span className="material-symbols-outlined">campaign</span>
                Start Advertising
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors border-2 border-white/30"
              >
                <span className="material-symbols-outlined">call</span>
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
