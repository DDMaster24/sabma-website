# DDM Technology — Complete Business & Website Creation Workflow

> Master operational playbook for DDM Technology.
> Covers every project type: quick rebuild, website update, full system with mobile app.
> Last updated: January 2026

---

## TABLE OF CONTENTS

- [Phase 0: One-Time Business Setup](#phase-0-one-time-business-setup)
- [Phase 1: Client Acquisition & Intake](#phase-1-client-acquisition--intake)
- [Phase 2: Project Classification & Stack Selection](#phase-2-project-classification--stack-selection)
- [Phase 3: Discovery & Planning](#phase-3-discovery--planning)
- [Phase 4: Design](#phase-4-design)
- [Phase 5: Development](#phase-5-development)
- [Phase 6: Content & Assets](#phase-6-content--assets)
- [Phase 7: Quality Assurance](#phase-7-quality-assurance)
- [Phase 8: Security Audit](#phase-8-security-audit)
- [Phase 9: SEO Validation](#phase-9-seo-validation)
- [Phase 10: Launch](#phase-10-launch)
- [Phase 11: Client Handoff](#phase-11-client-handoff)
- [Phase 12: Post-Launch & Maintenance](#phase-12-post-launch--maintenance)
- [Appendix A: Project Type Quick-Reference](#appendix-a-project-type-quick-reference)
- [Appendix B: Pricing Guide](#appendix-b-pricing-guide)
- [Appendix C: Tool Stack & Monthly Costs](#appendix-c-tool-stack--monthly-costs)
- [Appendix D: Legal Templates Checklist (South Africa)](#appendix-d-legal-templates-checklist-south-africa)
- [Appendix E: Emergency Procedures](#appendix-e-emergency-procedures)

---

# PHASE 0: ONE-TIME BUSINESS SETUP

Complete these once. Revisit quarterly.

## 0.1 Subscriptions & Tools

### Core Development (Required)

| Tool | Cost | Purpose |
|------|------|---------|
| Claude Pro/Max (Claude Code) | R360-R3,600/mo | Primary AI coding assistant |
| Cursor Pro | R360/mo | IDE with AI integration |
| GitHub Pro | R140/mo | Version control, CI/CD |
| Vercel Pro | R360/mo | Hosting (SSR/dynamic sites) |
| Cloudflare (Free) | R0 | DNS, CDN, DDoS protection, static hosting |
| Figma Professional | R270/mo per editor | Design tool |

### Design & Assets (Required)

| Tool | Cost | Purpose |
|------|------|---------|
| Midjourney Pro | R1,080/mo | Hero images, editorial (Stealth Mode) |
| Recraft AI Pro | R450/mo | Icons, vectors, SVGs |
| LottieFiles (Free) | R0 | Micro-animations |
| Unsplash/Pexels (Free) | R0 | Stock photography fallback |

### Business Operations (Required)

| Tool | Cost | Purpose |
|------|------|---------|
| Tally (Free) | R0 | Client intake questionnaires |
| Content Snare | R520/mo | Collecting client content/assets |
| Notion Business | R320/mo per user | Client portals, docs, SOPs |
| Loom Business | R225/mo per user | Training videos, async communication |
| UptimeRobot Pro | R125/mo | Uptime monitoring (50 sites) |
| Bitwarden Business | R108/mo per user | Secure credential sharing |

### SEO (Start with budget stack)

| Tool | Cost | Purpose |
|------|------|---------|
| Google Search Console | R0 | Index monitoring |
| Google Analytics 4 | R0 | Traffic tracking |
| Screaming Frog (Free) | R0 | Technical audits (500 URLs) |
| Ahrefs Starter | R520/mo | Keyword research, backlinks |

### Optional / Growth

| Tool | Cost | Purpose |
|------|------|---------|
| v0 Premium | R360/mo | Rapid UI component generation |
| Relume AI | R680/mo | Sitemap/wireframe generation |
| n8n (Self-hosted) | R360/mo (VPS) | Workflow automation |
| Sentry Team | R470/mo | Error tracking across all sites |

## 0.2 Template Library

Create these reusable templates once:

### Code Templates

- [ ] **Next.js Starter Template** — App Router, Tailwind CSS, TypeScript, pre-configured:
  - SEO metadata with `generateMetadata`
  - JSON-LD structured data components (LocalBusiness, Organization, FAQ, BreadcrumbList)
  - `sitemap.ts` and `robots.ts`
  - `next-sitemap` config for static export
  - Cookie consent integration (CookieYes or Cookiebot)
  - Google Analytics 4 via `@next/third-parties`
  - Custom 404 page
  - Accessibility: skip-nav, focus styles, `prefers-reduced-motion` support
  - Performance: `next/image` config, font optimization, dynamic imports pattern
  - Legal page templates (Privacy Policy, Terms, PAIA Manual)
  - GSAP + ScrollTrigger + Lenis setup
  - Responsive header/footer with mobile menu

- [ ] **Astro Starter Template** — For pure static/brochure sites
  - Same SEO, legal, and accessibility setup as above
  - Zero JS by default

- [ ] **Full-Stack Starter Template** — Next.js + Payload CMS or Prisma
  - Auth (NextAuth.js)
  - Admin dashboard
  - API routes
  - Database schema patterns

### Business Templates

- [ ] **Client Intake Questionnaire** (Tally form)
- [ ] **Project Proposal Template** (Notion or Google Docs)
- [ ] **Contract Template** (scope, payment terms, IP transfer, cancellation)
- [ ] **Invoice Template** (Xero, FreshBooks, or manual)
- [ ] **Client Handoff Email Template**
- [ ] **Maintenance Agreement Template** (Basic/Standard/Premium tiers)
- [ ] **POPIA Privacy Policy Generator Config** (Hello Contract or Legal Legends)
- [ ] **PAIA Manual Template** (configurable per client)
- [ ] **Cookie Policy Template**
- [ ] **Terms & Conditions Template**

### Design Templates

- [ ] **Figma Design System** — DDM base system with:
  - Color tokens (configurable per client)
  - Typography scale
  - Component library (buttons, cards, forms, navigation)
  - Responsive grid system
  - Icon set (Lucide or custom via Recraft)

## 0.3 Cloudflare Account Setup

1. Create a single Cloudflare account for all client domains
2. Enable Cloudflare Registrar for at-cost domain registration
3. Set up Cloudflare Pages for static site hosting
4. Configure API tokens for automation scripts
5. Create a DNS template for standard site setup (A/CNAME records)

## 0.4 Automation Scripts

Build these Node.js scripts for repeated tasks:

- [ ] **`setup-gsc.ts`** — Adds site to Google Search Console, submits sitemap
- [ ] **`setup-ga4.ts`** — Creates GA4 property and data stream
- [ ] **`setup-dns.ts`** — Configures Cloudflare DNS records for a new domain
- [ ] **`audit-site.ts`** — Runs Lighthouse CI + Pa11y accessibility check
- [ ] **`generate-legal.ts`** — Generates legal pages from client business info JSON

---

# PHASE 1: CLIENT ACQUISITION & INTAKE

## 1.1 Lead Sources

- Referrals from existing clients (best conversion rate)
- Google Business Profile (set up and optimize your own)
- LinkedIn presence and content
- Portfolio website showcasing past work
- Local SA business directories (Brabys, Snupit)
- Cold outreach to businesses with poor/no websites

## 1.2 Initial Contact

**Goal:** Qualify the lead in under 15 minutes.

Questions to answer:
1. What does the business do?
2. Do they have an existing website?
3. What is their primary goal? (leads, sales, information, booking)
4. What is their budget range?
5. What is their timeline?
6. Who is the decision maker?

**If qualified:** Send the Client Intake Questionnaire (Tally form).

## 1.3 Client Intake Questionnaire

Send via Tally (free). Collect:

### Business Information
- Company name, registration number, VAT number
- Industry and target market
- Mission statement / elevator pitch
- Physical address (required for ECT Act compliance)
- Information Officer name and contact (required for POPIA)
- Top 3 competitors (with URLs)

### Website Goals
- Primary purpose (lead gen, e-commerce, portfolio, information, booking)
- Key conversion actions (form submit, phone call, purchase, signup)
- Must-have pages (list)
- Must-have features (booking, member portal, e-commerce, blog)
- Existing website URL (if redesigning)

### Design Preferences
- 3-5 websites they admire (with what they like about each)
- Brand colors, fonts, existing brand guidelines
- Existing logo (upload)
- Photography style preferences
- Tone of voice (formal, casual, playful, authoritative)

### Technical Requirements
- Domain ownership (who owns it, registrar)
- Email setup (existing provider, need new)
- Third-party integrations (CRM, email marketing, booking, payment)
- Expected monthly traffic

### Content
- Who provides copy? (client, agency, copywriter)
- Who provides photography? (stock, existing, new shoot, AI-generated)
- Existing content to migrate?

## 1.4 Discovery Call (30-60 minutes)

After reviewing the questionnaire:

1. Walk through their answers, clarify ambiguities
2. Discuss project scope and confirm requirements
3. Identify the project type (see Phase 2)
4. Discuss timeline expectations
5. Present preliminary pricing range (see Appendix B)
6. Agree on next steps

**Deliverable:** Meeting notes in Notion, tagged to client.

## 1.5 Proposal & Contract

### Proposal (send within 24 hours of discovery call)

Include:
- Project summary and understanding of their needs
- Scope of work (pages, features, integrations)
- Project type and tech stack (plain language)
- Timeline with milestones
- Pricing (fixed project fee, not hourly)
- What is included and what is NOT included
- Maintenance plan options (Basic/Standard/Premium)
- Payment terms (50% deposit, 50% on launch — or 40/30/30 for larger projects)

### Contract

Include:
- Full scope of work
- Payment schedule and amounts
- Timeline and milestone dates
- Revision limits (typically 2 rounds of design revisions)
- IP transfer clause (client owns all deliverables upon final payment)
- Cancellation terms
- Confidentiality clause
- Limitation of liability
- South African law as governing law

**Signed contract + deposit received = project starts.**

---

# PHASE 2: PROJECT CLASSIFICATION & STACK SELECTION

## 2.1 Project Type Decision Tree

```
START
  |
  ├── Is this a content update to an existing site?
  |   └── YES → Type A: Website Update
  |
  ├── Is this a new simple business/brochure site (under 10 pages)?
  |   ├── Does the client need to edit content themselves?
  |   |   ├── YES, simple edits → Type B: Brochure + Lightweight CMS
  |   |   ├── YES, frequent/complex edits → Type C: Brochure + Full CMS
  |   |   └── NO → Type D: Static Brochure
  |   └──
  |
  ├── Does the project need e-commerce?
  |   ├── Small catalog (under 50 products) → Type E: Light E-commerce
  |   └── Large catalog or complex needs → Type F: Full E-commerce
  |
  ├── Does the project need user auth, dashboards, or custom logic?
  |   └── YES → Type G: Web Application
  |
  ├── Does the project need a mobile app?
  |   └── YES → Type H: Full System (Web + Mobile)
  |
  └── Is this a WordPress site (client requirement)?
      └── YES → Type W: WordPress Build
```

## 2.2 Stack Selection by Project Type

### Type A: Website Update
- **Stack:** Whatever the existing site uses
- **Tools:** Claude Code + Cursor
- **Timeline:** Hours to days
- **Hosting:** Existing

### Type B: Brochure + Lightweight CMS
- **Stack:** Next.js (static export) + Airtable or Google Sheets as CMS
- **Tools:** Claude Code, v0, GSAP
- **Hosting:** Cloudflare Pages (free)
- **Timeline:** 1-3 days

### Type C: Brochure + Full CMS
- **Stack:** Next.js + Sanity (free tier) or Payload CMS (self-hosted)
- **Tools:** Claude Code, Cursor, Figma MCP
- **Hosting:** Cloudflare Pages (frontend) + Sanity Cloud or VPS (CMS)
- **Timeline:** 3-7 days

### Type D: Static Brochure
- **Stack:** Next.js (static export) or Astro. Content in code (`/data/content.ts`)
- **Tools:** Claude Code, v0, GSAP
- **Hosting:** Cloudflare Pages (free)
- **Timeline:** 1-2 days (24-hour delivery possible)

### Type E: Light E-commerce
- **Stack:** Next.js + Payload CMS + Stripe or PayFast (SA)
- **Tools:** Claude Code, Cursor
- **Hosting:** Vercel Pro + database (Supabase or PlanetScale)
- **Timeline:** 1-2 weeks

### Type F: Full E-commerce
- **Stack:** Next.js + Payload CMS + Stripe/PayFast + inventory management
  - OR Shopify (Hydrogen/Remix) if client wants Shopify ecosystem
- **Tools:** Claude Code, Cursor
- **Hosting:** Vercel Pro or Shopify
- **Timeline:** 2-6 weeks

### Type G: Web Application
- **Stack:** Next.js (App Router, SSR) + Prisma + PostgreSQL + NextAuth.js
- **Tools:** Claude Code, Cursor
- **Hosting:** Vercel Pro + Supabase/Neon (database)
- **Timeline:** 2-8 weeks depending on complexity

### Type H: Full System (Web + Mobile)
- **Stack:** Next.js (web) + React Native or Expo (mobile) + shared API layer
  - Database: PostgreSQL via Prisma or Supabase
  - Auth: NextAuth.js (web) + Supabase Auth or Clerk (shared)
- **Tools:** Claude Code, Cursor, Expo
- **Hosting:** Vercel (web) + Supabase (backend) + App Store / Play Store
- **Timeline:** 4-16 weeks

### Type W: WordPress Build
- **Stack:** WordPress + FSE theme or headless (WPGraphQL + Next.js frontend)
- **Tools:** Claude Code + WordPress MCP (Claudeus WP MCP or InstaWP MCP)
- **Hosting:** Hostinger Cloud or SiteGround + Cloudflare DNS
- **Timeline:** 1-3 weeks

## 2.3 Hosting Decision Matrix

| Condition | Use |
|-----------|-----|
| Static site, no server logic | Cloudflare Pages (free, unlimited bandwidth) |
| Next.js with SSR/ISR/API routes | Vercel Pro ($20/mo per team member) |
| WordPress | Hostinger Cloud ($6.99/mo) |
| Needs database | Supabase (free tier) or Neon (free tier) |
| Client domain DNS | Cloudflare (always, for all clients) |

**Set Vercel spend cap to $200/mo for every project.**

---

# PHASE 3: DISCOVERY & PLANNING

## 3.1 Sitemap Generation

1. Open **Relume AI** (or do manually for simple sites)
2. Input: Client business description + goals from intake questionnaire
3. Generate sitemap structure
4. Review and refine page hierarchy
5. Get client approval on sitemap before proceeding

**For simple sites (under 8 pages), skip Relume and define manually:**
- Home
- About
- Services (or Products)
- Contact
- Blog (if needed)
- Legal pages (Privacy Policy, Terms, PAIA Manual)

## 3.2 Content Audit

If redesigning an existing site:
1. Crawl existing site with Screaming Frog
2. Identify content to keep, update, or remove
3. Map old URLs to new URLs (for 301 redirects)
4. Export existing content for migration

## 3.3 Competitor Analysis (15 minutes)

For each of the client's 3 competitors:
1. Note what works well (design, messaging, features)
2. Note what is weak (performance, mobile, SEO)
3. Run quick Lighthouse audit
4. Check their structured data (Google Rich Results Test)

**Deliverable:** Short bullet-point analysis in Notion.

## 3.4 Technical Architecture (for Type E-H projects)

Document in Notion:
- System architecture diagram (which services talk to what)
- Database schema outline
- Authentication flow
- Third-party integration points
- API endpoint plan
- Deployment architecture

**For Types A-D:** Skip this. The starter template handles architecture.

## 3.5 Client Approval Gate

Before any design or code work:

- [ ] Sitemap approved by client
- [ ] Content responsibility agreed (who provides what, by when)
- [ ] Technical approach confirmed
- [ ] Timeline confirmed
- [ ] Deposit received

---

# PHASE 4: DESIGN

## 4.1 Design Approach by Project Type

| Type | Design Approach |
|------|----------------|
| A (Update) | No design phase — work in code |
| B, D (Brochure) | Wireframes (Relume or Figma) → 1 homepage mockup → Client approval → Build |
| C (Brochure + CMS) | Wireframes → 2-3 key page mockups → Client approval → Build |
| E-F (E-commerce) | Wireframes → Homepage + Product page + Cart mockups → Approval → Build |
| G-H (App/System) | Wireframes → Key screen mockups → User flow diagrams → Approval → Build |
| W (WordPress) | Wireframes → Theme selection/customization mockup → Approval → Build |

## 4.2 Wireframing

1. **Relume AI** — Generate wireframes from approved sitemap (5-10 minutes)
2. Export to **Figma** via Relume plugin
3. Apply client's brand (colors, fonts, logo) using Figma design system
4. Add real section names and placeholder content

## 4.3 Visual Design

1. Gather **3-5 reference sites** from Awwwards, SiteInspire, or Unsection
2. Create **mood direction** — share references with client for style alignment
3. Design **homepage first** in Figma (highest impact page)
4. Use **v0** to quickly prototype complex UI sections if needed
5. Apply brand identity: colors, typography, imagery style
6. Design **mobile layout** alongside desktop (not as afterthought)

## 4.4 Design Review & Approval

1. Share Figma link with client via Notion client portal
2. Use **Markup.io** or Figma comments for feedback
3. Allow **2 rounds of revisions** (as per contract)
4. Get **written approval** before proceeding to development

**Approval email template:**
> "Please confirm you approve this design direction. Once approved, we move to development. Design changes after this point may incur additional charges as outlined in our agreement."

## 4.5 Asset Generation

Generate all visual assets during or immediately after design approval:

### Images
- **Hero images:** Midjourney V7 (use `--sref` for style consistency, `--ar 16:9` for heroes)
- **Team/people photos:** Reve Image (natural imperfections) or real photos from client
- **Icons:** Recraft AI (SVG output, brand HEX colors)
- **Backgrounds/textures:** Midjourney V7 (`--tile` for seamless patterns)
- **Product photos:** Flux Pro (most photorealistic) or real photography

### Animations
- **Micro-interactions:** LottieFiles (search library or create with Motion Copilot)
- **Scroll effects:** Plan GSAP ScrollTrigger animations during design
- **3D elements:** Spline (no-code) or React Three Fiber (code)
- **Loading states:** Lottie or CSS animations

### Asset Optimization Checklist
- [ ] All images exported as WebP (quality 80-85)
- [ ] Hero images under 200KB
- [ ] SVG icons optimized (SVGO)
- [ ] Lottie files under 100KB each
- [ ] All images have defined dimensions (width/height)
- [ ] Favicon set: 16x16, 32x32, 180x180 (Apple touch), 512x512 (PWA)
- [ ] Open Graph image: 1200x630px

---

# PHASE 5: DEVELOPMENT

## 5.1 Project Setup

### For New Projects

```bash
# 1. Clone starter template
git clone https://github.com/ddm-technology/nextjs-starter.git client-name
cd client-name

# 2. Remove template git history, init fresh
rm -rf .git
git init
git remote add origin https://github.com/ddm-technology/client-name.git

# 3. Install dependencies
npm install

# 4. Configure environment
cp .env.example .env.local
# Edit .env.local with client-specific values

# 5. Update site config
# Edit src/config/site.ts with client business info
# This config drives: metadata, JSON-LD, sitemap, legal pages

# 6. Start development
npm run dev
```

### For Existing Projects

```bash
# 1. Clone existing repo
git clone <repo-url>
cd project-name

# 2. Create feature branch
git checkout -b feature/project-description

# 3. Install and run
npm install
npm run dev
```

## 5.2 Development Workflow

### Daily Development Loop

```
1. Open Claude Code in project directory
2. Open Cursor as visual IDE
3. Reference Figma designs (via Figma MCP or side-by-side)
4. Build page-by-page, component-by-component
5. Test responsive at each breakpoint as you go
6. Commit frequently with descriptive messages
```

### Claude Code Best Practices

- Write detailed specs before asking Claude to implement
- Use CLAUDE.md to document project-specific conventions
- Provide Figma screenshots or design references when requesting UI work
- Ask Claude to implement one component/feature at a time
- Review generated code before committing
- Use the GSAP MCP server for animation code

### Component Build Order

1. **Layout:** Header, Footer, Navigation (mobile + desktop)
2. **Homepage:** Hero section, key sections top-to-bottom
3. **Inner pages:** About, Services, Contact, etc.
4. **Dynamic pages:** Blog posts, product pages (if applicable)
5. **Interactive features:** Forms, search, filters, auth
6. **Animations:** GSAP scroll effects, transitions, micro-interactions
7. **Legal pages:** Privacy Policy, Terms, PAIA Manual, Cookie Consent

### Animation Implementation

```
Core setup (add to every project):
1. npm install gsap @gsap/react lenis
2. Register GSAP plugins in a client component
3. Initialize Lenis for smooth scrolling
4. Use useGSAP hook for React lifecycle safety

Common patterns:
- Fade-up on scroll: gsap.from(el, { y: 50, opacity: 0, scrollTrigger: {...} })
- Stagger children: stagger: 0.1 in ScrollTrigger batch
- Parallax: y: "-20%", scrub: true
- Text reveal: SplitText + staggered animation
- Pin sections: pin: true in ScrollTrigger

Performance rules:
- ONLY animate transform and opacity
- Use will-change sparingly (add before, remove after)
- Lazy-load Three.js scenes with dynamic import + ssr: false
- Respect prefers-reduced-motion with motion-safe: Tailwind modifier
- Clean up all ScrollTriggers on component unmount
```

## 5.3 CMS Integration (when applicable)

### Sanity Setup (Type C projects)

```bash
# 1. Install Sanity in the Next.js project
npm install next-sanity @sanity/image-url

# 2. Create Sanity Studio at /studio route
# app/(admin)/studio/[[...tool]]/page.tsx

# 3. Define content schemas matching client needs
# schemas/page.ts, schemas/post.ts, etc.

# 4. Enable Visual Editing for client WYSIWYG experience

# 5. Configure GROQ queries for data fetching
```

### Payload CMS Setup (Type C, E-G projects)

```bash
# 1. Install Payload into Next.js project
npx create-payload-app@latest

# 2. Define collections (content types)
# collections/Pages.ts, collections/Posts.ts

# 3. Configure admin panel access controls

# 4. Set up media uploads and image optimization

# 5. Deploy: database on Supabase/Neon, app on Vercel
```

### Lightweight CMS Setup (Type B projects)

```bash
# Airtable: Install SDK, create base, build fetch functions
npm install airtable

# Google Sheets: Use googleapis package
npm install googleapis

# Build ISR or on-demand revalidation for content freshness
```

## 5.4 Git Workflow

- **`main`** — Production. Only merge tested, approved code.
- **`develop`** — Staging/integration branch.
- **Feature branches** — `feature/homepage`, `feature/contact-form`, etc.
- **Commit messages:** Descriptive, imperative mood. "Add hero section with scroll animation"
- **Pull requests:** Required for merging to main. Include screenshots/recordings.

---

# PHASE 6: CONTENT & ASSETS

## 6.1 Content Collection

Use **Content Snare** to collect from clients:
- Page copy (per page, clearly labeled)
- Team member bios and photos
- Product/service descriptions
- Logo files (SVG preferred, PNG fallback)
- Brand guidelines document
- Testimonials and reviews
- FAQ content
- Legal information (registration numbers, physical address, Information Officer)

**Set a deadline.** Content delays are the #1 cause of project delays.

## 6.2 Content Integration

1. Replace all placeholder text with real client copy
2. Optimize images (WebP, proper sizing)
3. Add `alt` text to every image (descriptive, not keyword-stuffed)
4. Configure CMS content (if applicable)
5. Verify all links work
6. Check content on mobile (text length, image cropping)

## 6.3 Legal Pages (South Africa)

Every client website MUST include:

### 1. Privacy Policy (POPIA Section 18)
Generate using Hello Contract or Legal Legends with client's:
- Business name and registration number
- Information Officer name and contact
- Types of personal information collected
- Purpose of collection
- Third parties who receive data
- Data retention periods
- Data subject rights

### 2. PAIA Manual
Required since 1 January 2022 for ALL businesses. Include:
- Postal and street address
- Phone and email of entity head
- Information Officer and Deputy contact details
- Categories of records held
- How to request access to records
- Applicable fees

### 3. Cookie Consent Manager
- Install CookieYes or Cookiebot
- Configure for POPIA (opt-in required)
- Block all tracking scripts until consent given
- If site has international visitors, enable geo-targeting (GDPR banner for EU)

### 4. Terms & Conditions
Generate via Termly or TermsFeed. Must include:
- Acceptable use
- Limitation of liability
- Governing law (South Africa)
- Dispute resolution

### 5. Contact Information (ECT Act Section 43)
Display on every page (footer) or dedicated page:
- Full legal name
- Physical address (not PO Box)
- Phone number
- Email address
- Company registration number
- VAT number (if applicable)

### 6. Consent Checkboxes
All forms collecting personal data must have:
- Unticked checkbox for consent
- Clear statement of what they are consenting to
- Link to Privacy Policy

---

# PHASE 7: QUALITY ASSURANCE

## 7.1 Cross-Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Samsung Internet (significant in SA market)

## 7.2 Responsive Testing

Test at these breakpoints:
- [ ] 320px (small phones)
- [ ] 375px (iPhone SE/mini)
- [ ] 390px (iPhone 14)
- [ ] 768px (iPad portrait)
- [ ] 1024px (iPad landscape / small laptops)
- [ ] 1280px (standard laptops)
- [ ] 1440px (desktop)
- [ ] 1920px (large desktop)

Check for:
- [ ] No horizontal scrollbar at any breakpoint
- [ ] Text is readable without zooming on mobile
- [ ] Tap targets are at least 44x44px on mobile
- [ ] Images scale correctly
- [ ] Navigation works on mobile (hamburger menu)
- [ ] Forms are usable on mobile
- [ ] Modals/popups don't break on small screens

## 7.3 Functionality Testing

- [ ] All links work (no broken links)
- [ ] All forms submit correctly
- [ ] Form validation works (required fields, email format)
- [ ] Form confirmation/thank you message displays
- [ ] Email notifications arrive (contact form, signup)
- [ ] CMS content displays correctly
- [ ] Search works (if applicable)
- [ ] Authentication flow works (if applicable)
- [ ] Payment flow works (if applicable)
- [ ] 404 page displays for invalid URLs
- [ ] Redirects work (if migrating from old site)

## 7.4 Performance Audit

Run Google Lighthouse (or `npx lhci autorun`):

**Target scores:**
- [ ] Performance: 90+
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+
- [ ] SEO: 90+

**Core Web Vitals targets:**
- [ ] LCP (Largest Contentful Paint): under 2.5 seconds
- [ ] INP (Interaction to Next Paint): under 200ms
- [ ] CLS (Cumulative Layout Shift): under 0.1

**If scores are below 90, check:**
- Large unoptimized images (convert to WebP, add proper `sizes`)
- Unoptimized fonts (use `next/font`, limit to 2 families)
- Heavy JavaScript bundles (dynamic import heavy components)
- Render-blocking resources
- Third-party scripts loading too early (defer analytics, chat widgets)
- Missing image dimensions causing layout shift

## 7.5 Accessibility Audit

### Automated Testing
```bash
# Run Pa11y on all pages
npx pa11y-ci

# Or run axe-core via Playwright
npx playwright test --grep accessibility
```

### Manual Checks
- [ ] Navigate entire site using only keyboard (Tab, Enter, Escape)
- [ ] No keyboard traps (can always Tab away from any element)
- [ ] Focus indicators visible on all interactive elements
- [ ] Skip navigation link present and functional
- [ ] All images have descriptive `alt` text
- [ ] Decorative images have `alt=""`
- [ ] Color contrast passes 4.5:1 for body text, 3:1 for large text
- [ ] Forms have associated labels (not just placeholders)
- [ ] Error messages are clear and specific
- [ ] Headings follow logical hierarchy (h1 > h2 > h3, no skipping)
- [ ] Page language set (`<html lang="en">`)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Video/audio has captions (if applicable)

---

# PHASE 8: SECURITY AUDIT

## 8.1 HTTPS & Transport Security

- [ ] SSL certificate is active and valid
- [ ] All HTTP requests redirect to HTTPS
- [ ] HSTS header is set (`Strict-Transport-Security`)
- [ ] No mixed content warnings (HTTP assets on HTTPS page)

## 8.2 Headers & Configuration

- [ ] `X-Content-Type-Options: nosniff` header set
- [ ] `X-Frame-Options: DENY` or `SAMEORIGIN` header set
- [ ] `Referrer-Policy` header set
- [ ] Content Security Policy (CSP) configured (at minimum, report-only mode)
- [ ] `robots.txt` does not expose sensitive paths
- [ ] No sensitive files accessible (`.env`, `.git`, `node_modules`)

## 8.3 Authentication (if applicable)

- [ ] Passwords are hashed (bcrypt, argon2)
- [ ] Session tokens are HTTP-only, Secure, SameSite
- [ ] CSRF protection is enabled
- [ ] Rate limiting on login/signup endpoints
- [ ] Account lockout after failed attempts
- [ ] Password reset flow is secure (time-limited tokens)
- [ ] No sensitive data in URL parameters

## 8.4 Input Validation

- [ ] All form inputs are validated server-side (not just client-side)
- [ ] SQL injection protection (parameterized queries / Prisma handles this)
- [ ] XSS protection (React's JSX escaping + CSP headers)
- [ ] File upload validation (type, size, filename sanitization)
- [ ] No `dangerouslySetInnerHTML` with user-provided content

## 8.5 Data Protection (POPIA)

- [ ] Personal data encrypted at rest (database-level encryption)
- [ ] Personal data encrypted in transit (HTTPS)
- [ ] Data collection is minimized (only collect what is needed)
- [ ] Data retention policy defined and implemented
- [ ] Data deletion capability exists (data subject right to erasure)
- [ ] Cross-border data transfer is lawful (if using international services)
- [ ] Information Officer registered with Information Regulator

## 8.6 Third-Party Dependencies

- [ ] Run `npm audit` — no critical or high vulnerabilities
- [ ] Dependencies are up to date (within reason)
- [ ] No unnecessary dependencies installed
- [ ] Third-party scripts loaded from trusted sources only
- [ ] No API keys or secrets in client-side code
- [ ] Environment variables are properly configured (not committed to git)

---

# PHASE 9: SEO VALIDATION

## 9.1 Technical SEO Checklist

- [ ] Every page has a unique `<title>` (under 60 characters)
- [ ] Every page has a unique `<meta name="description">` (150-160 characters)
- [ ] Open Graph tags present on all pages
- [ ] Twitter Card tags present on all pages
- [ ] `<html lang="en">` (or appropriate language) set
- [ ] Canonical URL set on every page
- [ ] `sitemap.xml` generated and accessible
- [ ] `sitemap.xml` submitted to Google Search Console
- [ ] `robots.txt` configured correctly (not blocking important pages)
- [ ] JSON-LD structured data present and valid:
  - [ ] Organization or LocalBusiness schema
  - [ ] BreadcrumbList schema on inner pages
  - [ ] FAQ schema (where applicable)
  - [ ] Product schema (for e-commerce)
- [ ] Validate structured data: https://search.google.com/test/rich-results
- [ ] No orphan pages (every page reachable from navigation or internal links)
- [ ] No broken internal links
- [ ] Images have `alt` text
- [ ] URLs are clean and descriptive (`/services/web-design`, not `/page?id=3`)
- [ ] 301 redirects configured (if migrating from old URLs)

## 9.2 Google Search Console Setup

1. Add property (URL prefix method or Domain method)
2. Verify ownership (DNS TXT record via Cloudflare — fastest)
3. Submit sitemap (`https://clientsite.co.za/sitemap.xml`)
4. Check for crawl errors
5. Confirm mobile usability
6. Add client's Google account as owner (so they retain access)

## 9.3 Google Analytics 4 Setup

1. Create GA4 property
2. Create web data stream
3. Add Measurement ID to site (via `@next/third-parties/google` or GTM)
4. Verify data is flowing (Real-time report)
5. Set up basic conversion events (form_submit, contact_click, purchase)
6. Add client's Google account as admin
7. Block internal IP addresses from tracking

## 9.4 Google Business Profile (Local SA Businesses)

1. Claim or create profile at google.com/business
2. Verify (postcard, phone, or instant verification)
3. Complete ALL fields:
   - Business name (exact legal name)
   - Category (primary + secondary)
   - Address, phone, website
   - Hours of operation
   - Description (750 characters, include keywords naturally)
   - Services list
4. Upload photos (storefront, interior, team, products — minimum 10)
5. Link website
6. Ensure NAP (Name, Address, Phone) matches website exactly
7. Register on SA directories: Brabys, Snupit, Yellow Pages SA

---

# PHASE 10: LAUNCH

## 10.1 Pre-Launch Final Checks

- [ ] All Phase 7 (QA) items pass
- [ ] All Phase 8 (Security) items pass
- [ ] All Phase 9 (SEO) items pass
- [ ] Client has given written approval to launch
- [ ] Client content is final (no "placeholder" text remaining)
- [ ] Favicon and app icons are in place
- [ ] Social sharing preview works (test with https://cards-dev.twitter.com/validator and Facebook Sharing Debugger)
- [ ] Cookie consent banner is functioning
- [ ] Legal pages are accessible from footer
- [ ] Analytics tracking is confirmed (check GA4 real-time)
- [ ] Contact form sends to correct email address
- [ ] Error pages (404, 500) are styled
- [ ] Environment variables are set in production

## 10.2 Deployment

### Static Sites (Cloudflare Pages)

```bash
# 1. Build the project
npm run build

# 2. Connect GitHub repo to Cloudflare Pages
# Dashboard > Pages > Create project > Connect to Git

# 3. Configure build settings:
#    Build command: npm run build
#    Build output directory: out (for Next.js static) or dist (for Astro)

# 4. Deploy
# Automatic on git push to main branch
```

### Dynamic Sites (Vercel)

```bash
# 1. Connect GitHub repo to Vercel
# vercel.com > New Project > Import Git Repository

# 2. Configure environment variables in Vercel dashboard

# 3. Configure project settings:
#    Framework Preset: Next.js
#    Build Command: npm run build
#    Output Directory: .next

# 4. Set spend limit to $200/month

# 5. Deploy
# Automatic on git push to main branch
```

### WordPress Sites (Hostinger)

```bash
# 1. Set up hosting on Hostinger
# 2. Install WordPress (1-click install)
# 3. Import theme and content
# 4. Configure plugins
# 5. Test thoroughly
```

## 10.3 DNS Configuration

1. Log in to Cloudflare
2. Add client's domain (if not already)
3. Update nameservers at registrar to Cloudflare's
4. Configure DNS records:
   - **Cloudflare Pages:** CNAME `@` → `project-name.pages.dev`
   - **Vercel:** CNAME `@` → `cname.vercel-dns.com` (or A record to `76.76.21.21`)
   - **Email:** MX records per email provider
   - **Verification:** TXT records for GSC, email providers
5. Enable Cloudflare proxy (orange cloud) for DDoS protection
6. Verify SSL is active (Full Strict mode)

## 10.4 Post-Deployment Verification

Within 1 hour of launch:

- [ ] Site loads on the live domain (both www and non-www)
- [ ] HTTPS is active (no certificate errors)
- [ ] All pages load correctly
- [ ] Forms work on production
- [ ] Analytics tracking confirmed on live domain
- [ ] Search Console verified on live domain
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] `robots.txt` accessible and correct
- [ ] Old URLs redirect properly (if applicable)
- [ ] No console errors in browser DevTools
- [ ] Site works on mobile (real device test, not just browser)

## 10.5 Monitoring Setup

1. **UptimeRobot** — Add the live URL with 5-minute check interval
2. **Sentry** — Verify error tracking is capturing events (if installed)
3. **Vercel Analytics** — Enable Web Vitals monitoring (if on Vercel)
4. **Google Search Console** — Monitor indexing over the next 7 days

---

# PHASE 11: CLIENT HANDOFF

## 11.1 Documentation Package

Deliver via Notion (shared page) or PDF:

### 1. Site Overview
- Live URL
- Hosting platform and login URL
- CMS login URL (if applicable)
- Domain registrar and DNS provider

### 2. How to Edit Content (CMS Guide)
- Step-by-step screenshots for common tasks:
  - Editing page text
  - Uploading/replacing images
  - Adding a blog post
  - Updating navigation
- What NOT to touch (code-level elements, settings)

### 3. Credential List
Share via Bitwarden (never email):
- Hosting login
- CMS login
- Domain registrar login
- Google Search Console access
- Google Analytics access
- Email service login
- Cloudflare login (if client manages DNS)
- Social media integrations

### 4. Technical Reference
- Tech stack overview (plain language)
- How to request changes or report bugs
- Emergency contact procedure
- Support hours and SLA

## 11.2 Training

1. **Record a Loom video** (15-30 minutes) walking through:
   - How to log in to the CMS
   - How to edit each type of content
   - How to view analytics
   - Where to find support

2. **Schedule a live training session** (30-60 minutes on Zoom/Meet):
   - Walk through the CMS together
   - Let the client make edits while you watch
   - Answer questions
   - Record the session for their reference

## 11.3 Handoff Email

Send a formal handoff email including:
- "Your website is live" announcement
- Link to documentation (Notion page)
- Link to training video (Loom)
- Credential sharing invitation (Bitwarden)
- Maintenance plan options (if not already agreed)
- Support contact information
- 30-day post-launch support window details

## 11.4 Final Invoice

- Send remaining balance invoice (50% or 30% depending on payment structure)
- Include itemized deliverables
- Payment terms: 7-14 days

---

# PHASE 12: POST-LAUNCH & MAINTENANCE

## 12.1 First 30 Days (Included in Project)

- Monitor for bugs and fix promptly
- Check analytics are tracking correctly
- Review Core Web Vitals in Search Console (data needs ~28 days)
- Monitor uptime alerts
- Respond to client questions within 24 hours

## 12.2 Maintenance Plans

### Basic — R500-R1,500/month ($50-$150)
- Hosting included
- SSL certificate management
- Monthly backups
- Security updates and dependency patches
- UptimeRobot monitoring
- Email support (48-hour response)
- 1 hour of content changes per month

### Standard — R1,500-R3,500/month ($150-$350)
- Everything in Basic
- Weekly backups
- Performance monitoring (monthly Lighthouse report)
- Priority email support (24-hour response)
- 3 hours of content changes per month
- Quarterly browser/device testing
- Basic SEO monitoring

### Premium — R3,500-R8,000/month ($350-$800)
- Everything in Standard
- Daily backups
- 24/7 uptime monitoring with phone alerts
- Phone support
- 8 hours of development/content changes per month
- Full SEO optimization
- Quarterly performance review meeting
- Security audit (quarterly)
- A/B testing and conversion optimization

## 12.3 Ongoing Maintenance Tasks

### Monthly
- [ ] Run `npm audit` and update dependencies
- [ ] Review UptimeRobot reports
- [ ] Check for 404 errors in Search Console
- [ ] Apply CMS updates (if applicable)
- [ ] Review and action any client change requests
- [ ] Backup verification

### Quarterly
- [ ] Full Lighthouse audit
- [ ] Accessibility spot-check
- [ ] Security header review
- [ ] SSL certificate expiry check
- [ ] Review analytics trends with client (Standard+)
- [ ] Update legal pages if regulations change

### Annually
- [ ] Full site review and recommendations
- [ ] Technology stack assessment (is an upgrade needed?)
- [ ] Renewal of domain, hosting, SSL
- [ ] Review and update maintenance plan pricing
- [ ] POPIA compliance review

---

# APPENDIX A: PROJECT TYPE QUICK-REFERENCE

| Type | Timeline | Starting Price (ZAR) | Stack |
|------|----------|---------------------|-------|
| A: Website Update | Hours-days | R2,000-R10,000 | Existing |
| B: Brochure + Light CMS | 1-3 days | R10,000-R25,000 | Next.js + Sheets/Airtable |
| C: Brochure + Full CMS | 3-7 days | R15,000-R45,000 | Next.js + Sanity/Payload |
| D: Static Brochure | 1-2 days | R7,000-R20,000 | Next.js static or Astro |
| E: Light E-commerce | 1-2 weeks | R25,000-R60,000 | Next.js + Payload + PayFast |
| F: Full E-commerce | 2-6 weeks | R60,000-R200,000 | Next.js + Payload or Shopify |
| G: Web Application | 2-8 weeks | R50,000-R250,000 | Next.js + Prisma + PostgreSQL |
| H: Full System (Web+Mobile) | 4-16 weeks | R100,000-R500,000+ | Next.js + React Native + Supabase |
| W: WordPress Build | 1-3 weeks | R10,000-R40,000 | WordPress + Cloudflare |

---

# APPENDIX B: PRICING GUIDE

## Fixed Project Pricing

**Price based on value delivered, not hours spent.**

| Service | ZAR Range | Speed Premium (+25-50%) |
|---------|-----------|------------------------|
| Landing page | R5,000 - R15,000 | R7,500 - R22,500 |
| Business website (5-8 pages) | R15,000 - R45,000 | R22,500 - R60,000 |
| Website with CMS | R20,000 - R60,000 | R30,000 - R90,000 |
| E-commerce (basic) | R25,000 - R60,000 | — |
| E-commerce (advanced) | R60,000 - R200,000 | — |
| Web application | R50,000 - R250,000 | — |
| Web + Mobile system | R100,000 - R500,000+ | — |

## Add-On Services

| Service | ZAR |
|---------|-----|
| POPIA/Legal compliance setup | R1,500 - R3,000 |
| Google Business Profile setup | R1,000 - R2,000 |
| SEO audit and optimization | R3,000 - R10,000 |
| Logo design | R3,000 - R10,000 |
| Brand identity package | R10,000 - R25,000 |
| Copywriting (per page) | R500 - R1,500 |
| Photography coordination | R2,000 - R5,000 |
| 3D/animation integration | R5,000 - R15,000 |

## Payment Structure

- **Projects under R30,000:** 50% deposit, 50% on launch
- **Projects R30,000-R100,000:** 40% deposit, 30% at design approval, 30% on launch
- **Projects over R100,000:** 30% deposit, 30% at design approval, 20% at development milestone, 20% on launch

---

# APPENDIX C: TOOL STACK & MONTHLY COSTS

## Budget Stack (Starting Out)

| Tool | Monthly (ZAR) |
|------|--------------|
| Claude Pro | R360 |
| Cursor Pro | R360 |
| GitHub Pro | R140 |
| Cloudflare (Free) | R0 |
| Figma (Free) | R0 |
| Tally (Free) | R0 |
| Notion (Free) | R0 |
| Google Tools (Free) | R0 |
| UptimeRobot (Free) | R0 |
| **Total** | **~R860/mo** |

## Recommended Stack (Established)

| Tool | Monthly (ZAR) |
|------|--------------|
| Claude Pro/Max | R360-R3,600 |
| Cursor Pro | R360 |
| GitHub Pro | R140 |
| Vercel Pro | R360 |
| Cloudflare (Free) | R0 |
| Figma Professional | R270 |
| Midjourney Pro | R1,080 |
| Recraft AI | R450 |
| v0 Premium | R360 |
| Notion Business | R320 |
| Loom Business | R225 |
| Content Snare | R520 |
| UptimeRobot Pro | R125 |
| Bitwarden Business | R108 |
| Ahrefs Starter | R520 |
| **Total** | **~R4,800-R8,000/mo** |

**Break-even:** 1 basic website project per month covers all tool costs.

---

# APPENDIX D: LEGAL TEMPLATES CHECKLIST (SOUTH AFRICA)

For every client website, ensure:

| # | Item | Law | Status |
|---|------|-----|--------|
| 1 | Privacy Policy page | POPIA Section 18 | [ ] |
| 2 | PAIA Manual page | PAIA | [ ] |
| 3 | Cookie consent manager (opt-in) | POPIA | [ ] |
| 4 | Terms and Conditions page | CPA / ECT Act | [ ] |
| 5 | SSL/HTTPS active | POPIA Condition 7 | [ ] |
| 6 | Consent checkboxes on forms (unticked) | POPIA Condition 2 | [ ] |
| 7 | Business contact details in footer | ECT Act Section 43 | [ ] |
| 8 | Company registration number displayed | ECT Act Section 43 | [ ] |
| 9 | Physical address (not PO Box) | ECT Act Section 43 | [ ] |
| 10 | Returns/refund policy (e-commerce) | CPA | [ ] |

**Penalties for non-compliance:**
- POPIA: Up to R10 million fine or 10 years imprisonment
- ECT Act: Fines and potential business restrictions
- CPA: Consumer complaints, reputational damage

---

# APPENDIX E: EMERGENCY PROCEDURES

## Site Down

1. Check UptimeRobot — confirm the outage
2. Check hosting provider status page (Vercel status, Cloudflare status)
3. If hosting issue: wait for provider resolution, notify client
4. If code issue: revert to last known good deployment
   - Vercel: Instantly rollback via dashboard (Deployments > ... > Promote to Production)
   - Cloudflare Pages: Rollback via dashboard
5. If DNS issue: Check Cloudflare DNS records, verify nameservers
6. Notify client within 1 hour with status update

## Security Breach

1. Immediately take the site offline or into maintenance mode
2. Change all passwords (hosting, CMS, database, API keys)
3. Review access logs for the breach vector
4. Patch the vulnerability
5. Restore from last clean backup if data was compromised
6. Notify the Information Regulator and affected data subjects (POPIA Section 22 requirement)
7. Document the incident and response
8. Implement additional security measures to prevent recurrence

## Client Emergency Contact

- **P1 (site down):** Respond within 1 hour (business hours), 4 hours (after hours)
- **P2 (major bug):** Respond within 4 business hours
- **P3 (minor issue):** Respond within 1 business day
- **P4 (request/enhancement):** Respond within 2 business days

---

*This workflow is a living document. Update it as tools, prices, and best practices evolve.*
*Next review date: April 2026*
