# jsalinas.org — Project Context

## Tech Stack
- Static HTML/CSS site hosted on GitHub Pages
- CNAME: jsalinas.org
- No build step — edit HTML files directly

## Repo
- Remote: https://github.com/Jsfananan/joel-website.git
- Branch: main
- Deploy: Push to main auto-deploys via GitHub Pages

## Structure
- index.html — main landing page
- services/ — 3-door services hub (coaching, workshops, fractional)
- launch/team-workshops.html — time-bound workshop launch offer (50% off first 10 cos)
- articles/ — SEO content cluster + LiC article archive
- toolkit/ — frameworks and tools (most "Coming Soon" as of 2026-05)
- about.html — Joel's bio and positioning
- faq.html — buyer-objection FAQ
- SEO files: sitemap.xml, robots.txt, llms.txt

## Booking link (canonical)
- Joel uses **Google Calendar Appointment Schedules**, not Calendly.
- Canonical public URL: `https://calendar.google.com/appointments/schedules/AcZssZ3PqUgOrCRz9Cj6rn42ZOA8Xxix2HvF7pmmtm2tvYgGCdFgf5_DrZ8r-9IMpjStbE-8OEEK5dYg`
- NEVER use the `/calendar/u/0/appointments/schedules/...` variant — that's an account-scoped admin URL that errors out for non-Joel visitors. This caused a booking dropoff on 2026-05-14 when the services hub redesign introduced it; fixed 2026-05-19.

## Product Naming Rule (NON-NEGOTIABLE)
- **Product names always contain "Judgment."** The offers are the **AI Judgment Workshop**, the **90-Day Judgment Engagement**, and future ones (Audit, Roundtable, etc.) follow the same pattern.
- **Never rename an offer to a generic term** (Consulting, Coaching, Program, Engagement-alone).
- **Category words like "consulting" and "coaching" are descriptors, not names.** They appear only in taglines, body copy, and SEO metadata (title tags, meta descriptions, H2 subheads, FAQ) — the terms buyers actually search ("AI consulting," "executive AI coaching," "AI consultant for nonprofits and small businesses"). They never appear inside a product name.

## Positioning (current, as of 2026-07-10 repositioning)
- Hook: **AI is everywhere. Judgment is scarce.** Promise: help nonprofit and SMB leaders adopt AI without outsourcing their judgment to it.
- Two offers: **AI Judgment Workshop** (one live workshop a month → waitlist popup + `/workshop-waitlist.html`, captures to Google Sheet via Apps Script + email) and the **90-Day Judgment Engagement** (From $4,500, three tiers, max 3 concurrent clients; starts with a $750 Strategy Intensive, 90 min, credited; 1-on-1 email inquiry CTA).
- Workshop waitlist backend: Google Apps Script web app → "Workshop Waitlist" Google Sheet + email to Joel. Endpoint lives in `workshop-waitlist.html` and the homepage modal script.
- Shared waitlist form styles live in `css/styles.css` under `.wl-*` (used by the page and the homepage popup).

## Key Context
- Primary goal: funnel visitors to the Google Calendar discovery-call link
- Canonical title: **Executive AI Coach** (Fractional CAIO retired as Joel's title, kept as a by-invitation-only service)
- 3-door architecture (post-pivot 2026-05-14):
  1. Executive AI Coaching ($300/session, $800 sprint, $2,000 quarter) — most leaders start here
  2. AI Implementation Assessment + Workshop ($7,500 list / $3,750 launch for first 10 cos)
  3. Fractional CAIO — by invitation only, limited availability
- All leads originate from Leadership in Change newsletter
- Brand: Use /jsalinas-brand skill for colors/fonts/tone
- Keep it clean, minimalist, no clutter

## Current Priorities
- Workshop launch live (2026-05-16): driving 50% off offer to first 10 companies
- Open: real named client testimonials (Joel actively requesting from clients) to replace placeholder "Recent Client Wins" grid on services/index.html and reframe Pixar/JPMorgan trust banner on index.html
- Open: GA event tracking on Google Calendar outbound clicks
- Open: Phase 2 polish (mobile sticky CTA on more pages, FAQ chevrons, client logos)
