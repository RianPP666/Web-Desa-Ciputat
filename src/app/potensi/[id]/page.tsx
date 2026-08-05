import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import potensiData from "@/data/potensi.json";
import FadeIn from "@/components/ui/FadeIn";

export async function generateStaticParams() {
  return potensiData.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const potensi = potensiData.find((p) => p.id === resolvedParams.id);
  if (!potensi) return { title: "Not Found" };
  return { title: `${potensi.title} | Potensi Desa` };
}

export default async function PotensiDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const potensi = potensiData.find((p) => p.id === resolvedParams.id);
  
  if (!potensi) {
    notFound();
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <FadeIn>
          <Link 
            href="/potensi" 
            className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Kembali ke Daftar Potensi
          </Link>
        </FadeIn>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border">
          <div className="relative h-[300px] md:h-[500px] w-full">
            <Image
              src={potensi.image}
              alt={potensi.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <FadeIn delay={0.1}>
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-white font-medium text-sm mb-4">
                  {potensi.category}
                </span>
                <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-2">
                  {potensi.title}
                </h1>
              </FadeIn>
            </div>
          </div>

          <div className="p-8 md:p-12 bg-white">
            <FadeIn delay={0.2}>
              <div className="prose prose-lg max-w-4xl prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted prose-p:leading-relaxed">
                {potensi.description.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
