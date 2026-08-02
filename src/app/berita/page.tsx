import SectionTitle from "@/components/ui/SectionTitle";
import NewsCard from "@/components/cards/NewsCard";
import FadeIn from "@/components/ui/FadeIn";
import { Search } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const metadata = {
  title: "Berita",
  description: "Kumpulan berita dan informasi terbaru seputar desa.",
};

async function getNews() {
  try {
    const q = query(collection(db, "news"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "Tanpa Judul",
        excerpt: data.excerpt || "",
        date: data.date || new Date().toISOString(),
        thumbnail: data.image || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600&h=400",
        slug: data.slug || doc.id,
        category: data.category || "Berita",
      };
    }) as any[];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function BeritaPage() {
  const newsData = await getNews();

  return (
    <div className="pt-24 pb-20">
      <div className="bg-section-bg py-16 mb-16 border-b border-border">
        <div className="container-custom text-center">
          <FadeIn>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Berita Desa
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Ikuti perkembangan dan informasi terbaru yang terjadi di lingkungan desa kami.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <SectionTitle title="Semua Berita" />
          
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Cari berita..." 
              className="w-full pl-10 pr-4 py-3 rounded-full border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" size={18} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((news, index) => (
            <FadeIn key={news.id} delay={index * 0.1}>
              <NewsCard {...news} />
            </FadeIn>
          ))}
        </div>

        {/* Pagination Dummy */}
        <div className="flex justify-center mt-12 gap-2">
          <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-medium">1</button>
          <button className="w-10 h-10 rounded-full bg-white border border-border text-foreground hover:bg-gray-50 flex items-center justify-center font-medium transition-colors">2</button>
          <button className="w-10 h-10 rounded-full bg-white border border-border text-foreground hover:bg-gray-50 flex items-center justify-center font-medium transition-colors">3</button>
        </div>
      </div>
    </div>
  );
}
