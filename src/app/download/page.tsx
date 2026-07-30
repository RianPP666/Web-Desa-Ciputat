import downloadData from "@/data/download.json";
import FadeIn from "@/components/ui/FadeIn";
import { Download as DownloadIcon, FileText } from "lucide-react";

export const metadata = {
  title: "Download Dokumen",
  description: "Pusat unduhan formulir, peraturan desa, dan dokumen penting lainnya.",
};

export default function DownloadPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="bg-section-bg py-16 mb-16 border-b border-border">
        <div className="container-custom text-center">
          <FadeIn>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Pusat Unduhan
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Silakan unduh berbagai formulir, dokumen resmi, dan peraturan desa di sini.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container-custom max-w-5xl">
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 p-4 border-b border-border font-semibold text-gray-600 text-sm">
            <div className="col-span-6">Nama Dokumen</div>
            <div className="col-span-2 text-center">Kategori</div>
            <div className="col-span-2 text-center">Ukuran</div>
            <div className="col-span-2 text-center">Aksi</div>
          </div>

          {/* List */}
          <div className="divide-y divide-border">
            {downloadData.map((doc, index) => (
              <FadeIn key={doc.id} delay={index * 0.05} direction="up" className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:items-center hover:bg-gray-50 transition-colors">
                <div className="col-span-12 md:col-span-6 flex items-start md:items-center gap-3">
                  <div className="w-10 h-10 rounded bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm md:text-base leading-tight md:leading-normal mb-1 md:mb-0">
                      {doc.title}
                    </h3>
                    <div className="flex md:hidden items-center gap-3 text-xs text-muted">
                      <span>{doc.category}</span>
                      <span>&bull;</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:block col-span-2 text-center text-sm text-muted">
                  <span className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium">
                    {doc.category}
                  </span>
                </div>
                
                <div className="hidden md:block col-span-2 text-center text-sm text-muted font-mono">
                  {doc.size}
                </div>
                
                <div className="col-span-12 md:col-span-2 flex justify-end md:justify-center mt-2 md:mt-0">
                  <a 
                    href={doc.url} 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    <DownloadIcon size={16} />
                    Unduh
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
