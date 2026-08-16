import type { Metadata } from "next";
import { Caveat, Jost } from "next/font/google";
import { cn } from "@/lib/cn";
import "./globals.css";

const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], display: "swap" });
const jost = Jost({ variable: "--font-jost", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "When Adam Met Cathy",
  description: "Five moments, two cities, one very good girl, and a lifetime still to come.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        caveat.variable,
        jost.variable,
        "max-w-[100vw] snap-y snap-proximity scroll-smooth bg-cream motion-reduce:snap-none motion-reduce:scroll-auto",
      )}
    >
      <body className="min-h-full max-w-[100vw] overflow-x-hidden bg-cream font-sans text-ink antialiased selection:bg-green selection:text-cream">
        {children}
      </body>
    </html>
  );
}
