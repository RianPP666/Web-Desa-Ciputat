import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface PotensiCardProps {
  title: string;
  category: string;
  image: string;
  description: string;
}

export default function PotensiCard({ title, category, image, description }: PotensiCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border group flex flex-col h-full">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-white/90 text-sm font-medium mb-1 block">
            {category}
          </span>
          <h3 className="font-heading font-semibold text-xl text-white">
            {title}
          </h3>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-muted text-sm mb-6 line-clamp-4 flex-grow">
          {description}
        </p>
        <Link
          href="/potensi"
          className="inline-flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors mt-auto"
        >
          Selengkapnya <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
