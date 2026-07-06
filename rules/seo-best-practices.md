# SEO Best Practices — Petra Public Pages

Petra is a public-facing used oilfield and industrial equipment brokerage site.
Public pages must be built with search visibility, shareability, and fast
first-page rendering in mind from the start.

## Rendering Strategy

- Treat SEO as an early architecture requirement, not a cleanup task after page
  design is complete.
- The current app uses Laravel + Inertia + React. Laravel serving an Inertia
  page is not automatically server-side rendered.
- Public marketing, marketplace, resource, and equipment detail pages should be
  server-side renderable.
- Preferred path for this codebase: use Inertia SSR for public React pages.
- Alternative path, if the client explicitly wants traditional Laravel SSR:
  build public pages in Blade and reserve Inertia/React for app-like areas such
  as dashboards, saved equipment, quotes, documents, messages, and profiles.
- Do not build important public content as client-only content that appears
  only after browser-side data fetching.

## Pages That Need SEO Treatment

Apply these rules to:

- Home
- Equipment Marketplace
- Equipment category pages
- Equipment detail pages
- Sell Equipment
- Request Equipment
- Services
- Industries
- About / Company
- Resources, guides, articles, and market reports
- Success stories and case studies
- Contact

Customer portal pages, authenticated dashboards, saved equipment, quotes,
offers, messages, documents, and profile pages generally should not be indexed.

## Page Metadata

Every indexable page must define:

- Unique `<title>`
- Unique meta description
- Canonical URL
- Open Graph title, description, type, and image
- Twitter card metadata where useful
- Robots policy when the page should not be indexed

Titles and descriptions should be specific to Petra's brokerage work, equipment
type, region, and user intent. Avoid generic titles such as "Services" or
"Equipment".

## URL Structure

Prefer clean, descriptive URLs:

- `/equipment`
- `/equipment/compressors`
- `/equipment/separators`
- `/equipment/{category}/{slug}`
- `/sell-equipment`
- `/request-equipment`
- `/services/equipment-brokerage`
- `/industries/oil-and-gas-production`
- `/resources/{slug}`

Avoid query-string-only pages for indexable category or detail content. Filters
can use query strings, but the core category page should have a stable URL.

## Equipment Listings

Marketplace and detail pages should expose useful content in the initial HTML:

- Equipment name
- Category
- Location or service region
- Condition
- Availability status
- Manufacturer, model, year, capacity, or relevant specs when available
- Short field-use description
- Clear inquiry CTA

Do not rely on a modal, hidden tab, or client-side interaction as the only place
where critical listing information appears.

## Structured Data

Add JSON-LD where it matches the page:

- `Organization` for Petra company information
- `WebSite` for the site root
- `BreadcrumbList` for nested pages
- `Product` or a more appropriate schema type for equipment detail pages when
  enough product-like data exists
- `Article` for resource posts, guides, and market reports
- `FAQPage` only when the page contains real visible FAQ content

Structured data must match visible page content. Do not add fake ratings,
reviews, prices, or availability claims that are not shown or verified.

## Content Rules

- Write for operators, buyers, sellers, and field teams, not generic marketing.
- Keep Petra's tone direct, practical, and brokerage-focused.
- Important page copy should be real text in the document, not embedded only in
  images.
- Use one clear `<h1>` per page.
- Use headings to describe actual page sections and search intent.
- Include regional relevance where natural: Wyoming, Rockies, Powder River,
  Bakken, North Dakota, Colorado, Utah, New Mexico, Montana, and surrounding
  producing regions.
- Avoid keyword stuffing.

## Images And Media

- Use descriptive `alt` text for meaningful equipment and page images.
- Decorative images may use empty alt text.
- Compress large images and provide stable dimensions to avoid layout shift.
- Lazy-load below-the-fold images.
- Do not make critical equipment specs visible only inside images or PDFs.
- Open Graph images should be valid, accessible, and representative of the page.

## Technical SEO

The app should provide:

- XML sitemap for public pages
- Valid `robots.txt`
- Canonical URLs
- 404 handling for missing equipment or resource pages
- Redirects for renamed or removed public URLs
- Fast first contentful paint
- Mobile-friendly layout
- Accessible semantic HTML

For marketplace inventory, remove or `noindex` pages that should not appear in
search, such as expired private listings or internal-only assets.

## Inertia Implementation Notes

- Use Inertia `<Head>` or the established project metadata helper for page
  title and meta tags.
- Metadata should come from server props when content is dynamic.
- Equipment detail routes should return enough server data for SSR to render the
  meaningful page content immediately.
- Shared layout components should not hard-code page-specific titles or
  descriptions.
- Keep navigation links as real links to crawlable routes.

## Pre-Launch SEO Checklist

Before launching a public page, verify:

- Page renders meaningful HTML with SSR enabled.
- Title and meta description are unique.
- Canonical URL is correct.
- Open Graph metadata is present.
- Main content is visible without client-only fetching.
- Images have correct alt text and dimensions.
- Page has one clear H1.
- Route appears in the sitemap if it should be indexed.
- Route is excluded or `noindex` if it should not be indexed.
- Mobile layout has no overlapping text or hidden primary content.
