import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from '@pages/HomePage';
import PrivacyPage from '@pages/PrivacyPage';
import TermsPage from '@pages/TermsPage';
import { ROUTES } from '@utils/constants';

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
        <ScrollOnRouteChange />
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
          <Route path={ROUTES.TERMS} element={<TermsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
