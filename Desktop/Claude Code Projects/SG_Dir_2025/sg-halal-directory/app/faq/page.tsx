import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Singapore Halal Directory',
  description: 'Find answers to common questions about Singapore Halal Directory, MUIS certification, business listings, and how to submit or claim your halal business.',
  openGraph: {
    title: 'FAQ - Singapore Halal Directory',
    description: 'Answers to frequently asked questions about halal businesses in Singapore.',
  },
};

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is MUIS halal certification?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MUIS (Majlis Ugama Islam Singapura) is the Islamic Religious Council of Singapore. MUIS halal certification ensures that food and products meet Islamic dietary requirements and are prepared according to halal standards.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I add my business to the directory?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can submit your business through our Submit Business form. After verification of your MUIS halal certification, your listing will be reviewed and published within 24-48 hours.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is listing my business free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Standard listings are completely free. We also offer featured listings with enhanced visibility for businesses that want to stand out.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I claim an existing listing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If your business is already listed, you can claim it by visiting the business page and clicking "Claim This Business". You\'ll need to verify your ownership through our verification process.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I report incorrect information?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use our contact form and select "Report Issue" as the category. Provide details about the incorrect listing and we\'ll investigate and update the information.',
        },
      },
    ],
  };

  const faqs = [
    {
      category: 'About the Directory',
      questions: [
        {
          q: 'What is Singapore Halal Directory?',
          a: 'Singapore Halal Directory is a comprehensive online directory of MUIS-certified halal businesses in Singapore. We help Muslim consumers find verified halal restaurants, food suppliers, and services across all 28 districts.',
        },
        {
          q: 'How do you verify halal certification?',
          a: 'All businesses listed in our directory are verified against official MUIS (Majlis Ugama Islam Singapura) certification records. We regularly update our database to ensure accuracy.',
        },
        {
          q: 'Is this an official MUIS website?',
          a: 'No, Singapore Halal Directory is an independent platform. While we verify all listings against MUIS certification, we are not affiliated with MUIS. For official certification inquiries, please visit muis.gov.sg.',
        },
      ],
    },
    {
      category: 'For Business Owners',
      questions: [
        {
          q: 'How do I add my business to the directory?',
          a: 'Simply visit our Submit Business page and fill out the form with your business details. Make sure to include your MUIS halal certificate number. Our team will verify and approve your listing within 24-48 hours.',
        },
        {
          q: 'Is listing my business free?',
          a: 'Yes! Standard listings are completely free and include your business name, address, contact details, and one photo. Featured listings with enhanced visibility are available for a small fee.',
        },
        {
          q: 'How do I claim an existing listing?',
          a: "If your business is already in our directory, you can claim it by visiting your business page and clicking 'Claim This Business'. You'll need to verify your ownership, and once approved, you can manage your listing.",
        },
        {
          q: 'How do I update my business information?',
          a: 'Once you\'ve claimed your business, you can log in to your dashboard and edit your listing anytime. Changes are reflected immediately after saving.',
        },
      ],
    },
    {
      category: 'For Users',
      questions: [
        {
          q: 'How do I search for halal businesses?',
          a: 'You can browse by area, category, or use our search function. Filter results by cuisine type, location, or business category to find exactly what you\'re looking for.',
        },
        {
          q: 'Can I leave reviews for businesses?',
          a: 'Review functionality is coming soon! In the meantime, you can contact us to share feedback about any business in our directory.',
        },
        {
          q: 'How do I report incorrect information?',
          a: "Use our Contact page and select 'Report Issue' as the category. Provide details about the incorrect listing, and our team will investigate and update the information promptly.",
        },
      ],
    },
    {
      category: 'Technical Support',
      questions: [
        {
          q: 'The website isn\'t loading properly. What should I do?',
          a: 'Try clearing your browser cache and refreshing the page. If the issue persists, try a different browser or device. Contact us if problems continue.',
        },
        {
          q: 'How do I contact support?',
          a: 'You can reach us through our Contact page. We respond to all inquiries within 24 hours during business days.',
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white py-16">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-green-50">
                Find answers to common questions about our halal directory
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {faqs.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
                    {section.category}
                  </h2>
                  <div className="space-y-6">
                    {section.questions.map((faq, faqIndex) => (
                      <div key={faqIndex} className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          {faq.q}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-[#17cf73] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Contact Us
              </Link>
              <Link
                href="/submit"
                className="bg-white text-[#17cf73] border-2 border-[#17cf73] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors"
              >
                Submit a Business
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
