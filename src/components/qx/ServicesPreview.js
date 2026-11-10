"use client";

import { useState } from "react";
import { PageHeader, CallToAction } from "@/components/Ui";
import { ServicesCards, ServicesRows, ServicesPanels, ServicesTall } from "./ServiceDesigns";

// The Services page with a switcher at the bottom to try each photo design.
export default function ServicesPreview() {
  const [v, setV] = useState(0);
  const options = [["Photo cards", ServicesCards], ["Alternating rows", ServicesRows], ["Photo panels", ServicesPanels], ["Tall cards", ServicesTall]];
  const Design = options[v][1];
  return (
    <>
      <PageHeader eyebrow="Services and solutions" title="Six specialist services," accent="working together." text="Use one service on its own or combine several for a joined-up approach." />
      <Design key={v} />
      <CallToAction />
      <div className="fixed bottom-5 left-1/2 z-[60] flex max-w-[94vw] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full bg-navy-900 px-3 py-2 text-white shadow-2xl">
        {options.map(([n], i) => <button key={n} type="button" onClick={() => setV(i)} aria-pressed={v === i} className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${v === i ? "bg-white text-navy-900" : "hover:bg-white/15"}`}>{i + 1} · {n}</button>)}
      </div>
    </>
  );
}
