import settingsData from "@/data/settings.json";
import FadeIn from "@/components/ui/FadeIn";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
  title: "Kontak Kami",
  description: "Informasi kontak dan lokasi kantor pemerintahan desa.",
};

export default function KontakPage() {
  return (
    <div className="pt-24 pb-0">
      <div className="bg-section-bg py-16 mb-16 border-b border-border">
        <div className="container-custom text-center">
          <FadeIn>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Kontak Kami
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Hubungi kami untuk mendapatkan bantuan dan informasi lebih lanjut mengenai pelayanan desa.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container-custom mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <FadeIn className="lg:col-span-1 space-y-6">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Informasi Kontak</h2>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Alamat Kantor</h3>
                <p className="text-muted text-sm leading-relaxed">{settingsData.contact.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Telepon / WhatsApp</h3>
                <p className="text-muted text-sm">{settingsData.contact.phone}</p>
                <p className="text-muted text-sm">{settingsData.contact.whatsapp}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Email</h3>
                <p className="text-muted text-sm">{settingsData.contact.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Jam Operasional</h3>
                <p className="text-muted text-sm">{settingsData.contact.officeHours}</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="lg:col-span-2" delay={0.2}>
            <div className="bg-white p-8 rounded-3xl border border-border shadow-sm h-full">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Kirim Pesan</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Masukkan nama Anda" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email / No. HP</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Email atau nomor yang bisa dihubungi" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Topik pesan" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Tuliskan pesan Anda di sini..."></textarea>
                </div>
                <button type="button" className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-secondary transition-colors w-full md:w-auto">
                  Kirim Pesan Sekarang
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Full Width Map */}
      <div className="w-full h-[500px] bg-gray-200">
        <iframe 
          src={settingsData.mapEmbedUrl}
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
