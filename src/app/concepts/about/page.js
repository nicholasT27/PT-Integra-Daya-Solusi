import fs from "node:fs";
import path from "node:path";
import PageBackdrop from "@/components/qx/PageBackdrop";
import { AboutDraw, AboutName, AboutJourney, AboutPillars } from "@/components/qx/AboutOptions";

export const metadata = { title: "About section options" };

// A comparison page showing four options for the About section, on the page-wide background.
export default function AboutOptionsPage() {
  const svg = fs.readFileSync(path.join(process.cwd(), "public/brand/ids-mark-blue.svg"), "utf8");
  const logo = { viewBox: svg.match(/viewBox="([^"]+)"/)[1], paths: [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]) };
  return (
    <div className="relative isolate">
      <PageBackdrop />
      <div data-tone="#ffffff" data-glow="1" className="h-24" />
      <AboutDraw logo={logo} />
      <AboutName logo={logo} />
      <AboutJourney />
      <AboutPillars logo={logo} />
      <div aria-hidden="true" className="h-40 bg-gradient-to-b from-transparent to-navy-950" />
    </div>
  );
}
