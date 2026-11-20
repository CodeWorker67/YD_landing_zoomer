import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ROUTES } from '@utils/constants';

const HomePage = lazy(() => import('@pages/HomePage'));
const PrivacyPage = lazy(() => import('@pages/PrivacyPage'));
const TermsPage = lazy(() => import('@pages/TermsPage'));

function DismissLandingShell() {
  useEffect(() => {
    document.getElementById('landing-shell')?.remove();
    document.getElementById('landing-shell-style')?.remove();
  }, []);
  return null;
}

function ScrollOnRouteChange() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const scroll = () => {
      if (hash) {
        const id = decodeURIComponent(hash.replace('#', ''));
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0 });
    };
    scroll();
    const t = window.setTimeout(scroll, 100);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <DismissLandingShell />
        <ScrollOnRouteChange />
        <Suspense fallback={null}>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
            <Route path={ROUTES.TERMS} element={<TermsPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}