"use client";

import { useState } from "react";
import { PageHeader, Container, Section } from "@/components/Ui";
import { FormBoxes, FormCards, FormSteps, FormSentence } from "./FormDesigns";

// The Contact page heading with a switcher at the bottom to try each form design.
export default function FormPreview() {
  const [v, setV] = useState(0);
  const options = [["Boxes", FormBoxes], ["Service cards", FormCards], ["Steps", FormSteps], ["Sentence", FormSentence]];
  const Design = options[v][1];
  return (
    <>
      <PageHeader eyebrow="Contact us" title="We would like to" accent="hear from you." text="Send a message or call our office in South Jakarta." />
      <Section>
        <Container className="max-w-4xl"><Design key={v} /></Container>
      </Section>
      <div className="fixed inset-x-3 bottom-4 z-[60] mx-auto flex w-fit max-w-[calc(100vw-1.5rem)] flex-wrap items-center justify-center gap-1 rounded-3xl bg-navy-900 p-2 text-white shadow-2xl">
        {options.map(([n], i) => <button key={n} type="button" onClick={() => setV(i)} aria-pressed={v === i} className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${v === i ? "bg-white text-navy-900" : "hover:bg-white/15"}`}>{i + 1} · {n}</button>)}
      </div>
    </>
  );
}
