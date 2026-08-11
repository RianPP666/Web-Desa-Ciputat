import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import newsData from "@/data/news.json";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  date: string;
  content?: string;
  thumbnail?: string;
  category?: string;
}

// Generate static params from local JSON data
export async function generateStaticParams() {
  return (newsData as NewsItem[]).map((news) => ({
    slug: news.slug || news.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = (newsData as NewsItem[]).find(
    (n) => n.slug === slug || n.id === slug
  );
  if (!news) return { title: "Berita Tidak Ditemukan" };
  return {
    title: news.title,
    description: news.excerpt || news.title,
    openGraph: {
      images: news.thumbnail ? [news.thumbnail] : [],
    },
  };
}

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = (newsData as NewsItem[]).find(
    (n) => n.slug === slug || n.id === slug
  );

  if (!news) {
    notFound();
  }

  const formattedDate = new Date(news.date).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom max-w-4xl">
        {/* Back Button */}
        <FadeIn>
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            Kembali ke Daftar Berita
          </Link>
        </FadeIn>

        {/* Article Header */}
        <FadeIn delay={0.1}>
          <div className="mb-8">
            <div className="flex items-center gap-3 text-sm text-muted mb-4">
              <Calendar size={16} className="text-primary" />
              <time>{formattedDate}</time>
              {news.category && (
                <>
                  <span className="text-border">•</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {news.category}
                  </span>
                </>
              )}
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {news.title}
            </h1>
            {news.excerpt && (
              <p className="mt-4 text-lg text-muted leading-relaxed">
                {news.excerpt}
              </p>
            )}
          </div>
        </FadeIn>

        {/* Featured Image - Now using next/image (PERF-1) */}
        {news.thumbnail && (
          <FadeIn delay={0.2}>
            <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden mb-10 shadow-lg">
              <Image
                src={news.thumbnail}
                alt={news.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          </FadeIn>
        )}

        {/* Article Content */}
        <FadeIn delay={0.3}>
          <article className="prose prose-lg max-w-none text-foreground leading-relaxed">
            {news.content?.split("\n").map((paragraph: string, index: number) => (
              paragraph.trim() ? (
                <p key={index} className="mb-4 text-gray-700 leading-[1.8]">
                  {paragraph}
                </p>
              ) : null
            ))}
          </article>
        </FadeIn>

        {/* Divider & Back */}
        <FadeIn delay={0.4}>
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft size={18} />
              Lihat Berita Lainnya
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
