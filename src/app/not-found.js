import { PageHeader } from "@/components/Ui";
import { ArrowButton } from "@/components/quinn/Bits";

// Shown when a visitor opens a page that does not exist.
export default function NotFound() {
  return (
    <div className="min-h-[70vh]">
      <PageHeader eyebrow="Error 404" title="Page not" accent="found." text="Sorry, we could not find that page. It may have moved, or the address may be wrong.">
        <ArrowButton href="/">Back to home</ArrowButton>
      </PageHeader>
    </div>
  );
}
