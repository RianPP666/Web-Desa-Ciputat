import potensiData from "@/data/potensi.json";
import PotensiCard from "@/components/cards/PotensiCard";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Potensi Desa",
  description: "Jelajahi potensi dan produk unggulan desa kami.",
};

export default function PotensiPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="bg-section-bg py-16 mb-16 border-b border-border">
        <div className="container-custom text-center">
          <FadeIn>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Potensi Desa
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Berbagai potensi unggulan yang dimiliki oleh desa kami mulai dari hasil pertanian hingga pariwisata.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container-custom">
        <div className={`grid grid-cols-1 gap-8 ${potensiData.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {potensiData.map((potensi, index) => (
            <FadeIn key={potensi.id} delay={index * 0.1}>
              <PotensiCard {...potensi} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
