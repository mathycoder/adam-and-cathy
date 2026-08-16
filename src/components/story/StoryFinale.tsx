import { Heart, PawPrint } from "lucide-react";

export function StoryFinale() {
  return (
    <footer className="flex min-h-[120svh] flex-col items-center justify-center bg-green px-6 py-20 text-center text-cream">
      <div className="mb-8 flex gap-[.6rem]" aria-hidden="true">
        <PawPrint />
        <Heart />
      </div>
      <p className="font-script text-[clamp(2.2rem,6vw,4.5rem)]">Ten years and one day later…</p>
      <h2 className="mt-[.1em] max-w-[9ch] font-script text-[clamp(4.5rem,12vw,10rem)] leading-[.75] font-medium">Our best chapter begins.</h2>
      <a className="mt-12 border-b border-current px-1 py-4 text-[.72rem] tracking-[.18em] uppercase" href="#">
        Return to main site
      </a>
    </footer>
  );
}
