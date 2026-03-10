# Testing Sanity — Quick Guide

## 1. Sanity Structure

Your blog content lives in **one document type: `post`** (Blog Post).

### Post fields

| Field      | Type   | Description                          |
|-----------|--------|--------------------------------------|
| title     | string | Blog title                           |
| slug      | slug   | URL path (e.g. `meditation`)         |
| excerpt   | text   | Short summary for cards              |
| category  | string | Meditation, Kundalini, etc.          |
| date      | string | e.g. Feb 5, 2026                    |
| readTime  | string | e.g. 12 min read                     |
| icon      | string | Emoji, e.g. 🧘                       |
| gradient  | string | Theme: meditation, third-eye, etc.  |
| heroBg    | string | Hero gradient class                  |
| image     | image  | Cover image (upload in Studio)      |
| body      | array  | Content blocks (headings, paragraphs, quotes, callouts, dividers) |
| related   | array  | Related post links                  |

---

## 2. Start Sanity Studio

1. **Set env vars** in `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

2. **Start the Next.js dev server**:
   ```bash
   npm run dev
   ```

3. **Open Studio** at:
   ```
   http://localhost:3000/studio
   ```

4. **Log in** with your Sanity account (create one at sanity.io if needed).

---

## 3. Create an API Token (for TXT upload)

1. Go to [sanity.io/manage](https://sanity.io/manage) → your project
2. **API** → **Tokens** → **Add API token**
3. Name it (e.g. "TXT Upload")
4. Permissions: **Editor**
5. Copy the token and add to `.env.local`:
   ```
   SANITY_API_TOKEN=sk...
   ```

---

## 4. Test the TXT Upload

1. **Dry run** (parse only, no upload):
   ```bash
   node scripts/upload-blog-from-txt.js content/example-post.txt --dry-run
   ```

2. **Upload** to Sanity:
   ```bash
   npm run upload:blog content/example-post.txt
   ```

3. Open Studio → **Blog Post** → you should see the new post.

---

## 5. Test the Site

1. With Sanity configured and at least one post:
   - Home: `http://localhost:3000` — 3 blogs from Sanity
   - Blogs list: `http://localhost:3000/blogs` — all posts
   - Single post: `http://localhost:3000/blog/meditation` (use your slug)

2. **Images**: Upload cover images in Studio on each post. The site will show them when set.

---

## 6. CORS (for deployed Studio)

If you deploy and use Studio at `https://yoursite.com/studio`, add that URL in:

- Sanity Manage → your project → **API** → **CORS origins**
- Add `https://yoursite.com` with **Allow credentials** enabled.
