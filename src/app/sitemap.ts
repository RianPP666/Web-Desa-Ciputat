import { MetadataRoute } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // GANTI URL INI DENGAN DOMAIN .my.id ANDA NANTINYA
  // GANTI URL INI JIKA NANTI NAMA DOMAINNYA BERBEDA
  const baseUrl = 'https://desaciputat.devzonee.my.id';

  let newsUrls: MetadataRoute.Sitemap = [];
  try {
    const querySnapshot = await getDocs(collection(db, "news"));
    newsUrls = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const date = data.date ? new Date(data.date) : new Date();
      return {
        url: `${baseUrl}/berita/${doc.id}`,
        lastModified: date,
        changeFrequency: 'weekly',
        priority: 0.8,
      };
    });
  } catch (error) {
    console.error("Error fetching news for sitemap:", error);
  }

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/profil`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/berita`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/kegiatan`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/galeri`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/potensi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/layanan`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.9 },
    { url: `${baseUrl}/download`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/kontak`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
  ];

  return [...staticUrls, ...newsUrls];
}
