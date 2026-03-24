import { api } from '../../../core/interceptors/api';
import type { Profile } from '../models/profile.model';

export const profileService = {
  get: async (username: string): Promise<Profile> => {
    const { data } = await api.get<{ profile: Profile }>(`/profiles/${username}`);
    return data.profile;
  },

  follow: async (username: string): Promise<Profile> => {
    const { data } = await api.post<{ profile: Profile }>(`/profiles/${username}/follow`);
    return data.profile;
  },

  unfollow: async (username: string): Promise<Profile> => {
    const { data } = await api.delete<{ profile: Profile }>(`/profiles/${username}/follow`);
    return data.profile;
  },
};
