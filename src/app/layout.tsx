import type { Metadata } from "next";
import { Caveat, Jost } from "next/font/google";
import "./globals.css";

const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], display: "swap" });
const jost = Jost({ variable: "--font-jost", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "When Adam Met Cathy",
  description: "Five moments, two cities, one very good girl, and a lifetime still to come.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${caveat.variable} ${jost.variable}`}><body>{children}</body></html>;
}
