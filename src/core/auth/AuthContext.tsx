import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthState } from './user.model';
import { userService } from './services/user.service';
import { jwtService } from './services/jwt.service';

interface AuthContextValue {
  user: User | null;
  authState: AuthState;
  setUser: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [authState, setAuthState] = useState<AuthState>('loading');

  useEffect(() => {
    const token = jwtService.getToken();
    if (!token) {
      setAuthState('unauthenticated');
      return;
    }
    userService.getCurrentUser()
      .then((u) => { setUserState(u); setAuthState('authenticated'); })
      .catch((err) => {
        if (err?.status >= 400 && err?.status < 500) {
          jwtService.destroyToken();
          setAuthState('unauthenticated');
        } else {
          setAuthState('unavailable');
        }
      });
  }, []);

  const setUser = (u: User) => { setUserState(u); setAuthState('authenticated'); };
  const logout = () => { jwtService.destroyToken(); setUserState(null); setAuthState('unauthenticated'); window.location.href = '/'; };

  return (
    <AuthContext.Provider value={{ user, authState, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
