import { PageHeader, CallToAction } from "@/components/Ui";
import ServicesRows from "@/components/qx/ServicesRows";

export const metadata = { title: "Services" };

// The Services page: all six services, one per row with a photo, each leading to its own page.
export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services and solutions"
        title="Six specialist services,"
        accent="working together."
        text="Use one service on its own or combine several for a joined-up approach."
      />
      <ServicesRows />
      <CallToAction />
    </>
  );
}
