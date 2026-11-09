import QxHeader from "@/components/qx/QxHeader";
import { HeroA, HeroB, HeroC, HeroD } from "@/components/qx/Heroes4";

export const metadata = { title: "Hero designs, round four" };

// A comparison page showing four interactive, photo-free hero designs.
export default function Heroes4() {
  return (
    <div>
      <QxHeader onLight />
      <HeroA />
      <HeroB />
      <HeroC />
      <HeroD />
    </div>
  );
}
