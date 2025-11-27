import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Categories - Singapore Halal Directory",
  description: "Explore halal-certified businesses by category. Find restaurants, retail shops, health & wellness, and more across Singapore.",
};

// Mock data for categories
const categories = [
  {
    id: "food-beverage",
    name: "Food & Beverage",
    subtitle: "Restaurants, Cafes & Eateries",
    listingCount: 1250,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2T-66vsVZOhwIEKjymftXirfCd1BtGKBqO2wb15YregvEkueY8u39x4c3B-o3J74qOtT8z2TD8Uo38gAVNseN1VcIpGR6CY3jcedJA6-e7Q0zleNSCUZiQEJGEfgReYb7y0jCmLfs-Q6mWUPY8NR9lspbPNBfGxJ5TqSCQEfjrgWt8NyZ0Eb2eOF5Jp7QCnrOYd2A5fOhGmBN98B3DWfRO7AMLS6wbch36H75eCLJ_qSoyZlOtwe2KodujBj0Qn2hL2kUxgV6K3Q",
  },
  {
    id: "retail-shopping",
    name: "Retail & Shopping",
    subtitle: "Stores, Markets & Boutiques",
    listingCount: 890,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXOS-J0CV0QVMO9oqr7d5od3PFRbZkVB9w7rGAQb4MiccWBoeoiOAHLHCgHM5gfwlh9j0dimvanzHedAjADBgJJ4ZoOkV7IyyDKV3bQDur4t8cY-bJ0ftwBUQ6-2c5GPcpFW31BRlY-snkBpMfu0ga4IzcRtr54MYXw29XydopIL8NLjM4PNnYEzVARtNMqUhxUDLLP_CiRBiXRkhe6Ja0LJRgtV1uDRdDz47XvaTJA9NljZWBq3v7HkdONqnxl4nLNVoVXvkk4s8",
  },
  {
    id: "health-wellness",
    name: "Health & Wellness",
    subtitle: "Clinics, Spas & Fitness",
    listingCount: 456,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6kNecFkMHHeuYfK7UDTuf8f7LescD8ySUaG7kU2hlhOJ5nm0kZC1xw3Nm2_FtikHdEAnhZBdAVKz5PAa2Ki8eno0UA0sRecl2fiAIuNVCXZs-ZQ09Cez0aYlhZTPmGRtg86Pcvv6UBe9sTMJG5IxzdSCgM_IX9Xi2MS_KKBiYduzaKHyyS4IKCCX11WqwT3KjBmVTdZRiNsQ8-Tw9pTMi0EH15mkAZBUVhOJvibeX9vstUGt0z6XfjkH1eUVk83PkVUD96aL9Xb8",
  },
  {
    id: "education-services",
    name: "Education & Services",
    subtitle: "Schools, Tuition & Courses",
    listingCount: 320,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9VIE4OqDLdZMzw2IQTZbY7xnvMeKpGmceLG8zHPRMvQwx0xhxDDDDDDDDDDDDDD",
  },
  {
    id: "travel-hospitality",
    name: "Travel & Hospitality",
    subtitle: "Hotels, Tours & Travel Agents",
    listingCount: 275,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi3IKj5LdMpYNwqRSTVWXYzAbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfGhIjKl",
  },
  {
    id: "professional-services",
    name: "Professional Services",
    subtitle: "Legal, Finance & Consulting",
    listingCount: 198,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAB3CD4EfGhIjKlMnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWxYzAb",
  },
  {
    id: "beauty-grooming",
    name: "Beauty & Grooming",
    subtitle: "Salons, Barbershops & Spas",
    listingCount: 542,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuEf5GhIjKlMnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWxYzAbCdEf",
  },
  {
    id: "home-services",
    name: "Home Services",
    subtitle: "Cleaning, Repairs & Renovation",
    listingCount: 387,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuGhIj6KlMnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfGh",
  },
];

function CategoryCard({ category }: { category: typeof categories[0] }) {
  return (
    <Link
      href={`/directory?category=${category.id}`}
      className="group flex flex-col gap-3 pb-3"
    >
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="inline-block bg-[#17cf73] text-white text-xs font-semibold px-2 py-1 rounded-full">
            {category.listingCount.toLocaleString()} listings
          </span>
        </div>
      </div>
      <div>
        <p className="text-[#343A40] dark:text-gray-100 text-base font-bold leading-tight group-hover:text-[#17cf73] transition-colors">
          {category.name}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
          {category.subtitle}
        </p>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 pb-3 animate-pulse">
      <div className="bg-gray-300 dark:bg-gray-700 w-full aspect-[4/3] rounded-xl"></div>
      <div>
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export default function CategoriesPage() {
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
                <Link href="/directory" className="text-[#343A40] dark:text-gray-200 text-sm font-medium leading-normal hover:text-[#17cf73] transition-colors">
                  Directory
                </Link>
                <Link href="/categories" className="text-[#17cf73] text-sm font-bold leading-normal">
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
                    placeholder="Search categories..."
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
        <div className="container mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#343A40] dark:text-gray-100">
                Browse Categories
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Explore {categories.reduce((sum, cat) => sum + cat.listingCount, 0).toLocaleString()} halal-certified businesses across Singapore
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
            {/* Skeleton loaders for additional items */}
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-12">
            <button className="flex items-center justify-center size-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="flex items-center justify-center size-10 rounded-lg bg-[#17cf73] text-white font-bold">
              1
            </button>
            <button className="flex items-center justify-center size-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-[#343A40] dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium">
              2
            </button>
            <button className="flex items-center justify-center size-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-[#343A40] dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium">
              3
            </button>
            <span className="text-gray-500 dark:text-gray-400 px-2">...</span>
            <button className="flex items-center justify-center size-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-[#343A40] dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium">
              12
            </button>
            <button className="flex items-center justify-center size-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#343A40] dark:bg-gray-900 text-white mt-auto">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="size-6 text-[#17cf73]">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold">HalalSG</h2>
              </div>
              <p className="text-gray-400 text-sm">
                Singapore&apos;s trusted directory for halal-certified businesses.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/" className="hover:text-[#17cf73] transition-colors">Home</Link></li>
                <li><Link href="/directory" className="hover:text-[#17cf73] transition-colors">Directory</Link></li>
                <li><Link href="/categories" className="hover:text-[#17cf73] transition-colors">Categories</Link></li>
                <li><Link href="/submit" className="hover:text-[#17cf73] transition-colors">List Your Business</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-[#17cf73] transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-[#17cf73] transition-colors">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-[#17cf73] transition-colors">FAQ</Link></li>
                <li><Link href="/privacy" className="hover:text-[#17cf73] transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-[#17cf73] transition-colors">
                  <span className="material-symbols-outlined">mail</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#17cf73] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#17cf73] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#17cf73] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} HalalSG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
