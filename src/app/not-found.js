import { PageHeader, Container, Button } from "@/components/Ui";

// Shown when a visitor opens a page that does not exist.
export default function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" text="Sorry, we could not find that page." />
      <Container className="py-16"><Button href="/">Back to home</Button></Container>
    </>
  );
}
