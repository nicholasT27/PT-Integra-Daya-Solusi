import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { PageHeader, Container, Section, SectionTitle } from "@/components/Ui";
import { company, mapUrl, faqs } from "@/lib/site";

export const metadata = { title: "Contact Us" };

// The Contact page: message form, office address, phone numbers, map and common questions.
export default function Contact() {
  return (
    <>
      <PageHeader eyebrow="Contact us" title="We would like to hear from you" text="Send a message or call our office in South Jakarta." />
      <Section>
        <Container className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="font-serif text-2xl font-semibold text-navy-900">Send us a message</h2>
            <div className="mt-6"><ContactForm /></div>
          </div>
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-navy-900">
                <Icon name="pin" className="h-5 w-5 text-navy-500" /> Office
              </h2>
              <address className="mt-3 text-sm not-italic leading-relaxed text-muted">
                <strong className="text-ink">{company.name}</strong>
                {company.addressLines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </address>
            </div>
            <div>
              <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-navy-900">
                <Icon name="phone" className="h-5 w-5 text-navy-500" /> Phone
              </h2>
              <p className="mt-3 text-sm">
                {company.phones.map((p) => (
                  <a key={p.href} href={p.href} className="block text-navy-600 hover:text-navy-500">{p.label}</a>
                ))}
              </p>
            </div>
            <iframe
              title="Map showing our office in Tebet, Jakarta Selatan"
              src={mapUrl}
              loading="lazy"
              className="h-64 w-full rounded-xl border-0"
            />
          </div>
        </Container>
      </Section>
      <Section tone="ice">
        <Container className="max-w-3xl">
          <SectionTitle eyebrow="Support and FAQs" title="Common questions" />
          <div className="mt-8 divide-y divide-navy-900/10 rounded-xl bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer list-none font-semibold text-navy-900">{f.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
