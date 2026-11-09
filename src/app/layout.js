import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import QxHeader from "@/components/qx/QxHeader";
import QxFooter from "@/components/qx/QxFooter";
import PageBackdrop from "@/components/qx/PageBackdrop";
import HideOnPaths from "@/components/qx/HideOnPaths";

// The brand font (Plus Jakarta Sans) used for all text on the site.
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata = {
  title: {
    default: "PT Integra Daya Solusi | Insurance, Risk and Engineering Consultant",
    template: "%s | PT Integra Daya Solusi",
  },
  description:
    "PT Integra Daya Solusi provides insurance risk assessment, insurance agency, retirement fund, legal, accounting and tax, and industrial management consulting in Jakarta, Indonesia.",
};

// The frame around every page: top menu, the shared background, page content and footer.
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <HideOnPaths paths={["/concepts/nav"]}><QxHeader /></HideOnPaths>
        {/* One soft background behind every page. Sections are transparent and say what tone they want. */}
        <div className="relative isolate flex-1">
          <PageBackdrop />
          <main>{children}</main>
        </div>
        <QxFooter />
      </body>
    </html>
  );
}
