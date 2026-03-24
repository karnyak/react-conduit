import { api } from '../../../core/interceptors/api';
import type { Comment } from '../models/comment.model';

export const commentsService = {
  getAll: async (slug: string): Promise<Comment[]> => {
    const { data } = await api.get<{ comments: Comment[] }>(`/articles/${slug}/comments`);
    return data.comments;
  },

  add: async (slug: string, body: string): Promise<Comment> => {
    const { data } = await api.post<{ comment: Comment }>(`/articles/${slug}/comments`, { comment: { body } });
    return data.comment;
  },

  delete: (slug: string, commentId: number) => api.delete(`/articles/${slug}/comments/${commentId}`),
};
