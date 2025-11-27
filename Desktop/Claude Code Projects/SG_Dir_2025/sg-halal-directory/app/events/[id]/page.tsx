import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';

// Mock events data - replace with actual database query
const events: Record<string, {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  address: string;
  category: string;
  image: string;
  price: string;
  organizer: string;
  organizerImage: string;
  organizerEmail: string;
  organizerPhone: string;
  website?: string;
  featured: boolean;
  capacity?: string;
  highlights: string[];
  mapImage: string;
}> = {
  '1': {
    id: '1',
    title: 'Kampong Gelam Food Fair 2024',
    description: 'A celebration of authentic halal cuisine from the heart of Singapore\'s Muslim heritage district.',
    fullDescription: `A celebration of authentic halal cuisine from the heart of Singapore's Muslim heritage district. Experience the rich flavors and traditions of Kampong Gelam.

Discover a vibrant tapestry of sights, sounds, and smells as you wander through dozens of food stalls. From traditional Malay kuih and hearty Nasi Padang to modern fusion cuisine, the fair is a food lover's paradise.`,
    date: '2024-05-25',
    endDate: '2024-05-26',
    time: '10:00 AM - 10:00 PM Daily',
    location: 'Kampong Gelam District',
    address: 'Arab Street, Kampong Gelam, Singapore',
    category: 'Food Festival',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHbJcAoYysoNT_3PaWRcmMjEQ24RHoBZHeS00PsIX3oyXUOheeoSU-WoKMBqmj-ys6NcpvtFfq7tSeDAa5LmefyVfh1NbNPHabV-UGs90Wcs44viyyH34-f-J0J0BSILdtlcPp5GO5gHXK7ln8ljqETjskkv8OTQfjIC-Azw8siq_OSu79xF95JTaKbFl6RrWa4N9Q98t-mO23SoK1WXzDPu8yUkobMK3_jkkc4TpUa1hnHdXRk1lQUq2HGLqiWsggvyZtJVt_WZs',
    price: 'Free',
    organizer: 'Kampong Gelam Alliance',
    organizerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLdIx55D_9bWpZ7ipIvdO-d3y7MqCMyQc4DHhjjRaKDquiKpK8KCkgZbAAVHMSfrGLseQYHpA97XNWO99n-cxzKnSzjr4YVGWgMctMJ1sUbqg3exb5LHkjFxQwpzzbOt5_T9iFv6YEVZJGVGCKemiDPCzvzSYntqpT8btcSnpaDm5Y3gmMXxRFuWGiWMLelbRJP9vnQgOOQpi-TmtiQirr1KEy9qrbAUH75sh8TtToQUcX5QxDIWWmSv2Pp6LLDfuZ7ZTNm0Nu8FA',
    organizerEmail: 'events@kamponggelam.sg',
    organizerPhone: '+65 6291 1234',
    website: 'https://www.kamponggelam.sg',
    featured: true,
    capacity: 'Unlimited',
    highlights: [
      'Over 50 food stalls offering local and regional cuisines.',
      'Live performances and cultural showcases.',
      'Family-friendly atmosphere with activities for children.',
      'Prayer facilities available nearby.',
    ],
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOyKmcdIjR4HjBm_B3f0rdehjkymNPVzSKhvR7PUTA7bCCMtRj4SquosEloLmPbIDJb6K-_v62F77jHvfdLZ1dGITeAsuV2TY1GglsAoVgfnN_m0Apm06eSsRAHFPtUezSPjrS2qOBNMeoz9QwclDJqkJULA2yBOnWxKtm7rI5eHn7GSluVV3bIDyi8WaKG7FscYajrWQPCsRyOHgnLW9HGXkJeFJSm_w-1nR-u5DP6T4hwbdOYtbUVPi9dX9QdMxwwVNXJ3kROEs',
  },
  '2': {
    id: '2',
    title: 'Geylang Serai Ramadan Bazaar 2024',
    description: 'Singapore\'s largest and most iconic Ramadan bazaar with hundreds of stalls offering food, fashion, and festivities.',
    fullDescription: `Immerse yourself in the festive spirit at the Geylang Serai Ramadan Bazaar 2024! This annual event is a cornerstone of Singapore's cultural calendar, bringing together the community for a month of celebration, food, and shopping.

Discover a vibrant tapestry of sights, sounds, and smells as you wander through hundreds of stalls. From traditional Malay kuih and hearty Ramly burgers to modern, Instagram-worthy fusion snacks, the bazaar is a food lover's paradise. Prayer facilities are available on-site, and the event is designed to be family-friendly with ample space for all.`,
    date: '2024-03-17',
    endDate: '2024-04-15',
    time: '10:00 AM - 11:00 PM Daily',
    location: 'Wisma Geylang Serai',
    address: '1 Engku Aman Turn, Singapore 408528',
    category: 'Bazaar',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy9yFwE_1FVZGFCMUNqj7qkk_cIjTD8WPM1Hr1wgc6GY97LpzX7bC9fKQrg8F5XfgZ5TpbS8Ig7IgAq7Iy4lVBf0CsMAk7tq95gYsN-R6QzWhUfJSLKy_iIIJVZeXGP8Rwb0693zRBgVJNydutupbaswuz0t8WpXlDl93aoaDdxMubpxQCzrs0lCPG_X9d50pHml2ZMSOW3XJh7bftqAcMClI4-R6_GePqW1Bg9VQLLDYYfFHKK_FmQuwId7Kw6VWfcudXhU9r2qg',
    price: 'Free',
    organizer: 'Wisma Geylang Serai',
    organizerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLdIx55D_9bWpZ7ipIvdO-d3y7MqCMyQc4DHhjjRaKDquiKpK8KCkgZbAAVHMSfrGLseQYHpA97XNWO99n-cxzKnSzjr4YVGWgMctMJ1sUbqg3exb5LHkjFxQwpzzbOt5_T9iFv6YEVZJGVGCKemiDPCzvzSYntqpT8btcSnpaDm5Y3gmMXxRFuWGiWMLelbRJP9vnQgOOQpi-TmtiQirr1KEy9qrbAUH75sh8TtToQUcX5QxDIWWmSv2Pp6LLDfuZ7ZTNm0Nu8FA',
    organizerEmail: 'events@geylangserai.sg',
    organizerPhone: '+65 6748 4700',
    website: 'https://www.geylangserai.sg',
    featured: true,
    capacity: 'Unlimited',
    highlights: [
      'Over 500 stalls offering food, drinks, and retail goods.',
      'Live performances and cultural showcases on weekends.',
      'Dedicated prayer facilities for Muslim visitors.',
      'Family-friendly atmosphere with activities for children.',
    ],
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOyKmcdIjR4HjBm_B3f0rdehjkymNPVzSKhvR7PUTA7bCCMtRj4SquosEloLmPbIDJb6K-_v62F77jHvfdLZ1dGITeAsuV2TY1GglsAoVgfnN_m0Apm06eSsRAHFPtUezSPjrS2qOBNMeoz9QwclDJqkJULA2yBOnWxKtm7rI5eHn7GSluVV3bIDyi8WaKG7FscYajrWQPCsRyOHgnLW9HGXkJeFJSm_w-1nR-u5DP6T4hwbdOYtbUVPi9dX9QdMxwwVNXJ3kROEs',
  },
  '3': {
    id: '3',
    title: 'Halal Business Financing 101',
    description: 'Learn about Islamic financing options for your halal business.',
    fullDescription: `Join us for an informative seminar on Islamic financing options for halal businesses. Industry experts will share insights on Sharia-compliant funding solutions.

Learn about various Islamic financing products, including Murabaha, Ijara, and Sukuk. Network with other halal business owners and connect with financial institutions that specialize in Islamic banking.`,
    date: '2024-06-04',
    time: '9:00 AM - 5:00 PM',
    location: 'Suntec Convention Centre',
    address: '1 Raffles Boulevard, Suntec City, Singapore 039593',
    category: 'Seminar',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlW079BL-oRCQGLDd-l2c76Ml_JK7wutiGrpYk8hvpZZMCzeOC9LPtRf_D7To8A37F635OuU_nkvwZPLVbrK6rKNpN4qHa_Q3bqJuBjm9DwVENA9kM7zB96O6BU5PKrQnbObLNvuW24Qbev08hwZzVff9EpPyJkzsQZONjkdkQyuowpyv0upOcVF8BAXdeDBQxxA_LdB-tSy-G2WsYGtYx_H3XG07rqYtHmZrpE_CEzXhMTA4osqjAdJflTd8U4fBXDnnXEE7h0I0',
    price: '$50',
    organizer: 'Islamic Finance SG',
    organizerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLdIx55D_9bWpZ7ipIvdO-d3y7MqCMyQc4DHhjjRaKDquiKpK8KCkgZbAAVHMSfrGLseQYHpA97XNWO99n-cxzKnSzjr4YVGWgMctMJ1sUbqg3exb5LHkjFxQwpzzbOt5_T9iFv6YEVZJGVGCKemiDPCzvzSYntqpT8btcSnpaDm5Y3gmMXxRFuWGiWMLelbRJP9vnQgOOQpi-TmtiQirr1KEy9qrbAUH75sh8TtToQUcX5QxDIWWmSv2Pp6LLDfuZ7ZTNm0Nu8FA',
    organizerEmail: 'info@islamicfinancesg.com',
    organizerPhone: '+65 6789 1234',
    featured: false,
    capacity: '200 attendees',
    highlights: [
      'Expert speakers from leading Islamic banks.',
      'Networking opportunities with business owners.',
      'Certificate of attendance provided.',
      'Halal lunch included.',
    ],
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOyKmcdIjR4HjBm_B3f0rdehjkymNPVzSKhvR7PUTA7bCCMtRj4SquosEloLmPbIDJb6K-_v62F77jHvfdLZ1dGITeAsuV2TY1GglsAoVgfnN_m0Apm06eSsRAHFPtUezSPjrS2qOBNMeoz9QwclDJqkJULA2yBOnWxKtm7rI5eHn7GSluVV3bIDyi8WaKG7FscYajrWQPCsRyOHgnLW9HGXkJeFJSm_w-1nR-u5DP6T4hwbdOYtbUVPi9dX9QdMxwwVNXJ3kROEs',
  },
};

// Related events for the sidebar
const relatedEvents = [
  {
    id: 'related-1',
    title: 'Kampong Gelam Hari Raya Bazaar',
    date: '20 Mar - 19 Apr 2024',
    price: 'Free',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwkojTQssPorqMuk5vp6lqqANxNRXTChqnUoMfENFnmFuM1PKPl4h5szRlK8i_1FR0CJiXgRfW6jubk7A9LzmGlMnmB-UHdF0i0zs4urJc8Udbk5AP_q6fRpfD7e7HW5-xBE33c4jfUbGAp1-7De68cu7PKovn3yLPcRDXky8u6AN9BpxR3oqkWwfsggk7tSjedPXiC-tkz2lbBL3aHqecsg71S0i0sGGeuSftXU3ch7vf_Y6stbSD4MHDwnaiJToaUgSmTnTUFHQ',
  },
  {
    id: 'related-2',
    title: 'Singapore Halal Food Fest',
    date: '5 May - 7 May 2024',
    price: '$5',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyOSVrg5-shT3cwPou7x1YUsnAybgRuYFvPEwyok-_QKp85jZqvfadBprhxIQv-v4d9CwyDbZl_XkJYEuxdMPP81ne9SxWI-8ouAO_Np8LJuBsiQe_yShqWVkYsBKlvavvKkVQ19F9tR7yi1ueAE9Im-l4-rHUTcKxTRwVinxHj_rhq1MoJAvJKVv6IjtA6dTG6hpQoAaUnVANLnc464m5TdjR4QXQ1FS7CiypZd-rjITQD-rnjzkk25-v9Ut23wNeXWe0gLycDQc',
  },
  {
    id: 'related-3',
    title: 'Eid Souk by the Bay',
    date: '1 Apr - 10 Apr 2024',
    price: 'Free',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN2VgOAETnPDK92QNnhKpDWjMfcWlZoqpjHDgl-C6lhV2dP6i1RBTk7-6PeP9jFW4_WxFKgeRMj-IhAlcGF0kOnxVxvZNHFVBZ6WErsXPl8x0P1B5tH2z_AYMdNnyZXg345mkN_a3fp_2UkOvs3Cq94SjnjuTVNiplS2U3PjTOsDOPa-8FG6dvof4K0UbPxl088i_HsnF0hWS0e9So_06Q8CThYs7s84fOxaFuo6maF5ZY1l_7t2olj0mFwo3ywUhFRYc0gSjeFfE',
  },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = events[id];

  if (!event) {
    return {
      title: 'Event Not Found - Singapore Halal Directory',
    };
  }

  return {
    title: `${event.title} - Singapore Halal Directory`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      type: 'website',
    },
  };
}

function formatDateRange(dateStr: string, endDateStr?: string) {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  if (endDateStr) {
    const endDate = new Date(endDateStr);
    return `${date.toLocaleDateString('en-SG', options)} - ${endDate.toLocaleDateString('en-SG', options)}`;
  }

  return date.toLocaleDateString('en-SG', options);
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = events[id];

  if (!event) {
    notFound();
  }

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.date,
    endDate: event.endDate || event.date,
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.address,
        addressLocality: 'Singapore',
        addressCountry: 'SG',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: event.organizer,
      email: event.organizerEmail,
      telephone: event.organizerPhone,
    },
    offers: {
      '@type': 'Offer',
      price: event.price === 'Free' ? '0' : event.price.replace(/[^0-9]/g, ''),
      priceCurrency: 'SGD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <Header />

      <div className="min-h-screen bg-[#f6f8f7]">
        <main className="flex flex-1 justify-center py-5">
          <div className="flex flex-col w-full max-w-5xl px-4 sm:px-8">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 p-4">
              <Link href="/" className="text-gray-500 text-sm font-medium leading-normal hover:text-[#17cf73]">Home</Link>
              <span className="text-gray-500 text-sm font-medium leading-normal">/</span>
              <Link href="/events" className="text-gray-500 text-sm font-medium leading-normal hover:text-[#17cf73]">Events</Link>
              <span className="text-gray-500 text-sm font-medium leading-normal">/</span>
              <span className="text-[#343A40] text-sm font-medium leading-normal">{event.title}</span>
            </div>

            {/* Hero Image */}
            <div
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-[320px] md:min-h-[480px] mt-4"
              style={{ backgroundImage: `url("${event.image}")` }}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {/* Left Column - Event Details */}
              <div className="md:col-span-2">
                {/* Title */}
                <div className="flex flex-wrap justify-between gap-3 px-4">
                  <h1 className="text-[#343A40] text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
                    {event.title}
                  </h1>
                </div>

                {/* Event Info Cards */}
                <div className="mt-8 space-y-4 border-t border-gray-200 pt-8">
                  <div className="flex items-center gap-4 bg-transparent px-4">
                    <div className="text-[#343A40] flex items-center justify-center rounded-lg bg-gray-200 shrink-0 size-10">
                      <span className="material-symbols-outlined">calendar_month</span>
                    </div>
                    <p className="text-[#343A40] text-base font-medium leading-normal flex-1">
                      {formatDateRange(event.date, event.endDate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 bg-transparent px-4">
                    <div className="text-[#343A40] flex items-center justify-center rounded-lg bg-gray-200 shrink-0 size-10">
                      <span className="material-symbols-outlined">schedule</span>
                    </div>
                    <p className="text-[#343A40] text-base font-medium leading-normal flex-1">{event.time}</p>
                  </div>
                  <div className="flex items-center gap-4 bg-transparent px-4">
                    <div className="text-[#343A40] flex items-center justify-center rounded-lg bg-gray-200 shrink-0 size-10">
                      <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <p className="text-[#343A40] text-base font-medium leading-normal flex-1">{event.address}</p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mt-8 px-4">
                  <div className="border-b border-gray-200">
                    <nav aria-label="Tabs" className="-mb-px flex space-x-6">
                      <button className="border-[#17cf73] text-[#17cf73] whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm">
                        About The Event
                      </button>
                      <button className="border-transparent text-gray-500 hover:text-[#343A40] hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                        Location
                      </button>
                    </nav>
                  </div>
                </div>

                {/* Event Description */}
                <div className="prose prose-lg max-w-none px-4 pt-6 text-[#343A40]">
                  {event.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                  <ul className="mt-4 space-y-2">
                    {event.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#17cf73] mt-0.5 text-lg">check_circle</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-gray-600">Don&apos;t miss out on this spectacular celebration of culture, community, and cuisine. We look forward to welcoming you!</p>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="md:col-span-1 space-y-6">
                {/* Event Actions */}
                <div className="bg-gray-100 p-6 rounded-xl">
                  <h3 className="font-bold text-lg text-[#343A40]">Event Actions</h3>
                  <div className="mt-4 space-y-3">
                    <button className="w-full flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-4 bg-[#17cf73] text-[#0d1b14] text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
                      <span className="material-symbols-outlined">add_to_photos</span>
                      <span className="truncate">Add to Calendar</span>
                    </button>
                    <div className="flex items-center gap-2">
                      <button className="w-full flex items-center justify-center gap-2 rounded-lg h-10 px-3 bg-gray-200 text-[#343A40] text-sm font-medium hover:bg-gray-300 transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>share</span>
                        Share
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 rounded-lg h-10 px-3 bg-gray-200 text-[#343A40] text-sm font-medium hover:bg-gray-300 transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>bookmark_add</span>
                        Save
                      </button>
                    </div>
                  </div>
                </div>

                {/* Organizer */}
                <div className="bg-gray-100 p-6 rounded-xl">
                  <h3 className="font-bold text-lg text-[#343A40]">Organizer</h3>
                  <div className="mt-4 flex items-center gap-4">
                    <div
                      className="size-12 rounded-lg bg-center bg-cover"
                      style={{ backgroundImage: `url('${event.organizerImage}')` }}
                    />
                    <div>
                      <p className="font-bold text-[#343A40]">{event.organizer}</p>
                      <Link href="#" className="text-sm text-[#17cf73] font-medium hover:underline">View Profile</Link>
                    </div>
                  </div>
                </div>

                {/* Location Map */}
                <div className="bg-gray-100 p-6 rounded-xl">
                  <h3 className="font-bold text-lg text-[#343A40]">Location Map</h3>
                  <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden bg-gray-200">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      alt="Map showing the event location"
                      src={event.mapImage}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Related Events */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold tracking-tight text-[#343A40] px-4">Related Events</h2>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {relatedEvents.map((relatedEvent) => (
                  <Link key={relatedEvent.id} href={`/events/${relatedEvent.id}`} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 transition-opacity">
                      <img
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        alt={relatedEvent.title}
                        src={relatedEvent.image}
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-[#343A40]">
                          <span className="font-bold">{relatedEvent.title}</span>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{relatedEvent.date}</p>
                      </div>
                      <p className="text-sm font-medium text-[#17cf73]">{relatedEvent.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Back to Events */}
            <div className="mt-12 px-4">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-[#17cf73] font-semibold hover:text-[#13ec80] transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to All Events
              </Link>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
