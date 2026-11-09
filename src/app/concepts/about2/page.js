import PageBackdrop from "@/components/qx/PageBackdrop";
import { ImgFrame, ImgCollage, ImgReveal } from "@/components/qx/AboutImages";

export const metadata = { title: "About section with images" };

// A comparison page showing three About options with company information on the left and images on the right.
export default function About2Page() {
  return (
    <div className="relative isolate">
      <PageBackdrop />
      <div data-tone="#ffffff" data-glow="1" className="h-24" />
      <ImgFrame />
      <ImgCollage />
      <ImgReveal />
      <div aria-hidden="true" className="h-40 bg-gradient-to-b from-transparent to-navy-950" />
    </div>
  );
}
