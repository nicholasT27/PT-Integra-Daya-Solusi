"use client";

import { useState } from "react";
import { ArrowButtonSubmit } from "@/components/quinn/FormBits";
import { company, services } from "@/lib/site";

// A contact form. It opens an email draft once a company email is set in site.js; until then it asks visitors to call.
export default function ContactForm() {
  const [note, setNote] = useState("");
  const field =
    "mt-1.5 w-full rounded-xl border border-navy-900/15 bg-white/80 px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-900/30 focus:border-navy-600 focus:bg-white focus:ring-4 focus:ring-navy-600/10";

  function handleSubmit(e) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    if (!company.email) {
      setNote("Online sending is not switched on yet. Please call us on " + company.phones[0].label + " and we will be glad to help.");
      return;
    }
    const body = `Name: ${d.get("name")}\nCompany: ${d.get("company")}\nPhone: ${d.get("phone")}\nService: ${d.get("service")}\n\n${d.get("message")}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent("Website enquiry")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <label className="text-sm font-semibold text-navy-900">Full name<input name="name" required className={field} /></label>
      <label className="text-sm font-semibold text-navy-900">Company<input name="company" className={field} /></label>
      <label className="text-sm font-semibold text-navy-900">Phone<input name="phone" type="tel" className={field} /></label>
      <label className="text-sm font-semibold text-navy-900">Service of interest
        <select name="service" className={field} defaultValue="">
          <option value="">Not sure yet</option>
          {services.map((s) => <option key={s.slug}>{s.title}</option>)}
        </select>
      </label>
      <label className="text-sm font-semibold text-navy-900 sm:col-span-2">How can we help?<textarea name="message" rows={5} required className={field} /></label>
      <div className="sm:col-span-2">
        <ArrowButtonSubmit>Send message</ArrowButtonSubmit>
        {note && <p role="status" className="mt-4 rounded-xl bg-ice-100 p-4 text-sm text-navy-700">{note}</p>}
      </div>
    </form>
  );
}
