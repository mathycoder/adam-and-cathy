import { PawPrint } from "lucide-react";
import type { StoryApproach } from "@/data/story";
import { cn } from "@/lib/cn";
import { IllustratedTrail } from "./IllustratedTrail";
import { MovingPathScene } from "./MovingPathScene";
import { PathScenery } from "./PathScenery";

type WindingPathProps = {
  index: number;
  approach?: StoryApproach;
};

const finalPawClasses = [
  "top-[6%] left-[22%] rotate-[-14deg]",
  "top-[18%] left-[28%] rotate-[12deg] [animation-delay:-.45s]",
  "top-[33%] left-[61%] rotate-[-16deg] [animation-delay:-.9s]",
  "top-[48%] left-[74%] rotate-[14deg] [animation-delay:-1.35s]",
  "top-[64%] left-[54%] rotate-[-12deg] [animation-delay:-1.8s]",
  "top-[79%] left-[29%] rotate-[15deg] [animation-delay:-2.25s]",
  "top-[91%] left-[69%] rotate-[-10deg] [animation-delay:-2.7s]",
] as const;

export function WindingPath({ index, approach }: WindingPathProps) {
  const mirrored = index % 2 === 1;
  const first = index === 0;
  const scene = approach?.scene;
  const path = first
    ? "M500 0 L500 240 C500 360 900 590 690 940 C490 1260 120 1340 260 1810 C390 2240 900 2250 760 2780 C650 3200 240 3500 240 3760 L240 4000"
    : "M760 0 L760 240 C760 400 870 670 610 980 C340 1290 110 1430 280 1880 C430 2290 900 2370 750 2820 C620 3220 240 3500 240 3760 L240 4000";

  return (
    <section
      className={cn("relative h-[180vh] bg-cream story:h-[200vh]", first && "h-[100vh] story:h-[100vh]")}
      aria-label={first ? "The journey begins" : "Continue along our story"}
    >
      <svg
        className={cn("absolute inset-0 z-1 h-full w-full overflow-visible", mirrored && "-scale-x-100")}
        viewBox="0 0 1000 4000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <IllustratedTrail d={path} />
      </svg>
      {scene === "moving" && <MovingPathScene classNames={approach?.graphicClassNames} />}
      {scene && scene !== "moving" && <PathScenery scene={scene} classNames={approach?.graphicClassNames} />}
      {index >= 5 && (
        <div className="pointer-events-none absolute inset-0 z-3 text-green-dark" aria-hidden="true">
          {finalPawClasses.map((className, pawIndex) => (
            <PawPrint
              key={className}
              data-graphic={`final-paw-${pawIndex + 1}`}
              className={cn(
                "story-graphic absolute w-7 animate-paw-hello fill-[rgba(175,201,155,.32)] stroke-[1.45] opacity-[.76] motion-reduce:animate-none story:w-[clamp(1.8rem,3vw,3.1rem)]",
                `graphic--final-paw-${pawIndex + 1}`,
                className,
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
