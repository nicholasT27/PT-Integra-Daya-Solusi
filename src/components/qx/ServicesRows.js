import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Container, Section } from "@/components/Ui";
import { Reveal } from "@/components/quinn/Interactive";
import { ArrowButton } from "@/components/quinn/Bits";
import { services, servicePhotos } from "@/lib/site";

// A service's photo, filling its parent. Photos come from "servicePhotos" in site.js and are only shown near their real size, so they stay sharp.
function Pic({ slug, sizes = "520px" }) {
  const p = servicePhotos[slug];
  return <Image src={p.src} alt="" fill unoptimized sizes={sizes} className="object-cover" style={{ objectPosition: p.pos, transform: `scale(${p.zoom})`, transformOrigin: p.pos }} />;
}

// The list of services on the Services page: one service per row, with a large photo on one side and the details
// on the other. The sides switch with each row. The photo zooms a little when you point at it.
export default function ServicesRows() {
  return (
    <Section>
      <Container className="space-y-24">
        {services.map((s, i) => (
          <div key={s.slug} className="grid items-center gap-10 lg:grid-cols-12">
            <Reveal className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
              <Link href={`/services/${s.slug}`} className="group relative block" aria-label={s.title}>
                <span className={`absolute -bottom-4 ${i % 2 ? "-left-4" : "-right-4"} hidden h-full w-full rounded-[2rem] border border-navy-600/30 sm:block`} />
                <div className={`relative aspect-[5/4] overflow-hidden shadow-2xl ring-4 ring-white ${i % 2 ? "rounded-[2rem] rounded-tr-[7rem]" : "rounded-[2rem] rounded-tl-[7rem]"}`}>
                  <span className="absolute inset-0 block transition-transform duration-700 group-hover:scale-105"><Pic slug={s.slug} /></span>
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-900/25 to-transparent" />
                </div>
                <span className={`float absolute -bottom-6 ${i % 2 ? "right-6" : "left-6"} flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-600 text-white shadow-xl`}><Icon name={s.icon} className="h-8 w-8" /></span>
              </Link>
            </Reveal>
            <Reveal delay={150} className="lg:col-span-6">
              <span className="text-7xl font-bold leading-none text-transparent" style={{ WebkitTextStroke: "2px rgba(0,58,242,0.3)" }}>0{i + 1}</span>
              <h2 className="mt-2 text-balance text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">{s.title}</h2>
              <p className="mt-4 max-w-lg leading-relaxed text-muted">{s.intro}</p>
              <ul className="mt-5 space-y-2 text-sm text-navy-900">
                {s.offerings.slice(0, 3).map((o) => <li key={o} className="flex gap-3"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-navy-600" />{o}</li>)}
              </ul>
              <div className="mt-7"><ArrowButton href={`/services/${s.slug}`}>View details</ArrowButton></div>
            </Reveal>
          </div>
        ))}
      </Container>
    </Section>
  );
}
