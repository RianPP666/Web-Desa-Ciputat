import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  thumbnail: string;
  slug: string;
}

export default function NewsCard({ title, excerpt, date, category, thumbnail, slug }: NewsCardProps) {
  // Format date
  const formattedDate = new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border group flex flex-col h-full">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-muted text-sm mb-2">{formattedDate}</span>
        <h3 className="font-heading font-semibold text-xl text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted text-sm mb-6 line-clamp-3 flex-grow">
          {excerpt}
        </p>
        <Link
          href={`/berita/${slug}`}
          className="inline-flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors mt-auto"
          aria-label={`Baca selengkapnya tentang ${title}`}
        >
          Baca Selengkapnya <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
