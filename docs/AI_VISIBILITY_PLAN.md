# AI visibility, SEO, AEO and GEO: the crawlability fix and what comes next

This is the plain-language record of what was wrong, what was changed to fix it
permanently, what you need to do (very little) when you publish, and the
realistic next steps for getting neudental cited by Google, ChatGPT, Perplexity,
Gemini and Claude.

---

## 1. What the audit found, and why it mattered

The site is a React app. Before this change every URL (`/`, `/blogs`,
`/blogs/root-canal-treatment-does-it-hurt` and the rest) was served the same
nearly empty HTML file:

```html
<div id="root"></div>
<script type="module" src="/assets/index-….js"></script>
```

All the text, headings, links and blog content only appeared after the
browser downloaded and ran about 300 KB of compressed JavaScript (1.1 MB uncompressed).

| Who reads the page | What they got before |
|---|---|
| **AI crawlers** (GPTBot/OAI-SearchBot for ChatGPT, ClaudeBot, PerplexityBot, CCBot, Applebot and others) | **Nothing.** These fetch raw HTML and do not run JavaScript, so there was nothing to read, quote or cite. |
| **Googlebot** | Content only after a delayed second "rendering" pass. Indexing was slower and less reliable. |
| **Bingbot** (which also feeds ChatGPT search and Copilot) | Unreliable JavaScript rendering. |
| **Link previews** (WhatsApp, Facebook, LinkedIn, X) | The homepage title and image for every URL, including blog posts. |

The audit also turned up these issues in the same area:

1. **No crawlable path to the blog.** "Blogs" in the header and footer, and
   every blog card, were `<button>`s, not links. The homepage had no `<a href>`
   to `/blogs` or to any post, so crawlers could only find posts through the sitemap.
2. **Per-page titles, canonicals and blog schema were added by JavaScript.**
   A crawler that doesn't run JavaScript saw the homepage title, description
   and canonical on every blog post. Blog structured data (BlogPosting, FAQ)
   didn't exist without JavaScript.
3. **Fake URLs returned "200 OK".** `/blogs/anything-made-up` served the app,
   which then drew a "not found" screen. Search engines treat that as a soft
   404 and it wastes crawl budget.
4. **The homepage FAQ schema was copied by hand into `index.html`** and had
   already drifted from the page. The schema asked "Is Neudental *Dental
   Clinic* the same as Bludental?" while the page asked "Is Neudental the same
   as Bludental?". It was also served on every URL, including blog posts.
5. **The sitemap was maintained by hand**, a step that is easy to forget for
   every new post.

---

## 2. The options, and why this one

| Option | What it is | Verdict |
|---|---|---|
| Dynamic rendering (prerender.io, Rendertron) | A third-party service serves bots a rendered copy. | ✗ Google calls it a workaround, not a solution. It's a monthly cost and another moving part, and it risks looking like cloaking. |
| Migrate to Next.js / Astro / Remix | Rebuild the site on a framework with server rendering built in. | Good long term for a large site, but weeks of rewriting and real risk to the booking flow, for no extra benefit at today's size. |
| **Build-time prerendering of the existing app** ✅ | `npm run build` renders every page to complete HTML once. Vercel serves those files from its CDN and React takes over in the browser. | **Chosen.** Same code and design, no runtime cost, no new service, and it scales automatically with content. |

When to reconsider a framework migration: hundreds of pages, a CMS with draft
previews, content that changes per visitor or per hour, or a need for
incremental regeneration. None of these applies today.

---

## 3. What was implemented (Phase 1, done)

### Every page is now real HTML

| URL | What a crawler now receives |
|---|---|
| `/` | Full homepage, about 2,400 words: services, doctor, reviews, location, FAQs |
| `/blogs` | Blog index with real links to every post |
| `/blogs/<post>` | Full article, about 2,000 words for the root canal guide, with its own title, description, canonical, Open Graph image and structured data |
| `/blogs/made-up`, `/anything-else` | A real **404** status |
| `/admin` | Unchanged staff console, `noindex` |

### Structured data, generated from the same data as the page

* Sitewide (in `index.html`): `Dentist` (the clinic), `Person` (Dr. Swetha:
  credentials, alma maters) and `WebSite`, linked to each other by stable `@id`s.
* Homepage: `FAQPage`, built from the same `FAQS` list the page shows, so
  it can no longer drift.
* `/blogs`: `CollectionPage` + `Blog` (listing every post) + `BreadcrumbList`.
* Each post: `WebPage` (with `reviewedBy` Dr. Swetha) + `BlogPosting`
  (headline, image, dates, word count, author/publisher = the clinic) +
  `BreadcrumbList` + `FAQPage` when the post has FAQs.

### Files for machines, regenerated on every build

| File | Purpose |
|---|---|
| `/sitemap.xml` | Every indexable page, with `lastmod` from each post's dates. **No longer edited by hand.** |
| `/blogs/rss.xml` | Blog feed, for feed readers and answer engines that watch feeds for new content. |
| `/llms.txt` | A plain-text summary of the clinic (facts, treatments with price ranges, FAQs, links to every article) for LLMs ([llmstxt.org](https://llmstxt.org)). |
| `/llms-full.txt` | The full text of every article as clean Markdown. |
| `/robots.txt` | Explicitly welcomes the AI search crawlers; still blocks `/admin`. |

### Links crawlers can follow

Header, footer, blog cards, "Back to Blog" and the logo are now real
`<a href="…">` links. Clicks still navigate instantly in the app, and
ctrl/cmd-click opens a new tab as people expect.

### Why this is permanent: the build checks itself

`npm run build` (which Vercel runs on every push) now:

1. **Finds pages automatically.** Every post in `BLOGS` becomes a page, and
   the build also follows every internal link on every page, so a new page
   that is linked from anywhere is prerendered without anyone listing it.
2. **Regenerates** the sitemap, RSS feed and `llms.txt` files.
3. **Refuses to deploy a broken site.** The build fails, and Vercel keeps
   the current version live, if any page would ship:
   - with almost no text, no `<h1>`, no title, no description, or a wrong canonical;
   - with part of its content left out of the HTML;
   - with invalid structured data;
   - with a link to a page that doesn't exist;
   - for a blog post with a bad slug, a duplicate slug, a missing image, a
     badly formatted date, or a `related` post that doesn't exist.

   The error message names the post and the problem in plain English.
4. **Warns, without blocking,** about things worth fixing: titles over about 60
   characters, long excerpts, posts with no exact `datePublished`.

You no longer need to check crawlability by hand. If a change would break it,
the deploy fails and the live site stays as it was.

### Side benefits

* **Faster first paint.** Visitors see the page as soon as the HTML arrives,
  instead of after the JavaScript runs. Better Core Web Vitals (LCP) help
  rankings too.
* **Less JavaScript before the page works.** The main bundle fell from 304 KB to
  125 KB compressed (1.1 MB → 424 KB uncompressed). The Firebase SDK now loads
  after the page is visible, and only for the booking form.
* If the booking form's code fails to load on a flaky connection, only the
  form is replaced (with Call and WhatsApp buttons) instead of the whole page
  breaking.

---

## 4. Publishing a new blog post: what you do now

Exactly what `BLOG_GUIDE.md` describes: add the post object to `BLOGS` in
`src/data.ts` and upload its image. **That's all.** The page, sitemap entry,
RSS item, `llms.txt` entry and structured data are produced by the build.
There's no sitemap to edit and nothing to "submit".

To give each post its best chance of being cited:

| Field / habit | Why |
|---|---|
| `datePublished: 'YYYY-MM-DD'` | Answer engines strongly prefer content with a clear date. |
| `dateModified: 'YYYY-MM-DD'` whenever you materially update a post | Freshness. Shows "Updated …" on the page and in the schema. Don't change it for typo fixes. |
| `seoTitle` ≤ 60 characters | Stops Google cutting the title off. |
| `imageAlt` | Image search and accessibility. |
| `reviewedBy: 'Dr. Swetha, BDS, FGDS'` | Medical expertise signal (E-E-A-T). It links to Dr. Swetha's profile in the structured data. |
| Start with `{ type: 'answer', … }`: a 40–60 word direct answer | This is the passage AI Overviews, ChatGPT and Perplexity quote. |
| Question-style `heading`s ("Does a root canal hurt?") | Matches how people ask assistants. |
| `faqs` | Becomes FAQ schema plus visible Q&A, a prime citation format. |
| Specifics: ₹ price ranges, visit counts, recovery days, "Kodungaiyur, Chennai" | Answer engines cite concrete, local facts over generic advice. |
| `related` plus in-text `[links](/blogs/other-post)` | Internal links help crawlers and spread authority. |

---

## 5. One-time checks after this ships (about 30 minutes)

On the **Vercel preview deployment** for this change, before merging:

1. Open `/blogs/root-canal-treatment-does-it-hurt` and use *View Source* (not
   Inspect). The article text should be in the source.
2. `/blogs`, a post, `/admin`, and `/blogs/` (with a trailing slash; it should
   redirect to `/blogs`) all work. `/blogs/not-a-real-post` shows the 404 page.
3. Book a test appointment end to end.

After merging, on the **live site**:

4. **Google Search Console**: Sitemaps → submit `https://www.neudental.in/sitemap.xml`.
   Then use URL Inspection on two blog URLs → "Test live URL" → "View tested
   page" and confirm the article text is there. Request indexing.
5. **Rich Results Test** (search.google.com/test/rich-results) on a blog
   post and the homepage: Article, Breadcrumb, FAQ and LocalBusiness
   should be detected without errors.
6. **Bing Webmaster Tools**: add the site (import from Search Console) and
   submit the sitemap. ChatGPT search and Copilot rely heavily on Bing's index.
7. GA4 → Admin → Channel groups: add an "AI assistants" channel matching
   referrers `chatgpt.com|perplexity.ai|gemini.google.com|copilot.microsoft.com|claude.ai`,
   so AI-driven visits are measured from day one.

---

## 6. Realistic timeline and expectations

| When | What to expect |
|---|---|
| On deploy | Every page is readable by every crawler. |
| 1–4 weeks | Google and Bing recrawl. Blog posts get indexed under their own titles and URLs, and rich results may start appearing. |
| 1–3 months | AI assistants that search the web live (ChatGPT search, Perplexity, Gemini, AI Overviews) can find and quote pages that answer a question well. |
| 3–12 months | Being cited consistently depends on content depth, local authority and off-site signals (sections 7–8), not on the technical fix alone. |

The technical fix is necessary but not sufficient. It removes the barrier;
content and reputation decide who gets cited.

---

## 7. Phase 2: site structure for citations (recommended next, about 2–6 weeks)

These have the biggest effect on AI and search visibility. The new setup
supports each one: a new page type is one entry in `src/lib/routes.ts`, and
it's prerendered, added to the sitemap and protected by the build checks
automatically.

1. **One page per treatment** (`/treatments/root-canal-treatment`,
   `/treatments/dental-implants`, … for the 17 treatments in `TREATMENTS`).
   Today the treatments exist only as cards on the homepage, so there is no
   page that answers "root canal cost in Kodungaiyur" or "dental implants
   near Perambur". Each page should cover what it is, who needs it, the steps,
   duration, the ₹ price range, recovery and FAQs, with `MedicalProcedure`
   and `FAQPage` schema, and link to the related blog posts. **This is the
   single highest-impact addition for GEO.**
2. **A Dr. Swetha profile page** (`/dr-swetha`): qualifications, Tamil Nadu
   Dental Council registration number, experience, procedures performed,
   photo. AI systems weigh named, credentialed medical authors heavily.
3. **"Latest articles" on the homepage**, linking the 3 newest posts. The
   homepage is the strongest page, and right now it links to no individual post.
4. **Fix the inconsistent facts that confuse answer engines.** The morning
   closing time is 2:00 PM in the schema and FAQ but 1:30 PM in the blog
   call-to-action and booking slots. Pick one and use it everywhere,
   including Google Business Profile, Practo and Justdial.
5. **Clear the current build warnings.** Add the exact `datePublished` for
   the three older posts, shorten three titles to ≤ 60 characters, and trim
   one excerpt. The build lists them on every run.
6. Optionally, one **"Dental clinic near Perambur / Kolathur / Madhavaram"**
   section on a location page with real directions and travel times. Avoid
   thin per-area doorway pages, which search engines penalise.

## 8. Phase 3: ongoing signals that earn citations

* **Cadence:** 2 posts a month, each answering one real patient question
  (use what patients actually ask at the front desk and on WhatsApp). Answer
  first, specific, local, reviewed by Dr. Swetha.
* **Refresh:** review the top posts quarterly and update `dateModified` when
  the content changes.
* **Consistent business details everywhere:** identical name, address, phone
  and hours on Google Business Profile, Bing Places, Apple Business Connect,
  Practo, Justdial, Facebook and Instagram. Answer engines cross-check these.
* **Reviews that name treatments** ("my root canal with Dr. Swetha was
  painless") on Google and Practo. Assistants summarise reviews.
* **Mentions elsewhere:** local news, Chennai community pages, dental
  association listings, YouTube videos on the clinic's channel that link to
  the matching blog post. Third-party mentions are a major factor in whether
  assistants recommend a business.

## 9. How to measure progress

| Signal | Where |
|---|---|
| Pages indexed; impressions and clicks per blog URL | Google Search Console, Bing Webmaster Tools |
| AI crawler visits (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot) | Vercel → Logs, filter by user agent |
| Visits from AI assistants | The GA4 "AI assistants" channel (section 5) |
| Citations | Once a month, ask ChatGPT, Perplexity, Gemini and Google (AI Overviews) the same 10 questions ("best dentist in Kodungaiyur", "root canal cost in Chennai", "is RCT painful", …) and record whether neudental is mentioned or linked. |

---

## 10. Technical reference

| Piece | File |
|---|---|
| List of public URLs and route classification | `src/lib/routes.ts` |
| Per-page title, description, canonical, Open Graph, JSON-LD | `src/lib/seo.ts`, `src/lib/schema.ts` |
| Build-time renderer, sitemap, RSS, llms.txt, content checks | `src/entry-server.tsx` |
| Build step that writes the HTML and enforces the checks | `scripts/prerender.mjs` |
| Browser entry (hydrates prerendered HTML) | `src/main-v1.tsx` |
| Hosting (clean URLs, real 404s) | `vercel.json`, `firebase.json` |

Adding a new kind of page (for example treatment pages):

1. Add a `Route` variant and its URL pattern in `classifyRoute()` (`src/lib/routes.ts`).
2. Add its URLs to `prerenderPaths()`, or simply link to them from an existing page.
3. Add its title, description and schema in `getRouteMeta()` (`src/lib/seo.ts`).
4. Render it in `App-v1.tsx` like the blog views.

The build then prerenders it, lists it in the sitemap and checks it on every
deploy. Content that depends on the visitor (today's date, their bookings)
must render only after hydration (see `useHydrated()`), as the booking form
does. Anything the page must say to crawlers has to be in the normal render.
