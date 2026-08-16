"use client";

import {
  Building2,
  House,
  Leaf,
  Package,
  SignpostBig,
  Sprout,
  TreeDeciduous,
  TreePalm,
  Truck,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useSyncExternalStore } from "react";
import type { GraphicClassNames } from "@/data/story";
import { cn } from "@/lib/cn";
import { graphicClassName } from "./graphic-classes";

const subscribeToHydration = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const clusterClassName =
  "absolute flex items-end gap-[.35rem] drop-shadow-[0_3px_0_rgba(235,224,210,.9)] [&_svg]:stroke-[1.45]";
const sceneLabelClassName = "font-script leading-none font-semibold whitespace-nowrap text-green-dark";
const leafClassName =
  "absolute z-3 w-[clamp(1.5rem,2.5vw,2.4rem)] animate-leaf-drift stroke-[1.5] text-green opacity-70 motion-reduce:animate-none";
const truckClassName = "absolute z-4 grid origin-center justify-items-center gap-[.35rem]";
const truckIconClassName =
  "h-auto w-[5.3rem] rounded-[.7rem_.9rem_.65rem_.8rem] border-2 border-current bg-[rgba(235,224,210,.95)] p-[.45rem] text-green-dark shadow-[.25rem_.3rem_0_rgba(63,119,69,.14)] stroke-[1.45] story:w-[clamp(5.4rem,9vw,8.5rem)]";

export function MovingPathScene({ classNames }: { classNames?: GraphicClassNames }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const hasMounted = useSyncExternalStore(subscribeToHydration, getClientSnapshot, getServerSnapshot);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });
  const truckLeft = useTransform(scrollYProgress, [0, 0.24, 0.48, 0.72, 1], ["76%", "61%", "28%", "75%", "24%"]);
  const truckTop = useTransform(scrollYProgress, [0, 0.24, 0.48, 0.72, 1], ["3%", "24%", "48%", "71%", "92%"]);
  const truckRotate = useTransform(scrollYProgress, [0, 0.24, 0.48, 0.72, 1], [-7, 4, -7, 5, -4]);
  const truckOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const movingStyle = prefersReducedMotion
    ? { left: "61%", top: "24%", x: "-50%", y: "-50%", rotate: 4, opacity: 1 }
    : { left: truckLeft, top: truckTop, x: "-50%", y: "-50%", rotate: truckRotate, opacity: truckOpacity };

  return (
    <div ref={sceneRef} className="pointer-events-none absolute inset-0 z-2 text-green-dark" aria-hidden="true">
      <div
        data-graphic="brooklyn-cluster"
        className={graphicClassName(
          "brooklyn-cluster",
          cn(
            clusterClassName,
            "top-[8%] left-[2%] rotate-[-3deg] story:top-[7%] story:left-[5%]",
            "[&_svg]:h-auto [&_svg]:w-12 story:[&_svg]:w-[clamp(3.4rem,6vw,6rem)]",
            "[&>svg:nth-child(2)]:w-[3.8rem] story:[&>svg:nth-child(2)]:w-[clamp(4.2rem,7vw,7rem)]",
          ),
          classNames,
        )}
      >
        <Building2 />
        <House />
        <Building2 />
        <span className={cn(sceneLabelClassName, "absolute top-[calc(100%+.65rem)] left-4 text-[clamp(1.4rem,2.5vw,2.2rem)]")}>Brooklyn</span>
      </div>

      <div
        data-graphic="box-cluster"
        className={graphicClassName(
          "box-cluster",
          cn(
            clusterClassName,
            "top-[29%] right-[2%] rotate-[5deg] items-center story:top-[31%] story:right-[7%]",
            "[&_svg]:h-auto [&_svg]:w-[2.7rem] [&_svg]:fill-[rgba(175,201,155,.3)] story:[&_svg]:w-[clamp(2.9rem,5vw,5rem)]",
            "[&>svg:nth-child(2)]:mb-[2.8rem] [&>svg:nth-child(2)]:rotate-[-9deg]",
            "[&>svg:nth-child(3)]:-ml-[1.7rem] [&>svg:nth-child(3)]:rotate-[8deg]",
          ),
          classNames,
        )}
      >
        <Package />
        <Package />
        <Package />
      </div>

      <div
        data-graphic="southern-trees"
        className={graphicClassName(
          "southern-trees",
          cn(
            clusterClassName,
            "top-[58%] left-0 origin-bottom animate-scene-sway motion-reduce:animate-none story:left-[3%] story:[animation-duration:5.5s]",
            "[&_svg]:h-auto [&_svg]:w-[3.6rem] story:[&_svg]:w-[clamp(4rem,7vw,7.2rem)]",
            "[&>svg:nth-child(2)]:w-[4.5rem] story:[&>svg:nth-child(2)]:w-[clamp(5rem,8vw,8rem)]",
            "story:[&>svg:nth-child(3)]:w-[clamp(2.6rem,4vw,4rem)]",
          ),
          classNames,
        )}
      >
        <TreeDeciduous />
        <TreePalm />
        <Sprout />
      </div>

      <div
        data-graphic="atlanta-sign"
        className={graphicClassName(
          "atlanta-sign",
          cn(
            clusterClassName,
            "right-[1%] bottom-[7%] rotate-[4deg] items-center story:right-[6%]",
            "[&_svg]:h-auto [&_svg]:w-[clamp(5rem,8vw,8rem)]",
          ),
          classNames,
        )}
      >
        <SignpostBig />
        <span className={cn(sceneLabelClassName, "-ml-[3.7rem] rotate-[-2deg] text-[clamp(1.25rem,2.2vw,2rem)]")}>Atlanta</span>
      </div>

      <Leaf
        data-graphic="moving-leaf-a"
        className={graphicClassName("moving-leaf-a", cn(leafClassName, "top-[52%] right-[18%]"), classNames)}
      />
      <Leaf
        data-graphic="moving-leaf-b"
        className={graphicClassName(
          "moving-leaf-b",
          cn(leafClassName, "right-[29%] bottom-[14%] scale-[.72] rotate-[20deg] [animation-delay:-3.4s]"),
          classNames,
        )}
      />

      <div
        data-graphic="moving-truck"
        className={graphicClassName("moving-truck", "absolute inset-0 z-4", classNames)}
      >
        {hasMounted ? (
          <motion.div className={truckClassName} style={movingStyle}>
            <Truck className={truckIconClassName} />
            <span className={cn(sceneLabelClassName, "rounded-full bg-[rgba(235,224,210,.9)] px-[.45rem] pt-[.15rem] pb-[.2rem] text-[clamp(1rem,1.8vw,1.45rem)]")}>NYC → ATL</span>
          </motion.div>
        ) : (
          <div className={truckClassName} style={{ left: "76%", top: "3%", opacity: 0, transform: "translate(-50%, -50%) rotate(-7deg)" }}>
            <Truck className={truckIconClassName} />
            <span className={cn(sceneLabelClassName, "rounded-full bg-[rgba(235,224,210,.9)] px-[.45rem] pt-[.15rem] pb-[.2rem] text-[clamp(1rem,1.8vw,1.45rem)]")}>NYC → ATL</span>
          </div>
        )}
      </div>
    </div>
  );
}
