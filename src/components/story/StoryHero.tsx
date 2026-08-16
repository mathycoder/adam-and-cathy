import { MoveDown } from "lucide-react";
import styles from "@/app/page.module.css";

export function StoryHero() {
  return (
    <header className={styles.hero}>
      <p>A love story · 2017—2027</p>
      <h1>
        When Adam<span>Met Cathy</span>
      </h1>
      <p className={styles.openingLine}>
        It started with a walk in the park… <MoveDown aria-hidden="true" />
      </p>
      <svg className={styles.heroPath} viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
        <path d="M500 0 C675 86 316 178 515 270 C635 326 460 360 500 400" />
      </svg>
    </header>
  );
}
