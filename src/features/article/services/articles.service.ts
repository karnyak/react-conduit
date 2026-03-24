import { api } from '../../../core/interceptors/api';
import type { Article, ArticleListConfig } from '../models/article.model';

export const articlesService = {
  query: async (config: ArticleListConfig, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const params = { ...config.filters, limit, offset };
    const url = config.type === 'feed' ? '/articles/feed' : '/articles';
    const { data } = await api.get<{ articles: Article[]; articlesCount: number }>(url, { params });
    return data;
  },

  get: async (slug: string): Promise<Article> => {
    const { data } = await api.get<{ article: Article }>(`/articles/${slug}`);
    return data.article;
  },

  create: async (article: { title: string; description: string; body: string; tagList: string[] }): Promise<Article> => {
    const { data } = await api.post<{ article: Article }>('/articles/', { article });
    return data.article;
  },

  update: async (slug: string, article: Partial<Article>): Promise<Article> => {
    const { data } = await api.put<{ article: Article }>(`/articles/${slug}`, { article });
    return data.article;
  },

  delete: (slug: string) => api.delete(`/articles/${slug}`),

  favorite: async (slug: string): Promise<Article> => {
    const { data } = await api.post<{ article: Article }>(`/articles/${slug}/favorite`);
    return data.article;
  },

  unfavorite: async (slug: string): Promise<Article> => {
    const { data } = await api.delete<{ article: Article }>(`/articles/${slug}/favorite`);
    return data.article;
  },
};
