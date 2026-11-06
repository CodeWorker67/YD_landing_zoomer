import { Helmet } from 'react-helmet-async';
import Header from '@components/navigation/Header';
import Footer from '@components/navigation/Footer';
import { useTrackedLinks } from '@/hooks/useTrackedLinks';

export default function TermsPage() {
  const { supportUrl } = useTrackedLinks();

  return (
    <div style={{ width: '100%', fontFamily: 'Manrope,-apple-system,sans-serif', color: '#0F0F0F', background: '#fff' }}>
      <Helmet>
        <title>Пользовательское соглашение — Happ</title>
      </Helmet>
      <Header />
      <article className="legal-page">
        <h1>Пользовательское соглашение</h1>
        <p className="legal-updated">Дата вступления в силу: 1 октября 2026 г.</p>

        <h2>1. Общие положения</h2>
        <p>
          Настоящее соглашение регулирует использование сервиса Happ. Оплачивая тариф или используя сервис, вы
          принимаете эти условия.
        </p>

        <h2>2. Описание сервиса</h2>
        <p>
          Happ предоставляет доступ к конфигурациям подключения. Приложение Happ бесплатно; подписка добавляется в
          аккаунт после оплаты.
        </p>

        <h2>3. Правила использования</h2>
        <p>Запрещается использовать сервис для:</p>
        <ul>
          <li>распространения вредоносного ПО;</li>
          <li>рассылки спама;</li>
          <li>атак на другие серверы и сети;</li>
          <li>любой деятельности, нарушающей законодательство.</li>
        </ul>

        <h2>4. Оплата</h2>
        <p>
          Пробный период — 1 день бесплатно. Оплата производится картой или СБП. Возврат средств
          рассматривается индивидуально через поддержку.
        </p>

        <h2>5. Ограничение ответственности</h2>
        <p>
          Сервис предоставляется «как есть». Мы не гарантируем бесперебойную работу и не несём ответственности за
          убытки, связанные с использованием сервиса.
        </p>

        <h2>6. Контакты</h2>
        <p>
          Поддержка:{' '}
          <a href={supportUrl} target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
        </p>
      </article>
      <Footer />
    </div>
  );
}
