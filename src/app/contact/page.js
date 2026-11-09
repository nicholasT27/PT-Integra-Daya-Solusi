import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { PageHeader, Container, Section, SectionTitle, Glass } from "@/components/Ui";
import { Reveal } from "@/components/quinn/Interactive";
import { company, mapUrl, faqs } from "@/lib/site";

export const metadata = { title: "Contact Us" };

// The Contact page: a message form, the office address and phones, a map and common questions.
export default function Contact() {
  return (
    <>
      <PageHeader eyebrow="Contact us" title="We would like to" accent="hear from you." text="Send a message or call our office in South Jakarta." />
      <Section>
        <Container className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <Glass className="p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-navy-900">Send us a message</h2>
              <div className="mt-6"><ContactForm /></div>
            </Glass>
          </Reveal>
          <div className="space-y-5 lg:col-span-2">
            <Reveal delay={100}>
              <Glass className="p-7">
                <h2 className="flex items-center gap-3 text-lg font-bold text-navy-900"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-600 text-white"><Icon name="pin" className="h-5 w-5" /></span>Office</h2>
                <address className="mt-4 text-sm not-italic leading-relaxed text-muted">
                  <strong className="text-navy-900">{company.name}</strong>
                  {company.addressLines.map((l) => <span key={l} className="block">{l}</span>)}
                </address>
              </Glass>
            </Reveal>
            <Reveal delay={180}>
              <Glass className="p-7">
                <h2 className="flex items-center gap-3 text-lg font-bold text-navy-900"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-600 text-white"><Icon name="phone" className="h-5 w-5" /></span>Phone</h2>
                <p className="mt-4 text-sm">{company.phones.map((p) => <a key={p.href} href={p.href} className="block font-semibold text-navy-600 hover:underline">{p.label}</a>)}</p>
              </Glass>
            </Reveal>
            <Reveal delay={260}>
              <iframe title="Map showing our office in Tebet, Jakarta Selatan" src={mapUrl} loading="lazy" className="h-64 w-full rounded-3xl border-0 shadow-lg" />
            </Reveal>
          </div>
        </Container>
      </Section>
      <Section tone="ice">
        <Container className="max-w-3xl">
          <SectionTitle eyebrow="Support and FAQs" title="Common" accent="questions." />
          <Reveal>
            <Glass className="mt-10 divide-y divide-navy-900/10">
              {faqs.map((f) => (
                <details key={f.q} className="group p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-navy-900">
                    {f.q}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy-900/15 text-lg text-navy-600 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </Glass>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
