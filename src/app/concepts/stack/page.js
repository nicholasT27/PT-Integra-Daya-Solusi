import { Stack1, Stack2, Stack3, Stack4 } from "@/components/qx/Stacks";

export const metadata = { title: "Stacking card variations" };

// A comparison page showing four variations of the stacking-card section.
export default function StackPage() {
  return (
    <div>
      <Stack1 />
      <Stack2 />
      <Stack3 />
      <Stack4 />
    </div>
  );
}
