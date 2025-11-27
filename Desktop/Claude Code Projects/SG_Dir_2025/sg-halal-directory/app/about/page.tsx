import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Us - Singapore Halal Directory | Our Mission & Values',
  description: 'Learn about Singapore\'s most comprehensive halal business directory. Discover our mission to connect the Muslim community with verified MUIS-certified businesses across all 28 districts.',
  openGraph: {
    title: 'About Singapore Halal Directory',
    description: 'Singapore\'s trusted source for verified halal businesses with 5,000+ MUIS-certified listings.',
  },
};

export default function AboutPage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Singapore Halal Directory',
    url: 'https://halalsg.com',
    logo: 'https://halalsg.com/logo.png',
    description: 'Singapore\'s most comprehensive halal business directory featuring verified MUIS-certified businesses',
    foundingDate: '2024',
    areaServed: {
      '@type': 'Country',
      name: 'Singapore',
    },
    slogan: 'Your trusted guide to halal-certified businesses in Singapore',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Header />

      <div className="min-h-screen bg-[#f6f8f7]">
        {/* Hero Section */}
        <section className="text-center py-16 sm:py-24 px-4 sm:px-8 max-w-[960px] mx-auto">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#343A40] text-4xl font-bold leading-tight tracking-tighter sm:text-5xl lg:text-6xl">
              About the Singapore Halal Business Directory
            </h1>
            <p className="text-gray-500 text-lg sm:text-xl max-w-3xl mx-auto">
              Your trusted guide to discovering and supporting Halal-certified businesses across the nation.
            </p>
          </div>
          <div
            className="mt-12 w-full bg-center bg-no-repeat aspect-[2/1] bg-cover rounded-xl"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCWxn1_GkH5pvN7NrI5jCtNlY7Y75gxmoFJjvrPXF-Bc27hFzfC1P_s5TRFI5kQaUZYK_RZJnEu2AaiMS1pbZSUJ6PCqRqMs19OURBDNYzY6siLgqrEmplcOEriqZjAZEhUt_wS1EYuy5x3ztMDGaugjoAA9i8kRRv13fOKnA_5dLsXHQi6Tg6Sx83CU84WueQpOgfiWUktz-0PEmGTAt7xTDWO7ZWOxuhnfcf6TtsnYG1JvdJzy3Se6FFPNG5lMj1Kc9TY_QldynM")',
            }}
          />
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-8 max-w-[960px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex flex-col gap-4">
              <h2 className="text-[#343A40] text-3xl font-bold leading-tight">Our Mission</h2>
              <p className="text-gray-500 text-base font-normal leading-relaxed">
                To seamlessly connect the community with a comprehensive and trusted network of Halal-certified establishments in Singapore. We aim to empower consumers to make informed choices and support businesses that adhere to Halal principles with integrity and authenticity.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-[#343A40] text-3xl font-bold leading-tight">Our Vision</h2>
              <p className="text-gray-500 text-base font-normal leading-relaxed">
                To be the most comprehensive and indispensable resource for Halal choices in Singapore, fostering a vibrant and accessible Halal ecosystem for everyone. We envision a future where finding trusted Halal options is effortless, strengthening community ties and celebrating our diverse culture.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[960px] mx-auto px-4 sm:px-8">
          <div className="border-t border-gray-200 my-8"></div>
        </div>

        {/* Our Story Section */}
        <section className="py-16 sm:py-20 text-center px-4 sm:px-8 max-w-[960px] mx-auto flex flex-col items-center">
          <h2 className="text-[#343A40] text-3xl sm:text-4xl font-bold leading-tight">Our Story</h2>
          <p className="text-gray-500 text-base font-normal leading-relaxed mt-4 max-w-3xl">
            Founded by a passionate group of individuals from the heart of the community, the Singapore Halal Business Directory was born from a simple need: to make finding reliable Halal options easier for everyone. We saw the challenges faced by both consumers seeking authentic choices and businesses wanting to reach a wider audience. Our journey began with a commitment to build a platform based on trust, community, and accessibility, creating a bridge that celebrates Singapore's rich culinary heritage while upholding the principles of Halal.
          </p>
        </section>

        {/* Our Values Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-8 max-w-[960px] mx-auto">
          <h2 className="text-[#343A40] text-3xl sm:text-4xl font-bold leading-tight text-center">Our Core Values</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center gap-4 p-6 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#17cf73]/10 text-[#17cf73]">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>
              <h3 className="text-xl font-bold text-[#343A40]">Trust</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We are committed to providing accurate and verified information to build unwavering confidence within our community.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 p-6 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#17cf73]/10 text-[#17cf73]">
                <span className="material-symbols-outlined text-3xl">groups</span>
              </div>
              <h3 className="text-xl font-bold text-[#343A40]">Community</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We strive to connect and support consumers and businesses, fostering a strong and vibrant Halal ecosystem.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 p-6 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#17cf73]/10 text-[#17cf73]">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
              </div>
              <h3 className="text-xl font-bold text-[#343A40]">Authenticity</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We champion businesses that adhere to genuine Halal principles, ensuring peace of mind for all our users.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 p-6 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#17cf73]/10 text-[#17cf73]">
                <span className="material-symbols-outlined text-3xl">accessibility_new</span>
              </div>
              <h3 className="text-xl font-bold text-[#343A40]">Accessibility</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We believe finding Halal options should be simple and effortless for everyone, anytime and anywhere.
              </p>
            </div>
          </div>
        </section>

        {/* Call-to-Action Block */}
        <section className="py-16 sm:py-20 px-4 sm:px-8 max-w-[960px] mx-auto">
          <div className="bg-[#17cf73] text-white rounded-xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold">Join Our Growing Community</h2>
              <p className="text-white/80 max-w-xl">
                Whether you're looking for your next meal or want to grow your business, our directory is here to help you connect.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto flex-shrink-0">
              <Link
                href="/directory"
                className="flex min-w-[160px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-white text-[#17cf73] text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-50 transition-colors"
              >
                <span className="truncate">Search The Directory</span>
              </Link>
              <Link
                href="/submit"
                className="flex min-w-[160px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#FFC107] text-gray-900 text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#FFD54F] transition-colors"
              >
                <span className="truncate">List Your Business</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
