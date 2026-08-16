"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion, type MotionStyle, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { type CSSProperties, useRef, useState } from "react";
import { flushSync } from "react-dom";
import styles from "@/app/page.module.css";
import type { StoryChapter } from "@/data/story";
import { IllustratedTrail } from "./IllustratedTrail";

type EventRevealProps = {
  chapter: StoryChapter;
  index: number;
};

export function EventReveal({ chapter, index }: EventRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [skipReveal, setSkipReveal] = useState(false);
  const hasOpened = useRef(false);
  const hasCompleted = useRef(false);
  const isSkipping = useRef(false);
  const lastSkipDirection = useRef<"up" | "down" | null>(null);
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
  const position = { "--anchor": anchor } as CSSProperties;
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
  const orientationClass = chapter.photo.orientation === "portrait" ? styles.portraitPhoto : styles.landscapePhoto;
  const titleScaleClass = chapter.titleScale === "compact" ? styles.compactTitlePhoto : "";

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const previous = scrollYProgress.getPrevious() ?? current;

    if (current >= 0.7) hasOpened.current = true;
    if (current >= 0.999) hasCompleted.current = true;
    if (isSkipping.current || current === previous) return;

    const section = ref.current;
    if (!section) return;

    const skipTo = (top: number, direction: "up" | "down") => {
      isSkipping.current = true;
      lastSkipDirection.current = direction;

      // Commit the open presentation before changing scroll position. Without
      // this synchronous commit, touch browsers can paint the progress-zero
      // frame for a moment while crossing the sticky boundary.
      if (!skipReveal) flushSync(() => setSkipReveal(true));

      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      const previousScrollSnapType = root.style.scrollSnapType;
      root.style.scrollBehavior = "auto";
      root.style.scrollSnapType = "none";
      window.scrollTo({ top, left: 0, behavior: "auto" });

      requestAnimationFrame(() => {
        root.style.scrollBehavior = previousScrollBehavior;
        root.style.scrollSnapType = previousScrollSnapType;
        isSkipping.current = false;
      });
    };

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const sectionEnd = sectionTop + section.offsetHeight - window.innerHeight;
    const documentEnd = document.documentElement.scrollHeight - window.innerHeight;

    if (current < previous && hasOpened.current && current > 0.001 && lastSkipDirection.current !== "up") {
      hasCompleted.current = true;
      skipTo(Math.max(0, sectionTop - 2), "up");
    } else if (current > previous && hasCompleted.current && skipReveal && previous <= 0.01 && lastSkipDirection.current !== "down") {
      skipTo(Math.min(documentEnd, sectionEnd + 2), "down");
    }
  });

  return (
    <section ref={ref} className={styles.eventSection} style={position} aria-labelledby={`event-${index}`}>
      <div className={styles.eventStage}>
        <svg className={`${styles.eventPath} ${index % 2 ? styles.mirroredEventPath : ""}`} viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <IllustratedTrail d="M240 0 L240 70 C240 140 545 120 525 290 C510 408 322 420 240 500 C126 610 118 720 278 835 C278 865 240 885 240 930 L240 1000" />
        </svg>
        <motion.article
          className={`${styles.photo} ${orientationClass} ${index === 0 ? styles.firstPhoto : ""} ${titleScaleClass}`}
          style={{
            left: skipReveal ? "50%" : photoLeft,
            x: "-50%",
            y: "-50%",
            scale: skipReveal ? 1 : scale,
            rotate: skipReveal ? 0 : rotate,
          }}
        >
          <Image
            className={styles.eventImage}
            src={chapter.photo.src}
            alt={chapter.photo.alt}
            fill
            priority={index === 0}
            sizes={chapter.photo.orientation === "portrait" ? "(max-width: 700px) 88vw, 36rem" : "(max-width: 700px) 92vw, 72rem"}
            style={{ objectPosition: chapter.photo.position }}
          />
          <div className={styles.photoTexture} aria-hidden="true" />
          <motion.div className={styles.scrim} style={{ opacity: skipReveal ? 1 : textOpacity }} />
          <motion.div className={styles.copy} style={skipReveal ? openCopyStyle : copyStyle}>
            <p className={styles.number}>Chapter {String(index + 1).padStart(2, "0")}</p>
            <h2 id={`event-${index}`}>{chapter.title}</h2>
            <p className={styles.date}>{chapter.date}</p>
            <p className={styles.location}>
              <MapPin aria-hidden="true" />
              {chapter.location}
            </p>
            <p className={styles.sentence}>{chapter.sentence}</p>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
}
