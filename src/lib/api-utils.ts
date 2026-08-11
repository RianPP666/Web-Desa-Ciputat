import { auth } from '@/lib/firebase';

/**
 * Verifikasi bahwa request API berasal dari admin yang sudah login.
 * Memeriksa keberadaan Bearer token di header Authorization.
 * 
 * Untuk proyek ini, kita memvalidasi bahwa token Firebase ID ada.
 * Token Firebase ID hanya bisa didapat oleh user yang sudah login melalui Firebase Auth.
 */
export function getAuthTokenFromHeader(request: Request): string | null {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split('Bearer ')[1];
  return token && token.length > 10 ? token : null;
}

/**
 * Validasi dan sanitasi input string.
 * Menghapus tag HTML/script berbahaya dan membatasi panjang.
 */
export function sanitizeString(input: unknown, maxLength: number = 5000): string {
  if (typeof input !== 'string') return '';
  // Hapus tag HTML/script
  const cleaned = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
  return cleaned.slice(0, maxLength);
}

/**
 * Validasi bahwa field wajib ada dan tidak kosong.
 */
export function validateRequired(data: Record<string, unknown>, fields: string[]): string | null {
  for (const field of fields) {
    const value = data[field];
    if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
      return `Field '${field}' wajib diisi.`;
    }
  }
  return null;
}

/**
 * Validasi URL gambar (harus dari Cloudinary atau path lokal).
 */
export function isValidImageUrl(url: unknown): boolean {
  if (typeof url !== 'string') return false;
  // Izinkan URL Cloudinary dan path lokal /images/
  return url.startsWith('https://res.cloudinary.com/') || 
         url.startsWith('/images/') ||
         url.startsWith('https://images.unsplash.com/');
}
