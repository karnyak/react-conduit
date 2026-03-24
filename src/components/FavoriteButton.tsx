import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { articlesService } from '../features/article/services/articles.service';
import type { Article } from '../features/article/models/article.model';

interface Props {
  article: Article;
  onToggle: (updated: Article) => void;
}

export function FavoriteButton({ article, onToggle }: Props) {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggle = async () => {
    if (authState !== 'authenticated') {
      navigate('/register');
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const updated = article.favorited
        ? await articlesService.unfavorite(article.slug)
        : await articlesService.favorite(article.slug);
      onToggle(updated);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      className={`btn btn-sm pull-xs-right${article.favorited ? ' btn-primary' : ' btn-outline-primary'}`}
      onClick={toggle}
      disabled={isSubmitting}
    >
      <i className="ion-heart" /> {article.favoritesCount}
    </button>
  );
}
