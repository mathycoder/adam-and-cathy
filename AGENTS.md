## Project instructions

Read the “Product and design brief” and “Scroll choreography” sections in `README.md` before changing the experience. The interaction model is part of the product specification, not incidental animation polish.

### Preserve the experience

- Keep the page sequence: hero, winding path, event photograph, repeating path/event pairs, one full post-Charlie path, then the wedding finale.
- The green path must remain continuous-looking, rounded, substantial, and visibly winding. Do not replace it with a straight timeline.
- Event photographs begin as rotated Polaroid-like objects resting on the path. Do not reintroduce event cards or icon-only milestones.
- A reveal pins immediately, grows with scroll, exposes text, then releases as soon as the text movement finishes. An open photograph leaves the viewport at full size and never shrinks back down.
- Once opened, an event stays open for the page visit. Reverse scrolling must skip its pinned range immediately and must work with touch scrolling on mobile as well as mouse and trackpad input.
- Preserve each photo's configured portrait or landscape orientation at every breakpoint.
- Keep a normal full-length path after Charlie. Charlie's paw prints belong on this final stretch leading to the ten-years-and-one-day finale.
- Respect reduced-motion preferences and keep decorative paths, texture, and icons hidden from assistive technology.

### Source and architecture

- Keep chapter copy, dates, locations, photo paths, focal positions, and orientations in `src/data/story.ts`.
- Keep route files focused on composition and reusable story UI in `src/components/story`.
- Keep client boundaries narrow. `EventReveal` is client-side because it owns scroll-linked state; static story pieces should remain Server Components.
- Use clear TypeScript types and derive presentation from the chapter data rather than maintaining parallel arrays or duplicated state.
- Preserve original browser-supported photographs when possible. Do not re-encode personal photos without a concrete need.
- Do not broadly rewrite the scroll choreography to fix a local timing issue. Preserve the documented phases unless the requested design direction changes.

### Validation

- Run `npm run lint`, `npm run build`, and `git diff --check` after code changes.
- Treat mobile touch scrolling, upward traversal through opened events, image orientation, sticky-stage release timing, and reduced motion as regression-sensitive areas.
- Do not claim interaction behavior was visually or physically tested unless it was actually exercised in a browser or on a device.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
