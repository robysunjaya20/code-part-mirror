import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://codepartmirror.vercel.app"
  ),

  title: {
    default: "Part Code Management",
    template: "%s | Part Code Management",
  },

  description:
    "Sistem pengelolaan dan pembuatan kode part SU2ID dan KS berdasarkan area, kode part, dan warna.",

  keywords: [
    "Part Code Management",
    "Part Code",
    "SU2ID",
    "KS",
    "Part Number",
    "Part Management",
    "Quality Control",
    "Assembly",
    "Automotive",
  ],

  authors: [
    {
      name: "Part Code Management",
    },
  ],

  creator: "Part Code Management",

  applicationName:
    "Part Code Management",

  generator: "Next.js",

  referrer: "origin-when-cross-origin",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      "max-image-preview": "large",

      "max-snippet": -1,

      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },

      {
        url: "/icon.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],

    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    type: "website",

    locale: "id_ID",

    url: "https://codepartmirror.vercel.app",

    siteName:
      "Part Code Management",

    title:
      "Part Code Management",

    description:
      "Sistem pengelolaan kode part SU2ID dan KS secara cepat dan terstruktur.",

    images: [
      {
        url: "/og-image.png",

        width: 1200,

        height: 630,

        alt:
          "Part Code Management",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Part Code Management",

    description:
      "Sistem pengelolaan kode part SU2ID dan KS.",

    images: [
      "/og-image.png",
    ],
  },

  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {

  width: "device-width",

  initialScale: 1,

  maximumScale: 1,

  themeColor: "#2563eb",

  colorScheme: "light",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="id">

      <body className="min-h-screen bg-slate-100 antialiased">

        {children}

      </body>

    </html>

  );
}