import {
  Bone,
  Building2,
  Dog,
  Fence,
  Flower2,
  Gem,
  Heart,
  House,
  Leaf,
  PawPrint,
  SignpostBig,
  Sparkles,
  TreeDeciduous,
  TreePine,
  Trees,
} from "lucide-react";
import styles from "@/app/page.module.css";
import type { PathScene } from "@/data/story";

type StaticPathScene = Exclude<PathScene, "moving">;

function EmpireStateBuilding() {
  return (
    <svg className={styles.lineLandmark} viewBox="0 0 72 126">
      <path d="M36 3v18M30 21h12M27 28h18v12h7v78H20V40h7zM12 118h48M27 52h5m8 0h5M27 66h5m8 0h5M27 80h5m8 0h5M27 94h5m8 0h5" />
    </svg>
  );
}

function BrooklynBridge() {
  return (
    <svg className={styles.wideLandmark} viewBox="0 0 180 92">
      <path d="M8 78h164M31 78V28h24v50M125 78V28h24v50M36 28V14h14v14M130 28V14h14v14M43 14h94M8 44c30 0 34-30 47-30 16 0 19 32 35 32s20-32 35-32c13 0 18 30 47 30M8 44v34m164-34v34M58 43h64M70 47v31m20-31v31m20-31v31" />
    </svg>
  );
}

function ParkBench() {
  return (
    <svg className={styles.wideLandmark} viewBox="0 0 132 78">
      <path d="M20 28h92v19H20zM25 19h82v9M31 47l-7 22m77-22 7 22M18 69h96M34 34h12m8 0h12m8 0h12m8 0h12" />
    </svg>
  );
}

function FirstWalkScene() {
  return (
    <div className={styles.pathScenery} aria-hidden="true">
      <div className={`${styles.sketchCluster} ${styles.openingSkyline}`}>
        <Building2 />
        <EmpireStateBuilding />
        <Building2 />
        <span>New York City</span>
      </div>

      <div className={`${styles.sketchCluster} ${styles.openingTreesA}`}>
        <TreePine />
        <TreeDeciduous />
        <Trees />
      </div>
      <div className={`${styles.sketchCluster} ${styles.openingTreesB}`}>
        <Trees />
        <TreePine />
      </div>
      <div className={`${styles.sketchCluster} ${styles.openingParkSign}`}>
        <SignpostBig />
        <span>Central Park</span>
      </div>
      <div className={`${styles.sketchCluster} ${styles.openingTreesC}`}>
        <TreeDeciduous />
        <TreePine />
        <TreeDeciduous />
      </div>
      <div className={`${styles.sketchCluster} ${styles.openingBench}`}>
        <ParkBench />
        <Flower2 />
      </div>
      <div className={`${styles.sketchCluster} ${styles.openingTreesD}`}>
        <TreePine />
        <Trees />
        <TreeDeciduous />
      </div>
      <Leaf className={`${styles.sceneryLeaf} ${styles.openingLeafA}`} />
      <Leaf className={`${styles.sceneryLeaf} ${styles.openingLeafB}`} />
    </div>
  );
}

function BrooklynScene() {
  return (
    <div className={styles.pathScenery} aria-hidden="true">
      <div className={`${styles.sketchCluster} ${styles.brownstoneRow}`}>
        <Building2 />
        <House />
        <Building2 />
        <span>Our first place</span>
      </div>
      <div className={`${styles.sketchCluster} ${styles.brooklynBridge}`}>
        <BrooklynBridge />
        <span>Brooklyn</span>
      </div>
      <div className={`${styles.sketchCluster} ${styles.homeHeart}`}>
        <House />
        <Heart />
      </div>
      <div className={`${styles.sketchCluster} ${styles.neighborhoodTrees}`}>
        <TreeDeciduous />
        <Fence />
        <TreePine />
      </div>
    </div>
  );
}

function EngagementScene() {
  return (
    <div className={styles.pathScenery} aria-hidden="true">
      <div className={`${styles.sketchCluster} ${styles.returnSkyline}`}>
        <Building2 />
        <EmpireStateBuilding />
        <Building2 />
        <span>Back in New York</span>
      </div>
      <div className={`${styles.sketchCluster} ${styles.returnParkTrees}`}>
        <Trees />
        <TreeDeciduous />
        <TreePine />
      </div>
      <div className={`${styles.sketchCluster} ${styles.returnBench}`}>
        <ParkBench />
        <Flower2 />
      </div>
      <div className={`${styles.sketchCluster} ${styles.proposalSpark}`}>
        <Sparkles />
        <Gem />
        <Heart />
        <span>Right where it began</span>
      </div>
      <Leaf className={`${styles.sceneryLeaf} ${styles.returnLeafA}`} />
      <Leaf className={`${styles.sceneryLeaf} ${styles.returnLeafB}`} />
    </div>
  );
}

function CharlieScene() {
  return (
    <div className={styles.pathScenery} aria-hidden="true">
      <div className={styles.charliePawTrail}>
        <PawPrint />
        <PawPrint />
        <PawPrint />
        <PawPrint />
        <PawPrint />
        <PawPrint />
      </div>
      <div className={`${styles.sketchCluster} ${styles.charlieTeaser}`}>
        <Bone />
        <Dog />
        <Heart />
        <span>A new best friend…</span>
      </div>
    </div>
  );
}

export function PathScenery({ scene }: { scene: StaticPathScene }) {
  if (scene === "first-walk") return <FirstWalkScene />;
  if (scene === "brooklyn") return <BrooklynScene />;
  if (scene === "engagement") return <EngagementScene />;
  return <CharlieScene />;
}
