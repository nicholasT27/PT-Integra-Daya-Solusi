import { Panels, Ring, Preview, Builder } from "@/components/qx/Sections3";

export const metadata = { title: "Second section, more designs" };

// A comparison page showing four more options for the services section.
export default function Section3() {
  return (
    <div>
      <Panels />
      <Ring />
      <Preview />
      <Builder />
    </div>
  );
}
