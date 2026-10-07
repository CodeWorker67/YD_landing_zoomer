import { Helmet } from 'react-helmet-async';
import Header from '@components/navigation/Header';
import Footer from '@components/navigation/Footer';
import { useTrackedLinks } from '@/hooks/useTrackedLinks';

export default function PrivacyPage() {
  const { supportUrl } = useTrackedLinks();

  return (
    <div style={{ width: '100%', fontFamily: 'Manrope,-apple-system,sans-serif', color: '#0F0F0F', background: '#fff' }}>
      <Helmet>
        <title>Политика конфиденциальности — Happ</title>
      </Helmet>
      <Header />
      <article className="legal-page">
        <h1>Политика конфиденциальности</h1>
        <p className="legal-updated">Дата вступления в силу: 1 октября 2026 г.</p>

        <h2>1. Какие данные мы собираем</h2>
        <p>При использовании сервиса Happ мы можем собирать следующую информацию:</p>
        <ul>
          <li>адрес электронной почты, указанный при оплате;</li>
          <li>данные об аккаунте и сроке подписки;</li>
          <li>информацию о платежах (сумма, метод оплаты, статус).</li>
        </ul>

        <h2>2. Что мы не собираем</h2>
        <ul>
          <li>историю посещённых сайтов;</li>
          <li>содержание трафика;</li>
          <li>DNS-запросы.</li>
        </ul>
        <p>Мы не ведём журналы активности подключения.</p>

        <h2>3. Как мы используем данные</h2>
        <p>
          Собранные данные используются исключительно для предоставления услуги, обработки платежей и технической
          поддержки. Данные не продаются и не передаются третьим лицам, кроме случаев, предусмотренных законом.
        </p>

        <h2>4. Контакты</h2>
        <p>
          По вопросам конфиденциальности напишите в поддержку:{' '}
          <a href={supportUrl} target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
          .
        </p>
      </article>
      <Footer />
    </div>
  );
}
