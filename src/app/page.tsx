import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Home as HomeIcon, Map, TreePine } from "lucide-react";
import settingsData from "@/data/settings.json";
import potensiData from "@/data/potensi.json";
import newsData from "@/data/news.json";
import SectionTitle from "@/components/ui/SectionTitle";
import NewsCard from "@/components/cards/NewsCard";
import PotensiCard from "@/components/cards/PotensiCard";
import FadeIn from "@/components/ui/FadeIn";

export default function Home() {
  const latestNews = newsData.slice(0, 3);
  const topPotensi = potensiData.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-desa.jpeg"
            alt="Pemandangan Desa Ciputat"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        <div className="container-custom relative z-10 text-center">
          <FadeIn direction="up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-white font-medium text-sm mb-6 backdrop-blur-sm border border-white/10">
              Selamat Datang di Portal Resmi
            </span>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.1}>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {settingsData.villageName}
            </h1>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.2}>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light">
              {settingsData.tagline}
            </p>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/profil"
              className="px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-secondary transition-all hover:scale-105 shadow-lg flex items-center gap-2"
            >
              Tentang Desa
            </Link>
            <Link 
              href="/berita"
              className="px-8 py-4 bg-white/10 text-white backdrop-blur-md border border-white/20 rounded-full font-medium hover:bg-white/20 transition-all hover:scale-105 flex items-center gap-2"
            >
              Berita Terbaru
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white relative z-20 -mt-10 mx-4 md:mx-auto max-w-6xl rounded-2xl shadow-xl border border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-12">
          <FadeIn delay={0.1} className="text-center">
            <div className="w-14 h-14 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
              <Users size={28} />
            </div>
            <h3 className="font-heading text-3xl font-bold text-foreground">{settingsData.stats.population}</h3>
            <p className="text-muted text-sm mt-1">Penduduk</p>
          </FadeIn>
          <FadeIn delay={0.2} className="text-center">
            <div className="w-14 h-14 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
              <HomeIcon size={28} />
            </div>
            <h3 className="font-heading text-3xl font-bold text-foreground">{settingsData.stats.rt} / {settingsData.stats.rw}</h3>
            <p className="text-muted text-sm mt-1">RT / RW</p>
          </FadeIn>
          <FadeIn delay={0.3} className="text-center">
            <div className="w-14 h-14 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
              <TreePine size={28} />
            </div>
            <h3 className="font-heading text-3xl font-bold text-foreground">{settingsData.stats.dusun}</h3>
            <p className="text-muted text-sm mt-1">Dusun</p>
          </FadeIn>
          <FadeIn delay={0.4} className="text-center">
            <div className="w-14 h-14 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
              <Map size={28} />
            </div>
            <h3 className="font-heading text-3xl font-bold text-foreground">{settingsData.stats.area}</h3>
            <p className="text-muted text-sm mt-1">Luas Wilayah</p>
          </FadeIn>
        </div>
      </section>

      {/* Latest News */}
      <section className="section-padding bg-section-bg mt-10">
        <div className="container-custom">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <SectionTitle 
                title="Berita Terkini" 
                subtitle="Ikuti perkembangan dan informasi terbaru dari pemerintah desa kami."
              />
              <Link href="/berita" className="text-primary font-medium flex items-center gap-2 hover:text-secondary mb-4 md:mb-8">
                Lihat Semua <ArrowRight size={18} />
              </Link>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(latestNews as any[]).map((news, index) => (
              <FadeIn key={news.id} delay={index * 0.1}>
                <NewsCard {...news} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Potensi Desa Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <FadeIn>
            <SectionTitle 
              title="Potensi Desa" 
              subtitle="Menjelajahi kekayaan alam, budaya, dan produk unggulan desa kami."
              centered
            />
          </FadeIn>

          <div className={`grid grid-cols-1 gap-8 ${topPotensi.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' : 'md:grid-cols-3'}`}>
            {topPotensi.map((potensi, index) => (
              <FadeIn key={potensi.id} delay={index * 0.1}>
                <PotensiCard {...potensi} />
              </FadeIn>
            ))}
          </div>
          
          <FadeIn delay={0.3} className="text-center mt-12">
            <Link 
              href="/potensi"
              className="inline-flex px-8 py-3 bg-white text-foreground border border-border rounded-full font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              Lihat Selengkapnya
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Call to Action Map/Contact */}
      <section className="relative">
        <div className="h-[400px] w-full bg-gray-200">
          <iframe 
            title="Peta Lokasi Desa Ciputat"
            src={settingsData.mapEmbedUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
}
