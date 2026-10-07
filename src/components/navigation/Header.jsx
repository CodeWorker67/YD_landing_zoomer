import { useTrackedLinks } from '@/hooks/useTrackedLinks';

const NAV = [
  { href: '/#features', label: 'Возможности' },
  { href: '/#steps', label: 'Подключение' },
  { href: '/#pricing', label: 'Тарифы' },
  { href: '/#faq', label: 'FAQ' },
];

export default function Header() {
  const { authUrl } = useTrackedLinks();

  return (
    <header className="site-header">
      <a href="/#top" className="brand">
        <span className="brand-mark">H</span>
        <span className="brand-text">
          <span className="brand-name">Happ</span>
          <span className="brand-sub">Быстрый &amp; безопасный</span>
        </span>
      </a>
      <nav className="nav-links">
        {NAV.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="nav-login" href={authUrl}>
          Войти
        </a>
        <a className="nav-cta" href={authUrl}>
          Попробовать бесплатно
        </a>
      </div>
    </header>
  );
}
