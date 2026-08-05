"use client";

import { useState } from "react";
import galleryData from "@/data/gallery.json";
import FadeIn from "@/components/ui/FadeIn";
import Image from "next/image";

// Ambil semua kategori unik dari data galeri
const categories = ["Semua", ...Array.from(new Set(galleryData.map(item => item.category)))];

export default function GaleriPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredData = activeCategory === "Semua"
    ? galleryData
    : galleryData.filter(item => item.category === activeCategory);

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
        {/* Filter Kategori */}
        <FadeIn className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "bg-white border border-border text-foreground hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredData.map((item, index) => (
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

        {filteredData.length === 0 && (
          <div className="text-center py-16 text-muted">
            <p className="text-lg">Belum ada foto untuk kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
