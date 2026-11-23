import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL_HOME } from '@utils/siteUrl';
import Header from '@components/navigation/Header';
import Footer from '@components/navigation/Footer';
import HeroSection from '@components/sections/HeroSection';

const Ticker = lazy(() => import('@components/sections/Ticker'));
const FeaturesSection = lazy(() => import('@components/sections/FeaturesSection'));
const StepsSection = lazy(() => import('@components/sections/StepsSection'));
const PricingSection = lazy(() => import('@components/sections/PricingSection'));
const FaqSection = lazy(() => import('@components/sections/FaqSection'));
const CtaSection = lazy(() => import('@components/sections/CtaSection'));

export default function HomePage() {
  return (
    <div style={{ width: '100%', fontFamily: 'Manrope,-apple-system,sans-serif', color: '#0F0F0F' }}>
      <Helmet>
        <title>Happ — Официальный сайт, 1 день бесплатно</title>
        <meta
          name="description"
          content="Самый быстрый и стабильный сервис, моментальное подключение, работает везде! 1 день бесплатно, аккаунт создаётся автоматически"
        />
        <link rel="canonical" href={SITE_URL_HOME} />
        <meta property="og:url" content={SITE_URL_HOME} />
        <meta property="og:title" content="Happ — Официальный сайт, 1 день бесплатно" />
        <meta
          property="og:description"
          content="Самый быстрый и стабильный сервис, моментальное подключение, работает везде! 1 день бесплатно, аккаунт создаётся автоматически"
        />
      </Helmet>
      <Header />
      <HeroSection />
      <Suspense fallback={null}>
        <Ticker />
        <FeaturesSection />
        <StepsSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </Suspense>
      <Footer />
    </div>
  );
}