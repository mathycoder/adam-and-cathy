import { PawPrint } from "lucide-react";
import styles from "@/app/page.module.css";

export function WindingPath({ index }: { index: number }) {
  const mirrored = index % 2 === 1;
  const first = index === 0;
  const path = first
    ? "M500 0 C760 220 900 590 690 940 C490 1260 120 1340 260 1810 C390 2240 900 2250 760 2780 C650 3200 290 3450 240 4000"
    : "M760 0 C930 310 870 670 610 980 C340 1290 110 1430 280 1880 C430 2290 900 2370 750 2820 C620 3220 300 3500 240 4000";

  return (
    <section
      className={`${styles.pathSection} ${first ? styles.firstPathSection : ""}`}
      aria-label={first ? "The journey begins" : "Continue along our story"}
    >
      <svg className={mirrored ? styles.mirroredPath : undefined} viewBox="0 0 1000 4000" preserveAspectRatio="none" aria-hidden="true">
        <path d={path} />
      </svg>
      {index >= 5 && (
        <div className={styles.pathPaws} aria-hidden="true">
          <PawPrint />
          <PawPrint />
          <PawPrint />
        </div>
      )}
    </section>
  );
}
