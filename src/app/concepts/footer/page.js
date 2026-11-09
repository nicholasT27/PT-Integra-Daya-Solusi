import { Footer1, Footer2, Footer3, Footer4 } from "@/components/qx/SimpleFooters";

export const metadata = { title: "Footer options" };

// A comparison page showing four plain footer designs, one under another.
export default function FooterPage() {
  const gap = <div className="h-24 bg-gradient-to-b from-ice-50 to-white" />;
  return (
    <div>
      <div className="bg-gradient-to-b from-white to-ice-50 pb-10 pt-40 text-center text-sm font-semibold text-navy-600">Scroll down to compare the footers</div>
      <Footer1 />
      {gap}
      <Footer2 />
      {gap}
      <Footer3 />
      {gap}
      <Footer4 />
    </div>
  );
}
