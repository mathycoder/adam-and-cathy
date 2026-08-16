export function IllustratedTrail({ d }: { d: string }) {
  return (
    <>
      <path
        className="trail-outline fill-none stroke-green-dark stroke-[72px] [stroke-linecap:butt] [stroke-linejoin:round] [vector-effect:non-scaling-stroke] story:stroke-[92px]"
        d={d}
      />
      <path
        className="trail-surface fill-none stroke-[var(--trail-surface)] stroke-[60px] [stroke-linecap:butt] [stroke-linejoin:round] [vector-effect:non-scaling-stroke] story:stroke-[78px]"
        d={d}
      />
      <path
        className="trail-texture fill-none stroke-[var(--trail-highlight)] stroke-[4px] opacity-[.72] [stroke-dasharray:1_20] [stroke-linecap:round] [stroke-linejoin:round] [vector-effect:non-scaling-stroke] story:stroke-[5px] story:[stroke-dasharray:1_25]"
        d={d}
      />
    </>
  );
}
