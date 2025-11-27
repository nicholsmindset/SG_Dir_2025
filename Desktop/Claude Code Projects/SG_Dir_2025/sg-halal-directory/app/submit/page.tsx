"use client";

import Link from "next/link";
import { useState } from "react";

const businessCategories = [
  "Food & Beverage",
  "Retail & Shopping",
  "Health & Wellness",
  "Education & Services",
  "Travel & Hospitality",
  "Professional Services",
  "Beauty & Grooming",
  "Home Services",
];

const singaporeAreas = [
  "Central",
  "North",
  "South",
  "East",
  "West",
  "Orchard",
  "Bugis",
  "Marina Bay",
  "Sentosa",
  "Jurong",
  "Tampines",
  "Woodlands",
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { number: 1, label: "Business Info" },
    { number: 2, label: "Contact Details" },
    { number: 3, label: "Verification" },
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
                currentStep >= step.number
                  ? "bg-[#17cf73] text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              }`}
            >
              {currentStep > step.number ? (
                <span className="material-symbols-outlined text-xl">check</span>
              ) : (
                step.number
              )}
            </div>
            <span
              className={`text-xs mt-2 ${
                currentStep >= step.number
                  ? "text-[#17cf73] font-semibold"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-16 sm:w-24 h-1 mx-2 ${
                currentStep > step.number
                  ? "bg-[#17cf73]"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function SubmitBusinessPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    area: "",
    address: "",
    description: "",
    phone: "",
    email: "",
    website: "",
    socialMedia: "",
    operatingHours: "",
    halalCertNumber: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    agreeTerms: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you! Your business submission has been received and is pending review.");
  };

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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#343A40] dark:text-gray-100">
              List Your Business
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
              Join Singapore&apos;s premier halal business directory. Get discovered by thousands of customers looking for halal-certified services.
            </p>
          </div>

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} />

          {/* Form Container */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Business Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-[#343A40] dark:text-gray-100 mb-4">
                      Business Information
                    </h2>

                    <div>
                      <label className="block text-sm font-medium text-[#343A40] dark:text-gray-200 mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73]"
                        placeholder="Enter your business name"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#343A40] dark:text-gray-200 mb-2">
                          Category *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73]"
                        >
                          <option value="">Select category</option>
                          {businessCategories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#343A40] dark:text-gray-200 mb-2">
                          Area *
                        </label>
                        <select
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73]"
                        >
                          <option value="">Select area</option>
                          {singaporeAreas.map((area) => (
                            <option key={area} value={area}>
                              {area}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#343A40] dark:text-gray-200 mb-2">
                        Full Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73]"
                        placeholder="123 Street Name, Building, Singapore 123456"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#343A40] dark:text-gray-200 mb-2">
                        Business Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73]"
                        placeholder="Describe your business, services, and what makes it special..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#343A40] dark:text-gray-200 mb-2">
                        Operating Hours
                      </label>
                      <input
                        type="text"
                        name="operatingHours"
                        value={formData.operatingHours}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73]"
                        placeholder="e.g., Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Contact Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-[#343A40] dark:text-gray-100 mb-4">
                      Contact Details
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#343A40] dark:text-gray-200 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73]"
                          placeholder="+65 1234 5678"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#343A40] dark:text-gray-200 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73]"
                          placeholder="contact@yourbusiness.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#343A40] dark:text-gray-200 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73]"
                        placeholder="https://www.yourbusiness.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#343A40] dark:text-gray-200 mb-2">
                        Social Media
                      </label>
                      <input
                        type="text"
                        name="socialMedia"
                        value={formData.socialMedia}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73]"
                        placeholder="Instagram: @yourbusiness or Facebook page URL"
                      />
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="text-lg font-semibold text-[#343A40] dark:text-gray-100 mb-4">
                        Business Owner Information
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#343A40] dark:text-gray-200 mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73]"
                            placeholder="Full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#343A40] dark:text-gray-200 mb-2">
                            Your Phone *
                          </label>
                          <input
                            type="tel"
                            name="ownerPhone"
                            value={formData.ownerPhone}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73]"
                            placeholder="+65 9876 5432"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-[#343A40] dark:text-gray-200 mb-2">
                          Your Email *
                        </label>
                        <input
                          type="email"
                          name="ownerEmail"
                          value={formData.ownerEmail}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73]"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Verification */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-[#343A40] dark:text-gray-100 mb-4">
                      Halal Certification & Verification
                    </h2>

                    <div className="bg-[#17cf73]/10 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#17cf73] mt-0.5">verified</span>
                        <div>
                          <h3 className="font-semibold text-[#343A40] dark:text-gray-100">
                            Why Halal Certification Matters
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Verified halal certification builds trust with customers and helps your business stand out in our directory.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#343A40] dark:text-gray-200 mb-2">
                        MUIS Halal Certificate Number
                      </label>
                      <input
                        type="text"
                        name="halalCertNumber"
                        value={formData.halalCertNumber}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#343A40] dark:text-gray-200 focus:border-[#17cf73] focus:ring-[#17cf73]"
                        placeholder="e.g., HC-2024-12345"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Enter your MUIS certificate number for verification. Leave blank if certification is pending.
                      </p>
                    </div>

                    <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <span className="material-symbols-outlined text-4xl text-gray-400">cloud_upload</span>
                      <p className="text-[#343A40] dark:text-gray-200 font-medium mt-2">
                        Upload Halal Certificate (Optional)
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        PDF, JPG, or PNG up to 5MB
                      </p>
                      <button
                        type="button"
                        className="mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-[#343A40] dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                      >
                        Choose File
                      </button>
                    </div>

                    <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <span className="material-symbols-outlined text-4xl text-gray-400">add_photo_alternate</span>
                      <p className="text-[#343A40] dark:text-gray-200 font-medium mt-2">
                        Upload Business Photos
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Add up to 8 photos showcasing your business
                      </p>
                      <button
                        type="button"
                        className="mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-[#343A40] dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                      >
                        Upload Photos
                      </button>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleInputChange}
                          required
                          className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 text-[#17cf73] focus:ring-[#17cf73] mt-0.5"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          I confirm that the information provided is accurate and I agree to the{" "}
                          <Link href="/terms" className="text-[#17cf73] hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-[#17cf73] hover:underline">
                            Privacy Policy
                          </Link>
                          . I understand that my listing will be reviewed before publication.
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-[#343A40] dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-2.5 bg-[#17cf73] text-white rounded-lg hover:opacity-90 transition-opacity font-bold"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#17cf73] text-white rounded-lg hover:opacity-90 transition-opacity font-bold flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-xl">send</span>
                      Submit Listing
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Benefits Section */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200/80 dark:border-gray-700/80 text-center">
                <span className="material-symbols-outlined text-3xl text-[#17cf73]">visibility</span>
                <h3 className="font-bold text-[#343A40] dark:text-gray-100 mt-2">Get Discovered</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Reach thousands of customers searching for halal businesses
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200/80 dark:border-gray-700/80 text-center">
                <span className="material-symbols-outlined text-3xl text-[#17cf73]">verified</span>
                <h3 className="font-bold text-[#343A40] dark:text-gray-100 mt-2">Build Trust</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Verified halal certification badge for your listing
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200/80 dark:border-gray-700/80 text-center">
                <span className="material-symbols-outlined text-3xl text-[#17cf73]">trending_up</span>
                <h3 className="font-bold text-[#343A40] dark:text-gray-100 mt-2">Grow Business</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Upgrade to featured for premium visibility
                </p>
              </div>
            </div>
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
