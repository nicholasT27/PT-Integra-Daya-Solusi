"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { Glass } from "@/components/Ui";
import { ArrowButtonSubmit } from "@/components/quinn/FormBits";
import { company, services } from "@/lib/site";

// The choices for "Service of interest": "Not sure yet" first, then the six services with their icons.
const options = [{ value: "", label: "Not sure yet", icon: null }, ...services.map((s) => ({ value: s.title, label: s.title, icon: s.icon }))];

const empty = { name: "", company: "", phone: "", email: "", service: "", message: "" };

// Keeps what the visitor typed and sends it. Until a company email is set in site.js it asks them to call;
// once it is set, the visitor's email program opens with the message filled in.
function useContact() {
  const [d, setD] = useState(empty);
  const [note, setNote] = useState("");
  const set = (k) => (e) => setD((v) => ({ ...v, [k]: typeof e === "string" ? e : e.target.value }));
  function send(e) {
    e.preventDefault();
    if (!company.email) {
      setNote("Online sending is not switched on yet. Please call us on " + company.phones[0].label + " and we will be glad to help.");
      return;
    }
    const body = `Name: ${d.name}\nCompany: ${d.company}\nEmail: ${d.email}\nPhone: ${d.phone}\nService: ${d.service || "Not sure yet"}\n\n${d.message}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent("Website enquiry")}&body=${encodeURIComponent(body)}`;
  }
  return { d, set, note, send };
}

// The message shown under the send button.
function Note({ text }) {
  return text ? <p role="status" className="mt-5 rounded-2xl bg-ice-100 p-4 text-sm leading-relaxed text-navy-700">{text}</p> : null;
}

// A custom drop-down list for choosing the service. It replaces the browser's plain grey menu with a styled panel that has
// the service icons and a tick on the chosen one. It works with the mouse, the keyboard (arrows, Enter, Escape) and touch.
function Select({ value, onChange, id, className = "", buttonClass = "" }) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const box = useRef(null);
  const sel = Math.max(0, options.findIndex((o) => o.value === value));

  useEffect(() => {
    if (!open) return;
    const off = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", off);
    return () => document.removeEventListener("mousedown", off);
  }, [open]);

  const pick = (i) => { onChange(options[i].value); setOpen(false); };
  function key(e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) { setHi(sel); setOpen(true); } else setHi((h) => (h + (e.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open) pick(hi); else { setHi(sel); setOpen(true); }
    } else if (e.key === "Escape") setOpen(false);
    else if (e.key === "Tab") setOpen(false);
  }

  return (
    <div ref={box} className={`relative ${className}`}>
      <button type="button" id={id} role="combobox" aria-haspopup="listbox" aria-expanded={open} aria-controls={`${id}-list`} aria-activedescendant={open ? `${id}-o${hi}` : undefined}
        onClick={() => { setHi(sel); setOpen(!open); }} onKeyDown={key}
        className={`flex w-full items-center justify-between gap-3 text-left outline-none ${buttonClass}`}>
        <span className={value ? "text-navy-900" : "text-navy-900/55"}>{options[sel].label}</span>
        <svg viewBox="0 0 12 12" className={`h-3 w-3 shrink-0 text-navy-600 transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 4l4 4 4-4" /></svg>
      </button>
      <ul id={`${id}-list`} role="listbox" aria-label="Service of interest" className={`absolute left-0 right-0 top-full z-30 mt-3 max-h-80 min-w-[21rem] origin-top overflow-auto rounded-2xl border border-white bg-white p-1.5 shadow-2xl ring-1 ring-navy-900/5 transition-all duration-200 ${open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"}`}>
        {options.map((o, i) => (
          <li key={o.label} id={`${id}-o${i}`} role="option" aria-selected={value === o.value} onMouseEnter={() => setHi(i)} onClick={() => pick(i)} className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${hi === i ? "bg-ice-100" : ""}`}>
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${value === o.value ? "bg-navy-600 text-white" : "bg-ice-100 text-navy-600"}`}>{o.icon ? <Icon name={o.icon} className="h-4 w-4" /> : <span className="text-sm font-bold">?</span>}</span>
            <span className={`flex-1 ${value === o.value ? "font-bold text-navy-900" : "text-navy-900"}`}>{o.label}</span>
            {value === o.value && <Icon name="check" className="h-4 w-4 text-navy-600" />}
          </li>
        ))}
      </ul>
    </div>
  );
}

// A neat box with a small label on top and the field underneath. It lights up with a blue edge when you click inside.
function Box({ label, children, className = "", as: Tag = "label" }) {
  return (
    <Tag className={`block rounded-2xl border border-navy-900/15 bg-white/80 px-4 pb-2.5 pt-2.5 transition focus-within:border-navy-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-navy-600/10 ${className}`}>
      <span className="block text-[11px] font-semibold uppercase tracking-wider text-navy-600">{label}</span>
      {children}
    </Tag>
  );
}
const input = "mt-0.5 w-full bg-transparent text-[15px] text-navy-900 outline-none placeholder:text-navy-900/30";

// Six service cards to choose from (plus "Not sure yet"). Used instead of a drop-down list.
function ServicePicker({ value, set }) {
  return (
    <div role="radiogroup" aria-label="Service of interest">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const on = value === s.title;
          return (
            <button key={s.slug} type="button" role="radio" aria-checked={on} onClick={() => set(on ? "" : s.title)} className={`relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${on ? "border-navy-600 bg-white shadow-xl" : "border-navy-900/15 bg-white/70 hover:-translate-y-0.5 hover:border-navy-600/50 hover:bg-white"}`}>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${on ? "bg-navy-600 text-white" : "bg-ice-100 text-navy-600"}`}><Icon name={s.icon} /></span>
              <span className="text-sm font-bold leading-tight text-navy-900">{s.title}</span>
              {on && <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-navy-600 text-white"><Icon name="check" className="h-3 w-3" /></span>}
            </button>
          );
        })}
      </div>
      <button type="button" onClick={() => set("")} className={`mt-3 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${value === "" ? "border-navy-600 bg-navy-600 text-white" : "border-navy-900/15 bg-white/70 text-navy-900 hover:border-navy-600"}`}>Not sure yet</button>
    </div>
  );
}

// Design A: tidy labelled boxes in a glass card, with the new drop-down for the service.
export function FormBoxes() {
  const { d, set, note, send } = useContact();
  return (
    <Glass className="p-6 sm:p-10">
      <h2 className="text-2xl font-bold text-navy-900">Send us a message</h2>
      <p className="mt-1 text-sm text-muted">We usually reply within one working day.</p>
      <form onSubmit={send} className="mt-8 grid gap-4 sm:grid-cols-2">
        <Box label="Full name *"><input required value={d.name} onChange={set("name")} className={input} placeholder="Your name" autoComplete="name" /></Box>
        <Box label="Company"><input value={d.company} onChange={set("company")} className={input} placeholder="Your company" autoComplete="organization" /></Box>
        <Box label="Email"><input type="email" value={d.email} onChange={set("email")} className={input} placeholder="you@company.com" autoComplete="email" /></Box>
        <Box label="Phone"><input type="tel" value={d.phone} onChange={set("phone")} className={input} placeholder="021 …" autoComplete="tel" /></Box>
        <Box label="Service of interest" as="div" className="sm:col-span-2"><Select id="fa-service" value={d.service} onChange={set("service")} buttonClass="mt-0.5 text-[15px]" /></Box>
        <Box label="How can we help? *" className="sm:col-span-2"><textarea required rows={5} value={d.message} onChange={set("message")} className={`${input} resize-none`} placeholder="Tell us a little about what you need" /></Box>
        <div className="sm:col-span-2"><ArrowButtonSubmit>Send message</ArrowButtonSubmit><Note text={note} /></div>
      </form>
    </Glass>
  );
}

// Design B: no drop-down. The service is chosen from icon cards, followed by the details and the message.
export function FormCards() {
  const { d, set, note, send } = useContact();
  const head = (n, t) => <h3 className="flex items-center gap-3 text-lg font-bold text-navy-900"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-600 text-sm text-white">{n}</span>{t}</h3>;
  return (
    <Glass className="p-6 sm:p-10">
      <form onSubmit={send} className="space-y-10">
        <section>{head(1, "What do you need help with?")}<div className="mt-5"><ServicePicker value={d.service} set={set("service")} /></div></section>
        <section>
          {head(2, "Tell us about you")}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Box label="Full name *"><input required value={d.name} onChange={set("name")} className={input} placeholder="Your name" autoComplete="name" /></Box>
            <Box label="Company"><input value={d.company} onChange={set("company")} className={input} placeholder="Your company" autoComplete="organization" /></Box>
            <Box label="Email"><input type="email" value={d.email} onChange={set("email")} className={input} placeholder="you@company.com" autoComplete="email" /></Box>
            <Box label="Phone"><input type="tel" value={d.phone} onChange={set("phone")} className={input} placeholder="021 …" autoComplete="tel" /></Box>
          </div>
        </section>
        <section>
          {head(3, "Your message")}
          <div className="mt-5"><Box label="How can we help? *"><textarea required rows={4} value={d.message} onChange={set("message")} className={`${input} resize-none`} placeholder="Tell us a little about what you need" /></Box></div>
        </section>
        <div><ArrowButtonSubmit>Send message</ArrowButtonSubmit><Note text={note} /></div>
      </form>
    </Glass>
  );
}

// Design C: three short steps with a progress bar: choose the service, say who you are, write the message.
export function FormSteps() {
  const { d, set, note, send } = useContact();
  const [step, setStep] = useState(0);
  const form = useRef(null);
  const titles = ["Service", "About you", "Message"];
  // Only the current step's fields are on the page, so this checks just those before moving on.
  function next() {
    const bad = [...form.current.querySelectorAll("[required]")].find((el) => !el.checkValidity());
    if (bad) { bad.reportValidity(); return; }
    setStep((s) => s + 1);
  }
  return (
    <Glass className="p-6 sm:p-10">
      <ol className="flex items-center" aria-label="Progress">
        {titles.map((t, i) => (
          <li key={t} className={`flex items-center ${i < 2 ? "flex-1" : ""}`}>
            <span className="flex items-center gap-2">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors duration-500 ${step >= i ? "bg-navy-600 text-white" : "bg-ice-100 text-navy-600"}`}>{step > i ? <Icon name="check" className="h-4 w-4" /> : i + 1}</span>
              <span className={`hidden text-sm font-semibold sm:block ${step === i ? "text-navy-900" : "text-navy-900/45"}`}>{t}</span>
            </span>
            {i < 2 && <span className="mx-3 h-0.5 flex-1 overflow-hidden rounded-full bg-navy-600/15"><span className="block h-full origin-left rounded-full bg-navy-600 transition-transform duration-500" style={{ transform: `scaleX(${step > i ? 1 : 0})` }} /></span>}
          </li>
        ))}
      </ol>
      <form ref={form} onSubmit={send} className="mt-9">
        <div key={step} className="animate-rise min-h-[260px]">
          {step === 0 && <><h2 className="text-2xl font-bold text-navy-900">What do you need help with?</h2><p className="mb-6 mt-1 text-sm text-muted">Choose one, or skip if you are not sure yet.</p><ServicePicker value={d.service} set={set("service")} /></>}
          {step === 1 && (
            <><h2 className="text-2xl font-bold text-navy-900">Tell us about you</h2><p className="mb-6 mt-1 text-sm text-muted">So we know who to get back to.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Box label="Full name *"><input required value={d.name} onChange={set("name")} className={input} placeholder="Your name" autoComplete="name" /></Box>
                <Box label="Company"><input value={d.company} onChange={set("company")} className={input} placeholder="Your company" autoComplete="organization" /></Box>
                <Box label="Email"><input type="email" value={d.email} onChange={set("email")} className={input} placeholder="you@company.com" autoComplete="email" /></Box>
                <Box label="Phone"><input type="tel" value={d.phone} onChange={set("phone")} className={input} placeholder="021 …" autoComplete="tel" /></Box>
              </div></>
          )}
          {step === 2 && (
            <><h2 className="text-2xl font-bold text-navy-900">Your message</h2><p className="mb-6 mt-1 text-sm text-muted">{d.service ? <>About <strong className="text-navy-900">{d.service}</strong>, from <strong className="text-navy-900">{d.name}</strong>.</> : <>From <strong className="text-navy-900">{d.name}</strong>.</>}</p>
              <Box label="How can we help? *"><textarea required rows={5} value={d.message} onChange={set("message")} className={`${input} resize-none`} placeholder="Tell us a little about what you need" /></Box></>
          )}
        </div>
        <div className="mt-8 flex items-center justify-between gap-4">
          {step > 0 ? <button type="button" onClick={() => setStep(step - 1)} className="rounded-full border border-navy-900/20 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-white">Back</button> : <span />}
          {step < 2 ? <ArrowButtonSubmit type="button" onClick={next}>Continue</ArrowButtonSubmit> : <ArrowButtonSubmit>Send message</ArrowButtonSubmit>}
        </div>
        <Note text={note} />
      </form>
    </Glass>
  );
}

// An underlined blank inside the sentence form.
const blank = "mx-1 inline-block min-w-[9rem] border-b-2 border-navy-600/30 bg-transparent px-1 pb-0.5 align-baseline font-bold text-navy-600 outline-none transition-colors placeholder:font-normal placeholder:text-navy-900/45 focus:border-navy-600";

// Design D: the form reads as a sentence. The visitor fills in the blanks, including the service.
export function FormSentence() {
  const { d, set, note, send } = useContact();
  const auto = { fieldSizing: "content" };
  return (
    <Glass className="p-6 sm:p-12">
      <form onSubmit={send}>
        <p className="text-2xl leading-[2.4] text-navy-900 sm:text-3xl sm:leading-[2.3]">
          Hello! My name is<input required value={d.name} onChange={set("name")} style={auto} className={blank} placeholder="your name" aria-label="Your name" autoComplete="name" />
          from<input value={d.company} onChange={set("company")} style={auto} className={blank} placeholder="your company" aria-label="Your company" autoComplete="organization" />.
          I am interested in
          <span className="relative mx-1 inline-block align-baseline">
            <Select id="fd-service" value={d.service} onChange={set("service")} className="inline-block" buttonClass="inline-flex items-center gap-2 border-b-2 border-navy-600/30 px-1 pb-0.5 font-bold text-navy-600 transition-colors focus:border-navy-600" />
          </span>.
          You can reach me at<input type="email" value={d.email} onChange={set("email")} style={auto} className={blank} placeholder="your email" aria-label="Your email" autoComplete="email" />
          or on<input type="tel" value={d.phone} onChange={set("phone")} style={auto} className={blank} placeholder="your phone" aria-label="Your phone" autoComplete="tel" />.
        </p>
        <div className="mt-6">
          <p className="text-2xl text-navy-900 sm:text-3xl">Here is what I would like to talk about:</p>
          <textarea required rows={3} value={d.message} onChange={set("message")} aria-label="Your message" placeholder="write your message here" className="mt-3 w-full resize-none border-b-2 border-navy-600/30 bg-transparent pb-2 text-xl font-bold text-navy-600 outline-none transition-colors placeholder:font-normal placeholder:text-navy-900/45 focus:border-navy-600" />
        </div>
        <div className="mt-8"><ArrowButtonSubmit>Send message</ArrowButtonSubmit><Note text={note} /></div>
      </form>
    </Glass>
  );
}
