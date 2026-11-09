import HeroMain from "@/components/qx/HeroMain";
import { SectionA, SectionB, SectionC, SectionD } from "@/components/qx/Sections2";

export const metadata = { title: "Second section designs" };

// A comparison page: the real hero, then four options for the second section, one after another.
export default function Section2() {
  return (
    <div>
      <HeroMain />
      <SectionA />
      <SectionB />
      <SectionC />
      <SectionD />
    </div>
  );
}
