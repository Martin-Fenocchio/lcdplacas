import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { organizationLd, websiteLd, localBusinessLd } from "@/lib/structured-data";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsappFab } from "@/components/layout/whatsapp-fab";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { JsonLd } from "@/components/ui/json-ld";
import { Analytics } from "@/app/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "LcdPlacas · Repuestos para TV LED probados y garantizados",
    template: "%s · LcdPlacas",
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE.url,
    siteName: SITE.name,
    title: "LcdPlacas · Repuestos para TV LED",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "LcdPlacas · Repuestos para TV LED",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-white pb-16 font-sans text-body antialiased min-[900px]:pb-0">
        <Analytics>
          <AnnouncementBar />
          <SiteHeader />
          {children}
          <SiteFooter />
          <WhatsappFab />
          <MobileTabBar />
          <JsonLd data={organizationLd()} />
          <JsonLd data={websiteLd()} />
          <JsonLd data={localBusinessLd()} />
        </Analytics>
      </body>
    </html>
  );
}
