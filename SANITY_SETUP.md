# Sanity CMS + TXT Content Upload

## 1. Create Sanity Project

1. Go to [sanity.io/manage](https://sanity.io/manage) and create a project
2. Note your **Project ID** (e.g. `abc123xyz`)

## 2. Environment Variables

Add to `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

## 3. Sanity API Token (for upload script)

- Sanity Manage → Your project → API → Tokens
- Create token with **Editor** permissions
- Add to `.env.local`: `SANITY_API_TOKEN=your-write-token`

## 4. Upload Blog from TXT Files

**No AI APIs needed.** Write content in TXT format (or generate with Cursor) and upload to Sanity.

### Format

See `scripts/blog-format.txt` for the full spec. Summary:

```
---
title: Your Post Title
slug: your-slug
excerpt: Short summary for the card.
category: Meditation
date: Feb 5, 2026
readTime: 12 min read
icon: 🧘
heroBg: meditation
---

## Section Heading
Paragraph text here.

> Quote text
> — Author

::callout icon="💡" title="Key Insight"
Important point here.
::end

---
(divider)

## Next Section
...
```

### Upload

```bash
# Single file
node scripts/upload-blog-from-txt.js content/my-post.txt

# All TXT files in a folder
node scripts/upload-blog-from-txt.js --dir content

# Or use npm script
npm run upload:blog -- content/my-post.txt
```

### Images

Upload cover images manually in Sanity Studio after the post is created.

## 5. Rich Text Editor Tips

### Heading styles (H2, H3, H4) apply to whole blocks

Block styles affect the **entire paragraph**, not just selected text. To turn one line into a heading:

1. Put the text on its own line (press **Enter** before and after it).
2. Place the cursor in that block.
3. Apply the heading style from the dropdown.

### Pasting formatted text

Pasting from Word, Google Docs, or websites often produces odd formatting. Options:

- **Plain-text paste**: **Ctrl+Shift+V** (Windows) or **Cmd+Shift+V** (Mac) to paste without formatting, then style manually.
- **Strip first**: Paste into Notepad/TextEdit, copy again, then paste into Sanity.
- **Use TXT upload**: For long posts, write in the TXT format and run `node scripts/upload-blog-from-txt.js content/your-post.txt` for clean structure.

## 6. Data Flow

- **Sanity configured** → Blog data comes from Sanity (home, /blogs, /blog/[slug])
- **Sanity not configured** → Falls back to static `blog-posts.js` and content components
- **TXT upload** → Parses your TXT files and pushes to Sanity
