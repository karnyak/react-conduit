import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { Article } from '../features/article/models/article.model';
import { defaultImage } from '../shared/utils/defaultImage';

interface Props {
  article: Article;
  children?: ReactNode;
}

export function ArticleMeta({ article, children }: Props) {
  const { author, createdAt } = article;
  return (
    <div className="article-meta">
      <Link to={`/profile/${author.username}`}>
        <img src={defaultImage(author.image)} alt={author.username} />
      </Link>
      <div className="info">
        <Link to={`/profile/${author.username}`} className="author">{author.username}</Link>
        <span className="date">
          {new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>
      {children}
    </div>
  );
}
