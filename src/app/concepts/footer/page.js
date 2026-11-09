import PageBackdrop from "@/components/qx/PageBackdrop";
import { FooterSpotlight, FooterGlass, FooterVisit } from "@/components/qx/FooterOptions";

export const metadata = { title: "Footer options" };

// A comparison page showing three footer designs one under another, each preceded by a short fade from the page.
export default function FooterPage() {
  return (
    <div>
      <div className="relative isolate">
        <PageBackdrop />
        <div data-tone="#e4ecff" data-glow="1" className="h-[60vh]" />
        <p className="pb-16 text-center text-sm font-semibold text-navy-600">Scroll down to compare the three footers</p>
      </div>
      <FooterSpotlight />
      <div className="h-6 bg-white" />
      <FooterGlass />
      <div className="h-6 bg-white" />
      <FooterVisit />
    </div>
  );
}
