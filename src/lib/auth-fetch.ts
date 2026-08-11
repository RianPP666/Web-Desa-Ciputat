import { auth } from '@/lib/firebase';

/**
 * Wrapper fetch yang menyertakan token autentikasi Firebase.
 * Digunakan oleh halaman Admin untuk memanggil API routes yang dilindungi.
 */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('User belum login');
  }

  const token = await user.getIdToken();

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });
}
