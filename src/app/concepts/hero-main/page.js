import QxHeader from "@/components/qx/QxHeader";
import HeroMain from "@/components/qx/HeroMain";

export const metadata = { title: "Main hero" };

// The main hero: the airy design with the photo pill, combined with the mouse-following animation.
export default function HeroMainPage() {
  return (
    <div>
      <QxHeader onLight />
      <HeroMain />
    </div>
  );
}
