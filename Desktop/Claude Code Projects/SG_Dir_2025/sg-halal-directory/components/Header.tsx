"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface HeaderProps {
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export default function Header({ showSearch = true, searchPlaceholder = "Search for businesses..." }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/directory", label: "Directory" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm leading-normal transition-colors ${
                    isActive(link.href)
                      ? "text-[#17cf73] font-bold"
                      : "text-[#343A40] dark:text-gray-200 font-medium hover:text-[#17cf73]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-1 justify-end gap-4 items-center">
            {showSearch && (
              <label className="hidden sm:flex flex-col w-full !h-10 max-w-sm">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-gray-100 dark:bg-gray-800">
                  <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center pl-3">
                    <span className="material-symbols-outlined text-xl" aria-hidden="true">search</span>
                  </div>
                  <input
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#343A40] dark:text-gray-200 focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-2 text-sm font-normal leading-normal"
                    placeholder={searchPlaceholder}
                    aria-label="Search for businesses"
                  />
                </div>
              </label>
            )}
            <Link
              href="/submit"
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#17cf73] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-bold"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">add_business</span>
              List Your Business
            </Link>
            <button
              className="md:hidden text-[#343A40] dark:text-gray-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base transition-colors ${
                    isActive(link.href)
                      ? "text-[#17cf73] font-bold bg-[#17cf73]/10"
                      : "text-[#343A40] dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/submit"
                onClick={() => setMobileMenuOpen(false)}
                className="mx-4 mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-[#17cf73] text-white rounded-lg hover:opacity-90 transition-opacity text-base font-bold"
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">add_business</span>
                List Your Business
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="mx-4 mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-[#343A40] dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-base font-medium"
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">dashboard</span>
                Dashboard
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
