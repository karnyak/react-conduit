import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/auth.service';
import { ListErrors } from '../shared/components/ListErrors';
import type { Errors } from '../core/models/errors.model';

export function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const isLogin = location.pathname === '/login';

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    setIsSubmitting(true);
    try {
      const user = isLogin
        ? await authService.login(email, password)
        : await authService.register(username, email, password);
      setUser(user);
      navigate('/');
    } catch (err: unknown) {
      setErrors(err as Errors);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{isLogin ? 'Sign in' : 'Sign up'}</h1>
            <p className="text-xs-center">
              {isLogin ? (
                <Link to="/register">Need an account?</Link>
              ) : (
                <Link to="/login">Have an account?</Link>
              )}
            </p>

            <ListErrors errors={errors} />

            <form onSubmit={handleSubmit}>
              <fieldset disabled={isSubmitting}>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isLogin ? 'Sign in' : 'Sign up'}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
