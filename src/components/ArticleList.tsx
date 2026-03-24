import { useState, useEffect } from 'react';
import { articlesService } from '../features/article/services/articles.service';
import { ArticlePreview } from './ArticlePreview';
import type { Article, ArticleListConfig } from '../features/article/models/article.model';

interface Props {
  config: ArticleListConfig;
  currentPage: number;
  isFollowingFeed: boolean;
  onPageChange: (page: number) => void;
  limit?: number;
}

export function ArticleList({ config, currentPage, isFollowingFeed, onPageChange, limit = 10 }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    articlesService
      .query(config, currentPage, limit)
      .then(({ articles, articlesCount }) => {
        setArticles(articles);
        setArticlesCount(articlesCount);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.type, JSON.stringify(config.filters), currentPage, limit]);

  const totalPages = Math.ceil(articlesCount / limit);

  if (loading) {
    return <div className="article-preview">Loading articles...</div>;
  }

  if (!articles.length) {
    return (
      <div className="article-preview">
        {isFollowingFeed
          ? 'Follow some authors to see their articles here.'
          : 'No articles are here... yet.'}
      </div>
    );
  }

  return (
    <>
      {articles.map((article) => (
        <ArticlePreview
          key={article.slug}
          article={article}
          onFavoriteToggle={(updated) =>
            setArticles((prev) => prev.map((a) => (a.slug === updated.slug ? updated : a)))
          }
        />
      ))}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <li key={p} className={`page-item${p === currentPage ? ' active' : ''}`}>
                <button className="page-link" onClick={() => onPageChange(p)}>{p}</button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
