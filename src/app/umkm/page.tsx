import UmkmCard from "@/components/cards/UmkmCard";
import FadeIn from "@/components/ui/FadeIn";
import umkmData from "@/data/umkm.json";

export const metadata = {
  title: "UMKM",
  description: "Daftar usaha mikro, kecil, dan menengah (UMKM) warga Desa, lengkap dengan produk dan kontak pemesanan.",
};

export default function UmkmPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="bg-section-bg py-16 mb-16 border-b border-border">
        <div className="container-custom text-center">
          <FadeIn>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              UMKM Desa
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Dukung usaha mikro warga sekitar. Pesan langsung lewat kontak yang tersedia.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container-custom">
        {umkmData.length === 0 ? (
          <p className="text-muted text-center py-16">Belum ada data UMKM.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(umkmData as any[]).map((item, index) => (
              <FadeIn key={item.id} delay={index * 0.1}>
                <UmkmCard {...item} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}