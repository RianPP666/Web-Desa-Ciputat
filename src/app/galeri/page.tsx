import galleryData from "@/data/gallery.json";
import FadeIn from "@/components/ui/FadeIn";
import Image from "next/image";

export const metadata = {
  title: "Galeri",
  description: "Dokumentasi foto dan video kegiatan desa.",
};

export default function GaleriPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="bg-section-bg py-16 mb-16 border-b border-border">
        <div className="container-custom text-center">
          <FadeIn>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Galeri Desa
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Kumpulan dokumentasi visual berbagai aktivitas dan keindahan yang ada di desa.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container-custom">
        {/* Filter Dummy */}
        <FadeIn className="flex flex-wrap justify-center gap-3 mb-12">
          <button className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium">Semua</button>
          <button className="px-6 py-2 bg-white border border-border text-foreground hover:bg-gray-50 rounded-full text-sm font-medium transition-colors">Pemerintahan</button>
          <button className="px-6 py-2 bg-white border border-border text-foreground hover:bg-gray-50 rounded-full text-sm font-medium transition-colors">Pembangunan</button>
          <button className="px-6 py-2 bg-white border border-border text-foreground hover:bg-gray-50 rounded-full text-sm font-medium transition-colors">Kemasyarakatan</button>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryData.map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.05} className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-pointer">
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">{item.category}</span>
                <h3 className="text-white font-medium line-clamp-2">{item.title}</h3>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
