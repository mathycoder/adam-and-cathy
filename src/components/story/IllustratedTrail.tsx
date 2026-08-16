import styles from "@/app/page.module.css";

export function IllustratedTrail({ d }: { d: string }) {
  return (
    <>
      <path className={styles.trailOutline} d={d} style={{ strokeLinecap: "butt" }} />
      <path className={styles.trailSurface} d={d} style={{ strokeLinecap: "butt" }} />
      <path className={styles.trailTexture} d={d} />
    </>
  );
}
