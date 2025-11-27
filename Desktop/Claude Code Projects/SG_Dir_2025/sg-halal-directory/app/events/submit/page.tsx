'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SubmitEventPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Food Festival',
    location: '',
    startDateTime: '',
    endDateTime: '',
    description: '',
    organizerName: '',
    organizerEmail: '',
    organizerPhone: '',
    website: '',
    termsAccepted: false,
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Show success and redirect
    alert('Event submitted successfully! We will review it shortly.');
    window.location.href = '/events';
  };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const progressWidth = step === 1 ? '50%' : '100%';

  return (
    <>
      <Header />

      <main className="flex flex-1 justify-center py-5 sm:py-10 px-4 bg-slate-50 min-h-screen">
        <div className="flex flex-col w-full max-w-[960px] flex-1">
          {/* Page Header */}
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex flex-col gap-3">
              <h1 className="text-black text-4xl font-black leading-tight tracking-[-0.033em]">
                Submit a New Halal Event
              </h1>
              <p className="text-slate-600 text-base font-normal leading-normal">
                Follow the steps below to get your event listed in our directory.
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex flex-col gap-3 p-4">
            <div className="flex gap-6 justify-between">
              <p className="text-black text-base font-medium leading-normal">
                Step {step} of 2: {step === 1 ? 'Event Details' : 'Organizer Information'}
              </p>
            </div>
            <div className="rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-[#13ec80] transition-all duration-300"
                style={{ width: progressWidth }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Step 1: Event Details */}
            {step === 1 && (
              <div className="bg-white rounded-xl shadow-sm mt-6">
                <div className="p-4 sm:p-8">
                  <h2 className="text-black tracking-light text-[32px] font-bold leading-tight pb-6 text-left">
                    Tell us about your event
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Event Name */}
                    <div className="md:col-span-2">
                      <label className="flex flex-col w-full">
                        <p className="text-black text-base font-medium leading-normal pb-2">Event Name</p>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black focus:outline-0 focus:ring-2 focus:ring-[#13ec80]/50 border border-slate-300 bg-white focus:border-[#13ec80] h-14 placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal"
                          placeholder="e.g., Annual Halal Food Festival"
                        />
                      </label>
                    </div>

                    {/* Event Category */}
                    <div>
                      <label className="flex flex-col w-full">
                        <p className="text-black text-base font-medium leading-normal pb-2">Event Category</p>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black focus:outline-0 focus:ring-2 focus:ring-[#13ec80]/50 border border-slate-300 bg-white focus:border-[#13ec80] h-14 placeholder:text-slate-400 px-[15px] text-base font-normal leading-normal"
                        >
                          <option>Food Festival</option>
                          <option>Workshop</option>
                          <option>Charity</option>
                          <option>Conference</option>
                          <option>Webinar</option>
                          <option>Bazaar</option>
                          <option>Community</option>
                          <option>Religious</option>
                        </select>
                      </label>
                    </div>

                    {/* Location / Address */}
                    <div>
                      <label className="flex flex-col w-full">
                        <p className="text-black text-base font-medium leading-normal pb-2">Location / Address</p>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black focus:outline-0 focus:ring-2 focus:ring-[#13ec80]/50 border border-slate-300 bg-white focus:border-[#13ec80] h-14 placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal"
                          placeholder="e.g., 123 Orchard Road, Singapore"
                        />
                      </label>
                    </div>

                    {/* Start Date & Time */}
                    <div>
                      <label className="flex flex-col w-full">
                        <p className="text-black text-base font-medium leading-normal pb-2">Start Date & Time</p>
                        <input
                          type="datetime-local"
                          name="startDateTime"
                          value={formData.startDateTime}
                          onChange={handleChange}
                          required
                          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black focus:outline-0 focus:ring-2 focus:ring-[#13ec80]/50 border border-slate-300 bg-white focus:border-[#13ec80] h-14 placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal"
                        />
                      </label>
                    </div>

                    {/* End Date & Time */}
                    <div>
                      <label className="flex flex-col w-full">
                        <p className="text-black text-base font-medium leading-normal pb-2">End Date & Time</p>
                        <input
                          type="datetime-local"
                          name="endDateTime"
                          value={formData.endDateTime}
                          onChange={handleChange}
                          required
                          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black focus:outline-0 focus:ring-2 focus:ring-[#13ec80]/50 border border-slate-300 bg-white focus:border-[#13ec80] h-14 placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal"
                        />
                      </label>
                    </div>

                    {/* Event Description */}
                    <div className="md:col-span-2">
                      <label className="flex flex-col w-full">
                        <div className="flex items-center gap-2 pb-2">
                          <p className="text-black text-base font-medium leading-normal">Event Description</p>
                          <span
                            className="material-symbols-outlined text-sm text-slate-500 cursor-help"
                            title="Provide a detailed description of your event."
                          >
                            info
                          </span>
                        </div>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          required
                          className="flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-black focus:outline-0 focus:ring-2 focus:ring-[#13ec80]/50 border border-slate-300 bg-white focus:border-[#13ec80] min-h-32 placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal"
                          placeholder="Describe what your event is about, the schedule, and any special guests."
                        />
                      </label>
                    </div>

                    {/* Event Image */}
                    <div className="md:col-span-2">
                      <label className="flex flex-col w-full">
                        <p className="text-black text-base font-medium leading-normal pb-2">Event Image</p>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <span className="material-symbols-outlined text-4xl text-slate-400">cloud_upload</span>
                              <p className="mb-2 text-sm text-slate-500">
                                <span className="font-semibold text-slate-600">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-slate-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" accept="image/*" />
                          </label>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Step 1 Actions */}
                <div className="flex justify-end gap-4 p-4 sm:p-8 border-t border-slate-200 mt-6">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#13ec80] text-black text-base font-bold leading-normal tracking-[0.015em] gap-2 hover:bg-[#11d972] transition-colors"
                  >
                    <span className="truncate">Next Step</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Organizer Information */}
            {step === 2 && (
              <div className="bg-white rounded-xl shadow-sm mt-6">
                <div className="p-4 sm:p-8">
                  <h2 className="text-black tracking-light text-[32px] font-bold leading-tight pb-6 text-left">
                    Organizer Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Organizer Name */}
                    <div className="md:col-span-2">
                      <label className="flex flex-col w-full">
                        <p className="text-black text-base font-medium leading-normal pb-2">Organization / Organizer Name</p>
                        <input
                          type="text"
                          name="organizerName"
                          value={formData.organizerName}
                          onChange={handleChange}
                          required
                          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black focus:outline-0 focus:ring-2 focus:ring-[#13ec80]/50 border border-slate-300 bg-white focus:border-[#13ec80] h-14 placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal"
                          placeholder="e.g., Halal Events SG"
                        />
                      </label>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex flex-col w-full">
                        <p className="text-black text-base font-medium leading-normal pb-2">Contact Email</p>
                        <input
                          type="email"
                          name="organizerEmail"
                          value={formData.organizerEmail}
                          onChange={handleChange}
                          required
                          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black focus:outline-0 focus:ring-2 focus:ring-[#13ec80]/50 border border-slate-300 bg-white focus:border-[#13ec80] h-14 placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal"
                          placeholder="e.g., events@example.com"
                        />
                      </label>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="flex flex-col w-full">
                        <p className="text-black text-base font-medium leading-normal pb-2">Contact Phone</p>
                        <input
                          type="tel"
                          name="organizerPhone"
                          value={formData.organizerPhone}
                          onChange={handleChange}
                          required
                          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black focus:outline-0 focus:ring-2 focus:ring-[#13ec80]/50 border border-slate-300 bg-white focus:border-[#13ec80] h-14 placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal"
                          placeholder="e.g., +65 9123 4567"
                        />
                      </label>
                    </div>

                    {/* Website */}
                    <div className="md:col-span-2">
                      <label className="flex flex-col w-full">
                        <p className="text-black text-base font-medium leading-normal pb-2">Website (Optional)</p>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black focus:outline-0 focus:ring-2 focus:ring-[#13ec80]/50 border border-slate-300 bg-white focus:border-[#13ec80] h-14 placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal"
                          placeholder="e.g., https://www.example.com"
                        />
                      </label>
                    </div>

                    {/* Terms */}
                    <div className="md:col-span-2">
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            required
                            className="w-5 h-5 mt-0.5 text-[#13ec80] rounded focus:ring-[#13ec80] border-slate-300"
                          />
                          <span className="text-sm text-slate-600">
                            I confirm that this is a legitimate halal event and agree to the{' '}
                            <Link href="/terms" className="text-[#13ec80] hover:underline font-medium">
                              Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="text-[#13ec80] hover:underline font-medium">
                              Privacy Policy
                            </Link>
                            . I understand that all submissions are subject to review.
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 Actions */}
                <div className="flex justify-between gap-4 p-4 sm:p-8 border-t border-slate-200 mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-slate-100 text-slate-700 text-base font-bold leading-normal tracking-[0.015em] gap-2 hover:bg-slate-200 transition-colors"
                  >
                    <span className="material-symbols-outlined">arrow_back</span>
                    <span className="truncate">Previous</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.termsAccepted}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#13ec80] text-black text-base font-bold leading-normal tracking-[0.015em] gap-2 hover:bg-[#11d972] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                        <span className="truncate">Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span className="truncate">Submit Event</span>
                        <span className="material-symbols-outlined">send</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Submission Guidelines */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined">info</span>
              Submission Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-lg mt-0.5">check_circle</span>
                Events must be halal-compliant and suitable for the Muslim community
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-lg mt-0.5">check_circle</span>
                All submissions are reviewed within 24-48 hours
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-lg mt-0.5">check_circle</span>
                Provide accurate and complete information
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-lg mt-0.5">check_circle</span>
                Featured placement is available for a fee
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
