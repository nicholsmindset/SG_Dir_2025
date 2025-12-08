import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

// Default placeholder images for regions without images
const REGION_IMAGES: Record<string, string> = {
  central: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2Ljm5a4AeXS252YeM6RME2gi6mbZXzrqTRPN0awZItE1Y11XhI2s7FKxEEWYAQYCZ2yiT3Q24gHpAWjJC0361tSKwcW8WXfoJgRdAvBUMwtrhWATNHsY6Lm7IhQKHl-z-AkI8_OOb7Uwl84fXA22OfrhsCQhffIFFpayCS4F_dnWJag7jKJQsNrb64jNVeffO6fQ3mPsurfrCqoIG_8bsrHzPbDOvCHNiku9O9AwIfEkO_1qCWlEhep4Fo_36IidyCRMs1z8bE9g",
  east: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtO04CLnhFlwzmGLijwlaQSkxM-CikKCZBomS0JHsHrcAWCf8Yk1XGYpMqoKWfLLinrjAIzLAHt3mMFZbToxFvMDd9JrEf6UnDL8fV-iUksLtyWN_sH7b1jhPOIh-zo-hLHs2iXJSALWgJMMTmjOf1Gdd-uDulgeM3-tJ5VAe9VmKb3E51j7wXdRT8SVLoGQZ4ywQRViJ32cjnd6vUHBfVWbyruJvk8PyhAPuAZOEn7xv4bqQepPYMrXKVirOGcdis3CBNQt60edg",
  west: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiBBsnGpe4BqS4BT1E7kwSVTJ-QofXbAQ2I6uIoWUplLBoZhps3zuhA47iMOg0IQamIC63TshRvt75bUb-ih7nYfBl56-NWFtiW2fXEtRElGbSSBfzLWrBJeIoVl9uhHikPKQlwzq9Ve9c6N6EVPxAmL8aQKBupj1QP5Smurr43f6kB1DjTNqkLDcqEtFG3VJ003Pz11K9Q2N4YliVI025xxAgDLd--D6sPqO05rJAtDBFNkZJka_VSqkpHkNk2Fzs9SaqOZFIkEk",
  north: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRXCuE5i6se2NlUPwMpeItcA1gI3hNNExAFqv8xfgwbNZI8_BxpyfI6b97i0CX4REiPq02Rr_W1Iw3WD7G4Zn6R8jsWmqtUfcyEsa7BACNyVlv-gvwAwBGzaEoOR2cF5pZ8L5XLRhmVImfES7F_6Ym6Jr3G-VYTnWvXxa9pRsAGesKOHbo5pHCw5m8zlovs6a8pM-K2F1CTeR3nkz2eOggFuXD7eoNsAYfoEEjKfv7Xfrd08u4rpV_78hylMsirt8cLNwhwtIOIcs",
  default: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDH1HgNYD19VDoP8O96wOkz92rXN3nsjO58aCd8GYifKUFXUO7JlJMNGWQFPFTcW34gbX29hwJ5Mux1l-qbl6qUe8XM1KXUTcstS_Em6Bj-ORhpymobA0VM3vx-vxxh9zjHypcv7qO6oKhnRmfGAXWYzWUYl-3R1q0x8oW1U7x7PRNOXmn008X0-fkUOs56xW-7DPOiJ60NXBgVtWqY0VARVI0YRAd8K3bIBfEOc5bwFhEu85-pOUO0OZK6_MhmKuqdvg5EM4d9F8",
};

// Default business placeholder image
const DEFAULT_BUSINESS_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuB2T-66vsVZOhwIEKjymftXirfCd1BtGKBqO2wb15YregvEkueY8u39x4c3B-o3J74qOtT8z2TD8Uo38gAVNseN1VcIpGR6CY3jcedJA6-e7Q0zleNSCUZiQEJGEfgReYb7y0jCmLfs-Q6mWUPY8NR9lspbPNBfGxJ5TqSCQEfjrgWt8NyZ0Eb2eOF5Jp7QCnrOYd2A5fOhGmBN98B3DWfRO7AMLS6wbch36H75eCLJ_qSoyZlOtwe2KodujBj0Qn2hL2kUxgV6K3Q";

// Helper function to get time ago string
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 14) return "1 week ago";
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return `${Math.floor(diffInDays / 30)} months ago`;
}

export default async function Home() {
  const supabase = await createClient();

  // Fetch areas/regions from database
  const { data: areasData } = await supabase
    .from("areas")
    .select("id, name, slug, business_count")
    .order("business_count", { ascending: false })
    .limit(4);

  // Transform areas data with images
  const districts = (areasData || []).map((area) => ({
    name: area.name,
    slug: area.slug,
    image: REGION_IMAGES[area.slug.toLowerCase()] || REGION_IMAGES.default,
    businessCount: area.business_count,
  }));

  // If no areas in database, use fallback data
  const fallbackDistricts = [
    { name: "Central Region", slug: "central", image: REGION_IMAGES.central, businessCount: 0 },
    { name: "East Region", slug: "east", image: REGION_IMAGES.east, businessCount: 0 },
    { name: "West Region", slug: "west", image: REGION_IMAGES.west, businessCount: 0 },
    { name: "North Region", slug: "north", image: REGION_IMAGES.north, businessCount: 0 },
  ];

  const displayDistricts = districts.length > 0 ? districts : fallbackDistricts;

  // Fetch featured businesses from database
  const { data: featuredData } = await supabase
    .from("businesses")
    .select(`
      id,
      name,
      slug,
      business_type,
      address,
      is_featured,
      area:areas(name)
    `)
    .eq("status", "approved")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(4);

  // Fetch primary images for featured businesses
  const featuredIds = (featuredData || []).map((b) => b.id);
  const { data: featuredImages } = featuredIds.length > 0
    ? await supabase
        .from("images")
        .select("business_id, url")
        .in("business_id", featuredIds)
        .eq("is_primary", true)
    : { data: [] };

  // Create image lookup map
  const imageMap = new Map((featuredImages || []).map((img) => [img.business_id, img.url]));

  // Transform featured businesses data
  const featuredBusinesses = (featuredData || []).map((business) => ({
    id: business.slug || business.id,
    name: business.name,
    type: business.business_type,
    location: (business.area as { name: string } | null)?.name || "Singapore",
    image: imageMap.get(business.id) || DEFAULT_BUSINESS_IMAGE,
  }));

  // Fetch recently added businesses
  const { data: recentData } = await supabase
    .from("businesses")
    .select(`
      id,
      name,
      slug,
      business_type,
      created_at
    `)
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(3);

  // Fetch images for recent businesses
  const recentIds = (recentData || []).map((b) => b.id);
  const { data: recentImages } = recentIds.length > 0
    ? await supabase
        .from("images")
        .select("business_id, url")
        .in("business_id", recentIds)
        .eq("is_primary", true)
    : { data: [] };

  // Create image lookup map for recent
  const recentImageMap = new Map((recentImages || []).map((img) => [img.business_id, img.url]));

  // Transform recent businesses data
  const newListings = (recentData || []).map((business) => ({
    id: business.slug || business.id,
    name: business.name,
    type: business.business_type,
    addedAgo: getTimeAgo(new Date(business.created_at)),
    image: recentImageMap.get(business.id) || DEFAULT_BUSINESS_IMAGE,
  }));

  // Organization schema for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Singapore Halal Business Directory",
    description: "Your trusted guide to finding certified Halal eateries, services, and shops in Singapore",
    url: "https://singaporehalaldir.com",
    logo: "https://singaporehalaldir.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      areaServed: "SG",
      availableLanguage: ["English", "Malay"],
    },
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f7] dark:bg-[#112119]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Header */}
      <Header showSearch={false} />

      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <section className="relative">
          <div className="container mx-auto px-6 py-20 sm:py-24 lg:py-32">
            <div
              className="absolute inset-0 bg-cover bg-center -z-10"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("${REGION_IMAGES.default}")`,
              }}
            />
            <div className="flex min-h-[400px] flex-col gap-8 items-center justify-center text-center">
              <div className="flex flex-col gap-2">
                <h1 className="text-white text-4xl font-black tracking-tight md:text-6xl">
                  Your Guide to Halal in Singapore
                </h1>
                <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto">
                  Discover certified Halal eateries, services, and shops near you.
                </p>
              </div>
              <div className="w-full max-w-2xl">
                <form action="/search" method="GET" className="flex flex-col h-16 w-full">
                  <div className="flex w-full flex-1 items-stretch rounded-xl shadow-lg">
                    <div className="hidden sm:flex bg-white items-center justify-center pl-4 pr-2 rounded-l-xl">
                      <label htmlFor="category" className="sr-only">Category</label>
                      <select
                        id="category"
                        name="category"
                        className="w-full h-full border-0 bg-transparent text-[#343A40] focus:ring-0 text-sm font-medium"
                      >
                        <option value="">All Categories</option>
                        <option value="Restaurant">Food & Beverage</option>
                        <option value="Retail">Retail</option>
                        <option value="Services">Services</option>
                        <option value="Health">Health & Wellness</option>
                      </select>
                    </div>
                    <label htmlFor="search-query" className="sr-only">Search query</label>
                    <input
                      id="search-query"
                      type="text"
                      name="q"
                      className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#343A40] focus:outline-0 focus:ring-2 focus:ring-[#17cf73]/50 border-0 bg-white h-full placeholder:text-gray-500 px-5 text-base sm:rounded-l-none"
                      placeholder="Search for a business or cuisine..."
                    />
                    <button
                      type="submit"
                      className="flex min-w-[100px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-r-xl h-full px-5 bg-[#17cf73] text-white text-base font-bold tracking-wide hover:opacity-90 transition-opacity"
                    >
                      <span className="truncate">Search</span>
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/categories" className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm hover:bg-white/30 transition-colors">
                  Browse Categories
                </Link>
                <Link href="/directory" className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm hover:bg-white/30 transition-colors">
                  View All Listings
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Explore by District */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold tracking-tight text-[#343A40] dark:text-gray-100 pb-6 text-center">
            Explore by Region
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayDistricts.map((district) => (
              <Link
                key={district.slug}
                href={`/areas/${district.slug}`}
                className="relative group overflow-hidden rounded-xl cursor-pointer"
              >
                <div
                  className="bg-cover bg-center h-48 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url("${district.image}")`,
                  }}
                  role="img"
                  aria-label={`${district.name} region`}
                />
                <p className="absolute bottom-4 left-4 text-white text-lg font-bold">{district.name}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Businesses */}
        <section className="bg-white dark:bg-gray-800 py-16">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center pb-6">
              <h2 className="text-3xl font-bold tracking-tight text-[#343A40] dark:text-gray-100">
                Featured Businesses
              </h2>
              <Link href="/directory" className="text-[#17cf73] font-semibold hover:underline">
                View all &rarr;
              </Link>
            </div>
            {featuredBusinesses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredBusinesses.map((business) => (
                  <Link
                    key={business.id}
                    href={`/business/${business.id}`}
                    className="bg-[#f6f8f7] dark:bg-gray-700 rounded-xl overflow-hidden shadow-md group border-2 border-transparent hover:border-[#17cf73] hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative">
                      <div
                        className="bg-cover bg-center h-40"
                        style={{ backgroundImage: `url("${business.image}")` }}
                        role="img"
                        aria-label={`Photo of ${business.name}`}
                      />
                      <span className="absolute top-3 right-3 bg-[#17cf73] text-white text-xs font-bold px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-[#343A40] dark:text-gray-100">{business.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{business.type}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{business.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <p className="text-gray-500 dark:text-gray-400 mb-4">No featured businesses yet.</p>
                <Link
                  href="/submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#17cf73] text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
                >
                  <span className="material-symbols-outlined" aria-hidden="true">add_business</span>
                  Be the first to list!
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="container mx-auto px-6 py-16">
          <div className="bg-[#17cf73] text-white rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Stay in the Loop</h2>
            <p className="mt-2 max-w-xl mx-auto">
              Sign up for our newsletter to get the latest listings and exclusive deals delivered to your inbox.
            </p>
            <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                autoComplete="email"
                className="w-full rounded-lg border-0 px-5 py-3 text-[#343A40] placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-white"
                id="newsletter-email"
                name="email"
                placeholder="Enter your email address"
                required
                type="email"
              />
              <button
                className="flex-shrink-0 rounded-lg bg-[#343A40] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#343A40]/90 transition-colors"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* Newly Added */}
        <section className="container mx-auto px-6 py-12">
          <div className="flex justify-between items-center pb-6">
            <h2 className="text-3xl font-bold tracking-tight text-[#343A40] dark:text-gray-100">
              Newly Added
            </h2>
            <Link href="/directory?sort=newest" className="text-[#17cf73] font-semibold hover:underline">
              See more &rarr;
            </Link>
          </div>
          {newListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newListings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/business/${listing.id}`}
                  className="bg-white dark:bg-gray-800 p-5 rounded-lg flex items-center gap-4 border border-gray-200 dark:border-gray-700 hover:border-[#17cf73] transition-colors"
                >
                  <div
                    className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url("${listing.image}")` }}
                    role="img"
                    aria-label={`Photo of ${listing.name}`}
                  />
                  <div>
                    <h3 className="font-bold text-[#343A40] dark:text-gray-100">{listing.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{listing.type}</p>
                    <p className="text-xs text-gray-500 mt-1">Added {listing.addedAgo}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400">No businesses listed yet. Be the first!</p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-[#343A40] dark:bg-gray-900 py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Own a Halal Business?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Get discovered by thousands of customers. List your business for free and reach more customers across Singapore.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#17cf73] text-white rounded-lg font-bold text-lg hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined" aria-hidden="true">add_business</span>
              List Your Business Free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
