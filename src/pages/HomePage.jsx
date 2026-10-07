import { Helmet } from 'react-helmet-async';
import Header from '@components/navigation/Header';
import Footer from '@components/navigation/Footer';
import HeroSection from '@components/sections/HeroSection';
import Ticker from '@components/sections/Ticker';
import FeaturesSection from '@components/sections/FeaturesSection';
import StepsSection from '@components/sections/StepsSection';
import PricingSection from '@components/sections/PricingSection';
import FaqSection from '@components/sections/FaqSection';
import CtaSection from '@components/sections/CtaSection';

export default function HomePage() {
  return (
    <div style={{ width: '100%', fontFamily: 'Manrope,-apple-system,sans-serif', color: '#0F0F0F' }}>
      <Helmet>
        <title>Happ — Официальный сайт, 1 день бесплатно</title>
        <meta
          name="description"
          content="Самый быстрый и стабильный сервис, моментальное подключение, работает везде! 1 день бесплатно, аккаунт создаётся автоматически"
        />
        <meta property="og:title" content="Happ — Официальный сайт, 1 день бесплатно" />
        <meta
          property="og:description"
          content="Самый быстрый и стабильный сервис, моментальное подключение, работает везде! 1 день бесплатно, аккаунт создаётся автоматически"
        />
      </Helmet>
      <Header />
      <HeroSection />
      <Ticker />
      <FeaturesSection />
      <StepsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
