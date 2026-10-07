import { useState } from 'react';
import clsx from 'clsx';

const FAQ = [
  {
    q: 'Как зарегистрироваться?',
    a: 'Вы можете зарегистрироваться по Email, Телефону, Google, Telegram. Придумывать пароль сразу не нужно - это можно сделать позже в личном кабинете. При регистрации автоматически выдается подписка на 1 день бесплатно.',
  },
  {
    q: 'Сколько устройств можно подключить одновременно?',
    a: 'Все тарифы включают до 5 устройств одновременно. Телефон, планшет, компьютер и телевизор работают параллельно.',
  },
  {
    q: 'Как быстро конфигурация появится после оплаты?',
    a: 'Мгновенно. Как только платёж подтверждается, конфигурация появляется в аккаунте — перезапускать приложение не нужно.',
  },
  {
    q: 'Есть ли ограничения по скорости или трафику?',
    a: 'Нет. Трафик безлимитный, скорость не режется. Серверы работают на каналах 10 Гбит.',
  },
  {
    q: 'Можно ли использовать на Smart TV или роутере?',
    a: 'Да. Happ поддерживает Apple TV (tvOS) напрямую. Для роутеров подходит ручная настройка — поддержка поможет с конфигурацией.',
  },
  {
    q: 'Что делать, если соединение стало нестабильным?',
    a: 'Переключитесь на другой сервер в приложении. Если не помогло — напишите в поддержку, обычно отвечаем за 10 минут.',
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="section" style={{ background: '#0F1116' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <p className="kicker" style={{ color: '#4A8CFF' }}>
          FAQ
        </p>
        <h2 className="h2" style={{ color: '#fff', marginBottom: 36 }}>
          Частые вопросы
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={clsx('faq-item', isOpen && 'is-open')} key={item.q}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-sign">{isOpen ? '−' : '+'}</span>
                </button>
                <p className="faq-a">{item.a}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
