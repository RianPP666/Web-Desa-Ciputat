import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://desaciputat.devzonee.my.id"),
  title: {
    template: "%s | Website Resmi Desa Ciputat",
    default: "Website Resmi Desa Ciputat | Kec. Ciawigebang, Kab. Kuningan",
  },
  description: "Portal resmi informasi, layanan, dan potensi Desa Ciputat, Kecamatan Ciawigebang, Kabupaten Kuningan, Jawa Barat.",
  keywords: ["desa ciputat", "ciawigebang", "kuningan", "pemerintahan desa", "informasi desa", "layanan masyarakat", "potensi desa", "jawa barat"],
  authors: [{ name: "Pemerintah Desa Ciputat" }],
  icons: {
    icon: "/logo-kuningan.png",
    apple: "/logo-kuningan.png",
  },
  openGraph: {
    title: "Website Resmi Desa Ciputat",
    description: "Portal resmi informasi, layanan, dan potensi Desa Ciputat, Kecamatan Ciawigebang, Kabupaten Kuningan, Jawa Barat.",
    url: "https://desaciputat.devzonee.my.id",
    siteName: "Pemerintah Desa Ciputat",
    locale: "id_ID",
    type: "website",
    images: ["/logo-kuningan.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Resmi Desa Ciputat",
    description: "Portal resmi informasi, layanan, dan potensi Desa Ciputat, Kecamatan Ciawigebang, Kabupaten Kuningan.",
    images: ["/logo-kuningan.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans antialiased text-foreground bg-background pt-[80px]">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
