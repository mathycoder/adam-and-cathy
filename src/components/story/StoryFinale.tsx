import { Heart, PawPrint } from "lucide-react";
import styles from "@/app/page.module.css";

export function StoryFinale() {
  return (
    <footer className={styles.finale}>
      <div aria-hidden="true">
        <PawPrint />
        <Heart />
      </div>
      <p>Ten years and one day later…</p>
      <h2>Our best chapter begins.</h2>
      <a href="#">Return to main site</a>
    </footer>
  );
}
