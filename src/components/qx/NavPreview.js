"use client";

import { useState } from "react";
import NavBar from "./NavVariants";
import { PageHeader, Container, Section, Glass } from "@/components/Ui";
import { services } from "@/lib/site";

// A preview page: the real page background and some content under each menu idea, with a switcher at the bottom.
export default function NavPreview() {
  const [v, setV] = useState(1);
  const names = ["Glass pill", "Full-width bar", "Sliding dock", "Minimal"];
  return (
    <>
      <NavBar variant={v} current="/services" />
      <PageHeader eyebrow="Menu preview" title="Try each" accent="menu idea." text="Scroll the page to see how each bar behaves, point at the links, and shrink the window to see the phone menu." />
      <Section>
        <Container className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => <Glass key={s.slug} className="p-7"><h3 className="text-xl font-bold text-navy-900">{s.title}</h3><p className="mt-2 text-sm text-muted">{s.short}</p></Glass>)}
        </Container>
      </Section>
      <Section tone="ice"><Container className="h-[60vh]"><Glass className="p-8 text-muted">More content, so there is room to scroll.</Glass></Container></Section>
      <div className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full bg-navy-900 px-3 py-2 text-white shadow-2xl">
        {names.map((n, i) => (
          <button key={n} type="button" onClick={() => setV(i + 1)} aria-pressed={v === i + 1} className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${v === i + 1 ? "bg-white text-navy-900" : "hover:bg-white/15"}`}>{i + 1} · {n}</button>
        ))}
      </div>
    </>
  );
}
