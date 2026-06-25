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
  title: {
    default: "AHPK Membership Portal",
    template: "%s | AHPK Portal",
  },
  description:
    "Association of Hotel Professionals Kenya membership application, renewals, certificates, and verification portal.",
  applicationName: "AHPK Membership Portal",
  authors: [{ name: "Association of Hotel Professionals Kenya" }],
  keywords: [
    "AHPK",
    "Association of Hotel Professionals Kenya",
    "membership portal",
    "hotel professionals",
    "membership certificates",
    "certificate verification",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
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
        {children}
      </body>
    </html>
  );
}