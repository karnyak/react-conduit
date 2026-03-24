export interface User {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
}

export type AuthState = 'loading' | 'authenticated' | 'unauthenticated' | 'unavailable';
