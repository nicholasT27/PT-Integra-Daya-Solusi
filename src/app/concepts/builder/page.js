import { Orbit, Honeycomb, Goals, Radar } from "@/components/qx/Builders";

export const metadata = { title: "Build-your-team designs" };

// A comparison page showing four designs in the spirit of the "build your team" selector.
export default function BuilderPage() {
  return (
    <div>
      <Orbit />
      <Honeycomb />
      <Goals />
      <Radar />
    </div>
  );
}
