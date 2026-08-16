"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion, type MotionStyle, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { StoryChapter } from "@/data/story";
import { cn } from "@/lib/cn";
import { IllustratedTrail } from "./IllustratedTrail";

type EventRevealProps = {
  chapter: StoryChapter;
  index: number;
};

export function EventReveal({ chapter, index }: EventRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [skipReveal, setSkipReveal] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  const hasOpened = useRef(false);
  const hasCommittedOpen = useRef(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const anchor = index % 2 === 0 ? "24%" : "76%";
  const restingRotation = index % 2 === 0 ? -11 : 11;

  // Grow as soon as the stage pins. Once open, the photograph stays open and
  // leaves naturally with the sticky stage instead of reversing back to the path.
  // These normalized points preserve the previous physical scroll distance
  // after shortening the section to end when the text finishes moving.
  const revealRange = [0, 0.7, 1];
  const scale = useTransform(scrollYProgress, revealRange, [0.18, 1, 1]);
  const rotate = useTransform(scrollYProgress, revealRange, [restingRotation, 0, 0]);
  const photoLeft = useTransform(scrollYProgress, revealRange, [anchor, "50%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0.533, 0.733, 1], [0, 1, 1]);
  const textYDesktop = useTransform(scrollYProgress, [0.533, 1], ["64px", "0px"]);
  const textYMobile = useTransform(scrollYProgress, [0.533, 1], ["32px", "0px"]);
  const copyStyle = {
    opacity: textOpacity,
    "--text-y-desktop": textYDesktop,
    "--text-y-mobile": textYMobile,
  } as MotionStyle;
  const openCopyStyle = {
    opacity: 1,
    "--text-y-desktop": "0px",
    "--text-y-mobile": "0px",
  } as MotionStyle;
  const isPortrait = chapter.photo.orientation === "portrait";
  const isLandscape = !isPortrait;
  const isFirst = index === 0;
  const isCompactTitle = chapter.titleScale === "compact";
  const photoClassName = cn(
    "event-photo pointer-events-none absolute top-1/2 z-2 isolate origin-center overflow-hidden rounded-[3px] border-[clamp(7px,1vw,13px)] border-[#fffdf8] bg-[#fffdf8] text-[#fffdf8] shadow-[0_1.5rem_4rem_rgba(37,50,38,.24)] [backface-visibility:hidden]",
    isPortrait ? "aspect-[2/3] w-[min(88vw,58.667svh,36rem)]" : "aspect-[4/3] w-[min(92vw,117.333svh,72rem)]",
  );
  const copyClassName = cn(
    "event-copy absolute inset-x-0 bottom-0 z-1 p-[1.4rem_1rem_1.6rem] [transform:translateY(calc(var(--text-y-mobile)-12px))] story:p-[clamp(2rem,7vw,6rem)] story:[transform:translateY(var(--text-y-desktop))]",
    isLandscape && "p-[.8rem_1rem_1rem] story:p-[clamp(2rem,7vw,6rem)]",
    (isFirst || isCompactTitle) && "story:p-[clamp(2.25rem,4vw,3.5rem)]",
  );
  const titleClassName = cn(
    "max-w-full font-script text-[clamp(2.9rem,13vw,4.25rem)] leading-[.75] font-medium story:max-w-[10ch] story:text-[clamp(4.3rem,10vw,9rem)]",
    isLandscape && "text-[clamp(2.15rem,9.8vw,3rem)] leading-[.8] story:text-[clamp(4.3rem,10vw,9rem)] story:leading-[.75]",
    isFirst && "story:max-w-[8ch] story:text-[clamp(3.8rem,5.2vw,5.4rem)]",
    isCompactTitle && "text-[clamp(2.7rem,12vw,3.9rem)] story:max-w-[8ch] story:text-[clamp(3.25rem,5.5vw,5.4rem)]",
  );
  const metaClassName = cn(
    "text-[clamp(.65rem,1.3vw,.88rem)] tracking-[.19em] uppercase",
    isLandscape && "text-[.56rem] tracking-[.12em] story:text-[clamp(.65rem,1.3vw,.88rem)] story:tracking-[.19em]",
  );

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const previous = scrollYProgress.getPrevious() ?? current;

    if (current >= 0.7) hasOpened.current = true;
    if (hasCommittedOpen.current || current === previous) return;

    const completedReveal = current >= 0.999;
    const reversedAfterOpening = current < previous && hasOpened.current;
    if (!completedReveal && !reversedAfterOpening) return;

    // Commit the open presentation immediately so reverse scrolling never
    // briefly paints the closed frame. The long runway is compacted separately
    // after touch momentum settles instead of interrupting the active gesture.
    hasCommittedOpen.current = true;
    flushSync(() => setSkipReveal(true));
  });

  useEffect(() => {
    if (isCondensed) return;

    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    const compactPassedStage = () => {
      const section = ref.current;
      if (!section || !hasCommittedOpen.current) return;

      const before = section.getBoundingClientRect();
      if (before.bottom > 0) return;

      const scrollBefore = window.scrollY;
      const heightBefore = section.offsetHeight;
      flushSync(() => setIsCondensed(true));

      // Removing an offscreen runway shifts everything below it upward. Move
      // the scroll position by that exact amount in the same settled frame so
      // the currently visible path stays pixel-for-pixel stationary.
      const removedHeight = heightBefore - section.offsetHeight;
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      const previousScrollSnapType = root.style.scrollSnapType;
      root.style.scrollBehavior = "auto";
      root.style.scrollSnapType = "none";
      window.scrollTo({ top: Math.max(0, scrollBefore - removedHeight), left: 0, behavior: "auto" });

      requestAnimationFrame(() => {
        root.style.scrollBehavior = previousScrollBehavior;
        root.style.scrollSnapType = previousScrollSnapType;
      });
    };

    const scheduleCompaction = () => {
      const section = ref.current;
      if (!section || !hasCommittedOpen.current || section.getBoundingClientRect().bottom > 0) return;
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(compactPassedStage, 160);
    };

    const finishCompaction = () => {
      if (settleTimer) clearTimeout(settleTimer);
      compactPassedStage();
    };

    window.addEventListener("scroll", scheduleCompaction, { passive: true });
    window.addEventListener("scrollend", finishCompaction);
    scheduleCompaction();

    return () => {
      if (settleTimer) clearTimeout(settleTimer);
      window.removeEventListener("scroll", scheduleCompaction);
      window.removeEventListener("scrollend", finishCompaction);
    };
  }, [isCondensed, skipReveal]);

  return (
    <section
      ref={ref}
      className={cn("relative bg-cream", isCondensed ? "h-svh" : "h-[352vh]")}
      aria-labelledby={`event-${index}`}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <svg className={cn("absolute inset-0 h-full w-full", index % 2 && "-scale-x-100")} viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <IllustratedTrail d="M240 0 L240 70 C240 140 545 120 525 290 C510 408 322 420 240 500 C126 610 118 720 278 835 C278 865 240 885 240 930 L240 1000" />
        </svg>
        <motion.article
          className={photoClassName}
          style={{
            left: skipReveal ? "50%" : photoLeft,
            x: "-50%",
            y: "-50%",
            scale: skipReveal ? 1 : scale,
            rotate: skipReveal ? 0 : rotate,
          }}
        >
          <Image
            className="z-[-3] object-cover"
            src={chapter.photo.src}
            alt={chapter.photo.alt}
            fill
            priority={index === 0}
            sizes={chapter.photo.orientation === "portrait" ? "(max-width: 700px) 88vw, 36rem" : "(max-width: 700px) 92vw, 72rem"}
            style={{ objectPosition: chapter.photo.position }}
          />
          <div
            className="absolute inset-0 z-[-2] opacity-24 [background:radial-gradient(circle_at_24%_22%,rgba(255,255,255,.42),transparent_25%),radial-gradient(circle_at_78%_68%,rgba(255,255,255,.2),transparent_24%),linear-gradient(140deg,transparent_32%,rgba(24,40,28,.27))]"
            aria-hidden="true"
          />
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(17,27,19,.82),rgba(17,27,19,.02)_70%)]"
            style={{ opacity: skipReveal ? 1 : textOpacity }}
          />
          <motion.div className={copyClassName} style={skipReveal ? openCopyStyle : copyStyle}>
            <p className={cn(metaClassName, isLandscape ? "mb-[.2rem] story:mb-[.6rem]" : "mb-[.6rem]")}>Chapter {String(index + 1).padStart(2, "0")}</p>
            <h2 className={titleClassName} id={`event-${index}`}>{chapter.title}</h2>
            <p className={cn(metaClassName, isLandscape ? "mt-[.45rem] story:mt-[1.8rem]" : "mt-4 story:mt-[1.8rem]")}>{chapter.date}</p>
            <p className={cn(metaClassName, "flex items-center gap-[.45rem] opacity-80", isLandscape ? "mt-1 story:mt-[.7rem]" : "mt-[.45rem] story:mt-[.7rem]")}>
              <MapPin className="size-[.95rem]" aria-hidden="true" />
              {chapter.location}
            </p>
            <p className={cn(
              "mt-[.8rem] max-w-[30rem] text-[.9rem] leading-[1.45] story:mt-[1.35rem] story:max-w-[38rem] story:text-[clamp(1rem,2vw,1.2rem)] story:leading-[1.65]",
              isLandscape && "mt-[.45rem] text-[.78rem] leading-[1.3] story:mt-[1.35rem] story:text-[clamp(1rem,2vw,1.2rem)] story:leading-[1.65]",
            )}>{chapter.sentence}</p>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
}
