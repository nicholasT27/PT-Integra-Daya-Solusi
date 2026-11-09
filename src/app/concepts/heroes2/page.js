import QxHeader from "@/components/qx/QxHeader";
import { HeroA, HeroB, HeroC, HeroD } from "@/components/qx/Heroes2";

export const metadata = { title: "Hero designs, round two" };

// A comparison page showing four light hero designs where the photo is only a small accent.
export default function Heroes2() {
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
