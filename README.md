# When Adam Met Cathy

A mobile-first, scroll-driven wedding story built with Next.js. Guests follow a winding path through five photographs, from Adam and Cathy's first walk in Central Park to welcoming Charlie, then follow one final stretch to the wedding-day finale.

## Product and design brief

### Purpose

This is a public visual story for Adam and Cathy's wedding guests. It is a playful companion to the main wedding website, not a replacement for it. The experience should tell the complete relationship story in one continuous page and end with a link back to the main site.

The emotional goal is delight: the page should feel personal, warm, romantic, and a little whimsical while remaining easy to understand on a phone. Guests should feel as though they are following a physical path through the couple's memories rather than browsing a conventional timeline.

### Core experience

The path is the page's central metaphor and its primary piece of visual continuity.

1. The story opens with “When Adam Met Cathy” and “It started with a walk in the park.”
2. A substantial green path winds continuously from side to side, inspired by a Candyland board rather than a straight timeline.
3. Each photograph initially rests directly on that path with a white Polaroid-like border, a slight rotation, and no visible event card.
4. When the photograph reaches the viewport, the page pins while scrolling progressively straightens, centers, and enlarges it.
5. The photograph stops just short of filling the viewport so the path remains visible behind it.
6. The event title, date, location, and one-sentence description appear over the open photograph and move gently as the guest continues scrolling.
7. Once open, the photograph remains open and scrolls naturally out of view. It does not shrink back to the path.
8. Revisiting an opened event by scrolling upward must skip its reveal animation without trapping the guest in the pinned section.
9. A full-length final path—with Charlie's paw prints—continues after Charlie and leads to “Ten years and one day later…”

The experience is scroll-linked, not a slideshow. Do not intercept wheel or touch events to simulate scrolling.

### Visual direction

- Mobile first, with an equally intentional desktop composition.
- Warm cream background with a clearly defined, rounded green path.
- A continuous, playful winding shape; avoid abrupt straight vertical sections or jarring joins around photographs.
- Hand-drawn display typography paired with a clean, highly readable sans serif.
- Real, personal photography is the visual focus.
- White instant-photo framing, restrained shadows, subtle texture, and gentle movement.
- Motion should feel delightful and unhurried, never showy or mechanical.
- The photographs determine their presentation: portrait images remain portrait and landscape images remain landscape at every breakpoint.

### Story canon

These are the approved story beats. The typed data in `src/data/story.ts` remains the authoritative source for rendered chapter copy and image settings.

| Order | Moment | Date | Location | Photo orientation |
| --- | --- | --- | --- | --- |
| 1 | The Day We Met | May 7, 2017 | Central Park, New York | Portrait |
| 2 | A Place of Our Own | February 2019 | Brooklyn, New York | Landscape |
| 3 | Atlanta Bound | August 2020 | Atlanta, Georgia | Landscape |
| 4 | She Said Yes | July 2024 | Central Park, New York | Landscape |
| 5 | And Then Came Charlie | March 2025 | Atlanta, Georgia | Portrait |
| Finale | Ten years and one day later | May 8, 2027 | Wedding day | No event photograph |

Charlie first appears in the fifth chapter, then becomes a supporting character through the paw-print motif on the final path. The ten-years-and-one-day line deliberately connects the May 7, 2017 meeting date to the May 8, 2027 wedding date.

### Current non-goals

- No event cards, icon-only milestones, or grid of expanded chapters.
- No navigation menu, progress indicator, countdown, RSVP flow, guest management, audio, or autoplaying media.
- No separate chapter routes; this is one continuous story page.
- No replaying reveal animations on reverse scroll during the same page visit.
- No custom animation technique that excludes common modern browsers or depends on wheel-only input.

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
- Treat desktop and mobile reverse scrolling as required behavior, not an optional enhancement. Programmatic animation skips must be immediate and must not inherit page-level smooth scrolling.

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

Reveals are one-way during a page visit. After a photograph reaches its open state, reversing direction keeps the photograph and text open and crosses that event's pinned range in one immediate jump. The open state is committed before moving the page so mobile browsers do not briefly paint the closed frame. Re-entering the same opened event from above also skips the reveal, so revisiting a chapter does not introduce an inactive pinned interval.

## Deployment

The repository is ready for Vercel. Import the GitHub repository into Vercel and use the detected Next.js defaults; no environment variables are currently required.

## Practice references

This project structure follows the current official guidance rather than treating one folder layout as universally required:

- [Next.js project structure and colocation](https://nextjs.org/docs/app/getting-started/project-structure)
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [React: Thinking in React](https://react.dev/learn/thinking-in-react)
- [React: Choosing the state structure](https://react.dev/learn/choosing-the-state-structure)
