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
        <div className="max-w-4xl mx-auto">
          <FadeIn className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-border shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-xl mb-2 text-foreground">Alamat Kantor</h3>
                <p className="text-muted leading-relaxed">{settingsData.contact.address}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-border shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-xl mb-2 text-foreground">Telepon / WhatsApp</h3>
                <p className="text-muted">{settingsData.contact.phone}</p>
                <p className="text-muted">{settingsData.contact.whatsapp}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-border shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-xl mb-2 text-foreground">Email</h3>
                <p className="text-muted">{settingsData.contact.email}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-border shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-xl mb-2 text-foreground">Jam Operasional</h3>
                <p className="text-muted">{settingsData.contact.officeHours}</p>
              </div>
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
