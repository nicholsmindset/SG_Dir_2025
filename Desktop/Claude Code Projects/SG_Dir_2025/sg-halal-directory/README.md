# Singapore Halal Directory

A comprehensive directory platform for halal-certified businesses in Singapore. Built with Next.js 16, Supabase, and Stripe.

## Features

- **Business Directory** - Browse and search halal-certified businesses by category, location, and type
- **Business Listings** - Submit and manage business listings with photos, contact info, and halal certification details
- **Featured Listings** - Premium placement with Stripe-powered payments ($29/mo, $75/3mo, $140/6mo)
- **Business Claims** - Verify ownership and manage your business listing
- **Admin Dashboard** - Approve listings, manage claims, and create coupon codes
- **Programmatic SEO** - Auto-generated area pages for Singapore regions and districts
- **Authentication** - Secure magic link authentication via Supabase

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth (Magic Links)
- **Payments**: Stripe
- **Email**: Resend
- **Maps**: Leaflet / OpenStreetMap
- **Styling**: Tailwind CSS 4
- **Testing**: Playwright (E2E)

## Quick Start

### Prerequisites

- Node.js 20+
- npm or pnpm
- Supabase account
- Stripe account (for payments)

### Installation

```bash
# Clone the repository
git clone https://github.com/nicholsmindset/SG_Dir_2025.git
cd SG_Dir_2025/sg-halal-directory

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Resend)
RESEND_API_KEY=re_...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

See [API_KEYS_SETUP.md](./API_KEYS_SETUP.md) for detailed setup instructions.

## Project Structure

```
sg-halal-directory/
├── app/                    # Next.js App Router pages
│   ├── actions/           # Server actions
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── areas/             # Area/region pages (SEO)
│   ├── auth/              # Authentication
│   ├── business/          # Business detail pages
│   ├── dashboard/         # User dashboard
│   └── ...
├── components/            # Shared React components
├── lib/                   # Business logic & utilities
│   ├── supabase/         # Supabase clients
│   └── ...
├── supabase/              # Database migrations
├── tests/                 # Test files
│   └── e2e/              # Playwright E2E tests
└── types/                 # TypeScript type definitions
```

## Database Schema

The application uses the following main tables:

- **profiles** - User profiles extending Supabase auth
- **areas** - Singapore regions/districts for SEO
- **businesses** - Business listings
- **business_claims** - Ownership verification requests
- **featured_listings** - Premium listing purchases
- **images** - Business photos
- **coupon_codes** - Discount codes

See `supabase/migrations/` for the complete schema.

## Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
supabase start       # Start local Supabase
supabase db push     # Apply migrations
supabase gen types   # Generate TypeScript types

# Testing
npx playwright test              # Run E2E tests
npx playwright test --headed     # Run with browser visible
```

## Deployment

The application is optimized for deployment on Vercel or Netlify.

### Vercel

```bash
npm install -g vercel
vercel
```

### Environment Variables

Ensure all environment variables from `.env.example` are configured in your deployment platform.

## Documentation

- [API Keys Setup](./API_KEYS_SETUP.md) - Configure Supabase, Stripe, and Resend
- [Stripe Integration](./STRIPE_SETUP.md) - Payment processing setup
- [Geocoding Guide](./GEOCODING_GUIDE.md) - Location services
- [Email Setup](./docs/EMAIL_IMPLEMENTATION.md) - Transactional emails

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary. All rights reserved.

## Support

For issues and feature requests, please open an issue on GitHub.
