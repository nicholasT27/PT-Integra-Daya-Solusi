import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HideOn from "@/components/HideOn";

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

// The frame around every page: top menu, page content and footer.
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <HideOn paths={["/concepts/i", "/concepts/j", "/concepts/k", "/concepts/l", "/concepts/heroes", "/concepts/heroes2"]}><Header /></HideOn>
        <main className="flex-1">{children}</main>
        <HideOn paths={["/concepts/i", "/concepts/j", "/concepts/k", "/concepts/l", "/concepts/heroes", "/concepts/heroes2"]}><Footer /></HideOn>
      </body>
    </html>
  );
}
