import type { GraphicClassNames, GraphicName } from "@/data/story";
import { cn } from "@/lib/cn";

export function graphicClassName(
  name: GraphicName,
  defaultClassName: string,
  overrides?: GraphicClassNames,
) {
  return cn("story-graphic", `graphic--${name}`, defaultClassName, overrides?.[name]);
}
