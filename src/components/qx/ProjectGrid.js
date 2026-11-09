"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { Glass } from "@/components/Ui";
import { services } from "@/lib/site";

// The portfolio projects with filter buttons. Pick a service and only its projects stay in view.
export default function ProjectGrid({ projects }) {
  const [f, setF] = useState("All");
  const cats = ["All", ...services.map((s) => s.title)];
  const shown = projects.filter((p) => f === "All" || p.category === f);
  const iconFor = (c) => services.find((s) => s.title === c)?.icon ?? "shield";
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {cats.map((c) => (
          <button key={c} type="button" role="tab" aria-selected={f === c} onClick={() => setF(c)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${f === c ? "border-navy-600 bg-navy-600 text-white shadow-lg" : "border-navy-900/15 bg-white/70 text-navy-900 hover:border-navy-600"}`}>{c}</button>
        ))}
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <Glass key={p.title} className="animate-rise group p-7 transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-2xl">
            <span className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-600 text-white transition-transform duration-300 group-hover:rotate-6"><Icon name={iconFor(p.category)} /></span>
              <span className="text-xs font-semibold text-navy-600">{p.place}</span>
            </span>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-navy-600">{p.category}</p>
            <h3 className="mt-2 text-xl font-bold leading-snug text-navy-900">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.summary}</p>
          </Glass>
        ))}
      </div>
    </div>
  );
}
