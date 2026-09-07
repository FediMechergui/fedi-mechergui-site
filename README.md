# Fedi Mechergui, software studio site

Single-page marketing site for Fedi Mechergui: software engineer and networks expert in La Marsa, Tunis. Open for projects and online tutoring.

Live copy, links and project data live in `src/data`. Change a fact there and every section updates.

## Stack

- Vite 6, React 19, TypeScript (strict)
- Tailwind CSS v4 with design tokens in `src/styles/tokens.css`
- Motion (`motion/react`) for every animation
- Phosphor icons, simple-icons for monochrome tech marks
- Self-hosted fonts: Archivo Variable (width axis) and JetBrains Mono Variable

## Run it

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Deploy

The site is static. On Vercel, import the repository and keep the defaults (framework: Vite, output: `dist`).

Before the first deploy, set the production URL in `.env`:

```
VITE_SITE_URL=https://your-domain.tld
```

It feeds the canonical link, the Open Graph tags and the JSON-LD in `index.html`.

## Contact form (EmailJS)

The contact section sends through EmailJS from the browser, so there is no server. One form covers both offers: the visitor picks "A project" or "Tutoring", and the choice changes the labels and the email subject.

Setup, once:

1. Sign in at https://dashboard.emailjs.com and connect your Gmail under Email Services. Copy the Service ID.
2. Under Email Templates, create a template. Paste the contents of `docs/emailjs-template.html` into the HTML editor (Design > code view). Set Subject to `New {{need}} request from {{from_name}}`, To Email to your address, and Reply To to `{{reply_to}}`. Copy the Template ID.
3. Under Account > General, copy the Public Key.
4. Put the three values in `.env` (and in Vercel > Settings > Environment Variables for production):

```
VITE_EMAILJS_PUBLIC_KEY=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
```

Template variables the form sends: `need`, `from_name`, `reply_to`, `phone`, `detail`, `message`, `submitted_at`, `page_url`. Until the three keys are set, the form shows the email and WhatsApp fallbacks instead of failing silently.

## Where things are

| What | Where |
|---|---|
| Copy: hero, process, about, tutoring, contact, footer | `src/data/facts.ts` |
| Featured projects and the "More work" lists | `src/data/projects.ts` |
| Services bento | `src/data/services.ts` |
| Stack tabs and logos | `src/data/stack.ts` |
| Colours, radius, fonts | `src/styles/tokens.css`, `src/styles/app.css` |
| Shared light source for every shadow | `src/motion/SunProvider.tsx` |
| The plate with the noon shadow | `src/components/Plate.tsx` |
| Page sections | `src/sections/*.tsx` |
| Screenshots of live projects | `public/work/*.webp` (1440 or 1000 wide, plus `-sm` 800 wide) |
| Portrait | `public/fedi.webp` |
| Share image | `public/og.png` (1200 x 630) |

## Updating a project screenshot

Capture the live site at 1440 x 900 (or 1000 x 1250 for the portrait-format plates), convert to WebP at quality 82, and save it with the same file name plus an 800px-wide `-sm` variant. Update `width`, `height` and `alt` in `src/data/projects.ts` if the ratio changed.

## Screenshot mode

Append `?static` to the URL to render every animation in its final state, and `?theme=light` or `?theme=dark` to pin a theme. Useful for screenshots and for regenerating `public/og.png`.

## Design rules kept in the code

- One accent colour (Sidi Bou Said blue), one shadow (the noon shadow plane, no blur), 6px radius on containers, pills on interactive elements.
- No em-dashes or en-dashes anywhere in copy.
- Only transform and opacity animate. Reduced motion collapses every animation to its final state.
- Real numbers only: 37 public repositories, 28+ projects, 10+ interns mentored.
