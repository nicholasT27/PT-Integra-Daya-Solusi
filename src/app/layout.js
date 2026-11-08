import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });

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
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
