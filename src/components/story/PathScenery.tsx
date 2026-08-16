import {
  Bone,
  Building2,
  Dog,
  Fence,
  Flower2,
  Gem,
  Heart,
  House,
  Leaf,
  type LucideIcon,
  PawPrint,
  SignpostBig,
  Sparkles,
  TreeDeciduous,
  TreePine,
  Trees,
} from "lucide-react";
import type { GraphicClassNames, GraphicName, PathScene } from "@/data/story";
import { cn } from "@/lib/cn";
import { graphicClassName } from "./graphic-classes";

type StaticPathScene = Exclude<PathScene, "moving">;

const sceneryClassName = "pointer-events-none absolute inset-0 z-2 overflow-hidden text-green-dark";
const clusterClassName =
  "absolute flex items-end gap-[.18rem] drop-shadow-[0_3px_0_rgba(235,224,210,.88)] story:gap-[.35rem]";
const iconClassName =
  "h-auto w-[2.55rem] shrink-0 fill-[rgba(175,201,155,.16)] stroke-[1.45] story:w-[clamp(2.8rem,5vw,5.4rem)]";
const lineLandmarkClassName =
  "h-auto w-[3.1rem] shrink-0 fill-none stroke-current stroke-[2.5] story:w-[clamp(3.5rem,5vw,5.25rem)]";
const wideLandmarkClassName =
  "h-auto w-[6.7rem] shrink-0 fill-[rgba(235,224,210,.38)] stroke-current stroke-[2.5] story:w-[clamp(7rem,12vw,11rem)]";
const labelClassName =
  "rounded-full bg-[rgba(235,224,210,.9)] px-[.45rem] pt-[.18rem] pb-[.25rem] font-script text-base leading-none font-semibold whitespace-nowrap text-green-dark story:text-[clamp(1.05rem,2vw,1.75rem)]";
const sceneryLeafClassName =
  "absolute w-[clamp(1.35rem,2.2vw,2.2rem)] animate-leaf-drift stroke-[1.5] opacity-70 motion-reduce:animate-none";
const pawClassName =
  "absolute w-[1.85rem] animate-paw-hello fill-[rgba(175,201,155,.28)] stroke-[1.45] opacity-[.76] motion-reduce:animate-none story:w-[clamp(1.8rem,3.2vw,3.3rem)]";

function SketchIcon({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return <Icon className={cn(iconClassName, className)} />;
}

function SceneLabel({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={cn(labelClassName, className)}>{children}</span>;
}

function Graphic({
  name,
  position,
  classNames,
  children,
}: {
  name: GraphicName;
  position: string;
  classNames?: GraphicClassNames;
  children: React.ReactNode;
}) {
  return (
    <div data-graphic={name} className={graphicClassName(name, cn(clusterClassName, position), classNames)}>
      {children}
    </div>
  );
}

function EmpireStateBuilding({ className }: { className?: string }) {
  return (
    <svg className={cn(lineLandmarkClassName, className)} viewBox="0 0 72 126">
      <path d="M36 3v18M30 21h12M27 28h18v12h7v78H20V40h7zM12 118h48M27 52h5m8 0h5M27 66h5m8 0h5M27 80h5m8 0h5M27 94h5m8 0h5" />
    </svg>
  );
}

function BrooklynBridge({ className }: { className?: string }) {
  return (
    <svg className={cn(wideLandmarkClassName, className)} viewBox="0 0 180 92">
      <path d="M8 78h164M31 78V28h24v50M125 78V28h24v50M36 28V14h14v14M130 28V14h14v14M43 14h94M8 44c30 0 34-30 47-30 16 0 19 32 35 32s20-32 35-32c13 0 18 30 47 30M8 44v34m164-34v34M58 43h64M70 47v31m20-31v31m20-31v31" />
    </svg>
  );
}

function ParkBench({ className }: { className?: string }) {
  return (
    <svg className={cn(wideLandmarkClassName, className)} viewBox="0 0 132 78">
      <path d="M20 28h92v19H20zM25 19h82v9M31 47l-7 22m77-22 7 22M18 69h96M34 34h12m8 0h12m8 0h12m8 0h12" />
    </svg>
  );
}

function FirstWalkScene({ classNames }: { classNames?: GraphicClassNames }) {
  return (
    <div className={sceneryClassName} aria-hidden="true">
      <Graphic name="opening-skyline" position="top-[4%] left-[1%] rotate-[-2deg] story:top-[3%] story:left-[4%]" classNames={classNames}>
        <SketchIcon icon={Building2} className="w-[2.35rem] story:w-[clamp(2.7rem,4vw,4.2rem)]" />
        <EmpireStateBuilding />
        <SketchIcon icon={Building2} className="w-[2.35rem] story:w-[clamp(2.7rem,4vw,4.2rem)]" />
        <SceneLabel className="absolute top-[calc(100%+.35rem)] left-[.4rem]">New York City</SceneLabel>
      </Graphic>

      <Graphic name="opening-trees-a" position="top-[10%] right-[-3%] origin-bottom animate-scene-sway motion-reduce:animate-none story:top-[7%] story:right-[3%]" classNames={classNames}>
        <SketchIcon icon={TreePine} />
        <SketchIcon icon={TreeDeciduous} />
        <SketchIcon icon={Trees} />
      </Graphic>
      <Graphic name="opening-trees-b" position="top-[30%] left-[-4%] origin-bottom animate-scene-sway [animation-delay:-2s] [animation-duration:6.4s] motion-reduce:animate-none story:top-[29%] story:left-[2%]" classNames={classNames}>
        <SketchIcon icon={Trees} />
        <SketchIcon icon={TreePine} />
      </Graphic>
      <Graphic name="opening-park-sign" position="top-[33%] right-[-2%] rotate-[3deg] items-center story:top-[31%] story:right-[3%]" classNames={classNames}>
        <SketchIcon icon={SignpostBig} />
        <SceneLabel className="-ml-[1.1rem]">Central Park</SceneLabel>
      </Graphic>
      <Graphic name="opening-trees-c" position="top-[49%] right-[-4%] origin-bottom animate-scene-sway [animation-delay:-3.2s] [animation-duration:6s] motion-reduce:animate-none story:top-[48%] story:right-[3%]" classNames={classNames}>
        <SketchIcon icon={TreeDeciduous} />
        <SketchIcon icon={TreePine} />
        <SketchIcon icon={TreeDeciduous} />
      </Graphic>
      <Graphic name="opening-bench" position="top-[62%] left-[-2%] rotate-[-2deg] items-center story:top-[60%] story:left-[3%]" classNames={classNames}>
        <ParkBench />
        <SketchIcon icon={Flower2} className="-ml-[1.1rem] w-[1.8rem] story:w-[clamp(2rem,3vw,3rem)]" />
      </Graphic>
      <Graphic name="opening-trees-d" position="right-[-4%] bottom-[6%] origin-bottom animate-scene-sway [animation-delay:-1.1s] [animation-duration:6.8s] motion-reduce:animate-none story:right-[4%]" classNames={classNames}>
        <SketchIcon icon={TreePine} />
        <SketchIcon icon={Trees} />
        <SketchIcon icon={TreeDeciduous} />
      </Graphic>
      <Leaf
        data-graphic="opening-leaf-a"
        className={graphicClassName("opening-leaf-a", cn(sceneryLeafClassName, "top-[23%] left-[20%] rotate-[18deg]"), classNames)}
      />
      <Leaf
        data-graphic="opening-leaf-b"
        className={graphicClassName("opening-leaf-b", cn(sceneryLeafClassName, "right-[19%] bottom-[30%] scale-[.8] rotate-[-14deg] [animation-delay:-3.6s]"), classNames)}
      />
    </div>
  );
}

function BrooklynScene({ classNames }: { classNames?: GraphicClassNames }) {
  return (
    <div className={sceneryClassName} aria-hidden="true">
      <Graphic name="brownstone-row" position="top-[7%] right-0 rotate-[2deg] story:top-[6%] story:right-[4%]" classNames={classNames}>
        <SketchIcon icon={Building2} />
        <SketchIcon icon={House} className="story:w-[clamp(3.4rem,6vw,6.2rem)]" />
        <SketchIcon icon={Building2} />
        <SceneLabel className="absolute top-[calc(100%+.45rem)] right-[.3rem]">Our first place</SceneLabel>
      </Graphic>
      <Graphic name="brooklyn-bridge" position="top-[31%] left-[-3%] rotate-[-2deg] items-center story:left-[3%]" classNames={classNames}>
        <BrooklynBridge />
        <SceneLabel className="-ml-8">Brooklyn</SceneLabel>
      </Graphic>
      <Graphic name="home-heart" position="top-[58%] right-[3%] rotate-[4deg] items-center story:right-[9%]" classNames={classNames}>
        <SketchIcon icon={House} />
        <SketchIcon icon={Heart} className="-ml-[.8rem] w-[clamp(1.8rem,3vw,3rem)] fill-[rgba(175,201,155,.45)]" />
      </Graphic>
      <Graphic name="neighborhood-trees" position="bottom-[7%] left-[-3%] origin-bottom animate-scene-sway [animation-delay:-2.4s] [animation-duration:6.2s] motion-reduce:animate-none story:left-[4%]" classNames={classNames}>
        <SketchIcon icon={TreeDeciduous} />
        <SketchIcon icon={Fence} className="story:w-[clamp(4rem,7vw,7rem)]" />
        <SketchIcon icon={TreePine} />
      </Graphic>
    </div>
  );
}

function EngagementScene({ classNames }: { classNames?: GraphicClassNames }) {
  return (
    <div className={sceneryClassName} aria-hidden="true">
      <Graphic name="return-skyline" position="top-[6%] right-0 rotate-[2deg] story:top-[5%] story:right-[4%]" classNames={classNames}>
        <SketchIcon icon={Building2} className="w-[2.35rem] story:w-[clamp(2.7rem,4vw,4.2rem)]" />
        <EmpireStateBuilding />
        <SketchIcon icon={Building2} className="w-[2.35rem] story:w-[clamp(2.7rem,4vw,4.2rem)]" />
        <SceneLabel className="absolute top-[calc(100%+.35rem)] right-[.4rem]">Back in New York</SceneLabel>
      </Graphic>
      <Graphic name="return-park-trees" position="top-[29%] left-[-4%] origin-bottom animate-scene-sway [animation-delay:-1.7s] [animation-duration:6s] motion-reduce:animate-none story:left-[3%]" classNames={classNames}>
        <SketchIcon icon={Trees} />
        <SketchIcon icon={TreeDeciduous} />
        <SketchIcon icon={TreePine} />
      </Graphic>
      <Graphic name="return-bench" position="top-[49%] right-[-2%] rotate-[2deg] items-center story:right-[3%]" classNames={classNames}>
        <ParkBench />
        <SketchIcon icon={Flower2} className="-ml-[1.1rem] w-[1.8rem] story:w-[clamp(2rem,3vw,3rem)]" />
      </Graphic>
      <Graphic name="proposal-spark" position="bottom-[15%] left-[2%] rotate-[-4deg] items-center story:bottom-[14%] story:left-[7%]" classNames={classNames}>
        <SketchIcon icon={Sparkles} className="w-[2.2rem] story:w-[clamp(2.4rem,4vw,4.4rem)]" />
        <SketchIcon icon={Gem} className="w-[3.2rem] animate-sparkle-pulse motion-reduce:animate-none story:w-[clamp(3.4rem,5.5vw,5.8rem)]" />
        <SketchIcon icon={Heart} className="-ml-[.8rem] w-[clamp(1.7rem,2.5vw,2.6rem)] fill-[rgba(175,201,155,.45)]" />
        <SceneLabel className="absolute top-[calc(100%+.5rem)] left-[1.2rem]">Right where it began</SceneLabel>
      </Graphic>
      <Leaf
        data-graphic="return-leaf-a"
        className={graphicClassName("return-leaf-a", cn(sceneryLeafClassName, "top-[21%] left-[24%] rotate-[-15deg]"), classNames)}
      />
      <Leaf
        data-graphic="return-leaf-b"
        className={graphicClassName("return-leaf-b", cn(sceneryLeafClassName, "right-[21%] bottom-[32%] scale-[.78] rotate-[22deg] [animation-delay:-3.2s]"), classNames)}
      />
    </div>
  );
}

const charliePaws = [
  ["charlie-paw-1", "top-[7%] left-[73%] rotate-[-12deg]"],
  ["charlie-paw-2", "top-[20%] left-[79%] rotate-[12deg] [animation-delay:-.5s]"],
  ["charlie-paw-3", "top-[36%] left-[61%] rotate-[-18deg] [animation-delay:-1s]"],
  ["charlie-paw-4", "top-[52%] left-[27%] rotate-[16deg] [animation-delay:-1.5s]"],
  ["charlie-paw-5", "top-[68%] left-[34%] rotate-[-10deg] [animation-delay:-2s]"],
  ["charlie-paw-6", "top-[82%] left-[67%] rotate-[14deg] [animation-delay:-2.5s]"],
] as const satisfies ReadonlyArray<readonly [GraphicName, string]>;

function CharlieScene({ classNames }: { classNames?: GraphicClassNames }) {
  return (
    <div className={sceneryClassName} aria-hidden="true">
      <div className="absolute inset-0">
        {charliePaws.map(([name, position]) => (
          <PawPrint key={name} data-graphic={name} className={graphicClassName(name, cn(pawClassName, position), classNames)} />
        ))}
      </div>
      <Graphic name="charlie-teaser" position="right-[1%] bottom-[7%] rotate-[3deg] items-center story:right-[5%] story:bottom-[8%]" classNames={classNames}>
        <SketchIcon icon={Bone} />
        <SketchIcon icon={Dog} className="w-[3.7rem] story:w-[clamp(3.8rem,6.5vw,6.8rem)]" />
        <SketchIcon icon={Heart} className="-ml-[.65rem] w-[clamp(1.6rem,2.5vw,2.6rem)] fill-[rgba(175,201,155,.5)]" />
        <SceneLabel className="absolute top-[calc(100%+.45rem)] right-0">A new best friend…</SceneLabel>
      </Graphic>
    </div>
  );
}

export function PathScenery({ scene, classNames }: { scene: StaticPathScene; classNames?: GraphicClassNames }) {
  if (scene === "first-walk") return <FirstWalkScene classNames={classNames} />;
  if (scene === "brooklyn") return <BrooklynScene classNames={classNames} />;
  if (scene === "engagement") return <EngagementScene classNames={classNames} />;
  return <CharlieScene classNames={classNames} />;
}
