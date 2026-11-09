import { GlanceA, GlanceB, GlanceC, GlanceD } from "@/components/qx/Glance2";

export const metadata = { title: "Services at a glance, round two" };

// A comparison page showing four designs based on the orbit-and-list layout.
export default function Glance2Page() {
  return (
    <div>
      <GlanceA />
      <GlanceB />
      <GlanceC />
      <GlanceD />
    </div>
  );
}
