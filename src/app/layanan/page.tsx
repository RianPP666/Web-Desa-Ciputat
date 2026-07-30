import servicesData from "@/data/services.json";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/ui/FadeIn";
import { FileText, Clock, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Layanan Publik",
  description: "Informasi mengenai jenis layanan masyarakat dan prosedur pengurusannya.",
};

export default function LayananPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="bg-section-bg py-16 mb-16 border-b border-border">
        <div className="container-custom text-center">
          <FadeIn>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Layanan Publik
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Informasi lengkap mengenai jenis layanan masyarakat, persyaratan, dan prosedur pengurusannya.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container-custom max-w-4xl">
        <div className="space-y-8">
          {servicesData.map((service, index) => (
            <FadeIn key={service.id} delay={index * 0.1}>
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-6 border-b border-border pb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-2">
                      {service.title}
                    </h2>
                    <p className="text-muted text-sm md:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                      <CheckCircle className="text-primary" size={20} />
                      Persyaratan
                    </h3>
                    <ul className="space-y-2">
                      {service.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                      <Clock className="text-primary" size={20} />
                      Prosedur & Waktu
                    </h3>
                    <ul className="space-y-3 mb-4">
                      {service.procedures.map((proc, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-muted text-sm">
                          <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{proc}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-gray-50 p-3 rounded-lg inline-flex items-center gap-2 border border-border text-sm font-medium text-gray-700">
                      Waktu Proses: <span className="text-primary">{service.processingTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
