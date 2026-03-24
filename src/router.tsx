import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './core/auth/AuthContext';
import { Header } from './core/layout/Header';
import { Footer } from './core/layout/Footer';

const HomePage = lazy(() => import('./features/article/pages/home/HomePage').then(m => ({ default: m.HomePage })));
const AuthPage = lazy(() => import('./features/article/pages/auth/AuthPage').then(m => ({ default: m.AuthPage })));
const ArticlePage = lazy(() => import('./features/article/pages/article/ArticlePage').then(m => ({ default: m.ArticlePage })));
const EditorPage = lazy(() => import('./features/article/pages/editor/EditorPage').then(m => ({ default: m.EditorPage })));
const ProfilePage = lazy(() => import('./features/profile/pages/profile/ProfilePage').then(m => ({ default: m.ProfilePage })));
const SettingsPage = lazy(() => import('./features/settings/SettingsPage').then(m => ({ default: m.SettingsPage })));

function Layout() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { authState } = useAuth();
  if (authState === 'loading') return null;
  if (authState === 'unauthenticated') return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function RedirectIfAuth({ children }: { children: React.ReactNode }) {
  const { authState } = useAuth();
  if (authState === 'loading') return null;
  if (authState === 'authenticated') return <Navigate to="/" replace />;
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/tag/:tag', element: <HomePage /> },
      { path: '/login', element: <RedirectIfAuth><AuthPage /></RedirectIfAuth> },
      { path: '/register', element: <RedirectIfAuth><AuthPage /></RedirectIfAuth> },
      { path: '/article/:slug', element: <ArticlePage /> },
      { path: '/editor', element: <RequireAuth><EditorPage /></RequireAuth> },
      { path: '/editor/:slug', element: <RequireAuth><EditorPage /></RequireAuth> },
      { path: '/settings', element: <RequireAuth><SettingsPage /></RequireAuth> },
      { path: '/profile/:username', element: <ProfilePage /> },
      { path: '/profile/:username/favorites', element: <ProfilePage /> },
    ],
  },
]);
