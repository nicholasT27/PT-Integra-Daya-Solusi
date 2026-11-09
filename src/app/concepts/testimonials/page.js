import PageBackdrop from "@/components/qx/PageBackdrop";
import { TestiSlider, TestiDeck, TestiWall, TestiStage } from "@/components/qx/TestimonialOptions";

export const metadata = { title: "Testimonial options" };

// A comparison page showing four options for the Testimonials section, on the page-wide background.
export default function TestimonialsPage() {
  return (
    <div className="relative isolate">
      <PageBackdrop />
      <div data-tone="#ffffff" data-glow="1" className="h-24" />
      <TestiSlider />
      <TestiDeck />
      <TestiWall />
      <TestiStage />
      <div aria-hidden="true" className="h-40 bg-gradient-to-b from-transparent to-navy-950" />
    </div>
  );
}
