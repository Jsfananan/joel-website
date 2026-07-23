# jsalinas.org — Project Context

> **Strategic source of truth:** `~/Documents/Claude/judgment-repositioning/JUDGMENT-STRATEGY.md` (and `EXECUTION-TRACKER.md`). Read it before building or repositioning anything here. Flag conflicts with the strategy instead of executing them.
>
> **THE FLIP IS LIVE (2026-07-20).** The site is now **workshop-primary**. The **AI Judgment Workshop** ($99 / $49 Premium / free Executive) is the paid entry point: live, ninety minutes, **every other month**, register at `/services/ai-judgment-workshop.html` (Stripe `book.stripe.com/cNi28k86la0Sfjs9Y4ebu01`). The **waitlist is retired** (modal, `/workshop-waitlist.html`, and FAQ waitlist copy all removed → redirect stubs). The **free discovery call is retired** (`/call` is a workshop CTA now; "book a discovery call" is banned copy). Audience is **"founders and leaders, whether you run a team or a company of one"** (no longer "nonprofit and SMB leaders"). Do NOT reintroduce the waitlist, the free-call funnel, or the narrow audience.

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
- Hook: **AI is everywhere. Judgment is scarce.** Promise: help leaders and founders, whether you run a team or a company of one, adopt AI without outsourcing their judgment to it.
- Two offers: **AI Judgment Workshop** (LIVE, every other month, $99 / $49 Premium / free Executive; register at `/services/ai-judgment-workshop.html` → Stripe → `/services/ai-judgment-workshop-thank-you.html`; the old waitlist popup + `/workshop-waitlist.html` are RETIRED) and the **90-Day Judgment Engagement** (From $4,500, three tiers, max 3 concurrent clients; starts with a $750 Strategy Intensive ($500 members), 90 min + 30 days async access, fully credited; 1-on-1 email inquiry CTA). The workshop is the primary paid entry point; the engagement is the "deeper path." **Strategy Intensive (2026-07-23):** now surfaced on the homepage `#services` section as a sequenced "fast path" ladder rung between Workshop and Engagement (badges: Start here → The fast path → The deeper path), CTA → `/services/engagement.html#start`. This is a LADDER, not a co-equal third door. UNCHANGED locked rules: the Intensive stays out of LiC article bodies, and email/send footers still list exactly two ways to work (Workshop + Engagement). New spec = 90 min 1-on-1 + 30 days async access to review learnings and go back and forth (mirrors the workshop's 30-day tail). See JUDGMENT-STRATEGY.md §3/§5.
- Workshop waitlist backend: Google Apps Script web app → "Workshop Waitlist" Google Sheet + email to Joel. Endpoint lives in `workshop-waitlist.html` and the homepage modal script.
- Shared waitlist form styles live in `css/styles.css` under `.wl-*` (used by the waitlist page, homepage popup, AND the engagement inquiry form).
- **Engagement inquiry form (2026-07-12):** `services/engagement.html` #start section = a real inquiry form (name/email/organization/interest/**message**), NOT a mailto. Reuses `.wl-*` styles + a textarea style in the page's inline `<style>`. Posts (no-cors) to a **dedicated** Inquiries Apps Script — `const INQUIRY_ENDPOINT` in the page script; logs to an "Inquiries" tab in the same Workshop-Waitlist spreadsheet (ID `1KRUIZVEHMr0lhCAkGnsvWJ2VVCRx46hs9DVyyL6FebE`) + emails Joel. Script source saved at `~/Desktop/inquiry-apps-script.gs`. Deployment access MUST be "Anyone" (403 otherwise). To test the endpoint: curl POST delivers even though it returns a 405 "Page Not Found" page (browser-redirect artifact) — confirm via the sheet, not the HTTP code.

## Key Context
- Primary goal (post-flip): **workshop registrations** (the paid entry point) + **premium newsletter signups**. The old discovery-call/free-call funnel is retired.
- Canonical title: **AI Strategy Coach** (per JUDGMENT-STRATEGY.md; "Executive AI Coach"/"Fractional CAIO" retired as titles. This "Key Context" block below is otherwise pre-repositioning and stale — defer to JUDGMENT-STRATEGY.md.)
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
