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
  title: {
    template: "%s | Website Informasi Desa",
    default: "Website Informasi Desa",
  },
  description: "Portal resmi informasi, layanan, dan potensi Desa.",
  openGraph: {
    title: "Website Informasi Desa",
    description: "Portal resmi informasi, layanan, dan potensi Desa.",
    url: "https://desamakmur.go.id",
    siteName: "Desa Makmur",
    locale: "id_ID",
    type: "website",
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
