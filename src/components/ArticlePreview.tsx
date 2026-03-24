import { Link } from 'react-router-dom';
import { ArticleMeta } from './ArticleMeta';
import { FavoriteButton } from './FavoriteButton';
import type { Article } from '../features/article/models/article.model';

interface Props {
  article: Article;
  onFavoriteToggle: (updated: Article) => void;
}

export function ArticlePreview({ article, onFavoriteToggle }: Props) {
  return (
    <div className="article-preview">
      <ArticleMeta article={article}>
        <FavoriteButton article={article} onToggle={onFavoriteToggle} />
      </ArticleMeta>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li key={tag} className="tag-default tag-pill tag-outline">{tag}</li>
          ))}
        </ul>
      </Link>
    </div>
  );
}
