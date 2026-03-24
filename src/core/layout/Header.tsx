import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { defaultImage } from '../../shared/utils/defaultImage';

export function Header() {
  const { user, authState } = useAuth();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">conduit</Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          {authState === 'loading' && (
            <li className="nav-item"><span className="nav-link">Loading...</span></li>
          )}
          {authState === 'unauthenticated' && (
            <>
              <li className="nav-item"><NavLink className="nav-link" to="/login">Sign in</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/register">Sign up</NavLink></li>
            </>
          )}
          {(authState === 'authenticated' || authState === 'unavailable') && user && (
            <>
              <li className="nav-item"><NavLink className="nav-link" to="/editor"><i className="ion-compose" />&nbsp;New Article</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/settings"><i className="ion-gear-a" />&nbsp;Settings</NavLink></li>
              <li className="nav-item">
                <NavLink className="nav-link" to={`/profile/${user.username}`}>
                  <img src={defaultImage(user.image)} className="user-pic" alt={user.username} />
                  {user.username}
                </NavLink>
              </li>
            </>
          )}
          {authState === 'unavailable' && !user && (
            <li className="nav-item"><span className="nav-link">Connecting...</span></li>
          )}
        </ul>
      </div>
    </nav>
  );
}
