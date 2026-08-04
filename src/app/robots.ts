import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // GANTI URL INI JIKA NANTI NAMA DOMAINNYA BERBEDA
  const baseUrl = 'https://desaciputat.devzonee.my.id';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}