import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Halal Events in Singapore - Singapore Halal Directory',
  description: 'Discover upcoming halal events, food festivals, bazaars, and community gatherings in Singapore. Find Muslim-friendly events near you.',
  openGraph: {
    title: 'Halal Events in Singapore',
    description: 'Discover halal food festivals, bazaars, and community events across Singapore.',
  },
};

// Mock events data - replace with actual database query
const events = [
  {
    id: '1',
    title: 'Kampong Gelam Food Fair 2024',
    description: 'A celebration of authentic halal cuisine from the heart of Singapore\'s Muslim heritage district.',
    date: '2024-05-25',
    endDate: '2024-05-26',
    time: '10:00 AM - 10:00 PM',
    location: 'Kampong Gelam District',
    address: 'Arab Street, Singapore',
    category: 'Food Festival',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHbJcAoYysoNT_3PaWRcmMjEQ24RHoBZHeS00PsIX3oyXUOheeoSU-WoKMBqmj-ys6NcpvtFfq7tSeDAa5LmefyVfh1NbNPHabV-UGs90Wcs44viyyH34-f-J0J0BSILdtlcPp5GO5gHXK7ln8ljqETjskkv8OTQfjIC-Azw8siq_OSu79xF95JTaKbFl6RrWa4N9Q98t-mO23SoK1WXzDPu8yUkobMK3_jkkc4TpUa1hnHdXRk1lQUq2HGLqiWsggvyZtJVt_WZs',
    price: 'Free Entry',
    organizer: 'Kampong Gelam Alliance',
    featured: true,
  },
  {
    id: '2',
    title: 'Geylang Serai Ramadan Bazaar',
    description: 'Singapore\'s largest and most iconic Ramadan bazaar with hundreds of stalls offering food, fashion, and festivities.',
    date: '2024-05-31',
    endDate: '2024-06-30',
    time: '6:00 PM - 11:00 PM',
    location: 'Wisma Geylang Serai',
    address: '1 Engku Aman Turn, Singapore 408528',
    category: 'Bazaar',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkHwiOmnVgSCtH3E1FSJWrZ7lPuzEPvXS3Y9YggRUuva8jE2rLweilH_BiYMcEVNsdJ7QPcRfS9OJ4QIgthrrWoYfTjs9NTWV5LJATn2SPxJTS7JG_8p197g9ozPhWo4TnSeRrBPN2LPlUiqhKKH3cHWyEimMcEHuaGY2kMAHbpU6687Zv_1pB3J1g2Hk-SDtIudKFx29QwjNa71X9WLhDAFqjGozo5EdE7gq4A5-5srS-vwiP4bMaqq2Zfko_xEg5HOvTWfdphkg',
    price: 'Free Entry',
    organizer: 'Wisma Geylang Serai',
    featured: true,
  },
  {
    id: '3',
    title: 'Halal Business Financing 101',
    description: 'Learn about Islamic financing options for your halal business. Expert speakers from leading Islamic banks.',
    date: '2024-06-04',
    time: '9:00 AM - 5:00 PM',
    location: 'Suntec Convention Centre',
    address: '1 Raffles Boulevard, Singapore',
    category: 'Seminar',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlW079BL-oRCQGLDd-l2c76Ml_JK7wutiGrpYk8hvpZZMCzeOC9LPtRf_D7To8A37F635OuU_nkvwZPLVbrK6rKNpN4qHa_Q3bqJuBjm9DwVENA9kM7zB96O6BU5PKrQnbObLNvuW24Qbev08hwZzVff9EpPyJkzsQZONjkdkQyuowpyv0upOcVF8BAXdeDBQxxA_LdB-tSy-G2WsYGtYx_H3XG07rqYtHmZrpE_CEzXhMTA4osqjAdJflTd8U4fBXDnnXEE7h0I0',
    price: '$50 Entry',
    organizer: 'Islamic Finance SG',
    featured: false,
  },
  {
    id: '4',
    title: 'Islamic Calligraphy Workshop',
    description: 'Hands-on workshop learning the beautiful art of Arabic calligraphy. All materials provided.',
    date: '2024-06-08',
    time: '2:00 PM - 5:00 PM',
    location: 'Goodman Arts Centre',
    address: '90 Goodman Road, Singapore',
    category: 'Workshop',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCedLWsYItUNoG1HlsDGH3hE6mhDLk640J6wtZ3qwI5m8Z2iUPta1I4AwN74dj7T2Nnapuk5eCFa-Fz9deykoVNUjOOD0o3DoVbRWqeuAtMU8RMxKs3PZSbOkl1ZAkGjKh_0bcW510S6n0feaBEWuvz-i5rky3Ne3w_ZujbGbSTYg_OyU2zVo5OffsKCv0huwm7uZlr8SPB1oSLJI1bhu01WoVFmoTjoVDA22cZR3tpMbDI-0WjGIAA-BLn6WF1qqHrrv0BSzFgkFs',
    price: '$35 Entry',
    organizer: 'Art of Islam SG',
    featured: false,
  },
  {
    id: '5',
    title: 'Singapore Halal Food Fest',
    description: 'Experience the best halal cuisine from around the world under one roof. Celebrity chef demonstrations included.',
    date: '2024-07-15',
    endDate: '2024-07-17',
    time: '11:00 AM - 10:00 PM',
    location: 'Marina Bay Sands',
    address: 'Marina Bay Sands Expo, Singapore',
    category: 'Food Festival',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyOSVrg5-shT3cwPou7x1YUsnAybgRuYFvPEwyok-_QKp85jZqvfadBprhxIQv-v4d9CwyDbZl_XkJYEuxdMPP81ne9SxWI-8ouAO_Np8LJuBsiQe_yShqWVkYsBKlvavvKkVQ19F9tR7yi1ueAE9Im-l4-rHUTcKxTRwVinxHj_rhq1MoJAvJKVv6IjtA6dTG6hpQoAaUnVANLnc464m5TdjR4QXQ1FS7CiypZd-rjITQD-rnjzkk25-v9Ut23wNeXWe0gLycDQc',
    price: '$5 Entry',
    organizer: 'Halal Events SG',
    featured: false,
  },
  {
    id: '6',
    title: 'Eid Souk by the Bay',
    description: 'A festive marketplace celebrating Eid with artisanal goods, traditional crafts, and delicious halal treats.',
    date: '2024-04-01',
    endDate: '2024-04-10',
    time: '4:00 PM - 10:00 PM',
    location: 'Gardens by the Bay',
    address: '18 Marina Gardens Drive, Singapore',
    category: 'Bazaar',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN2VgOAETnPDK92QNnhKpDWjMfcWlZoqpjHDgl-C6lhV2dP6i1RBTk7-6PeP9jFW4_WxFKgeRMj-IhAlcGF0kOnxVxvZNHFVBZ6WErsXPl8x0P1B5tH2z_AYMdNnyZXg345mkN_a3fp_2UkOvs3Cq94SjnjuTVNiplS2U3PjTOsDOPa-8FG6dvof4K0UbPxl088i_HsnF0hWS0e9So_06Q8CThYs7s84fOxaFuo6maF5ZY1l_7t2olj0mFwo3ywUhFRYc0gSjeFfE',
    price: 'Free Entry',
    organizer: 'Gardens by the Bay',
    featured: false,
  },
];

function formatDate(dateStr: string, endDateStr?: string) {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  };

  if (endDateStr) {
    const endDate = new Date(endDateStr);
    return `${date.toLocaleDateString('en-SG', options)} - ${endDate.toLocaleDateString('en-SG', options)}`;
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  };
  return date.toLocaleDateString('en-SG', timeOptions);
}

export default function EventsPage() {
  const eventsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Halal Events in Singapore',
    description: 'Upcoming halal events, food festivals, and community gatherings in Singapore',
    itemListElement: events.map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: event.title,
        description: event.description,
        startDate: event.date,
        endDate: event.endDate || event.date,
        location: {
          '@type': 'Place',
          name: event.location,
          address: event.address,
        },
        organizer: {
          '@type': 'Organization',
          name: event.organizer,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }}
      />

      <Header />

      <div className="min-h-screen bg-[#f6f8f7]">
        {/* Hero Section */}
        <section className="relative">
          <div
            className="min-h-[400px] md:min-h-[480px] flex flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 rounded-none md:mx-4 md:mt-4 md:rounded-xl"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDup71s2VVfXxtDvX_tz2dgI1cgXEzdCfWqmcB5OUDCf5XiuS_D65zLm2CV6eIFRXtNX0ARqRTs_qD1E43ZVL06qZikpqxfH_iAyT-hO3kfygelIZJHVUTFYgSeeD7CtHFL5NJSs5KsgLEMlqGIf64FX_m42lWnfvg1MjqTcfRVXp4UrWYwAMd-AbGeyOUOarN2uAkwI6nIDv_C1fBKUOI0X3BAogA4ctzDA2TKgQZU2bzHPVriPiSDRu59NupzwPR2EOUoHACdtvg")`
            }}
          >
            <div className="flex flex-col gap-4 text-center max-w-3xl">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl lg:text-6xl">
                Discover Halal Events Across Singapore
              </h1>
              <p className="text-white/90 text-base font-normal leading-normal md:text-lg">
                Your guide to upcoming halal-friendly food festivals, bazaars, workshops, and more.
              </p>
            </div>
            <Link
              href="#events"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#17cf73] text-[#0d1b14] text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
            >
              <span className="truncate">Explore Events</span>
            </Link>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filtering Sidebar */}
            <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit bg-white p-6 rounded-xl border border-gray-200/80 shadow-sm">
              <h3 className="text-xl font-bold text-[#343A40] mb-6">Filter Events</h3>
              <div className="space-y-6">
                {/* Search Bar */}
                <div>
                  <label className="text-sm font-medium text-[#343A40] mb-2 block" htmlFor="search">
                    Search by keyword
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                    <input
                      className="w-full h-12 pl-10 pr-4 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-[#17cf73] focus:border-transparent text-[#343A40] placeholder:text-gray-400"
                      id="search"
                      placeholder="Event name or venue..."
                      type="text"
                    />
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <label className="text-sm font-medium text-[#343A40] mb-2 block" htmlFor="date-range">
                    Date
                  </label>
                  <select
                    className="w-full h-12 px-3 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-[#17cf73] focus:border-transparent text-[#343A40]"
                    id="date-range"
                  >
                    <option>Anytime</option>
                    <option>Today</option>
                    <option>This Weekend</option>
                    <option>This Month</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <h4 className="text-sm font-medium text-[#343A40] mb-3">Category</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input className="h-4 w-4 rounded border-gray-300 text-[#17cf73] focus:ring-[#17cf73]" id="cat-food" type="checkbox" />
                      <label className="ml-2 text-sm text-[#343A40]" htmlFor="cat-food">Food Festivals</label>
                    </div>
                    <div className="flex items-center">
                      <input className="h-4 w-4 rounded border-gray-300 text-[#17cf73] focus:ring-[#17cf73]" id="cat-bazaar" type="checkbox" />
                      <label className="ml-2 text-sm text-[#343A40]" htmlFor="cat-bazaar">Bazaars</label>
                    </div>
                    <div className="flex items-center">
                      <input className="h-4 w-4 rounded border-gray-300 text-[#17cf73] focus:ring-[#17cf73]" id="cat-workshop" type="checkbox" />
                      <label className="ml-2 text-sm text-[#343A40]" htmlFor="cat-workshop">Workshops</label>
                    </div>
                    <div className="flex items-center">
                      <input className="h-4 w-4 rounded border-gray-300 text-[#17cf73] focus:ring-[#17cf73]" id="cat-seminar" type="checkbox" />
                      <label className="ml-2 text-sm text-[#343A40]" htmlFor="cat-seminar">Seminars</label>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h4 className="text-sm font-medium text-[#343A40] mb-3">Location</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input className="h-4 w-4 rounded border-gray-300 text-[#17cf73] focus:ring-[#17cf73]" id="loc-central" type="checkbox" />
                      <label className="ml-2 text-sm text-[#343A40]" htmlFor="loc-central">Central</label>
                    </div>
                    <div className="flex items-center">
                      <input className="h-4 w-4 rounded border-gray-300 text-[#17cf73] focus:ring-[#17cf73]" id="loc-east" type="checkbox" />
                      <label className="ml-2 text-sm text-[#343A40]" htmlFor="loc-east">East</label>
                    </div>
                    <div className="flex items-center">
                      <input className="h-4 w-4 rounded border-gray-300 text-[#17cf73] focus:ring-[#17cf73]" id="loc-west" type="checkbox" />
                      <label className="ml-2 text-sm text-[#343A40]" htmlFor="loc-west">West</label>
                    </div>
                    <div className="flex items-center">
                      <input className="h-4 w-4 rounded border-gray-300 text-[#17cf73] focus:ring-[#17cf73]" id="loc-north" type="checkbox" />
                      <label className="ml-2 text-sm text-[#343A40]" htmlFor="loc-north">North</label>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Events Grid */}
            <div className="lg:col-span-3" id="events">
              <div className="flex flex-col sm:flex-row justify-between items-baseline mb-6">
                <h2 className="text-3xl font-bold text-[#343A40]">Upcoming Events</h2>
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                  <p className="text-sm font-medium text-[#343A40]">View:</p>
                  <button className="p-2 rounded-lg bg-[#17cf73]/20 text-[#17cf73]">
                    <span className="material-symbols-outlined">grid_view</span>
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-200/80">
                    <span className="material-symbols-outlined text-gray-500">calendar_month</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className="bg-white border border-gray-200/80 rounded-xl overflow-hidden flex flex-col group hover:shadow-lg transition-shadow duration-300"
                  >
                    <div
                      className="aspect-video bg-cover bg-center"
                      style={{ backgroundImage: `url('${event.image}')` }}
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <span className="text-xs font-bold uppercase text-[#17cf73]/80 mb-1">
                        {event.category}
                      </span>
                      <h3 className="text-lg font-bold text-[#343A40] mb-2 flex-grow group-hover:text-[#17cf73] transition-colors">
                        {event.title}
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1 mb-4">
                        <p className="flex items-center">
                          <span className="material-symbols-outlined text-base mr-2">calendar_today</span>
                          {formatDate(event.date, event.endDate)}
                        </p>
                        <p className="flex items-center">
                          <span className="material-symbols-outlined text-base mr-2">location_on</span>
                          {event.location}
                        </p>
                      </div>
                      <div className="w-full mt-auto flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#17cf73]/20 text-[#343A40] text-sm font-bold leading-normal tracking-[0.015em] group-hover:bg-[#17cf73] group-hover:text-[#0d1b14] transition-colors">
                        View Details
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-12">
                <button className="p-2 rounded-lg hover:bg-gray-200/80 disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined text-gray-500">chevron_left</span>
                </button>
                <button className="w-10 h-10 rounded-lg text-sm font-bold bg-[#17cf73]/20 text-[#17cf73]">1</button>
                <button className="w-10 h-10 rounded-lg text-sm font-medium hover:bg-gray-200/80 text-[#343A40]">2</button>
                <button className="w-10 h-10 rounded-lg text-sm font-medium hover:bg-gray-200/80 text-[#343A40]">3</button>
                <span className="text-gray-500">...</span>
                <button className="w-10 h-10 rounded-lg text-sm font-medium hover:bg-gray-200/80 text-[#343A40]">8</button>
                <button className="p-2 rounded-lg hover:bg-gray-200/80">
                  <span className="material-symbols-outlined text-gray-500">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-4xl text-center bg-[#17cf73]/20 p-8 sm:p-12 rounded-xl">
            <h2 className="text-3xl font-bold text-[#343A40] mb-3">Hosting an Event?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Reach the halal-conscious community in Singapore by listing your event on our directory. It&apos;s simple and effective.
            </p>
            <Link
              href="/events/submit"
              className="inline-flex mx-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#17cf73] text-[#0d1b14] text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined mr-2">add_circle</span>
              <span className="truncate">List Your Event</span>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
