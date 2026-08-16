# When Adam Met Cathy

A mobile-first, scroll-driven wedding story built with Next.js. Guests follow a winding path through six photographs, from Adam and Cathy's first walk in Central Park to their wedding day ten years and one day later.

## Tech stack

- Next.js App Router
- React and TypeScript
- Motion for scroll-linked animation
- `next/image` for responsive image delivery
- Lucide React for supporting icons
- CSS Modules for locally scoped styles

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Before committing a change, run:

```bash
npm run lint
npm run build
```

## Project structure

```text
src/
├── app/
│   ├── layout.tsx          # Site metadata, fonts, and root document
│   ├── page.tsx            # Small Server Component that composes the story
│   └── page.module.css     # Story layout and visual styling
├── components/
│   └── story/
│       ├── EventReveal.tsx # Client-only scroll animation
│       ├── StoryFinale.tsx
│       ├── StoryHero.tsx
│       └── WindingPath.tsx
└── data/
    └── story.ts            # Typed chapter copy and photo configuration
public/
└── images/                 # Original story photographs
```

The route remains a Server Component. Only `EventReveal` declares `"use client"`, because it needs refs and scroll-linked Motion hooks. This keeps the interactive boundary as narrow as possible.

## Development conventions

- Keep route files focused on composition. Reusable or independently understandable UI belongs in `src/components`.
- Keep chapter content in `src/data/story.ts`; do not duplicate story copy or maintain parallel chapter and image arrays.
- Prefer typed props and derived values over duplicating data in React state.
- Add client boundaries only when a component needs browser APIs, event handlers, state, effects, refs, or client-only hooks.
- Give every meaningful photograph descriptive alt text. Decorative paths and icons should remain hidden from assistive technology.
- Preserve the original photograph when it is already a browser-supported JPG, PNG, or WebP. Avoid unnecessary re-encoding and use a new filename when replacing a cached asset.
- Keep animation driven by scroll progress so it works with mouse wheels, trackpads, touch, and keyboard scrolling without wheel-event interception.

## Editing the story

Each entry in `src/data/story.ts` owns its copy and photo presentation:

```ts
{
  title: "The Day We Met",
  date: "May 7, 2017",
  location: "Central Park, New York",
  sentence: "...",
  photo: {
    src: "/images/walk-in-the-park.jpg",
    alt: "...",
    position: "50% 72%",
    orientation: "landscape",
  },
}
```

- `orientation` accepts `"landscape"` (4:3) or `"portrait"` (2:3). It does not change between desktop and mobile.
- `position` maps to CSS `object-position` and controls the focal point when the photograph is cropped.
- Put local files in `public/images` and reference them from the site root, such as `/images/photo.jpg`.

## Scroll choreography

Every event uses the same normalized progress timeline:

| Progress | Behavior |
| --- | --- |
| `0 → 0.533` | The photograph immediately grows, straightens, and moves toward center as the stage pins. |
| `0.533 → 0.7` | The text appears and begins moving while the photograph finishes opening. |
| `0.7 → 1` | The fully open photograph holds only while the text gently completes its movement. |
| After `1` | The sticky stage immediately releases, so the open photograph scrolls naturally out of view and reveals the next path. |

The physical scroll distance is set by `.eventSection` in `page.module.css`. The normalized phase timing lives in `EventReveal.tsx`.
The text travels 64px on larger screens and 32px at the mobile breakpoint while using the same scroll timing.

Reveals are one-way during a page visit. After a photograph reaches its open state, reversing direction keeps the photograph and text open and skips across that event's pinned animation range. Re-entering the same opened event from above also skips the reveal, so revisiting a chapter does not introduce an inactive pinned interval.

## Deployment

The repository is ready for Vercel. Import the GitHub repository into Vercel and use the detected Next.js defaults; no environment variables are currently required.

## Practice references

This project structure follows the current official guidance rather than treating one folder layout as universally required:

- [Next.js project structure and colocation](https://nextjs.org/docs/app/getting-started/project-structure)
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [React: Thinking in React](https://react.dev/learn/thinking-in-react)
- [React: Choosing the state structure](https://react.dev/learn/choosing-the-state-structure)
