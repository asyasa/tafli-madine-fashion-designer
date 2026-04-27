# Tafli Madine — Fashion Designer

A cinematic, editorial, AWWWARDS-inspired landing-page experience for couture
designer **Tafli Madine**. Built with **Vite + vanilla JS + SCSS + GSAP** —
not a template and not a framework-heavy stack — so every pixel is intentional.

> Translating concepts into couture.

## Stack

| Layer         | Choice                                                         |
| ------------- | -------------------------------------------------------------- |
| Build tool    | [Vite](https://vitejs.dev) 8                                   |
| Styling       | Custom **SCSS** (BEM-ish, modular partials, `@use` modules)    |
| Animation     | [GSAP](https://gsap.com) 3.13+ — ScrollTrigger, SplitText, Flip, Draggable, Inertia |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering)                    |
| Iconography   | [Remix Icon](https://remixicon.com) (no emoji)                 |
| Typography    | Cormorant Garamond (serif) + Inter (sans)                      |

No Tailwind. No Bootstrap.

## Commands

```bash
npm install     # install dependencies
npm run dev     # dev server on http://localhost:5173
npm run build   # production build to dist/
npm run preview # preview the production build
```

## Architecture

```
index.html                 -> single-page markup, all 10 sections
public/assets/             -> image & video assets (copied as-is)
  ├─ portfolio/            -> editorial portraits, masonry, styling rail
  ├─ editorial/            -> landscape collection hero images
  ├─ textile/              -> macro textile studies
  ├─ sketches/             -> illustration plates
  └─ video/                -> hero reel
src/
├─ main.js                 -> boot sequence, plugin registration, theme toggling
├─ styles/
│  ├─ main.scss            -> aggregates all partials
│  ├─ _variables.scss      -> palette, type, breakpoints, easing
│  ├─ _base.scss           -> reset + utilities
│  ├─ _preloader.scss
│  ├─ _cursor.scss
│  ├─ _nav.scss
│  ├─ _hero.scss           -> section 01
│  ├─ _about.scss          -> section 02
│  ├─ _experience.scss     -> section 03
│  ├─ _foret.scss          -> section 04 (signature project)
│  ├─ _projects.scss       -> section 05 (masonry + Flip filter)
│  ├─ _styling.scss        -> section 06 (horizontal reel)
│  ├─ _collections.scss    -> section 07 (4 themed collections)
│  ├─ _textile.scss        -> section 08 (macro grid)
│  ├─ _illustration.scss   -> section 09 (sketches + draw-in)
│  └─ _contact.scss        -> section 10
└─ js/
   ├─ preloader.js         -> count-up + masked slide-out
   ├─ smooth.js            -> Lenis + ScrollTrigger.update wiring
   ├─ cursor.js            -> custom cursor with hover labels
   ├─ magnetic.js          -> magnetic buttons
   ├─ splitText.js         -> SplitText wrapper with plain-DOM fallback
   └─ animations/
      ├─ hero.js           -> SplitText title, parallax media, ticker
      ├─ reveal.js         -> generic char/line/element reveals
      ├─ parallax.js       -> depth-stack + image parallax
      ├─ experience.js     -> pinned horizontal scroll timeline
      ├─ foret.js          -> clip-path mask reveal
      ├─ projects.js       -> Flip-powered filter grid
      ├─ styling.js        -> scrub + Draggable reel
      ├─ collections.js    -> themed section transitions
      ├─ illustration.js   -> DrawSVG-like signature + blur reveal
      └─ contact.js        -> word-mask reveal
```

## Color Palette (strict)

| Token         | Hex       | Usage                                     |
| ------------- | --------- | ----------------------------------------- |
| Strawberry    | `#e54b4b` | Primary accent, CTAs, highlights          |
| Tangerine     | `#ffa987` | Soft accent, italic highlights            |
| Seashell      | `#f7ebe8` | Light-mode base, text on dark             |
| Graphite      | `#444140` | Secondary text on light surfaces          |
| Shadow Grey   | `#1e1e24` | Primary dark base                         |

## Section Notes

| #   | Section              | Signature technique                                    |
| --- | -------------------- | ------------------------------------------------------ |
| 01  | Hero                 | SplitText char stagger, cinematic video parallax, ticker |
| 02  | About                | Layered image stack with individual depth parallax     |
| 03  | Experience           | ScrollTrigger **pin** + horizontal scrub timeline      |
| 04  | Foret Mystere        | Clip-path mask reveal + scroll scrub                   |
| 05  | Independent Projects | GSAP **Flip** layout transitions on filter change      |
| 06  | Styling              | Scroll scrub + **Draggable/Inertia** reel              |
| 07  | Collections          | Per-section theme color, staggered media entries       |
| 08  | Textile              | Hover-reveal caption + saturation lift                 |
| 09  | Illustration         | SVG stroke draw-in + blur-fade plates                  |
| 10  | Contact              | Word-level mask reveal, gradient-fill cards            |

## Accessibility

- Semantic landmarks (`<header>`, `<main>`, `<section>`, `<footer>`).
- Keyboard-navigable nav, visible focus via browser defaults.
- `@media (hover: none)` disables custom cursor & magnetic effects.
- `prefers-reduced-motion` is not hard-wired yet — planned follow-up.

## Credits

- Imagery: provided by Tafli Madine (PDF portfolio + Instagram archive).
- Typography: Cormorant Garamond & Inter (Google Fonts).
- Icons: Remix Icon.
- Motion: GSAP.
