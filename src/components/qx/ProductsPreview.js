"use client";

import { useState } from "react";
import { PageHeader, CallToAction } from "@/components/Ui";
import { ProductsTabs, ProductsPanels, ProductsSticky, ProductsCards } from "./ProductDesigns";

// The Products page heading with a switcher at the bottom to try each layout idea.
export default function ProductsPreview() {
  const [v, setV] = useState(0);
  const options = [["Showcase tabs", ProductsTabs], ["Expanding panels", ProductsPanels], ["Sticky scroll", ProductsSticky], ["Feature cards", ProductsCards]];
  const Design = options[v][1];
  return (
    <>
      <PageHeader eyebrow="Products" title="Engineering solutions for" accent="the places that matter." text="Factories, transport and buildings: the assets where good engineering and good risk management make the biggest difference." />
      <Design key={v} />
      <CallToAction />
      <div className="fixed inset-x-3 bottom-4 z-[60] mx-auto flex w-fit max-w-[calc(100vw-1.5rem)] flex-wrap items-center justify-center gap-1 rounded-3xl bg-navy-900 p-2 text-white shadow-2xl">
        {options.map(([n], i) => <button key={n} type="button" onClick={() => setV(i)} aria-pressed={v === i} className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${v === i ? "bg-white text-navy-900" : "hover:bg-white/15"}`}>{i + 1} · {n}</button>)}
      </div>
    </>
  );
}
