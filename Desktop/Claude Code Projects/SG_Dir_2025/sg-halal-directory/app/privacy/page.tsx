import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - Singapore Halal Directory',
  description: 'Read our privacy policy to understand how Singapore Halal Directory collects, uses, and protects your personal information.',
  openGraph: {
    title: 'Privacy Policy - Singapore Halal Directory',
    description: 'Our commitment to protecting your privacy and personal data.',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-green-50">
              Last updated: November 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <p className="text-gray-700 m-0">
                Singapore Halal Directory ("we", "us", or "our") is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, and safeguard your information when you
                visit our website singaporehalaldir.com.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Personal Information</h3>
            <p className="text-gray-600 mb-4">
              We may collect personal information that you voluntarily provide when:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Submitting a business listing</li>
              <li>Claiming an existing business</li>
              <li>Contacting us through our contact form</li>
              <li>Creating an account</li>
              <li>Subscribing to our newsletter</li>
            </ul>
            <p className="text-gray-600 mb-4">
              This information may include your name, email address, phone number, business details,
              and MUIS certification information.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Automatically Collected Information</h3>
            <p className="text-gray-600 mb-4">
              When you visit our website, we automatically collect certain information including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device type</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Process and display business listings</li>
              <li>Verify business ownership claims</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Send important updates about your listing</li>
              <li>Improve our website and services</li>
              <li>Analyze usage patterns and trends</li>
              <li>Prevent fraud and ensure security</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Service Providers:</strong> Third parties who help us operate our website (hosting, analytics, payment processing)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
            <p className="text-gray-600 mb-4">
              Business information that you submit for listing (business name, address, contact details)
              will be publicly displayed on our directory.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Cookies and Tracking</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Keep you logged in</li>
              <li>Remember your preferences</li>
              <li>Analyze website traffic</li>
              <li>Improve user experience</li>
            </ul>
            <p className="text-gray-600 mb-4">
              You can control cookies through your browser settings. Disabling cookies may affect
              some website functionality.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate security measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>SSL encryption for data transmission</li>
              <li>Secure data storage</li>
              <li>Regular security assessments</li>
              <li>Access controls for staff</li>
            </ul>
            <p className="text-gray-600 mb-4">
              While we strive to protect your information, no method of transmission over the internet
              is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Your Rights</h2>
            <p className="text-gray-600 mb-4">
              Under Singapore's Personal Data Protection Act (PDPA), you have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Withdraw consent for data collection</li>
              <li>Request deletion of your data</li>
            </ul>
            <p className="text-gray-600 mb-4">
              To exercise these rights, please contact us at support@singaporehalaldir.com.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Third-Party Links</h2>
            <p className="text-gray-600 mb-4">
              Our website may contain links to third-party websites. We are not responsible for the
              privacy practices of these sites. We encourage you to read their privacy policies.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-600 mb-4">
              Our services are not intended for children under 13. We do not knowingly collect
              personal information from children under 13.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> support@singaporehalaldir.com</p>
              <p className="text-gray-700 mb-0">
                <strong>Contact Form:</strong>{' '}
                <Link href="/contact" className="text-green-600 hover:text-green-700 underline">
                  Contact Us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-4">
            Have questions about your data or privacy?
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#17cf73] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
