import { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { tagsService } from '../features/article/services/tags.service';
import { ArticleList } from '../components/ArticleList';
import type { ArticleListConfig } from '../features/article/models/article.model';

export function Home() {
  const { tag } = useParams<{ tag?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { authState } = useAuth();
  const navigate = useNavigate();

  const [tags, setTags] = useState<string[]>([]);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const isFollowingFeed = searchParams.get('feed') === 'following';

  const config: ArticleListConfig = isFollowingFeed
    ? { type: 'feed', filters: {} }
    : tag
      ? { type: 'all', filters: { tag } }
      : { type: 'all', filters: {} };

  useEffect(() => {
    tagsService.getAll().then(setTags).catch(() => {});
  }, []);

  // Redirect to login if unauthenticated user tries to access "Your Feed"
  useEffect(() => {
    if (isFollowingFeed && authState === 'unauthenticated') {
      navigate('/login');
    }
  }, [isFollowingFeed, authState, navigate]);

  const setPage = (p: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(p));
      return next;
    });
  };

  const showGlobalFeed = () => setSearchParams({});
  const showFollowingFeed = () => setSearchParams({ feed: 'following' });

  return (
    <div className="home-page">
      {authState === 'unauthenticated' && (
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
      )}

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {authState === 'authenticated' && (
                  <li className="nav-item">
                    <button
                      className={`nav-link${isFollowingFeed ? ' active' : ''}`}
                      onClick={showFollowingFeed}
                    >
                      Your Feed
                    </button>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className={`nav-link${!isFollowingFeed && !tag ? ' active' : ''}`}
                    onClick={showGlobalFeed}
                  >
                    Global Feed
                  </button>
                </li>
                {tag && (
                  <li className="nav-item">
                    <span className="nav-link active">
                      <i className="ion-pound" /> {tag}
                    </span>
                  </li>
                )}
              </ul>
            </div>

            <ArticleList
              config={config}
              currentPage={page}
              isFollowingFeed={isFollowingFeed}
              onPageChange={setPage}
            />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <div className="tag-list">
                {tags.map((t) => (
                  <Link key={t} to={`/tag/${t}`} className="tag-pill tag-default">
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
