import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Halal Businesses - Singapore Halal Directory",
  description: "Browse halal-certified businesses across all Singapore areas. Find restaurants, food establishments, and services in your neighborhood.",
};

// Mock data for businesses
const businesses = [
  {
    id: "padi-bussorah",
    name: "Padi @ Bussorah",
    address: "53 Bussorah St, Singapore",
    category: "F&B",
    rating: 4,
    reviews: 1204,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2T-66vsVZOhwIEKjymftXirfCd1BtGKBqO2wb15YregvEkueY8u39x4c3B-o3J74qOtT8z2TD8Uo38gAVNseN1VcIpGR6CY3jcedJA6-e7Q0zleNSCUZiQEJGEfgReYb7y0jCmLfs-Q6mWUPY8NR9lspbPNBfGxJ5TqSCQEfjrgWt8NyZ0Eb2eOF5Jp7QCnrOYd2A5fOhGmBN98B3DWfRO7AMLS6wbch36H75eCLJ_qSoyZlOtwe2KodujBj0Qn2hL2kUxgV6K3Q",
  },
  {
    id: "malayan-council",
    name: "The Malayan Council",
    address: "71 Bussorah St, Singapore",
    category: "F&B",
    rating: 4.5,
    reviews: 987,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXOS-J0CV0QVMO9oqr7d5od3PFRbZkVB9w7rGAQb4MiccWBoeoiOAHLHCgHM5gfwlh9j0dimvanzHedAjADBgJJ4ZoOkV7IyyDKV3bQDur4t8cY-bJ0ftwBUQ6-2c5GPcpFW31BRlY-snkBpMfu0ga4IzcRtr54MYXw29XydopIL8NLjM4PNnYEzVARtNMqUhxUDLLP_CiRBiXRkhe6Ja0LJRgtV1uDRdDz47XvaTJA9NljZWBq3v7HkdONqnxl4nLNVoVXvkk4s8",
  },
  {
    id: "carousel-buffet",
    name: "Carousel Buffet, Royal Plaza",
    address: "25 Scotts Rd, Singapore",
    category: "F&B",
    rating: 5,
    reviews: 2150,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6kNecFkMHHeuYfK7UDTuf8f7LescD8ySUaG7kU2hlhOJ5nm0kZC1xw3Nm2_FtikHdEAnhZBdAVKz5PAa2Ki8eno0UA0sRecl2fiAIuNVCXZs-ZQ09Cez0aYlhZTPmGRtg86Pcvv6UBe9sTMJG5IxzdSCgM_IX9Xi2MS_KKBiYduzaKHyyS4IKCCX11WqwT3KjBmVTdZRiNsQ8-Tw9pTMi0EH15mkAZBUVhOJvibeX9vstUGt0z6XfjkH1eUVk83PkVUD96aL9Xb8",
  },
];

const categories = [
  { name: "F&B", checked: true },
  { name: "Retail", checked: false },
  { name: "Professional Services", checked: false },
  { name: "Beauty & Wellness", checked: false },
];

const locations = ["Central", "North", "South", "East", "West"];

function StarRating({ rating, size = "text-lg" }: { rating: number; size?: string }) {
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
        >
          {i === fullStars && hasHalfStar ? "star_half" : "star"}
        </span>
      ))}
    </div>
  );
}

function BusinessCard({ business }: { business: typeof businesses[0] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-200/80 dark:border-gray-700/80 flex flex-col">
      <img
        className="h-40 w-full object-cover"
        src={business.image}
        alt={business.name}
      />
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs bg-[#17cf73]/20 text-[#17cf73] font-semibold px-2 py-0.5 rounded-full self-start mb-2">
          {business.category}
        </span>
        <h4 className="text-lg font-bold text-[#343A40] dark:text-gray-100 flex-grow">
          {business.name}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {business.address}
        </p>
        <div className="flex items-center mt-3">
          <StarRating rating={business.rating} />
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
            ({business.reviews.toLocaleString()})
          </span>
        </div>
        <Link
          href={`/business/${business.id}`}
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
      <div className="bg-gray-300 dark:bg-gray-700 h-40 w-full"></div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-9 bg-gray-200 dark:bg-gray-600 rounded-lg w-full"></div>
      </div>
    </div>
  );
}

export default function DirectoryPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f7] dark:bg-[#112119]">
      {/* Header */}
      <header className="w-full bg-[#f6f8f7] dark:bg-[#112119] border-b border-gray-200/80 dark:border-gray-700/80 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between whitespace-nowrap py-3">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3 text-[#343A40] dark:text-gray-100">
                <div className="size-6 text-[#17cf73]">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">HalalSG</h2>
              </Link>
              <nav className="hidden md:flex items-center gap-8">
                <Link href="/" className="text-[#343A40] dark:text-gray-200 text-sm font-medium leading-normal hover:text-[#17cf73] transition-colors">
                  Home
                </Link>
                <Link href="/directory" className="text-[#17cf73] text-sm font-bold leading-normal">
                  Directory
                </Link>
                <Link href="/categories" className="text-[#343A40] dark:text-gray-200 text-sm font-medium leading-normal hover:text-[#17cf73] transition-colors">
                  Categories
                </Link>
                <Link href="/about" className="text-[#343A40] dark:text-gray-200 text-sm font-medium leading-normal hover:text-[#17cf73] transition-colors">
                  About Us
                </Link>
                <Link href="/contact" className="text-[#343A40] dark:text-gray-200 text-sm font-medium leading-normal hover:text-[#17cf73] transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex flex-1 justify-end gap-4 items-center">
              <label className="flex flex-col w-full !h-10 max-w-sm">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-gray-100 dark:bg-gray-800">
                  <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center pl-3">
                    <span className="material-symbols-outlined text-xl">search</span>
                  </div>
                  <input
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#343A40] dark:text-gray-200 focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-2 text-sm font-normal leading-normal"
                    placeholder="Search for businesses..."
                  />
                </div>
              </label>
              <button className="md:hidden text-[#343A40] dark:text-gray-200">
                <span className="material-symbols-outlined text-2xl">menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex h-full grow flex-col">
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
                    <select className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-[#f6f8f7] dark:bg-[#112119] text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73] text-sm">
                      {locations.map((loc) => (
                        <option key={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  {/* Rating */}
                  <div>
                    <h3 className="text-[#343A40] dark:text-gray-200 text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
                      Rating
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400">
                      {[1, 2, 3, 4].map((star) => (
                        <span
                          key={star}
                          className="material-symbols-outlined text-[#FFC107] !text-2xl cursor-pointer"
                          style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
                        >
                          star
                        </span>
                      ))}
                      <span className="material-symbols-outlined !text-2xl cursor-pointer">star</span>
                      <span className="text-sm ml-1 text-gray-500 dark:text-gray-400">& up</span>
                    </div>
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
                  Halal Restaurants in Central Singapore
                </h1>
                <div className="flex items-center gap-4 text-sm">
                  <p className="text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    Showing 9 of 150 results
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
                      <option>Rating</option>
                      <option>Newest</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {businesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
                {/* Skeleton loaders */}
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
