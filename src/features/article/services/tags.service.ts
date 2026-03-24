import { api } from '../../../core/interceptors/api';

export const tagsService = {
  getAll: async (): Promise<string[]> => {
    const { data } = await api.get<{ tags: string[] }>('/tags');
    return data.tags;
  },
};
