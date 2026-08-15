"use client";

import { Heart, KeyRound, MapPin, MoveDown, PawPrint, Plane, Sparkles, Trees } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { type CSSProperties, useRef } from "react";
import styles from "./page.module.css";

const chapters = [
  { title: "The Day We Met", date: "May 7, 2017", location: "Central Park, New York", sentence: "One spring day in Central Park started a story neither of us could have imagined.", icon: Trees, tone: "sage" },
  { title: "A Place of Our Own", date: "February 2019", location: "Brooklyn, New York", sentence: "We found our first home together and filled it with the beginnings of a shared life.", icon: KeyRound, tone: "rose" },
  { title: "Atlanta Bound", date: "August 2020", location: "Atlanta, Georgia", sentence: "We packed up our life in New York and headed south for our next adventure.", icon: Plane, tone: "gold" },
  { title: "She Said Yes", date: "July 2024", location: "Central Park, New York", sentence: "Back where our story began, we decided to make forever official.", icon: Heart, tone: "blue" },
  { title: "And Then Came Charlie", date: "March 2025", location: "Atlanta, Georgia", sentence: "Charlie joined the family and quickly became the star of the show.", icon: PawPrint, tone: "peach" },
  { title: "We Tie the Knot", date: "May 8, 2027", location: "Atlanta, Georgia", sentence: "Ten years and one day after we met, we begin our next chapter together.", icon: Sparkles, tone: "green" },
] as const;

type Chapter = (typeof chapters)[number];

function WindingPath({ index }: { index: number }) {
  const mirrored = index % 2 === 1;
  const first = index === 0;
  const path = first
    ? "M500 0 C760 220 900 590 690 940 C490 1260 120 1340 260 1810 C390 2240 900 2250 760 2780 C650 3200 290 3450 240 4000"
    : "M760 0 C930 310 870 670 610 980 C340 1290 110 1430 280 1880 C430 2290 900 2370 750 2820 C620 3220 300 3500 240 4000";

  return (
    <section className={styles.pathSection} aria-label={first ? "The journey begins" : "Continue along our story"}>
      <svg className={mirrored ? styles.mirroredPath : undefined} viewBox="0 0 1000 4000" preserveAspectRatio="none" aria-hidden="true">
        <path d={path} />
      </svg>
      {first && <p className={styles.pathWhisper}>It started with a walk in the park…</p>}
      {index >= 5 && <div className={styles.pathPaws} aria-hidden="true"><PawPrint /><PawPrint /><PawPrint /></div>}
    </section>
  );
}

function EventReveal({ chapter, index }: { chapter: Chapter; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const anchor = index % 2 === 0 ? "24%" : "76%";
  const scale = useTransform(scrollYProgress, [0, 0.14, 0.34, 0.66, 0.86, 1], [0.055, 0.055, 1, 1, 0.055, 0.055]);
  const borderRadius = useTransform(scrollYProgress, [0.1, 0.18, 0.34, 0.66, 0.82, 0.9], ["50%", "50%", "0%", "0%", "50%", "50%"]);
  const photoOpacity = useTransform(scrollYProgress, [0.06, 0.13, 0.84, 0.92], [0, 1, 1, 0]);
  const markerOpacity = useTransform(scrollYProgress, [0.09, 0.17, 0.82, 0.9], [1, 0, 0, 1]);
  const markerScale = useTransform(scrollYProgress, [0, 0.14, 0.2, 0.8, 0.86, 1], [1, 1, 0.72, 0.72, 1, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.31, 0.4, 0.61, 0.7], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.31, 0.43, 0.66], [32, 0, -20]);
  const Icon = chapter.icon;
  const position = { "--anchor": anchor } as CSSProperties;

  return (
    <section ref={ref} className={styles.eventSection} style={position} aria-labelledby={`event-${index}`}>
      <div className={styles.eventStage}>
        <div className={styles.connector} aria-hidden="true" />
        <motion.div className={styles.marker} style={{ opacity: markerOpacity, scale: markerScale }} aria-hidden="true">
          <Icon />
        </motion.div>
        <motion.article className={`${styles.photo} ${styles[chapter.tone]}`} style={{ scale, opacity: photoOpacity, borderRadius }}>
          <div className={styles.photoTexture} aria-hidden="true" />
          <div className={styles.placeholder} aria-hidden="true"><Icon strokeWidth={1.1} /><span>Portrait photo</span></div>
          <div className={styles.scrim} />
          <motion.div className={styles.copy} style={{ opacity: textOpacity, y: textY }}>
            <p className={styles.number}>Chapter {String(index + 1).padStart(2, "0")}</p>
            <h2 id={`event-${index}`}>{chapter.title}</h2>
            <p className={styles.date}>{chapter.date}</p>
            <p className={styles.location}><MapPin aria-hidden="true" />{chapter.location}</p>
            <p className={styles.sentence}>{chapter.sentence}</p>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p>A love story · 2017—2027</p>
        <h1>When Adam<span>Met Cathy</span></h1>
        <div className={styles.scrollCue} aria-hidden="true"><span>Follow the path</span><MoveDown /></div>
      </header>

      {chapters.map((chapter, index) => (
        <div key={chapter.title}>
          <WindingPath index={index} />
          <EventReveal chapter={chapter} index={index} />
        </div>
      ))}

      <footer className={styles.finale}>
        <div aria-hidden="true"><PawPrint /><Heart /></div>
        <p>Ten years and one day later…</p>
        <h2>Our best chapter begins.</h2>
        <a href="#" onClick={(event) => event.preventDefault()}>Return to main site</a>
      </footer>
    </main>
  );
}
