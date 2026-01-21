# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a dual-project workspace for SABMA (South African Black Mastiff Association):

1. **Main Website** (`/src`) - Public-facing Next.js static site
2. **Sabma-Logic** (`/Sabma-Logic`) - Administrative registry application for managing dog registrations and pedigrees

## Build Commands

### Main Website (root)
```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build (static export to /out)
npm run lint     # Run ESLint
```

### Sabma-Logic Registry (`/Sabma-Logic`)
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run ESLint
npm run db:push      # Push Prisma schema to PostgreSQL
npm run db:seed      # Seed database with sample data
npm run db:studio    # Launch Prisma Studio GUI
```

## Architecture

### Main Website

- **Framework**: Next.js 14 (App Router) with static export (`output: 'export'`)
- **Styling**: Tailwind CSS with custom warm color palette (ivory, espresso, bronze, copper)
- **Fonts**: Cormorant Garamond (display), Outfit (body)
- **Path alias**: `@/*` maps to `./src/*`

**Key directories**:
- `/src/app/` - Pages (about, breeders, council, contact, etc.)
- `/src/components/layout/` - Header, Footer (client components)
- `/src/components/ui/` - Reusable UI (Reveal scroll animation)
- `/src/data/content.ts` - Centralized content data (council members, breeders, testimonials, navigation)

**Custom Tailwind classes** (defined in `globals.css`):
- `.btn-primary`, `.btn-secondary` - Button styles
- `.card` - Premium card with shadow
- `.section-padding` - Consistent section spacing
- `.container-custom` - Max-width container

### Sabma-Logic Registry

- **Framework**: Next.js 14 (App Router) with server rendering
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js with email/password (bcryptjs)
- **Forms**: React Hook Form + Zod validation
- **UI**: Radix UI primitives + Lucide icons

**Key directories**:
- `/app/admin/` - Protected admin dashboard (dogs, kennels management)
- `/app/api/` - API routes (auth, dogs CRUD)
- `/app/dogs/`, `/app/kennels/` - Public browsing pages
- `/components/admin/` - Admin-specific components (DogForm)
- `/components/public/` - Public components (DogFilters, PedigreeTree)
- `/lib/` - Utilities (auth.ts, prisma.ts)
- `/prisma/schema.prisma` - Database schema

**Database models**:
- `Dog` - Core entity with self-referential sire/dam relationships, health data, appraisal scores
- `Kennel` - Breeder information linked to dogs
- `Litter` - Tracks breeding (sire + dam + puppies)
- `Photo`, `Certificate` - Dog media and documents
- `User` - Admin authentication (ADMIN, SUPER_ADMIN roles)

**Environment variables** (Sabma-Logic):
```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generated-key>
ADMIN_EMAIL=admin@sabma.org
ADMIN_PASSWORD=<secure-password>
```

## Development Notes

- Main website uses static export - no API routes, all content in `/src/data/content.ts`
- Sabma-Logic requires running PostgreSQL instance
- Both projects use Tailwind but with different color configurations
- Main site uses custom fonts loaded via `next/font` (Cormorant Garamond, Outfit)
