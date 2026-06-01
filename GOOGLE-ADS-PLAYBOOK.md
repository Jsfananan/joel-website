# Google Ads Playbook — Fractional AI Officer Test

**Owner:** Joel Salinas
**Business:** jsalinas.org
**Created:** 2026-04-18
**Status:** Ready to launch
**Budget:** $300 one-month test

---

## 1. The Objective

Prove that paid search traffic can be converted into discovery calls for Joel's fractional Chief AI Officer service ($1,750–$3,500/month). This is a signal test. Success is one booked discovery call. Two is outstanding. Zero means iterate the copy or the offer.

**This is not a client-acquisition campaign yet.** It is a funnel validation test.

---

## 2. Budget and Economics

- **Daily budget:** $10
- **Monthly budget:** $300 (±$10 for month length)
- **Expected CPC range:** $8–$15 for the keyword set
- **Expected clicks:** 25–35 over 30 days
- **Expected leads (email or booking):** 2–4 (10–12% LP conversion on warm-intent traffic)
- **Expected discovery calls:** 0–2 (30–40% of leads book)
- **Close rate assumption:** 15–25% on discovery calls
- **One closed $1,750/mo retainer pays back 6 months of ads** — the math works if the funnel converts.

**Kill switch:** If 30 days in with zero booking clicks and zero email signups, pause and diagnose before spending month two.

---

## 3. Landing Page

**Live URL:** https://jsalinas.org/fractional-ai-smb.html

**Key characteristics:**
- No header nav, no breadcrumb, no cross-links (all stripped for cold ad traffic)
- Single primary CTA: Book a Free Discovery Call
- Secondary "See Pricing" anchor link for scanners
- Trust bar under hero: Substack Bestseller · 7,000+ CEOs, execs & founders
- Option 3 (Fractional AI Leadership) highlighted as "The Smart Play"
- Sticky mobile CTA appears after 400px scroll
- Pricing visible on page ($1,750 and $3,500 tiers) — this filters time-wasters before they book

---

## 4. Pre-Launch Checklist

- [ ] Landing page live at `/fractional-ai-smb.html` — verify on desktop + mobile
- [ ] Google Calendar booking page has intake questions (name, email, company, role, size, #1 AI challenge, timeline)
- [ ] Google Ads account created with billing set up
- [ ] Google Ads conversion tracking set up (see Section 6)
- [ ] GA4 connected to Google Ads account for enhanced data
- [ ] Credit card on file confirmed

---

## 5. Campaign Setup — Step by Step

### Account Setup

1. Go to `ads.google.com`
2. Sign in with the Google account tied to jsalinas.org
3. Click "Switch to Expert Mode" (bottom of setup screen) — never use Smart Campaigns for B2B
4. Select "Create an account without a campaign"
5. Confirm billing info

### Campaign Creation

Click Campaigns → + New Campaign

| Setting | Value |
|---------|-------|
| Goal | Leads |
| Campaign type | Search |
| Conversion goal | Discovery Call Booking Click |
| Campaign name | `Fractional AI SMB - Test 1 - April 2026` |
| Networks | Search Network only. **UNCHECK** "Include Google Display Network" and "Include search partners" |
| Locations | United States (People in targeted locations) |
| Languages | English, Spanish |
| Audience segments | Skip for now |
| Budget | $10/day |
| Bidding | Manual CPC with Enhanced CPC. Max CPC: $12 |

### Ad Schedule

Monday through Friday, 7:00 AM to 7:00 PM local time.

No weekends. No overnight. B2B decision-makers book during business hours.

### Device Bid Adjustments

| Device | Adjustment |
|--------|-----------|
| Desktop | +20% |
| Mobile | -30% |
| Tablet | 0% |

B2B consulting decisions happen on desktop.

---

## 6. Conversion Tracking Setup

Before launching the ad, set up two conversion actions.

**Tools & Settings → Goals → Conversions → + New Conversion Action**

### Conversion A: Discovery Call Booking Click (Primary)

| Field | Value |
|-------|-------|
| Source | Website |
| Category | Book appointment |
| Value | $500 (proxy value, can refine later) |
| Count | One per click |
| Click window | 30 days |
| Attribution | Data-driven |
| Trigger | Click on button where URL contains `calendar.google.com` |

### Conversion B: Page Engagement 60 Seconds (Secondary Signal)

| Field | Value |
|-------|-------|
| Source | Website |
| Category | Page view |
| Count | One per session |
| Trigger | Time on page > 60 seconds |

Since bookings complete inside Google Calendar (outside your site), outbound click to the booking page is the best proxy signal available.

---

## 7. Ad Group and Keywords

### Ad Group

**Name:** `Fractional CAIO - Exact`

### Keywords (Exact Match Only)

```
[fractional ai officer]
[fractional caio]
[fractional chief ai officer]
[ai consultant for small business]
[ai strategy consultant small business]
[fractional ai leadership]
```

**Why exact match only:** At $10/day with $10–$15 CPCs, you can't afford broad match bleed. Exact match ensures every click is high-intent. You can add phrase match in month two if volume is too low.

---

## 8. Negative Keywords

Add these as **Phrase Match** negatives at the **campaign level** before launching.

### Jobs and Training

```
"jobs"
"job"
"salary"
"hiring"
"resume"
"career"
"internship"
"certification"
"course"
"training"
"bootcamp"
"degree"
"exam"
"how to become"
```

### Cheap / DIY

```
"free"
"cheap"
"template"
"diy"
"upwork"
"fiverr"
"freelance"
"do it yourself"
```

### Wrong Intent

```
"replace employees"
"automate employees"
"layoffs"
"headcount"
```

### Wrong Scale

```
"enterprise"
"fortune 500"
"fortune 100"
```

Add more as you review Search Terms report in week one.

---

## 9. Ad Creative

### Responsive Search Ad — One Ad to Start

**Final URL:** `https://jsalinas.org/fractional-ai-smb.html`
**Display Path 1:** `fractional-ai`
**Display Path 2:** `smb`

### Headlines (Paste All 15)

1. AI That Amplifies Your Team
2. Fractional AI Officer for SMBs
3. Human-First AI Strategy
4. Not Ready for a $250K AI Hire?
5. AI Leadership Without the Full-Time Cost
6. Fractional CAIO for Small Business
7. The AI Strategist Who Also Builds
8. 90-Day AI Roadmap. Not a Slide Deck
9. Book a Free AI Strategy Call
10. Real AI Leadership From $1,750/mo
11. Trusted by 7,000+ CEOs & Execs
12. Substack Bestseller on AI Leadership
13. Start With AI the Right Way
14. Strategy, Builds, Change Management
15. AI for Mission-Driven Leaders

### Descriptions (All 4)

1. Fractional AI leadership for small and mid-sized businesses. Strategy, hands-on builds, and change management.
2. Human-first AI strategy that amplifies your team. Book a free 20-minute discovery call.
3. MBA-trained. Substack bestseller. Trusted by 7,000+ CEOs, execs, and founders across nonprofit, health, and SaaS.
4. From $1,750 per month. Six-month commitment. Remote and bilingual. See if we're a fit in one free call.

### Pin Strategy

Do not pin any headlines. Let Google rotate to find the best combinations. Pinning limits the algorithm's ability to optimize.

---

## 10. Ad Extensions and Assets

### Sitelinks (Add All 4)

**Sitelink 1: See Pricing**
- Description 1: Transparent pricing. Advisor and Operator tiers.
- Description 2: From $1,750 per month.
- URL: `https://jsalinas.org/fractional-ai-smb.html#pricing`

**Sitelink 2: About Joel**
- Description 1: MBA-trained AI strategist and change leader.
- Description 2: Bilingual. Remote. Substack bestseller.
- URL: `https://jsalinas.org/about.html`

**Sitelink 3: Read the Newsletter**
- Description 1: Leadership in Change. AI leadership weekly.
- Description 2: Read by 7,000+ CEOs, execs, and founders.
- URL: `https://leadershipinchange.com`

**Sitelink 4: FAQ**
- Description 1: How fractional CAIO works, pricing, and scope.
- Description 2: Answers to the most common questions.
- URL: `https://jsalinas.org/fractional-ai-faq.html`

### Callout Extensions

```
Substack Bestseller
Human-First AI Strategy
Remote and Bilingual
Six-Month Commitment
```

### Structured Snippets

- **Header:** Services
- **Values:** AI Strategy, Custom AI Builds, Change Management, Executive Coaching, AI Governance

---

## 11. Pre-Launch Final Review

Before clicking "Publish":

- [ ] Budget confirmed at $10/day (not $100/day — easy typo)
- [ ] Geographic targeting is USA only
- [ ] Networks: Search only, partners and display unchecked
- [ ] Bidding set to Manual CPC with max $12
- [ ] All 6 keywords are exact match bracketed
- [ ] All negative keywords loaded at campaign level
- [ ] Ad schedule Monday–Friday 7am–7pm
- [ ] Device bids set (+20% desktop, -30% mobile)
- [ ] All 15 headlines and 4 descriptions entered
- [ ] All 4 sitelinks, 4 callouts, 1 structured snippet added
- [ ] Conversion action "Discovery Call Booking Click" is the primary goal
- [ ] Landing page renders on mobile and desktop
- [ ] Google Calendar intake questions in place

---

## 12. Daily Monitoring — Week 1

**Time required:** 2 minutes per day.

### Every Day

1. Open Google Ads → Campaigns
2. Click the campaign → Search Terms report
3. Review every search term that triggered your ad
4. Add any junk terms as negative keywords immediately

Common junk patterns to watch for: terms with "jobs," "what is," "meaning," "reviews," "vs," "examples." Add them as phrase match negatives.

### Day 3

If CPCs are averaging over $20, pause the most expensive keyword and replace with a longer-tail variant. For example, replace `[ai strategy consultant small business]` with `[fractional ai strategy for small business]`.

### Day 7

Check impression volume.

- **More than 500 impressions:** Keywords are good.
- **100–500 impressions:** Acceptable for a test.
- **Less than 100 impressions:** Keywords too narrow. Add phrase match variants of your two best exact-match keywords.

### Day 15 Mid-Check

- Zero booking clicks and zero engagement conversions: ad copy not matching intent. Rewrite the weakest 5 headlines and swap.
- Some booking clicks but no completed bookings: landing page or booking intake issue. Investigate.
- Strong engagement but low booking clicks: CTA copy or page flow issue.

---

## 13. Day 30 Decision Framework

Evaluate these three metrics at day 30:

| Metric | Target | Action if Missed |
|--------|--------|------------------|
| Cost per qualified lead | Under $300 | Narrow keywords, sharpen ad copy |
| Clicks to landing page | 25+ | Expand keywords with phrase match |
| Booking clicks | 2+ | Test new ad angle, check LP flow |

### Three Possible Outcomes

**Outcome A: Good signal (1+ booking click, reasonable CPC).**
Action: Scale budget to $500/month, maintain copy, add 3 phrase-match keywords.

**Outcome B: Partial signal (clicks but no bookings).**
Action: Do not increase budget. Rewrite ads and landing page hero. Run another $300 test.

**Outcome C: No signal (minimal clicks or zero engagement).**
Action: Pause campaign. Investigate whether the offer itself needs refinement before paying for more traffic. Consider testing the offer with your LiC newsletter audience first (free warm traffic).

---

## 14. Scaling Path (If Test Succeeds)

### Month 2: $500/month

- Add 3 phrase match keywords based on winning exact-match terms
- Create a second ad variant with different angle (e.g., "nonprofit AI" vs "SMB AI")
- Add YouTube retargeting for site visitors who did not convert

### Month 3: $1,000/month

- Add a second ad group for nonprofit-specific keywords
- Test Demand Gen campaign with video case studies (re-use Substack Live recordings)
- Enable Smart Bidding (Maximize Conversions) — now have data to support it

### Month 4–6: $2,000–$3,000/month

- Add Performance Max with tight feed controls (only run if you have 30+ conversions to feed the algorithm)
- Layer LinkedIn retargeting from Google Ads audience export
- Test industry-specific landing pages (e.g., `/fractional-ai-nonprofit`)

**One closed fractional retainer at $3,500/mo covers 100% of a $3K/mo ad budget.**

---

## 15. Things to Track Outside Google Ads

The number that actually matters is discovery calls booked. Google Ads will only show you the proxy (clicks to booking page). Track the real funnel manually.

Keep a simple log:

| Date | Source | Name | Role | Company | Outcome |
|------|--------|------|------|---------|---------|
| 2026-04-20 | Google Ads | [name] | CEO | [co] | Booked call 2026-04-23 |

After each call, update: did they convert to a paid client? How long after the call? What was the tipping point? This data tells you whether your ad spend is actually producing revenue, not just clicks.

---

## 16. Common Mistakes to Avoid

1. **Do not turn on Smart Bidding (Maximize Conversions) in month one.** It needs 30+ conversions to work. You will have 2–4.
2. **Do not enable Display Network.** It will eat your budget on irrelevant impressions.
3. **Do not pin headlines until you have 30 days of data.** Let Google find what works.
4. **Do not panic on day 5 if there are zero conversions.** B2B sales cycles are 60–147 days. You are validating the funnel, not closing deals in week one.
5. **Do not amend conversion tracking mid-campaign.** Changes reset the algorithm's learning.
6. **Do not forget to check Search Terms daily for the first two weeks.** One junk query can burn a week of budget.
7. **Do not use broad match "just to see what happens."** You will see what happens: your $300 will evaporate in 4 days on irrelevant clicks.

---

## 17. Quick Reference

**Google Ads Account:** `ads.google.com`
**Landing Page:** `https://jsalinas.org/fractional-ai-smb.html`
**Booking Page:** `https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3PqUgOrCRz9Cj6rn42ZOA8Xxix2HvF7pmmtm2tvYgGCdFgf5_DrZ8r-9IMpjStbE-8OEEK5dYg`
**GA4 Property:** G-VWWDV2L12H (already on landing page)

**Daily time commitment:** 2 minutes (Search Terms review)
**Weekly time commitment:** 15 minutes (optimization + negative keyword cleanup)
**Monthly time commitment:** 30 minutes (full review + decision on scaling)

---

*Last updated: 2026-04-18*
