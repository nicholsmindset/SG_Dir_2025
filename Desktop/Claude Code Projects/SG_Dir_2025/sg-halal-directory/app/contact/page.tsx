'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Singapore Halal Directory',
    description: 'Get in touch with us for business inquiries, partnerships, or general questions',
    mainEntity: {
      '@type': 'Organization',
      name: 'Singapore Halal Directory',
      email: 'contact@shbd.sg',
      telephone: '+65 6123 4567',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Orchard Road, #04-56',
        addressLocality: 'Singapore',
        postalCode: '238888',
        addressCountry: 'SG',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-[#f6f8f7]">
        <div className="mx-auto max-w-6xl">
          {/* Page Heading */}
          <div className="text-center mb-12">
            <h1 className="text-[#343A40] text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
              Get In Touch
            </h1>
            <p className="mt-3 text-gray-500 text-lg font-normal leading-normal max-w-2xl mx-auto">
              We'd love to hear from you. Please fill out the form below, and our team will get back to you shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-3 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <label className="flex flex-col">
                    <p className="text-[#343A40] text-base font-medium leading-normal pb-2">Full Name</p>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#343A40] focus:outline-0 focus:ring-2 focus:ring-[#17cf73]/50 border border-gray-200 bg-[#f6f8f7] h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                      placeholder="e.g., Aisha Binte Ahmad"
                    />
                  </label>
                  <label className="flex flex-col">
                    <p className="text-[#343A40] text-base font-medium leading-normal pb-2">Email Address</p>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#343A40] focus:outline-0 focus:ring-2 focus:ring-[#17cf73]/50 border border-gray-200 bg-[#f6f8f7] h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                      placeholder="e.g., aisha.ahmad@email.com"
                    />
                  </label>
                </div>

                {/* Subject */}
                <label className="flex flex-col">
                  <p className="text-[#343A40] text-base font-medium leading-normal pb-2">Subject</p>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#343A40] focus:outline-0 focus:ring-2 focus:ring-[#17cf73]/50 border border-gray-200 bg-[#f6f8f7] h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                    placeholder="e.g., Listing Inquiry"
                  />
                </label>

                {/* Message */}
                <label className="flex flex-col">
                  <p className="text-[#343A40] text-base font-medium leading-normal pb-2">Your Message</p>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-[#343A40] focus:outline-0 focus:ring-2 focus:ring-[#17cf73]/50 border border-gray-200 bg-[#f6f8f7] h-36 placeholder:text-gray-400 p-4 text-base font-normal leading-normal"
                    placeholder="Type your message here..."
                  />
                </label>

                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    <span className="material-symbols-outlined">check_circle</span>
                    Thank you! We've received your message and will respond within 24 hours.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    <span className="material-symbols-outlined">error</span>
                    Something went wrong. Please try again or email us directly.
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-[#17cf73] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#13ec80] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#17cf73] disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="truncate">Sending...</span>
                    ) : (
                      <span className="truncate">Send Message</span>
                    )}
                  </button>
                </div>
                <p className="text-center text-xs text-gray-500 pt-2">
                  By submitting this form, you agree to our{' '}
                  <Link href="/privacy" className="underline hover:text-[#17cf73]">
                    Privacy Policy
                  </Link>
                  . This site is protected by reCAPTCHA.
                </p>
              </form>
            </div>

            {/* Contact Info Block */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#343A40] mb-4">Other Ways to Reach Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#17cf73]/20 text-[#17cf73]">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#343A40]">Email</h4>
                      <p className="text-gray-500">For general inquiries, partnerships, or support.</p>
                      <a href="mailto:contact@shbd.sg" className="text-[#17cf73] font-medium hover:underline">
                        contact@shbd.sg
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#17cf73]/20 text-[#17cf73]">
                      <span className="material-symbols-outlined">call</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#343A40]">Phone</h4>
                      <p className="text-gray-500">Available from 9 AM to 5 PM, Mon - Fri.</p>
                      <a href="tel:+6561234567" className="text-[#17cf73] font-medium hover:underline">
                        +65 6123 4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#17cf73]/20 text-[#17cf73]">
                      <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#343A40]">Address</h4>
                      <p className="text-gray-500">
                        123 Orchard Road, #04-56
                        <br />
                        Singapore 238888
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.790933583204!2d103.8422409758509!3d1.3006619986872895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da199148d95129%3A0x8633a259c636f1e!2sOrchard%20Rd%2C%20Singapore!5e0!3m2!1sen!2smy!4f13.1!5m2!1sen!2smy"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
