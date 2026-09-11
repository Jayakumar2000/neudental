# Blog Content Guide

How to publish, edit, and create blog posts directly on GitHub — no local
setup and no code assistant needed. Five minutes to read, two minutes per post.

## Where blog content lives

Every blog post is one object inside a single array, in one file:

```
src/data.ts  ->  export const BLOGS: BlogPost[] = [ ... ]
```

There is no CMS and no database for blog content — the array in that file
**is** the content. Editing it and pushing to `main` is what publishes,
edits, or removes a post, because Vercel auto-deploys on every push to
`main` (see `README.md`).

## The shape of one post

```ts
{
  id: 'oral-hygiene-after-root-canal',
  title: '5 Simple Habits to Protect Your Smile After a Root Canal',
  excerpt: 'A root canal saves your tooth, but the days right after matter just as much as the procedure itself. Here is what actually helps recovery go smoothly.',
  category: 'Patient Care',
  date: 'August 2026',
  readTime: '4 min read',
  image: '/clinic/Treatment_Room_neudental_clinic.jpeg',
  content: [
    'First paragraph goes here, as a plain string.',
    'Second paragraph goes here, as its own string.',
    'And so on — one array entry per paragraph.',
  ],
},
```

| Field | What it is | Rules |
|---|---|---|
| `id` | The post's **slug** — its permanent internal identifier | See "Slug rules" below. Never change after publishing (see "Editing" below). |
| `title` | Headline shown on the card and the article page | Plain text, no HTML. |
| `excerpt` | Short teaser shown on the blog list card | 1–2 sentences. Gets truncated after 3 lines on the card, so front-load the point. |
| `category` | The small pill/tag shown above the title | Keep it to 1–3 words, Title Case (e.g. `Patient Care`, `Preventive Care`, `Modern Dentistry`). Reuse an existing category where the topic fits, rather than inventing a new one each time. |
| `date` | Shown as the publish date | Free text, but stay consistent with the existing style: `"Month YYYY"` (e.g. `September 2026`). |
| `readTime` | Shown next to the date | Free text, existing style: `"N min read"`. Rule of thumb: ~200 words per minute. |
| `image` | Path to the thumbnail/hero photo | See "Adding an image" below. |
| `content` | The article body | An array of strings. **Each string is one paragraph** — do not put `\n` inside a string to force a line break, add a new array entry instead. |

## Slug rules (the `id` field)

The `id` is the post's slug. Even though the site doesn't currently expose
per-post URLs (see the note at the bottom), keep it slug-clean from day one
so nothing has to be renamed later:

- lowercase letters, numbers, and hyphens only (`a-z`, `0-9`, `-`)
- no spaces, no punctuation, no underscores
- words separated by single hyphens: `why-regular-checkups-matter`
- descriptive of the topic, not the date (`invisible-aligners-vs-braces`, not `post-4`)
- **unique** — check the existing `id` values in `BLOGS` before picking one
- once published, **do not change it** — treat it like a permanent ID, not a
  headline. If the title changes later, the `id` can stay the same.

A quick way to derive one: take the title, lowercase it, replace spaces and
punctuation with hyphens, drop filler words.

> "Why Regular Dental Checkups Matter More Than You Think"
> → `why-regular-dental-checkups-matter`

## Adding an image

1. Pick or take a photo relevant to the post (a clinic photo, a procedure
   photo, anything you have rights to use). Landscape orientation works
   best — cards and the article hero both crop to a 16:9 box.
2. Upload it to the repo under `public/blog/` (create that folder the first
   time you add a file there — see the GitHub steps below). Use a
   descriptive filename, e.g. `public/blog/invisible-aligners-hero.jpg`.
3. Set the post's `image` field to the path starting with `/`, e.g.
   `/blog/invisible-aligners-hero.jpg`.

You can also reuse an existing photo already in `public/clinic/` if one
genuinely fits the topic — list what's there before uploading a duplicate.

## Publishing a new post — step by step (GitHub web UI only)

1. Go to the repository on GitHub: `github.com/Jayakumar2000/neudental`.
2. If you have a new image, upload it first:
   - Navigate into `public/blog/` (or create it: open `public/`, click
     **Add file → Create new file**, type `blog/your-image-name.jpg` as the
     filename — GitHub creates the folder for you — then use **Add file →
     Upload files** afterwards for actual image uploads, since you can't
     upload binary files through "create new file").
   - Simplest path: go to `public/blog/`, click **Add file → Upload
     files**, drag your image in, and commit.
3. Open `src/data.ts` and click the pencil (✏️) icon top-right to edit.
4. Find the closing `];` of the `BLOGS` array and add a new object **just
   above it**, following the exact shape shown above. Copy an existing
   entry as your template and edit each field — it's much harder to make a
   syntax mistake that way than typing one from scratch.
5. Double-check before saving (see "Common mistakes" below).
6. Scroll down to **Commit changes**:
   - Write a short message, e.g. `Add blog post: invisible aligners vs braces`.
   - Choose **Commit directly to the `main` branch**.
7. Commit. Vercel picks up the push automatically and redeploys — the new
   post is live in a couple of minutes. Check the blog list page on the
   live site to confirm it appears and reads correctly.

## Editing an existing post

Same as above, but instead of adding a new object, find the post by its
`id` inside `src/data.ts` and edit whichever fields need to change
(`title`, `excerpt`, `content`, `image`, etc.). Leave the `id` itself alone
unless you're certain nothing depends on it.

## Removing a post

Delete its entire `{ ... },` object from the `BLOGS` array (from the
opening `{` to the matching `},`), then commit directly to `main` as above.

## Common mistakes to check before committing

These are the two or three things that break the build if missed — GitHub's
editor won't catch them for you:

- **Every field except the last one needs a trailing comma.** Look at the
  entry right above where you're pasting — copy its comma pattern exactly.
- **Straight quotes only** (`'` or `"`), never the curly quotes (`’` `“` `”`)
  that come from pasting out of Word, Google Docs, or Notes apps. If your
  text has an apostrophe (e.g. "patient's"), either use a plain `'` and
  make sure the whole string is wrapped in double quotes (`"patient's tooth"`),
  or escape it as `\'` inside single quotes.
- **Matching brackets** — every `{` needs its `}`, every `[` needs its `]`.
  When in doubt, copy a whole existing post object as your starting point
  and edit the text inside it, rather than typing the braces yourself.
- After committing, check the **Vercel dashboard** (or the small deployment
  status check on the GitHub commit) — if the build fails, it's almost
  always one of the three issues above, and the error message will point
  at the line number in `data.ts`.

## Current limitation worth knowing

Blog posts don't yet have their own individual page URLs — the whole blog
section runs on in-app state (clicking a card swaps the view, without
changing the browser URL). That means:

- Individual posts can't be shared as a direct link or indexed by Google as
  separate pages yet — only the main `/` (blog list) content is crawlable
  as-is.
- The `id`/slug is still worth keeping clean now, because adding real
  per-post URLs later (e.g. `/blog/why-regular-checkups-matter`) would
  reuse these same `id` values with zero rework — you'd only need to add
  routing, not touch a single post.

If per-post URLs and SEO for individual articles become a priority, that's
a small follow-up project (adding a router or query-param-based deep
links) — flag it and it can be scoped separately.
