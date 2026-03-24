import { api } from '../../interceptors/api';
import { jwtService } from './jwt.service';
import type { User } from '../user.model';

export const userService = {
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
