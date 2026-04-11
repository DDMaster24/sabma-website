# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SABMA (South African Black Mastiff Association) - A unified Next.js application with:
- **Public website** - Heritage Noir dark-themed pages for council, breeders, stud register, gallery, calendar, resources, etc.
- **Admin dashboard** - Full CMS for managing all website content, dog registry, kennels, and members
- **Dog registry** - Database-driven registry for managing dogs, pedigrees, kennels, and litters

## Build Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build (requires DATABASE_URL)
npm run lint     # Run ESLint
npm run db:push  # Push Prisma schema to PostgreSQL
npm run db:seed  # Seed database with all website content
npm run db:studio # Launch Prisma Studio GUI
```

## Architecture

- **Framework**: Next.js 14 (App Router) with server-side rendering
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js with email/password (bcryptjs), role-based (MEMBER/ADMIN/SUPER_ADMIN)
- **Styling**: Tailwind CSS with Heritage Noir dark theme (noir, charcoal, amber, cream, stone, copper, bronze)
- **Fonts**: Playfair Display (display), DM Sans (body)
- **Forms**: React Hook Form + Zod validation
- **UI**: Radix UI primitives + Lucide icons
- **Path alias**: `@/*` maps to `./src/*`

### Key Directories

- `/src/app/` - Public pages (about, breeders, council, contact, gallery, calendar, etc.)
- `/src/app/admin/` - Admin dashboard pages (council, breeders, studs, gallery, calendar, testimonials, resources, settings, dogs, kennels, members)
- `/src/app/api/` - REST API routes for all content types
- `/src/app/(auth)/` - Login and register pages
- `/src/components/layout/` - Header, Footer (client components)
- `/src/components/ui/` - Reusable UI components (Button, Card, Input, etc.)
- `/src/components/admin/` - Admin-specific components (DogForm, ImageUpload)
- `/src/lib/` - Utilities (auth.ts, prisma.ts, utils.ts)
- `/src/data/content.ts` - Legacy static content (navigation still used by Header/Footer; siteConfig deprecated in favor of SiteSetting DB model)
- `/prisma/schema.prisma` - Database schema
- `/prisma/seed.ts` - Database seed with all website content

### Database Models

**Registry models:**
- `Dog` - Core entity with self-referential sire/dam relationships, health data, appraisal scores
- `Kennel` - Breeder information linked to dogs
- `Litter` - Tracks breeding (sire + dam + puppies)
- `Photo`, `Certificate` - Dog media and documents
- `User` - Authentication with role-based access (MEMBER, ADMIN, SUPER_ADMIN)

**Website content models (admin-managed):**
- `CouncilMember` - Council page content (name, role, contact, sortOrder)
- `Breeder` - Breeders page content (name, kennel, owners, location, contact)
- `StudDog` - Stud register content (name, lineage, classification: BRONZE/SILVER/GOLD)
- `GalleryImage` - Photo gallery (src, alt, caption, category)
- `CalendarEvent` - Events calendar (title, date, time, location, type)
- `Testimonial` - Customer testimonials (name, quote)
- `Resource` - Downloadable resources (title, category, link, available flag)
- `SiteSetting` - Key-value store for site-wide settings (contact info, social links)

### API Routes

All content types have full CRUD at `/api/{type}` and `/api/{type}/[id]`:
- Public GET returns only `active: true` records; `?all=true` returns all (for admin)
- POST/PUT/DELETE require ADMIN or SUPER_ADMIN role
- Zod validation on all mutations
- `/api/upload` - Cloudinary image upload (POST multipart/form-data, DELETE by publicId)

### Image Upload

Admin forms use the `ImageUpload` component (`/src/components/admin/ImageUpload.tsx`):
- Drag-and-drop or click-to-upload with preview
- Uploads to Cloudinary via `/api/upload` endpoint
- Toggle between file upload and URL paste modes
- Integrated into Gallery, Council, Breeders, Studs, Testimonials admin forms

### Admin Dashboard

Protected by NextAuth session + role check. Navigate at `/admin`:
- Dashboard with stats for all content types
- CRUD pages for: Council, Breeders, Studs, Gallery, Calendar, Testimonials, Resources, Settings, Dogs, Kennels, Members
- Admin pages use light theme (bg-warm-50); public pages use dark Heritage Noir theme

**Custom Tailwind classes** (defined in `globals.css`):
- `.btn-primary`, `.btn-secondary` - Button styles
- `.card-noir` - Dark card styling
- `.section-padding` - Consistent section spacing
- `.container-custom` - Max-width container
- `.mesh-spotlight` - Background effect
- `.heading-display`, `.heading-section` - Typography hierarchy
- `.label-micro` - Small labels
- `.text-gradient-amber` - Gold gradient text

## Environment Variables

```
DATABASE_URL=postgresql://... (Neon)
DIRECT_URL=postgresql://... (Neon, same as DATABASE_URL)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generated-key>
ADMIN_EMAIL=admin@sabma.org
ADMIN_PASSWORD=<secure-password>
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## Development Notes

- Public pages use `force-dynamic` for server-side rendering (they query the database)
- The homepage is a client component that fetches breeders from `/api/breeders`
- Gallery uses a server/client split: `page.tsx` (server) queries DB, `GalleryClient.tsx` (client) handles lightbox
- Admin pages are client components that fetch from API routes
- `siteConfig` and `navigation` in `/src/data/content.ts` are still used by Header/Footer
- Seed file (`prisma/seed.ts`) contains all existing website content for initial setup
