import { api } from '../core/interceptors/api';

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
}

export type AuthState = 'loading' | 'authenticated' | 'unauthenticated' | 'unavailable';

const TOKEN_KEY = 'jwtToken';

export const jwtService = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  saveToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  destroyToken: () => localStorage.removeItem(TOKEN_KEY),
};

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    const { data } = await api.post<{ user: User }>('/users/login', { user: { email, password } });
    jwtService.saveToken(data.user.token);
    return data.user;
  },

  register: async (username: string, email: string, password: string): Promise<User> => {
    const { data } = await api.post<{ user: User }>('/users', { user: { username, email, password } });
    jwtService.saveToken(data.user.token);
    return data.user;
  },

  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get<{ user: User }>('/user');
    return data.user;
  },

  update: async (fields: Partial<User> & { password?: string }): Promise<User> => {
    const { data } = await api.put<{ user: User }>('/user', { user: fields });
    jwtService.saveToken(data.user.token);
    return data.user;
  },

  logout: () => {
    jwtService.destroyToken();
    window.location.href = '/';
  },
};
