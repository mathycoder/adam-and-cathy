import { MoveDown } from "lucide-react";
import { IllustratedTrail } from "./IllustratedTrail";

export function StoryHero() {
  return (
    <header className="relative grid min-h-svh place-content-center justify-items-center px-6 py-16 text-center">
      <p className="text-[.78rem] tracking-[.2em] text-green-dark uppercase">A love story · 2017—2027</p>
      <h1 className="mt-[1.2rem] max-w-[9ch] font-script text-[clamp(4.8rem,13vw,10.5rem)] leading-[.72] font-medium tracking-[-.04em] text-green">
        When Adam
        <span className="mt-[.25em] block translate-x-[.2em] -rotate-2">Met Cathy</span>
      </h1>
      <p className="mt-12 flex -rotate-2 items-center gap-[.7rem] font-script text-[clamp(1.8rem,4vw,2.8rem)] leading-none text-green-dark">
        It started with a walk in the park…
        <MoveDown className="w-[1.2rem] animate-nudge motion-reduce:animate-none" aria-hidden="true" />
      </p>
      <svg className="absolute inset-x-0 bottom-0 h-[15vh] w-full overflow-visible" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
        <IllustratedTrail d="M500 0 L500 400" />
      </svg>
    </header>
  );
}
