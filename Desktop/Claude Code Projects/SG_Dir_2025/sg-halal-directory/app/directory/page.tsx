import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Browse Halal Businesses - Singapore Halal Directory",
  description: "Browse halal-certified businesses across all Singapore areas. Find restaurants, food establishments, and services in your neighborhood.",
};

const DEFAULT_BUSINESS_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuB2T-66vsVZOhwIEKjymftXirfCd1BtGKBqO2wb15YregvEkueY8u39x4c3B-o3J74qOtT8z2TD8Uo38gAVNseN1VcIpGR6CY3jcedJA6-e7Q0zleNSCUZiQEJGEfgReYb7y0jCmLfs-Q6mWUPY8NR9lspbPNBfGxJ5TqSCQEfjrgWt8NyZ0Eb2eOF5Jp7QCnrOYd2A5fOhGmBN98B3DWfRO7AMLS6wbch36H75eCLJ_qSoyZlOtwe2KodujBj0Qn2hL2kUxgV6K3Q";

const categories = [
  { name: "Restaurant", checked: true },
  { name: "Retail", checked: false },
  { name: "Services", checked: false },
  { name: "Health", checked: false },
];

const locations = ["All", "Central", "North", "South", "East", "West"];

interface Business {
  id: string;
  name: string;
  slug: string | null;
  address: string;
  business_type: string;
  is_featured: boolean;
  image?: string;
}

function BusinessCard({ business }: { business: Business }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-200/80 dark:border-gray-700/80 flex flex-col">
      <div className="relative h-40 w-full">
        <Image
          className="object-cover"
          src={business.image || DEFAULT_BUSINESS_IMAGE}
          alt={business.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {business.is_featured && (
          <span className="absolute top-2 right-2 bg-[#17cf73] text-white text-xs font-bold px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs bg-[#17cf73]/20 text-[#17cf73] font-semibold px-2 py-0.5 rounded-full self-start mb-2">
          {business.business_type}
        </span>
        <h4 className="text-lg font-bold text-[#343A40] dark:text-gray-100 flex-grow">
          {business.name}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
          {business.address}
        </p>
        <Link
          href={`/business/${business.slug || business.id}`}
          className="mt-4 text-center bg-gray-100 dark:bg-gray-700 text-[#343A40] dark:text-gray-200 font-bold py-2 px-4 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200/80 dark:border-gray-700/80 flex flex-col animate-pulse">
      <div className="bg-gray-300 dark:bg-gray-700 h-40 w-full" />
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-3" />
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-3" />
        <div className="h-9 bg-gray-200 dark:bg-gray-600 rounded-lg w-full mt-auto" />
      </div>
    </div>
  );
}

export default async function DirectoryPage() {
  const supabase = await createClient();

  // Fetch businesses from database
  const { data: businessesData, count } = await supabase
    .from("businesses")
    .select("id, name, slug, address, business_type, is_featured", { count: "exact" })
    .eq("status", "approved")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(12);

  // Get images for businesses
  const businessIds = (businessesData || []).map((b) => b.id);
  const { data: imagesData } = businessIds.length > 0
    ? await supabase
        .from("images")
        .select("business_id, url")
        .in("business_id", businessIds)
        .eq("is_primary", true)
    : { data: [] };

  const imageMap = new Map((imagesData || []).map((img) => [img.business_id, img.url]));

  const businesses: Business[] = (businessesData || []).map((b) => ({
    ...b,
    image: imageMap.get(b.id) || DEFAULT_BUSINESS_IMAGE,
  }));

  const totalCount = count || 0;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f7] dark:bg-[#112119]">
      <Header />

      <main id="main-content" className="flex h-full grow flex-col">
        <div className="container mx-auto px-6 flex flex-1 py-8">
          <div className="flex flex-col md:flex-row w-full gap-8">
            {/* Filters Sidebar */}
            <aside className="w-full md:w-1/4 lg:w-1/5 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex flex-wrap justify-between gap-3 pb-4 border-b border-gray-200/80 dark:border-gray-700/80">
                  <p className="text-2xl font-bold leading-tight tracking-[-0.033em] text-[#343A40] dark:text-gray-100">
                    Filter Your Search
                  </p>
                </div>
                <div className="space-y-6 pt-6">
                  {/* Categories */}
                  <div>
                    <h3 className="text-[#343A40] dark:text-gray-200 text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
                      Categories
                    </h3>
                    <div className="space-y-1">
                      {categories.map((cat) => (
                        <label key={cat.name} className="flex items-center gap-x-3 py-2 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={cat.checked}
                            className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 border-2 bg-transparent text-[#17cf73] checked:bg-[#17cf73] checked:border-[#17cf73] focus:ring-0 focus:ring-offset-0"
                          />
                          <p className="text-[#343A40] dark:text-gray-300 text-sm font-normal leading-normal">
                            {cat.name}
                          </p>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="text-[#343A40] dark:text-gray-200 text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
                      Location
                    </h3>
                    <label htmlFor="location-select" className="sr-only">Select location</label>
                    <select
                      id="location-select"
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-[#f6f8f7] dark:bg-[#112119] text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73] text-sm"
                    >
                      {locations.map((loc) => (
                        <option key={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <button className="w-full bg-[#17cf73] text-white font-bold py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity">
                    Apply Filters
                  </button>
                </div>
              </div>
            </aside>

            {/* Business Listings */}
            <div className="w-full md:w-3/4 lg:w-4/5">
              <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4 pb-6">
                <h1 className="text-3xl font-bold text-[#343A40] dark:text-gray-100">
                  All Halal Businesses
                </h1>
                <div className="flex items-center gap-4 text-sm">
                  <p className="text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    Showing {businesses.length} of {totalCount} results
                  </p>
                  <div className="flex items-center gap-2">
                    <label className="text-gray-600 dark:text-gray-400" htmlFor="sort">
                      Sort by:
                    </label>
                    <select
                      id="sort"
                      className="rounded-lg border-gray-300 dark:border-gray-600 bg-[#f6f8f7] dark:bg-[#112119] text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73] text-sm py-1"
                    >
                      <option>Relevance</option>
                      <option>Newest</option>
                      <option>Name</option>
                    </select>
                  </div>
                </div>
              </div>

              {businesses.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {businesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl">
                  <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4" aria-hidden="true">
                    store
                  </span>
                  <h3 className="text-xl font-bold text-[#343A40] dark:text-gray-100 mb-2">
                    No businesses found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Be the first to list your halal business!
                  </p>
                  <Link
                    href="/submit"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#17cf73] text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">add_business</span>
                    List Your Business
                  </Link>
                </div>
              )}

              {/* Loading skeletons when there are more to load */}
              {businesses.length > 0 && totalCount > businesses.length && (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
