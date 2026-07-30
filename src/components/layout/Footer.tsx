import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import settingsData from "@/data/settings.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Description */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center font-heading font-bold text-2xl">
                DC
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
                <Link href="/layanan" className="hover:text-accent transition-colors">Layanan Publik</Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-accent transition-colors">Berita Terkini</Link>
              </li>
              <li>
                <Link href="/download" className="hover:text-accent transition-colors">Unduh Dokumen</Link>
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
                <span>{settingsData.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-accent shrink-0" size={18} />
                <span>{settingsData.contact.email}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading font-semibold text-lg text-white mb-2">Media Sosial</h3>
            <p className="text-sm text-gray-400 mb-2">Ikuti kami untuk mendapatkan informasi terbaru.</p>
            <div className="flex items-center gap-4">
              <a href={settingsData.socialMedia.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent hover:text-white transition-all text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href={settingsData.socialMedia.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent hover:text-white transition-all text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href={settingsData.socialMedia.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent hover:text-white transition-all text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href={settingsData.socialMedia.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent hover:text-white transition-all text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Pemerintah {settingsData.villageName}. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/kebijakan-privasi" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="/syarat-ketentuan" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
