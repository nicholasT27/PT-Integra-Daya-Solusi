import QxHeader from "@/components/qx/QxHeader";
import { Hero1, Hero2, Hero3, Hero4 } from "@/components/qx/Heroes";

export const metadata = { title: "Hero designs" };

// A comparison page showing four different hero designs, one under another.
export default function Heroes() {
  return (
    <div>
      <QxHeader />
      <Hero1 />
      <Hero2 />
      <Hero3 />
      <Hero4 />
    </div>
  );
}
