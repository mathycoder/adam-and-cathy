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
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useSyncExternalStore } from "react";
import styles from "@/app/page.module.css";

const subscribeToHydration = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function MovingPathScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const hasMounted = useSyncExternalStore(subscribeToHydration, getClientSnapshot, getServerSnapshot);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });
  const truckLeft = useTransform(scrollYProgress, [0, 0.24, 0.48, 0.72, 1], ["76%", "61%", "28%", "75%", "24%"]);
  const truckTop = useTransform(scrollYProgress, [0, 0.24, 0.48, 0.72, 1], ["3%", "24%", "48%", "71%", "92%"]);
  const truckRotate = useTransform(scrollYProgress, [0, 0.24, 0.48, 0.72, 1], [-7, 4, -7, 5, -4]);
  const truckOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);

  return (
    <div ref={sceneRef} className={styles.movingScene} aria-hidden="true">
      <div className={`${styles.sceneCluster} ${styles.brooklynCluster}`}>
        <Building2 />
        <House />
        <Building2 />
        <span>Brooklyn</span>
      </div>

      <div className={`${styles.sceneCluster} ${styles.boxCluster}`}>
        <Package />
        <Package />
        <Package />
      </div>

      <div className={`${styles.sceneCluster} ${styles.southernTrees}`}>
        <TreeDeciduous />
        <TreePalm />
        <Sprout />
      </div>

      <div className={`${styles.sceneCluster} ${styles.atlantaSign}`}>
        <SignpostBig />
        <span>Atlanta</span>
      </div>

      <Leaf className={`${styles.fallingLeaf} ${styles.firstLeaf}`} />
      <Leaf className={`${styles.fallingLeaf} ${styles.secondLeaf}`} />

      {hasMounted ? (
        <motion.div
          className={styles.movingTruck}
          style={{ left: truckLeft, top: truckTop, x: "-50%", y: "-50%", rotate: truckRotate, opacity: truckOpacity }}
        >
          <Truck />
          <span>NYC → ATL</span>
        </motion.div>
      ) : (
        <div className={styles.movingTruck} style={{ left: "76%", top: "3%", opacity: 0, transform: "translate(-50%, -50%) rotate(-7deg)" }}>
          <Truck />
          <span>NYC → ATL</span>
        </div>
      )}
    </div>
  );
}
