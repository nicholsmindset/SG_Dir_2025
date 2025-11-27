import Link from "next/link";
import type { Metadata } from "next";

// Mock data for business detail
const mockBusiness = {
  id: "padi-bussorah",
  name: "Padi @ Bussorah",
  address: "53 Bussorah St, Singapore 199469",
  category: "F&B",
  rating: 4,
  reviews: 1204,
  phone: "+65 1234 5678",
  website: "padiatbussorah.com.sg",
  hours: "Daily: 11:00 AM - 10:00 PM",
  isOpen: true,
  verified: true,
  description: "Padi @ Bussorah is a charming eatery located in the heart of the historic Kampong Glam district. We specialize in authentic Malay and Indonesian cuisine, serving up time-honored recipes in a cozy, modern setting. Our mission is to provide a delightful dining experience that brings people together over delicious, halal-certified food. From our signature Nasi Ambeng to our flavorful satays, every dish is prepared with the freshest ingredients and a whole lot of love.",
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB2T-66vsVZOhwIEKjymftXirfCd1BtGKBqO2wb15YregvEkueY8u39x4c3B-o3J74qOtT8z2TD8Uo38gAVNseN1VcIpGR6CY3jcedJA6-e7Q0zleNSCUZiQEJGEfgReYb7y0jCmLfs-Q6mWUPY8NR9lspbPNBfGxJ5TqSCQEfjrgWt8NyZ0Eb2eOF5Jp7QCnrOYd2A5fOhGmBN98B3DWfRO7AMLS6wbch36H75eCLJ_qSoyZlOtwe2KodujBj0Qn2hL2kUxgV6K3Q",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAXOS-J0CV0QVMO9oqr7d5od3PFRbZkVB9w7rGAQb4MiccWBoeoiOAHLHCgHM5gfwlh9j0dimvanzHedAjADBgJJ4ZoOkV7IyyDKV3bQDur4t8cY-bJ0ftwBUQ6-2c5GPcpFW31BRlY-snkBpMfu0ga4IzcRtr54MYXw29XydopIL8NLjM4PNnYEzVARtNMqUhxUDLLP_CiRBiXRkhe6Ja0LJRgtV1uDRdDz47XvaTJA9NljZWBq3v7HkdONqnxl4nLNVoVXvkk4s8",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD6kNecFkMHHeuYfK7UDTuf8f7LescD8ySUaG7kU2hlhOJ5nm0kZC1xw3Nm2_FtikHdEAnhZBdAVKz5PAa2Ki8eno0UA0sRecl2fiAIuNVCXZs-ZQ09Cez0aYlhZTPmGRtg86Pcvv6UBe9sTMJG5IxzdSCgM_IX9Xi2MS_KKBiYduzaKHyyS4IKCCX11WqwT3KjBmVTdZRiNsQ8-Tw9pTMi0EH15mkAZBUVhOJvibeX9vstUGt0z6XfjkH1eUVk83PkVUD96aL9Xb8",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC26guMvj_RKlrYD0VXw4c1bQ-vybhJ1MbUz0l4H-dvhChyyPxiy4uLbVnBCMZFgQuhOatPMZOBLK76KDJp4nSc7Vn-ZMoYftTvCNI5eyVlJU0q9mcn7ZYnlVW7A9q-rMJXycrkDWSll3rKRpO0-XKfI9uvt6wqKw-hZ-kXZCIn-Peo3Tp0D8_gOL8qlZTHvihYS6wCnxC3WDjIcgIUBhMT-O1sPeDtMg63QGMdRsVMAxKRmPFaiAfmadqoRXkWIFdjp6l5SLon7O8",
  ],
  offers: [
    {
      icon: "local_offer",
      iconColor: "text-[#17cf73]",
      borderColor: "border-[#17cf73]",
      bgColor: "bg-[#17cf73]/5",
      title: "Weekday Lunch Special - 15% Off",
      description: "Enjoy a 15% discount on all main courses from Monday to Friday, 12 PM - 3 PM. Perfect for a midday treat!",
      validity: "Valid until: 31 Dec 2024",
    },
    {
      icon: "cake",
      iconColor: "text-[#FFC107]",
      borderColor: "border-[#FFC107]",
      bgColor: "bg-[#FFC107]/5",
      title: "Birthday Month Treat",
      description: "Celebrating your birthday? Dine with us during your birthday month and receive a complimentary dessert on the house.",
      validity: "ID verification required.",
    },
  ],
  reviews: [
    {
      name: "Sarah L.",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRAyuyUvK5uwuFpWdyArDGjc4JxX5-VVor74sMroUXxw41KpgTd0tFD08CMNX0YAFrHAMFj-Gp703RKvjEF2PhsGy4uan_6QqKCM1GtT_weKUerCexxQHTQsWJAAI5ocCWVv5AxcyYsp-PUkHbJxWY0VbyuYXrKg3QiXCWyNENTEqaPlkFpeHIVxTt3pfZjVYy8n8AaWQXfsT684dxc07NgoG-mI7kVKf7OcWX9BIh8EJZvq41XYse0F2LVcj78sUOJwgb_bFlcv0",
      date: "2 weeks ago",
      rating: 5,
      text: "Absolutely loved the Nasi Ambeng! The portion was generous and every single dish on the platter was delicious. The ambiance was great too. Will definitely be back!",
    },
    {
      name: "Ahmad R.",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0R4tksd_7qgWt5P5sFaKz8QueLec2Cf-Yz42z9VqzMj2VIPjD-bMLqqiEzQptP1y0-vEW-1hhmWm8h2Dfe1v_z3FBeQxA5876J28u95W6aUNhUIBpGx9btUzhLsqh_grEwderR-_8f64aPxA7XqpmO8WuwV9DCfBFixlHpAh-KrXi9DpK6NUGhrcWaBb2BTCnloTe2ZdQZ7Hg9c_CjRTFzQyNEni91mrRx1GbOUw_ezQV2PHxrOoL63s2Urmi9iDXklX3UEqFQe0",
      date: "1 month ago",
      rating: 4,
      text: "Good food and service. A bit crowded during peak hours, so it's best to make a reservation. The beef rendang was tender and flavorful.",
    },
  ],
};

export const metadata: Metadata = {
  title: `${mockBusiness.name} - HalalSG Directory`,
  description: mockBusiness.description.slice(0, 160),
};

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
        >
          {i === fullStars && hasHalfStar ? "star_half" : "star"}
        </span>
      ))}
    </div>
  );
}

export default function BusinessPage() {
  const business = mockBusiness;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f7] dark:bg-[#112119] text-[#343A40] dark:text-gray-200">
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
        <div className="container mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            <Link href="/" className="hover:text-[#17cf73]">Home</Link>
            <span className="material-symbols-outlined text-base mx-1">chevron_right</span>
            <Link href="/directory" className="hover:text-[#17cf73]">Directory</Link>
            <span className="material-symbols-outlined text-base mx-1">chevron_right</span>
            <span className="font-medium text-[#343A40] dark:text-gray-200">{business.name}</span>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] rounded-2xl overflow-hidden mb-8">
            <div className="col-span-2 row-span-2">
              <img
                alt={`Main view of ${business.name}`}
                className="h-full w-full object-cover"
                src={business.images[0]}
              />
            </div>
            <div className="col-span-1 row-span-1">
              <img
                alt="Interior shot of the restaurant"
                className="h-full w-full object-cover"
                src={business.images[1]}
              />
            </div>
            <div className="col-span-1 row-span-1">
              <img
                alt="Close-up of a dish served at the restaurant"
                className="h-full w-full object-cover"
                src={business.images[2]}
              />
            </div>
            <div className="col-span-2 row-span-1">
              <img
                alt="Another view of the restaurant's dining area"
                className="h-full w-full object-cover"
                src={business.images[3]}
              />
            </div>
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
                      {business.verified && (
                        <span
                          className="material-symbols-outlined text-[#17cf73] text-3xl"
                          style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
                        >
                          verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="material-symbols-outlined text-base mr-1">location_on</span>
                      <span>{business.address}</span>
                      <span className="mx-2">·</span>
                      <span className="text-xs bg-[#17cf73]/20 text-[#17cf73] font-semibold px-2 py-0.5 rounded-full">
                        {business.category}
                      </span>
                    </div>
                    <div className="flex items-center mt-3">
                      <StarRating rating={business.rating} />
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-2 font-medium">
                        {business.rating}.0
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                        ({business.reviews.toLocaleString()} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 h-10 px-4 py-2 rounded-lg text-sm">
                      <span className="material-symbols-outlined text-base">bookmark_border</span> Save
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 h-10 px-4 py-2 rounded-lg text-sm">
                      <span className="material-symbols-outlined text-base">share</span> Share
                    </button>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-700/80">
                <h2 className="text-2xl font-bold text-[#343A40] dark:text-gray-100 mb-4">
                  About {business.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {business.description}
                </p>
              </div>

              {/* Special Offers */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-700/80">
                <h2 className="text-2xl font-bold text-[#343A40] dark:text-gray-100 mb-4">
                  Special Offers
                </h2>
                <div className="space-y-4">
                  {business.offers.map((offer, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 p-4 border border-dashed ${offer.borderColor} rounded-lg ${offer.bgColor}`}
                    >
                      <span className={`material-symbols-outlined ${offer.iconColor} text-3xl`}>
                        {offer.icon}
                      </span>
                      <div>
                        <h3 className="font-bold text-[#343A40] dark:text-gray-200">{offer.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {offer.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                          {offer.validity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Reviews */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-700/80">
                <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-[#343A40] dark:text-gray-100">Customer Reviews</h2>
                  <button className="bg-[#17cf73] text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity text-sm inline-flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">edit</span>
                    Write a Review
                  </button>
                </div>
                <div className="space-y-6">
                  {business.reviews.map((review, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <img
                        alt={`Profile picture of ${review.name}`}
                        className="h-12 w-12 rounded-full object-cover"
                        src={review.avatar}
                      />
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <h4 className="font-bold text-[#343A40] dark:text-gray-200">{review.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
                          </div>
                          <StarRating rating={review.rating} size="text-base" />
                        </div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{review.text}</p>
                      </div>
                    </div>
                  ))}
                  <a className="text-[#17cf73] font-bold text-sm hover:underline" href="#">
                    Show all {business.reviews} reviews
                  </a>
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
                      <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 mt-0.5 mr-3">
                        schedule
                      </span>
                      <div>
                        <h3 className="font-semibold text-[#343A40] dark:text-gray-200">Opening Hours</h3>
                        <p className="text-gray-600 dark:text-gray-400">{business.hours}</p>
                        {business.isOpen && (
                          <p className="text-[#17cf73] text-xs font-medium mt-1">Open Now</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 mt-0.5 mr-3">
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
                    <div className="flex items-start">
                      <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 mt-0.5 mr-3">
                        language
                      </span>
                      <div>
                        <h3 className="font-semibold text-[#343A40] dark:text-gray-200">Website</h3>
                        <a
                          className="text-gray-600 dark:text-gray-400 hover:text-[#17cf73]"
                          href={`https://${business.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {business.website}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 mt-0.5 mr-3">
                        group
                      </span>
                      <div>
                        <h3 className="font-semibold text-[#343A40] dark:text-gray-200">Social Media</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <a className="text-gray-500 dark:text-gray-400 hover:text-[#17cf73]" href="#">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                          </a>
                          <a className="text-gray-500 dark:text-gray-400 hover:text-[#17cf73]" href="#">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.012-3.584.07-4.85C2.25 3.854 3.716 2.31 6.969 2.163 8.234 2.111 8.614 2.101 12 2.101zm0 1.623c-3.213 0-3.584.012-4.849.07-2.296.104-3.483 1.29-3.59 3.59-.058 1.265-.07 1.644-.07 4.849s.012 3.584.07 4.849c.107 2.302 1.293 3.485 3.59 3.59 1.265.058 1.636.07 4.849.07s3.584-.012 4.849-.07c2.3-.105 3.486-1.29 3.59-3.59.058-1.265.07-1.644.07-4.849s-.012-3.584-.07-4.849c-.104-2.3-1.29-3.485-3.59-3.59-1.265-.058-1.636-.07-4.849-.07zM12 7.25c-2.623 0-4.75 2.127-4.75 4.75s2.127 4.75 4.75 4.75 4.75-2.127 4.75-4.75S14.623 7.25 12 7.25zm0 7.625c-1.583 0-2.875-1.292-2.875-2.875S10.417 9.125 12 9.125s2.875 1.292 2.875 2.875-1.292 2.875-2.875 2.875zm5.123-8.31a1.188 1.188 0 100-2.375 1.188 1.188 0 000 2.375z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location / Map */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-700/80">
                  <h2 className="text-2xl font-bold text-[#343A40] dark:text-gray-100 mb-4">Location</h2>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <img
                      alt={`Map showing the location of ${business.name}`}
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-N1HYW5tq5C1CMePOJkXvUYhbcVqfmKQt3WgmAakqPAflHpZSLXLjQ44HKsBIqHkefy_gDMZykS0URi5qFbYlIZuBx2H1D5Kd6DUWvlRNpPmOlKum0DlqwIIzNuFS5G6an5YE5zrZtqdXTaCVBQdfLe4s4SiRCRwBcIbh8TUTzN6w_XJAyIQVOSMWE6LTP7Nb_BkxNr3qyxo4vqhfHvEtOd9XwFKMKeqaT4jXRpOp_aIfZuBK92jusEMNAX6KdjkEiIV25V2o6U8"
                    />
                  </div>
                  <a
                    className="mt-4 block text-center bg-[#17cf73] text-white font-bold py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity text-sm"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
