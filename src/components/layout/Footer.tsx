"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import settingsData from "@/data/settings.json";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#111827] text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand & Description */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 relative rounded-full overflow-hidden shrink-0">
                <Image src="/logo-kuningan.png" alt="Logo Desa Ciputat" fill className="object-cover" sizes="48px" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white leading-tight">
                  {settingsData.villageName}
                </span>
                <span className="text-sm text-gray-400">Pemerintah Desa Resmi</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mt-2">
              {settingsData.tagline}. Portal resmi informasi, layanan publik, dan potensi desa untuk masyarakat dan pengunjung.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading font-semibold text-lg text-white mb-2">Tautan Cepat</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li>
                <Link href="/profil" className="hover:text-accent transition-colors">Profil Desa</Link>
              </li>
              <li>
                <Link href="/potensi" className="hover:text-accent transition-colors">Potensi Desa</Link>
              </li>
              <li>
                <Link href="/umkm" className="hover:text-accent transition-colors">UMKM</Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-accent transition-colors">Berita Terkini</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading font-semibold text-lg text-white mb-2">Kontak Kami</h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-accent shrink-0" size={18} />
                <span>{settingsData.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-accent shrink-0" size={18} />
                <a href="tel:+6282240202304" className="hover:text-accent transition-colors">{settingsData.contact.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-accent shrink-0" size={18} />
                <a href={`mailto:${settingsData.contact.email}`} className="hover:text-accent transition-colors">{settingsData.contact.email}</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Pemerintah {settingsData.villageName}. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
