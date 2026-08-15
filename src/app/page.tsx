"use client";

import { Heart, KeyRound, MapPin, MoveRight, PawPrint, Plane, Sparkles, Trees } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
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

function StoryChapter({ chapter, index }: { chapter: Chapter; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0.04, 0.32, 0.68, 0.96], reduceMotion ? [1, 1, 1, 1] : [0.28, 1, 1, 0.28]);
  const radius = useTransform(scrollYProgress, [0.12, 0.35, 0.65, 0.88], reduceMotion ? [24, 24, 24, 24] : [140, 0, 0, 140]);
  const copyOpacity = useTransform(scrollYProgress, [0.2, 0.36, 0.67, 0.82], reduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]);
  const copyY = useTransform(scrollYProgress, [0.25, 0.42, 0.7], reduceMotion ? [0, 0, 0] : [24, 0, -10]);
  const Icon = chapter.icon;

  return (
    <section ref={sectionRef} className={styles.chapter} aria-labelledby={`chapter-${index}`}>
      <div className={styles.stickyFrame}>
        <motion.article className={`${styles.photo} ${styles[chapter.tone]}`} style={{ scale, borderRadius: radius }}>
          <div className={styles.photoTexture} aria-hidden="true" />
          <div className={styles.placeholder} aria-hidden="true"><Icon strokeWidth={1.25} /><span>Portrait photo</span></div>
          <div className={styles.scrim} />
          <motion.div className={styles.chapterCopy} style={{ opacity: copyOpacity, y: copyY }}>
            <span className={styles.chapterNumber}>{String(index + 1).padStart(2, "0")}</span>
            <h2 id={`chapter-${index}`}>{chapter.title}</h2>
            <p className={styles.date}>{chapter.date}</p>
            <p className={styles.location}><MapPin aria-hidden="true" />{chapter.location}</p>
            <p className={styles.sentence}>{chapter.sentence}</p>
          </motion.div>
        </motion.article>
        <div className={`${styles.marker} ${index % 2 ? styles.markerLeft : styles.markerRight}`} aria-hidden="true"><Icon /></div>
        {index >= 4 && <div className={styles.pawTrail} aria-hidden="true"><PawPrint /><PawPrint /><PawPrint /></div>}
      </div>
    </section>
  );
}

function JourneyPath() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 65, damping: 22, restDelta: 0.001 });
  const d = "M500 0 C850 200 870 620 690 900 C470 1230 150 1120 180 1590 C210 2030 830 1850 810 2390 C790 2840 150 2670 190 3240 C225 3710 850 3550 810 4100 C775 4560 150 4400 190 4980 C220 5440 830 5260 800 5820 C775 6280 210 6180 300 6740 C360 7130 720 7110 540 7600";
  return (
    <svg className={styles.journeyPath} viewBox="0 0 1000 7600" preserveAspectRatio="none" aria-hidden="true">
      <path className={styles.pathShadow} d={d} />
      <motion.path className={styles.pathLine} d={d} style={{ pathLength: reduceMotion ? 1 : smoothProgress }} />
    </svg>
  );
}

export default function Home() {
  return (
    <main className={styles.page}>
      <JourneyPath />
      <section className={styles.hero}>
        <div className={styles.heroDoodle} aria-hidden="true"><Heart /></div>
        <p className={styles.eyebrow}>A love story · 2017—2027</p>
        <h1>When Adam<span>Met Cathy</span></h1>
        <p className={styles.heroCopy}>Six moments, two cities, one very good girl, and a lifetime still to come.</p>
        <div className={styles.scrollCue} aria-hidden="true"><span>Follow our story</span><MoveRight /></div>
      </section>
      <div className={styles.story}>{chapters.map((chapter, index) => <StoryChapter key={chapter.title} chapter={chapter} index={index} />)}</div>
      <section className={styles.finale}>
        <div className={styles.finaleIcon} aria-hidden="true"><PawPrint /><Heart /></div>
        <p className={styles.script}>Ten years and one day later…</p>
        <h2>Our best chapter begins.</h2>
        <p>Thank you for being part of our story.</p>
        <a href="#" onClick={(event) => event.preventDefault()}>Return to main site<MoveRight aria-hidden="true" /></a>
      </section>
    </main>
  );
}
