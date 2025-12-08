import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Browse Categories - Singapore Halal Directory",
  description: "Explore halal-certified businesses by category. Find restaurants, retail shops, health & wellness, and more across Singapore.",
};

// Default category images
const CATEGORY_IMAGES: Record<string, string> = {
  "Restaurant": "https://lh3.googleusercontent.com/aida-public/AB6AXuB2T-66vsVZOhwIEKjymftXirfCd1BtGKBqO2wb15YregvEkueY8u39x4c3B-o3J74qOtT8z2TD8Uo38gAVNseN1VcIpGR6CY3jcedJA6-e7Q0zleNSCUZiQEJGEfgReYb7y0jCmLfs-Q6mWUPY8NR9lspbPNBfGxJ5TqSCQEfjrgWt8NyZ0Eb2eOF5Jp7QCnrOYd2A5fOhGmBN98B3DWfRO7AMLS6wbch36H75eCLJ_qSoyZlOtwe2KodujBj0Qn2hL2kUxgV6K3Q",
  "Cafe": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXOS-J0CV0QVMO9oqr7d5od3PFRbZkVB9w7rGAQb4MiccWBoeoiOAHLHCgHM5gfwlh9j0dimvanzHedAjADBgJJ4ZoOkV7IyyDKV3bQDur4t8cY-bJ0ftwBUQ6-2c5GPcpFW31BRlY-snkBpMfu0ga4IzcRtr54MYXw29XydopIL8NLjM4PNnYEzVARtNMqUhxUDLLP_CiRBiXRkhe6Ja0LJRgtV1uDRdDz47XvaTJA9NljZWBq3v7HkdONqnxl4nLNVoVXvkk4s8",
  "Retail": "https://lh3.googleusercontent.com/aida-public/AB6AXuD6kNecFkMHHeuYfK7UDTuf8f7LescD8ySUaG7kU2hlhOJ5nm0kZC1xw3Nm2_FtikHdEAnhZBdAVKz5PAa2Ki8eno0UA0sRecl2fiAIuNVCXZs-ZQ09Cez0aYlhZTPmGRtg86Pcvv6UBe9sTMJG5IxzdSCgM_IX9Xi2MS_KKBiYduzaKHyyS4IKCCX11WqwT3KjBmVTdZRiNsQ8-Tw9pTMi0EH15mkAZBUVhOJvibeX9vstUGt0z6XfjkH1eUVk83PkVUD96aL9Xb8",
  "Services": "https://lh3.googleusercontent.com/aida-public/AB6AXuCwEdx-IwycGMpGxpY2sgU4ANMmCM_eGA7JpjnKDq9m-ntonfeOeBJJMTSOFJNrfwrNGEY3Ql0flgOpwCkbPgvgPmIRTIoIuGhV7nB59QKGj-X303sEyt29POg-95WlbX9DnUz9950it3eNcp5L-fen4TgbG0o7yDeG_a-zsn8SzIN_jLRW_w8CYk8H5NbajjMnXg6s_QuDHYrN-g4t6ftQMOkK82I0vYqIkalaBZKeJpy4hV8obuprVgFbsaMI2BM1yyA1VkTZXEc",
  "Health": "https://lh3.googleusercontent.com/aida-public/AB6AXuACvqKSd_hONkrof-FGXhw2Ji4zJqRIygLjsH2qO5sT60IBaOd4TPdttNN6qt80ACRxDksOtpnLExnaSjh1g_XYiykAB9SyJRQTKmdPVTsOEAG4r7Y9fsuTcPb7ewznvQZkG2Y2F_4y3-9IELEKMmQzX7pu4PzzUbtgZ_4hRPNlKoDWAkYbcMfC7ccJ8IYYQC4DwJDchPTsHhwbpgxMz7nISL2tD8YkkfKtiib1Gs5gTqrZRDwmud5X3ChadwB_Gla9t8_aj4lAiOU",
  "default": "https://lh3.googleusercontent.com/aida-public/AB6AXuBDH1HgNYD19VDoP8O96wOkz92rXN3nsjO58aCd8GYifKUFXUO7JlJMNGWQFPFTcW34gbX29hwJ5Mux1l-qbl6qUe8XM1KXUTcstS_Em6Bj-ORhpymobA0VM3vx-vxxh9zjHypcv7qO6oKhnRmfGAXWYzWUYl-3R1q0x8oW1U7x7PRNOXmn008X0-fkUOs56xW-7DPOiJ60NXBgVtWqY0VARVI0YRAd8K3bIBfEOc5bwFhEu85-pOUO0OZK6_MhmKuqdvg5EM4d9F8",
};

interface CategoryData {
  name: string;
  slug: string;
  count: number;
  image: string;
}

function CategoryCard({ category }: { category: CategoryData }) {
  return (
    <Link
      href={`/directory?category=${category.slug}`}
      className="group flex flex-col gap-3 pb-3"
    >
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="inline-block bg-[#17cf73] text-white text-xs font-semibold px-2 py-1 rounded-full">
            {category.count.toLocaleString()} listings
          </span>
        </div>
      </div>
      <div>
        <p className="text-[#343A40] dark:text-gray-100 text-base font-bold leading-tight group-hover:text-[#17cf73] transition-colors">
          {category.name}
        </p>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 pb-3 animate-pulse">
      <div className="bg-gray-300 dark:bg-gray-700 w-full aspect-[4/3] rounded-xl" />
      <div>
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  );
}

export default async function CategoriesPage() {
  const supabase = await createClient();

  // Get distinct business types with counts
  const { data: businessTypesData } = await supabase
    .from("businesses")
    .select("business_type")
    .eq("status", "approved");

  // Count businesses per type
  const typeCounts = new Map<string, number>();
  (businessTypesData || []).forEach((b) => {
    const type = b.business_type || "Other";
    typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
  });

  // Convert to array and sort by count
  const categories: CategoryData[] = Array.from(typeCounts.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      count,
      image: CATEGORY_IMAGES[name] || CATEGORY_IMAGES.default,
    }))
    .sort((a, b) => b.count - a.count);

  const totalListings = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f7] dark:bg-[#112119]">
      <Header />

      <main id="main-content" className="flex h-full grow flex-col">
        <div className="container mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#343A40] dark:text-gray-100">
                Browse Categories
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Explore {totalListings.toLocaleString()} halal-certified businesses across Singapore
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-gray-600 dark:text-gray-400 text-sm" htmlFor="sort">
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="rounded-lg border-gray-300 dark:border-gray-600 bg-[#f6f8f7] dark:bg-[#112119] text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73] text-sm py-1"
                >
                  <option>Most Popular</option>
                  <option>Alphabetical</option>
                  <option>Most Listings</option>
                </select>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.slug} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl">
              <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4" aria-hidden="true">
                category
              </span>
              <h3 className="text-xl font-bold text-[#343A40] dark:text-gray-100 mb-2">
                No categories yet
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

          {/* Show skeleton loaders when loading more */}
          {categories.length > 0 && categories.length < 8 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
