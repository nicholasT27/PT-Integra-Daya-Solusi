import QxHeader from "@/components/qx/QxHeader";
import { HeroN, HeroW, HeroB, HeroM } from "@/components/qx/Heroes3";

export const metadata = { title: "Hero designs, no photo" };

// A comparison page showing four photo-free hero designs.
export default function Heroes3() {
  return (
    <div>
      <QxHeader onLight />
      <HeroN />
      <HeroW />
      <HeroB />
      <HeroM />
    </div>
  );
}
