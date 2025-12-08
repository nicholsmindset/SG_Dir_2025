import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

// Default business placeholder image
const DEFAULT_BUSINESS_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuB2T-66vsVZOhwIEKjymftXirfCd1BtGKBqO2wb15YregvEkueY8u39x4c3B-o3J74qOtT8z2TD8Uo38gAVNseN1VcIpGR6CY3jcedJA6-e7Q0zleNSCUZiQEJGEfgReYb7y0jCmLfs-Q6mWUPY8NR9lspbPNBfGxJ5TqSCQEfjrgWt8NyZ0Eb2eOF5Jp7QCnrOYd2A5fOhGmBN98B3DWfRO7AMLS6wbch36H75eCLJ_qSoyZlOtwe2KodujBj0Qn2hL2kUxgV6K3Q";

// Static map placeholder
const DEFAULT_MAP_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuB-N1HYW5tq5C1CMePOJkXvUYhbcVqfmKQt3WgmAakqPAflHpZSLXLjQ44HKsBIqHkefy_gDMZykS0URi5qFbYlIZuBx2H1D5Kd6DUWvlRNpPmOlKum0DlqwIIzNuFS5G6an5YE5zrZtqdXTaCVBQdfLe4s4SiRCRwBcIbh8TUTzN6w_XJAyIQVOSMWE6LTP7Nb_BkxNr3qyxo4vqhfHvEtOd9XwFKMKeqaT4jXRpOp_aIfZuBK92jusEMNAX6KdjkEiIV25V2o6U8";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data: business } = await supabase
    .from("businesses")
    .select("name, description, business_type, address")
    .or(`slug.eq.${id},id.eq.${id}`)
    .eq("status", "approved")
    .single();

  if (!business) {
    return {
      title: "Business Not Found - HalalSG Directory",
    };
  }

  return {
    title: `${business.name} - HalalSG Directory`,
    description: business.description?.slice(0, 160) || `${business.name} - ${business.business_type} in Singapore`,
  };
}

function StarRating({ rating, size = "text-xl" }: { rating: number; size?: string }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`material-symbols-outlined ${size} ${
            i < fullStars
              ? "text-[#FFC107]"
              : i === fullStars && hasHalfStar
              ? "text-[#FFC107]"
              : "text-gray-300 dark:text-gray-600"
          }`}
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
          aria-hidden="true"
        >
          {i === fullStars && hasHalfStar ? "star_half" : "star"}
        </span>
      ))}
    </div>
  );
}

export default async function BusinessPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch business details
  const { data: business, error } = await supabase
    .from("businesses")
    .select(`
      id,
      name,
      slug,
      business_type,
      description,
      address,
      postal_code,
      phone,
      email,
      website,
      halal_cert_number,
      halal_cert_expiry,
      is_featured,
      is_verified,
      latitude,
      longitude,
      created_at,
      area:areas(id, name, slug)
    `)
    .or(`slug.eq.${id},id.eq.${id}`)
    .eq("status", "approved")
    .single();

  if (error || !business) {
    notFound();
  }

  // Fetch business images
  const { data: images } = await supabase
    .from("images")
    .select("url, caption, is_primary, display_order")
    .eq("business_id", business.id)
    .order("display_order", { ascending: true });

  // Get image URLs, use defaults if none
  const businessImages = images && images.length > 0
    ? images.map((img) => img.url)
    : [DEFAULT_BUSINESS_IMAGE];

  // Create breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://singaporehalaldir.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Directory",
        item: "https://singaporehalaldir.com/directory",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: business.name,
        item: `https://singaporehalaldir.com/business/${business.slug || business.id}`,
      },
    ],
  };

  // Create LocalBusiness schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      postalCode: business.postal_code,
      addressCountry: "SG",
    },
    ...(business.phone && { telephone: business.phone }),
    ...(business.website && { url: business.website }),
    ...(business.latitude && business.longitude && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: business.latitude,
        longitude: business.longitude,
      },
    }),
    image: businessImages[0],
  };

  const area = business.area as { id: string; name: string; slug: string } | null;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f7] dark:bg-[#112119] text-[#343A40] dark:text-gray-200">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Header */}
      <Header />

      <main id="main-content" className="flex h-full grow flex-col">
        <div className="container mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#17cf73]">Home</Link>
            <span className="material-symbols-outlined text-base mx-1" aria-hidden="true">chevron_right</span>
            <Link href="/directory" className="hover:text-[#17cf73]">Directory</Link>
            {area && (
              <>
                <span className="material-symbols-outlined text-base mx-1" aria-hidden="true">chevron_right</span>
                <Link href={`/areas/${area.slug}`} className="hover:text-[#17cf73]">{area.name}</Link>
              </>
            )}
            <span className="material-symbols-outlined text-base mx-1" aria-hidden="true">chevron_right</span>
            <span className="font-medium text-[#343A40] dark:text-gray-200">{business.name}</span>
          </nav>

          {/* Image Gallery */}
          <div className={`grid gap-2 h-[500px] rounded-2xl overflow-hidden mb-8 ${
            businessImages.length === 1 ? "grid-cols-1" :
            businessImages.length === 2 ? "grid-cols-2" :
            businessImages.length === 3 ? "grid-cols-2 grid-rows-2" :
            "grid-cols-4 grid-rows-2"
          }`}>
            {businessImages.length >= 1 && (
              <div className={businessImages.length >= 4 ? "col-span-2 row-span-2" : businessImages.length === 3 ? "row-span-2" : ""}>
                <img
                  alt={`Main view of ${business.name}`}
                  className="h-full w-full object-cover"
                  src={businessImages[0]}
                />
              </div>
            )}
            {businessImages.slice(1, 4).map((img, index) => (
              <div key={index} className={index === 2 && businessImages.length >= 4 ? "col-span-2" : ""}>
                <img
                  alt={`View ${index + 2} of ${business.name}`}
                  className="h-full w-full object-cover"
                  src={img}
                />
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Business Header */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-700/80">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-4xl font-bold text-[#343A40] dark:text-gray-100">{business.name}</h1>
                      {business.is_verified && (
                        <span
                          className="material-symbols-outlined text-[#17cf73] text-3xl"
                          style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
                          title="Verified Business"
                          aria-label="Verified Business"
                        >
                          verified
                        </span>
                      )}
                      {business.is_featured && (
                        <span className="bg-[#17cf73] text-white text-xs font-bold px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="material-symbols-outlined text-base mr-1" aria-hidden="true">location_on</span>
                      <span>{business.address}</span>
                      <span className="mx-2">&middot;</span>
                      <span className="text-xs bg-[#17cf73]/20 text-[#17cf73] font-semibold px-2 py-0.5 rounded-full">
                        {business.business_type}
                      </span>
                    </div>
                    {business.halal_cert_number && (
                      <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="material-symbols-outlined text-base mr-1 text-[#17cf73]" aria-hidden="true">verified_user</span>
                        <span>Halal Cert: {business.halal_cert_number}</span>
                        {business.halal_cert_expiry && (
                          <span className="ml-2 text-xs">
                            (Valid until {new Date(business.halal_cert_expiry).toLocaleDateString()})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 h-10 px-4 py-2 rounded-lg text-sm"
                      aria-label="Save this business"
                    >
                      <span className="material-symbols-outlined text-base" aria-hidden="true">bookmark_border</span> Save
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 h-10 px-4 py-2 rounded-lg text-sm"
                      aria-label="Share this business"
                    >
                      <span className="material-symbols-outlined text-base" aria-hidden="true">share</span> Share
                    </button>
                  </div>
                </div>
              </div>

              {/* About Section */}
              {business.description && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-700/80">
                  <h2 className="text-2xl font-bold text-[#343A40] dark:text-gray-100 mb-4">
                    About {business.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {business.description}
                  </p>
                </div>
              )}

              {/* Claim Business CTA */}
              <div className="bg-gradient-to-r from-[#17cf73]/10 to-[#17cf73]/5 dark:from-[#17cf73]/20 dark:to-[#17cf73]/10 p-6 rounded-2xl border border-[#17cf73]/20">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-[#343A40] dark:text-gray-100 mb-1">Is this your business?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Claim this listing to update information, add photos, and respond to reviews.
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/claim-business?businessId=${business.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#17cf73] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-bold whitespace-nowrap"
                  >
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">verified</span>
                    Claim Business
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Business Information */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-700/80">
                  <h2 className="text-2xl font-bold text-[#343A40] dark:text-gray-100 mb-6">
                    Business Information
                  </h2>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start">
                      <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 mt-0.5 mr-3" aria-hidden="true">
                        location_on
                      </span>
                      <div>
                        <h3 className="font-semibold text-[#343A40] dark:text-gray-200">Address</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {business.address}
                          {business.postal_code && `, Singapore ${business.postal_code}`}
                        </p>
                      </div>
                    </div>
                    {business.phone && (
                      <div className="flex items-start">
                        <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 mt-0.5 mr-3" aria-hidden="true">
                          call
                        </span>
                        <div>
                          <h3 className="font-semibold text-[#343A40] dark:text-gray-200">Contact</h3>
                          <a
                            className="text-gray-600 dark:text-gray-400 hover:text-[#17cf73]"
                            href={`tel:${business.phone}`}
                          >
                            {business.phone}
                          </a>
                        </div>
                      </div>
                    )}
                    {business.email && (
                      <div className="flex items-start">
                        <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 mt-0.5 mr-3" aria-hidden="true">
                          mail
                        </span>
                        <div>
                          <h3 className="font-semibold text-[#343A40] dark:text-gray-200">Email</h3>
                          <a
                            className="text-gray-600 dark:text-gray-400 hover:text-[#17cf73]"
                            href={`mailto:${business.email}`}
                          >
                            {business.email}
                          </a>
                        </div>
                      </div>
                    )}
                    {business.website && (
                      <div className="flex items-start">
                        <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 mt-0.5 mr-3" aria-hidden="true">
                          language
                        </span>
                        <div>
                          <h3 className="font-semibold text-[#343A40] dark:text-gray-200">Website</h3>
                          <a
                            className="text-gray-600 dark:text-gray-400 hover:text-[#17cf73]"
                            href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {business.website.replace(/^https?:\/\//, "")}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location / Map */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-700/80">
                  <h2 className="text-2xl font-bold text-[#343A40] dark:text-gray-100 mb-4">Location</h2>
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {business.latitude && business.longitude ? (
                      <iframe
                        title={`Map showing location of ${business.name}`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${business.longitude - 0.005}%2C${business.latitude - 0.005}%2C${business.longitude + 0.005}%2C${business.latitude + 0.005}&layer=mapnik&marker=${business.latitude}%2C${business.longitude}`}
                      />
                    ) : (
                      <img
                        alt={`Map showing the location of ${business.name}`}
                        className="w-full h-full object-cover"
                        src={DEFAULT_MAP_IMAGE}
                      />
                    )}
                  </div>
                  <a
                    className="mt-4 block text-center bg-[#17cf73] text-white font-bold py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity text-sm"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address + (business.postal_code ? `, Singapore ${business.postal_code}` : ""))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </div>

                {/* Upgrade to Featured CTA */}
                {!business.is_featured && (
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border border-amber-200 dark:border-amber-700/50">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                        star
                      </span>
                      <h3 className="font-bold text-[#343A40] dark:text-gray-100">Get Featured</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Stand out from the crowd! Featured businesses appear at the top of search results and on the homepage.
                    </p>
                    <Link
                      href={`/upgrade/featured?businessId=${business.id}`}
                      className="block text-center bg-amber-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-amber-600 transition-colors text-sm"
                    >
                      Upgrade Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
