```markdown
# Design System Strategy: The Sacred Monolith

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Sacred Monolith."** 

We are moving away from the "friendly, rounded web" of the last decade and returning to something architectural, permanent, and divine. This system is designed to feel like a digital shrine—an editorial experience where ancient wisdom meets high-end luxury. By utilizing sharp edges (0px border radius), high-contrast typography, and deep tonal layering, we create an atmosphere of reverence and mystery. 

The layout should intentionally break the traditional grid. We favor **intentional asymmetry**: overlapping serif headings on top of ghosted sacred geometry patterns, and generous, "expensive" use of whitespace that forces the user to slow down and breathe.

---

## 2. Colors & Atmospheric Depth
The palette is rooted in the void—a deep, obsidian space where light only exists to highlight what is sacred.

### The "No-Line" Rule
Standard 1px solid borders are strictly prohibited for sectioning. They feel "engineered" and cheap. Instead, define boundaries through background color shifts. A section using `surface-container-low` (#1C1B1B) should sit against the `surface` (#131313) background to create a soft, imperceptible transition.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers of smoked glass and stone. 
- Use `surface-container-lowest` (#0E0E0E) for the most recessed areas (e.g., background textures).
- Use `surface-container-high` (#2A2A2A) for interactive floating elements.
- **Nesting:** When placing a container within a container, the inner element should always move toward a "brighter" or "deeper" tier to signify its importance, never staying on the same hex value.

### Signature Textures & Gradients
Flat colors lack "soul." 
- **CTAs:** Use a subtle linear gradient transitioning from `primary` (#E6C364) to `primary-container` (#C9A84C) at a 45-degree angle.
- **Watermarks:** Sacred geometry patterns should be applied using `outline-variant` (#4D4637) at 5-8% opacity, acting as a structural watermark rather than an image.
- **Particles:** A fine "gold dust" grain should be applied to `surface-bright` areas to simulate aged parchment or stardust.

---

## 3. Typography: Editorial Authority
The contrast between the ancient (Serif) and the modern (Sans-Serif) creates the "Mystical Premium" tension.

- **Display & Headlines (Noto Serif):** Use these for moments of impact. `display-lg` (3.5rem) should be used sparingly, often with negative letter-spacing (-0.02em) to feel like a high-fashion masthead.
- **Body (Manrope):** The body text provides the "clean" counterpoint. Use `body-md` (0.875rem) with increased line-height (1.6) to ensure the dark background doesn't overwhelm the legibility.
- **Labels (Manrope):** For labels and small caps, use `label-md` with 0.1em letter-spacing. This adds an air of "curated technicality."

---

## 4. Elevation & Depth: Tonal Layering
In this system, we do not use "elevation" in the Material Design sense of shadows. We use **Tonal Depth.**

### The Layering Principle
Depth is achieved by "stacking." Place a `surface-container-low` card on a `surface` background to create a soft, natural lift. The lack of rounded corners means the eye relies entirely on these color shifts to find the edges.

### Ambient Shadows
If a "floating" effect is mandatory (e.g., a modal or dropdown), shadows must be extra-diffused. 
- **Blur:** 40px - 60px.
- **Opacity:** 15% - 20%.
- **Color:** Use a tinted version of `surface-container-lowest` rather than pure black. It should feel like a soft glow of "absence" beneath the element.

### The "Ghost Border" Fallback
Where a boundary is required for accessibility, use a **Ghost Border**: 1px width of `outline-variant` (#4D4637) at 20% opacity. This suggests a container without trapping the content inside a rigid box.

### Glassmorphism
For navigation bars or floating action menus, use `surface` (#131313) at 80% opacity with a `20px backdrop-blur`. This allows the sacred geometry patterns and textures to bleed through, integrating the UI into the space.

---

## 5. Components

### Buttons
- **Primary:** Sharp 0px corners. Background: `primary` (#E6C364) gradient. Text: `on-primary` (#3D2E00).
- **Secondary (Ghost):** 1px border of `primary-fixed-dim` at 40% opacity. No fill.
- **Interaction:** On hover, the button should not grow; it should "glow." Use a subtle outer glow (box-shadow) of the `primary` color at 10% opacity.

### Input Fields
- **Design:** Forgo the four-sided box. Use a "Ghost Input"—a 1px bottom border of `outline` (#99907E).
- **Focus State:** The bottom border transitions to `primary` (#E6C364), and a subtle `surface-variant` glow appears behind the text.

### Cards & Lists
- **Rule:** No divider lines between list items. Use 24px - 32px of vertical white space from our spacing scale to separate content.
- **Cards:** Cards are never "white." They are `surface-container-low`. They must have 0px corner radius to maintain the architectural feel.

### Additional Component: The "Divine Marker"
A custom component for this system: A thin vertical gold line (2px width, 40px height) used to prefix `headline-sm` text. It acts as a visual anchor to guide the reader's eye in asymmetrical layouts.

---

## 6. Do's and Don'ts

### Do:
- **Embrace the Dark:** Let 80% of the screen be `surface` or `surface-container-lowest`.
- **Use "Expensive" Spacing:** If you think a section needs more space, double it. Space is a luxury.
- **Mix Type Weights:** Pair a heavy `headline-lg` with a very light, tracked-out `label-sm`.

### Don't:
- **No Rounded Corners:** Never use a border-radius. Every element must be perfectly rectangular (0px).
- **No Generic Icons:** Avoid thin-line "app" icons. Use solid, illustrative, or culturally resonant iconography that matches the weight of the Serif typeface.
- **No Pure White:** Never use #FFFFFF. Use `on-surface` (#E5E2E1) or `primary-fixed` (#FFE08F) for "white" text to maintain the atmospheric warmth.

---

**Director's Final Note:** 
Remember, we aren't building a tool; we are building an experience. Every pixel of this design system should feel like it was placed by a craftsman, not a framework. If it feels too "standard," add more whitespace and check your tonal transitions.```