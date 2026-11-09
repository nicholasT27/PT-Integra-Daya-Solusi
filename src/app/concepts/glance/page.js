import { Glance1, Glance2, Glance3 } from "@/components/qx/Glance";

export const metadata = { title: "Services at a glance" };

// A comparison page showing three orbit designs that show every service at once.
export default function GlancePage() {
  return (
    <div>
      <Glance1 />
      <Glance2 />
      <Glance3 />
    </div>
  );
}
