import PageBackdrop from "@/components/qx/PageBackdrop";
import { ValueNumbers, ValueBento, ValuePinned, ValueClaims } from "@/components/qx/ValueOptions";

export const metadata = { title: "Real value options" };

// A comparison page showing four options for the "Real value" section, on the page-wide background.
export default function ValuePage() {
  return (
    <div className="relative isolate">
      <PageBackdrop />
      <div data-tone="#ffffff" data-glow="1" className="h-24" />
      <ValueNumbers />
      <ValueBento />
      <ValuePinned />
      <ValueClaims />
      <div aria-hidden="true" className="h-40 bg-gradient-to-b from-transparent to-navy-950" />
    </div>
  );
}
