import { MetadataRoute } from 'next';
import newsData from '@/data/news.json';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // GANTI URL INI DENGAN DOMAIN .my.id ANDA NANTINYA
  // GANTI URL INI JIKA NANTI NAMA DOMAINNYA BERBEDA
  const baseUrl = 'https://desaciputat.devzonee.my.id';

  let newsUrls: MetadataRoute.Sitemap = [];
  try {
    newsUrls = (newsData as any[]).map((news) => {
      const date = news.date ? new Date(news.date) : new Date();
      return {
        url: `${baseUrl}/berita/${news.id}`,
        lastModified: date,
        changeFrequency: 'weekly',
        priority: 0.8,
      };
    });
  } catch (error) {
    console.error("Error generating news sitemap:", error);
  }

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/profil`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/berita`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/galeri`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/potensi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/umkm`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  return [...staticUrls, ...newsUrls];
}
