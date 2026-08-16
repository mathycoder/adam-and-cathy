"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion, type MotionStyle, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { type CSSProperties, useRef, useState } from "react";
import styles from "@/app/page.module.css";
import type { StoryChapter } from "@/data/story";

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

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const previous = scrollYProgress.getPrevious() ?? current;

    if (current >= 0.7) hasOpened.current = true;
    if (current >= 0.999) hasCompleted.current = true;
    if (isSkipping.current || current === previous) return;

    const section = ref.current;
    if (!section) return;

    const skipTo = (top: number) => {
      isSkipping.current = true;
      setSkipReveal(true);

      requestAnimationFrame(() => {
        window.scrollTo(0, top);
        requestAnimationFrame(() => {
          isSkipping.current = false;
        });
      });
    };

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const sectionEnd = sectionTop + section.offsetHeight - window.innerHeight;

    if (current < previous && hasOpened.current && current > 0.001) {
      hasCompleted.current = true;
      skipTo(sectionTop);
    } else if (current > previous && hasCompleted.current && skipReveal && previous <= 0.01) {
      skipTo(sectionEnd);
    }
  });

  return (
    <section ref={ref} className={styles.eventSection} style={position} aria-labelledby={`event-${index}`}>
      <div className={styles.eventStage}>
        <svg className={`${styles.eventPath} ${index % 2 ? styles.mirroredEventPath : ""}`} viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <path d="M240 0 C240 105 545 120 525 290 C510 408 322 420 240 500 C126 610 118 720 278 835 C338 878 248 946 240 1000" />
        </svg>
        <motion.article
          className={`${styles.photo} ${orientationClass}`}
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
