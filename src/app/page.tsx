import { EventReveal } from "@/components/story/EventReveal";
import { StoryFinale } from "@/components/story/StoryFinale";
import { StoryHero } from "@/components/story/StoryHero";
import { WindingPath } from "@/components/story/WindingPath";
import { chapters } from "@/data/story";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <StoryHero />

      {chapters.map((chapter, index) => (
        <div key={chapter.title}>
          <WindingPath index={index} />
          <EventReveal chapter={chapter} index={index} />
        </div>
      ))}

      <WindingPath index={chapters.length} />
      <StoryFinale />
    </main>
  );
}
