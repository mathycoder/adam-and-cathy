import { EventReveal } from "@/components/story/EventReveal";
import { StoryFinale } from "@/components/story/StoryFinale";
import { StoryHero } from "@/components/story/StoryHero";
import { WindingPath } from "@/components/story/WindingPath";
import { chapters } from "@/data/story";

export default function Home() {
  return (
    <main className="overflow-clip bg-cream [--trail-highlight:#d7dfbd] [--trail-surface:#afc99b]">
      <StoryHero />

      {chapters.map((chapter, index) => (
        <div key={chapter.title}>
          <WindingPath index={index} approach={chapter.approach} />
          <EventReveal chapter={chapter} index={index} />
        </div>
      ))}

      <WindingPath index={chapters.length} />
      <StoryFinale />
    </main>
  );
}
