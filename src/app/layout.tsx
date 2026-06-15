import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const GOOGLE_ADS_ID = "AW-16829298336";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Evidence Brief | Organize Evidence for Hearings & Tribunals",
  description:
    "Upload, organize and manage evidence for court, tribunal and LTB hearings. Create professional evidence briefs and exhibits.",
  keywords: [
    "evidence brief",
    "evidence organizer",
    "hearing preparation",
    "court evidence",
    "tribunal evidence",
    "LTB evidence",
    "small claims court",
    "self represented litigant",
    "legal document organizer",
    "evidence management",
    "hearing documents",
    "court exhibits",
  ],
  openGraph: {
    title: "Evidence Brief",
    description:
      "Organize evidence, exhibits and hearing documents in one place.",
    url: "https://evidencebrief.ca",
    siteName: "Evidence Brief",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${sourceSerif.variable} font-sans`}
      >
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
