# jsalinas.org — Project Context

> **Strategic source of truth:** `~/Documents/Claude/judgment-repositioning/JUDGMENT-STRATEGY.md`, plus `~/.claude-rules/canon.md` for every price, URL, and banned phrase. Read both before building or repositioning anything here. Flag conflicts with the strategy instead of executing them.

> ## ⛔ THE FRONT DOOR REBUILD IS LIVE (2026-08-19). This supersedes the 2026-07-20 "flip."
>
> **The site has ONE public offer: a free 30-minute diagnostic call at `/call`.** It is the single CTA on every page. It ends with a written two to three page **Judgment Brief**, which the visitor keeps whether they hire Joel or not.
>
> **RETIRED, and every reference has been removed from the site:** the AI Judgment Workshop ($99), the AI Foundation Workshop ($397), the Strategy Intensive ($750), the 90-Day Judgment Engagement ($4,500/$7,500/$12,500), the per-session coaching menu, the team workshop packages, and Fractional CAIO. All their pages are now 301 stubs pointing at `/call`. **Do not reintroduce any of them.** They were tested and they failed: the $99 workshop sold zero seats across four promotions, the $397 cohort produced three buyers and no pipeline, the $750 Intensive sold zero. One free call produced the entire consulting business.
>
> **NOTHING PRICED APPEARS ANYWHERE PUBLIC.** Builds, engagements, and private org sessions are named and priced on the call. The engagement page shows hour specs and the term, never dollars.
>
> **Behind the call:** a scoped AI build, or **The Judgment Engagement** — two levels, six month term, hours reset monthly and never carry forward. Level One is 2h meetings + 5h async; Level Two is 5h meetings + 10h async. Both include unlimited email, builds excepted.
>
> **Locked until at least December 2026.** This is a test window. Do not change the model before then.

## Tech Stack
- Static HTML/CSS on GitHub Pages. CNAME: jsalinas.org. No build step, edit HTML directly.
- Repo: https://github.com/Jsfananan/joel-website.git · branch `main` · **push to main auto-deploys**

## The scheduler
- Embedded inline on `/call` as `https://calendar.app.google/tQfQz2ioV9CC3rJA7?gv=true`
- **NEVER link a bare `calendar.app.google` or `calendar.google.com` URL as a CTA.** It kills attribution, strips branding and qualification, leaks link equity to google.com, and turns every published CTA into a dead link the day the scheduler changes. One CTA, on Joel's domain, forever. (canon.md §3)
- ⚠ An older long-form `calendar.google.com/appointments/schedules/AcZssZ3...` URL appears in git history. It is superseded.

## The shared page design system (added 2026-08-19)
`css/styles.css` carries a reusable section/type/motion system, prefix `.c-`. Any page opts in with `class="c-page"` on `<body>`. Built on `/call`, now also used by `services/engagement.html`.

- Tokens: `--s1`..`--s6` spacing, `--r-sm`/`--r-md` radius, `--line`, `--ease`, `--shadow-1`/`--shadow-2`/`--shadow-doc`
- Sections: `.c-hero` (navy, compass motif), `.c-thesis` (peach statement), `.c-beats` (numbered spine), `.c-fit` (two-column split), `.c-brief`, `.c-proof`, `.c-book`
- Components: `.c-btn`, `.c-sticky` (mobile CTA bar), `.c-punch` with `<mark>` highlight
- Motion: `.rv` reveal + staggered children; **`prefers-reduced-motion` kills every transform including hovers**
- `--navy-deep: #121D3E` is the footer ground, so the footer separates from navy content sections

**When building a new page, use this system.** The homepage and about page still carry inline `style="..."` attributes, which is why they don't feel consistent. Pull those into classes as you touch them.

## Structure
- `index.html` — homepage. Services section is now two cards: the diagnostic call, and what happens next.
- `call/index.html` — **the conversion page.** Hero CTA, sticky mobile bar, embedded scheduler.
- `services/engagement.html` — the only live page in `services/`. Everything else there is a 301 stub.
- `articles/` — 24 SEO articles, ~68,000 words. All CTAs route to `/call`. This is the acquisition engine.
- `about.html`, `faq.html`, `toolkit/`, `claude-guide/`, `sponsor.html`
- SEO: `sitemap.xml`, `robots.txt`, `llms.txt` (rewritten 2026-08-19 — it feeds AI answer engines, keep it current)

## Positioning
- **One title everywhere: "AI Strategy Coach."** Rotating it is a hard never (GEO entity consistency).
- Hook: **AI is everywhere. Judgment is scarce.**
- The thesis, in Joel's words: *"AI is not the goal. There's no winning by being good enough with AI because AI keeps changing. You have to have a clear goal. Once I understand your goal, then we can see how AI helps you get to that goal better, faster, more efficiently. Winning is getting to your goal, just doing it in a better way."*
- Audience: founders and leaders, whether you run a team or a company of one.
- **Banned:** "tens of thousands," "trusted by 7,000+ CEOs," or any claim implying readers are clients. The public figure is **7,000+ leaders**.
- Sign-off bio: *Joel Salinas is an AI Strategy Coach and entrepreneur. AI is everywhere; judgment is scarce. Joel helps founders and leaders adopt AI without outsourcing their judgment to it, and he builds the systems too. Creator of the AI Leadership Triad.*

## Product naming
Product names contain "Judgment": The Judgment Engagement, the Judgment Brief, the Team Judgment Audit. "Consulting" and "coaching" are category words for SEO and body copy, never product names.

## Current priorities
1. Structural design pass on `index.html`, `about.html`, `faq.html` using the shared system
2. Pull inline styles into classes as pages are touched
3. Real named client testimonials to replace the placeholder results grid
