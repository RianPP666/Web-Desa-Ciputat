import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // GANTI URL INI JIKA NANTI NAMA DOMAINNYA BERBEDA
  const baseUrl = 'https://desaciputat.my.id';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Jika nanti ada API internal
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
