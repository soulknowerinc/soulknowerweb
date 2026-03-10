export default {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Meditation",
          "Third Eye",
          "Kundalini",
          "Astral Travel",
          "Chakra Healing",
          "Soul Purpose",
          "Mantras",
          "Moon Rituals",
          "Sacred Texts",
          "Spiritual",
        ],
      },
    },
    {
      name: "date",
      title: "Date",
      type: "string",
      description: "e.g. Feb 5, 2026",
    },
    {
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: "e.g. 12 min read",
    },
    {
      name: "gradient",
      title: "Gradient Theme",
      type: "string",
      options: {
        list: ["meditation", "third-eye", "kundalini", "soul"],
      },
    },
    {
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Emoji, e.g. 🧘",
    },
    {
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "heroBg",
      title: "Hero Background",
      type: "string",
      description: "CSS class for hero gradient: meditation, third-eye, kundalini, astral, crystals, mantras, moon, sacred-texts",
      options: {
        list: ["meditation", "third-eye", "kundalini", "astral", "crystals", "mantras", "moon", "sacred-texts"],
      },
    },
    {
      name: "videoLink",
      title: "Related Video",
      type: "string",
      description: "Optional. YouTube URL (e.g. https://www.youtube.com/watch?v=VIDEO_ID). Shown on the blog page when set.",
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      description:
        "Tip: Block styles (H2, H3, H4) apply to the whole paragraph. To make only one line a heading: put it on its own line (press Enter before and after), then apply the heading style to that block. For paste: use Ctrl+Shift+V (Cmd+Shift+V) for plain text, or paste into Notepad first to strip formatting, then paste here.",
      of: [
        {
          type: "block",
          options: { spellCheck: true },
        },
        {
          type: "object",
          name: "quote",
          title: "Quote",
          fields: [
            { name: "text", type: "text", title: "Quote Text" },
            { name: "cite", type: "string", title: "Citation" },
          ],
          preview: {
            select: { text: "text" },
            prepare: ({ text }) => ({ title: text?.slice(0, 50) + "..." }),
          },
        },
        {
          type: "object",
          name: "callout",
          title: "Callout",
          fields: [
            { name: "icon", type: "string", title: "Icon (emoji)" },
            { name: "title", type: "string", title: "Title" },
            { name: "text", type: "text", title: "Text" },
          ],
        },
        {
          type: "object",
          name: "techniqueCard",
          title: "Technique Card",
          fields: [
            { name: "stepNumber", type: "string", title: "Step Number" },
            { name: "title", type: "string", title: "Title" },
            { name: "text", type: "text", title: "Description" },
          ],
        },
        {
          type: "object",
          name: "techniqueGrid",
          title: "Technique Grid",
          fields: [
            {
              name: "cards",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "stepNumber", type: "string", title: "Step" },
                    { name: "title", type: "string", title: "Title" },
                    { name: "text", type: "text", title: "Description" },
                  ],
                },
              ],
            },
          ],
          preview: { prepare: () => ({ title: "Technique Grid" }) },
        },
        {
          type: "object",
          name: "divider",
          title: "Divider",
          fields: [
            {
              name: "style",
              type: "string",
              title: "Style",
              options: {
                list: [
                  { value: "dots", title: "✦ ✦ ✦" },
                  { value: "line", title: "—" },
                ],
              },
              initialValue: "dots",
            },
          ],
          preview: { select: { style: "style" }, prepare: ({ style }) => ({ title: style === "line" ? "—" : "✦ ✦ ✦" }) },
        },
      ],
    },
    {
      name: "related",
      title: "Related Posts",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", type: "string", title: "Icon" },
            { name: "title", type: "string", title: "Title" },
            { name: "desc", type: "string", title: "Description" },
            { name: "href", type: "string", title: "Link" },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({ title, subtitle: slug ? `/blog/${slug}` : "" }),
  },
};
