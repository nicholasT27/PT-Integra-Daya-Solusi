"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { Glass } from "@/components/Ui";
import { Reveal } from "@/components/quinn/Interactive";
import { ArrowButtonSubmit } from "@/components/quinn/FormBits";
import { company, services } from "@/lib/site";

const empty = { name: "", company: "", phone: "", email: "", service: "", message: "" };

// A neat box with a small label on top and the field underneath. It lights up with a blue edge when you click inside.
function Box({ label, children }) {
  return (
    <label className="block rounded-2xl border border-navy-900/15 bg-white/80 px-4 pb-2.5 pt-2.5 transition focus-within:border-navy-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-navy-600/10">
      <span className="block text-[11px] font-semibold uppercase tracking-wider text-navy-600">{label}</span>
      {children}
    </label>
  );
}
const input = "mt-0.5 w-full bg-transparent text-[15px] text-navy-900 outline-none placeholder:text-navy-900/30";

// A numbered heading for each part of the form.
function Heading({ n, children }) {
  return <h3 className="flex items-center gap-3 text-lg font-bold text-navy-900"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-600 text-sm text-white">{n}</span>{children}</h3>;
}

// The contact form. Step 1 is choosing a service from icon cards (or "Not sure yet"), step 2 is your details,
// step 3 is your message. Until a company email is set in site.js, sending asks the visitor to call; once it is set,
// the visitor's email program opens with the message filled in.
export default function ContactForm() {
  const [d, setD] = useState(empty);
  const [note, setNote] = useState("");
  const set = (k) => (e) => setD((v) => ({ ...v, [k]: e.target.value }));
  const pick = (service) => setD((v) => ({ ...v, service }));

  function send(e) {
    e.preventDefault();
    if (!company.email) {
      setNote("Online sending is not switched on yet. Please call us on " + company.phones[0].label + " and we will be glad to help.");
      return;
    }
    const body = `Name: ${d.name}\nCompany: ${d.company}\nEmail: ${d.email}\nPhone: ${d.phone}\nService: ${d.service || "Not sure yet"}\n\n${d.message}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent("Website enquiry")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <Glass className="p-6 sm:p-10">
      <form onSubmit={send} className="space-y-10">
        <Reveal>
          <section>
            <Heading n={1}>What do you need help with?</Heading>
            <div role="radiogroup" aria-label="Service of interest" className="mt-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((s) => {
                  const on = d.service === s.title;
                  return (
                    <button key={s.slug} type="button" role="radio" aria-checked={on} onClick={() => pick(on ? "" : s.title)} className={`relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${on ? "border-navy-600 bg-white shadow-xl" : "border-navy-900/15 bg-white/70 hover:-translate-y-0.5 hover:border-navy-600/50 hover:bg-white"}`}>
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${on ? "bg-navy-600 text-white" : "bg-ice-100 text-navy-600"}`}><Icon name={s.icon} /></span>
                      <span className="text-sm font-bold leading-tight text-navy-900">{s.title}</span>
                      {on && <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-navy-600 text-white"><Icon name="check" className="h-3 w-3" /></span>}
                    </button>
                  );
                })}
              </div>
              <button type="button" onClick={() => pick("")} className={`mt-3 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${d.service === "" ? "border-navy-600 bg-navy-600 text-white" : "border-navy-900/15 bg-white/70 text-navy-900 hover:border-navy-600"}`}>Not sure yet</button>
            </div>
          </section>
        </Reveal>

        <Reveal delay={100}>
          <section>
            <Heading n={2}>Tell us about you</Heading>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Box label="Full name *"><input required value={d.name} onChange={set("name")} className={input} placeholder="Your name" autoComplete="name" /></Box>
              <Box label="Company"><input value={d.company} onChange={set("company")} className={input} placeholder="Your company" autoComplete="organization" /></Box>
              <Box label="Email"><input type="email" value={d.email} onChange={set("email")} className={input} placeholder="you@company.com" autoComplete="email" /></Box>
              <Box label="Phone"><input type="tel" value={d.phone} onChange={set("phone")} className={input} placeholder="021 …" autoComplete="tel" /></Box>
            </div>
          </section>
        </Reveal>

        <Reveal delay={200}>
          <section>
            <Heading n={3}>Your message</Heading>
            <div className="mt-5"><Box label="How can we help? *"><textarea required rows={4} value={d.message} onChange={set("message")} className={`${input} resize-none`} placeholder="Tell us a little about what you need" /></Box></div>
          </section>
        </Reveal>

        <Reveal delay={300}>
          <div>
            <ArrowButtonSubmit>Send message</ArrowButtonSubmit>
            {note && <p role="status" className="mt-5 rounded-2xl bg-ice-100 p-4 text-sm leading-relaxed text-navy-700">{note}</p>}
          </div>
        </Reveal>
      </form>
    </Glass>
  );
}
