import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ahpk.or.ke"),

  title: {
    default: "Association of Hotel Professionals Kenya",
    template: "%s | AHPK",
  },

  description:
    "Association of Hotel Professionals Kenya (AHPK) promotes professionalism, ethical standards, membership, certification, training, CPD, and networking for hospitality professionals in Kenya.",

  applicationName: "AHPK",

  authors: [{ name: "Association of Hotel Professionals Kenya" }],
  creator: "Craft Inventors",
  publisher: "Association of Hotel Professionals Kenya",

  keywords: [
    "AHPK",
    "Association of Hotel Professionals Kenya",
    "Hotel Professionals Kenya",
    "Hospitality Professionals Kenya",
    "Hospitality Association Kenya",
    "Hotel Association Kenya",
    "Hospitality Membership Kenya",
    "Hospitality CPD Kenya",
    "Hotel Training Kenya",
    "AHPK Membership",
    "AHPK Certificate Verification",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Association of Hotel Professionals Kenya",
    description:
      "Official website and membership portal of the Association of Hotel Professionals Kenya.",
    url: "/",
    siteName: "AHPK",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Association of Hotel Professionals Kenya",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Association of Hotel Professionals Kenya",
    description:
      "Official website and membership portal of the Association of Hotel Professionals Kenya.",
    images: ["/images/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#C1121F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-950">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Association of Hotel Professionals Kenya",
              alternateName: "AHPK",
              url: "https://ahpk.or.ke",
              logo: "https://ahpk.or.ke/logo.png",
              description:
                "Association of Hotel Professionals Kenya promotes professionalism, ethical standards, membership, certification, training, CPD, and networking for hospitality professionals in Kenya.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "KE",
                addressLocality: "Nairobi",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                email: "info@ahpk.or.ke",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}