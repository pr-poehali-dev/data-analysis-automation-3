interface FooterProps {
  onOpenPolicy: (type: "privacy" | "agency") => void
}

export default function Footer({ onOpenPolicy }: FooterProps) {
  return (
    <footer className="relative z-20 w-full bg-black/40 backdrop-blur-md border-t-2 border-yellow-400 px-6 py-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* О нас */}
        <div>
          <h3 className="text-white font-medium text-sm mb-3">О нас</h3>
          <p className="text-white/60 text-xs leading-relaxed">
            Профессиональный эвакуатор и трансфер по всему Крыму. Работаем круглосуточно, без выходных.
            Оперативная подача — от 30 минут.
          </p>
        </div>

        {/* Контакты */}
        <div>
          <h3 className="text-white font-medium text-sm mb-3">Контакты</h3>
          <div className="flex flex-col gap-2">
            <a
              href="tel:+79956141414"
              className="text-white/60 text-xs hover:text-white transition-colors"
            >
              +7 995 614-14-14
            </a>
            <a
              href="mailto:Yaltataran@gmail.com"
              className="text-white/60 text-xs hover:text-white transition-colors"
            >
              Yaltataran@gmail.com
            </a>
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://t.me/ug_transfer_online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                title="Telegram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.378l-2.968-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.896.181z"/>
                </svg>
              </a>
              <a
                href="https://max.ru/u/f9LHodD0cOLfcwdQZmP_TA1hXG1fSHf_rVVPptGTy_7FmQh-zvIFpGfU_lg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                title="MAX"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.04 2 11.1c0 2.8 1.4 5.3 3.6 6.9l-1.1 3.5c-.1.3.2.6.5.4l3.8-2.1c1 .3 2.1.5 3.2.5 5.52 0 10-4.04 10-9.1S17.52 2 12 2z" fill="currentColor"/>
                  <path d="M12 5.5c-3.59 0-6.5 2.51-6.5 5.6 0 3.09 2.91 5.6 6.5 5.6.56 0 1.1-.07 1.62-.2l2.38 1.3c.2.1.4-.1.35-.3l-.65-2.1C17.18 14.2 18.5 12.5 18.5 11.1c0-3.09-2.91-5.6-6.5-5.6z" fill="black" fillOpacity="0.9"/>
                </svg>
              </a>

            </div>
          </div>
        </div>

        {/* Разделы */}
        <div>
          <h3 className="text-white font-medium text-sm mb-3">Разделы</h3>
          <div className="flex flex-col gap-2">
            <a href="/" className="text-white/60 text-xs hover:text-white transition-colors">
              Главная
            </a>
            <a href="/news" className="text-white/60 text-xs hover:text-white transition-colors">
              Новости
            </a>
            <a href="/blog" className="text-white/60 text-xs hover:text-white transition-colors">
              Блог
            </a>
            <a href="https://ug-transfer.online/" target="_blank" rel="noopener noreferrer" className="text-white/60 text-xs hover:text-white transition-colors">
              Заказать такси
            </a>
          </div>
        </div>

        {/* Документы */}
        <div>
          <h3 className="text-white font-medium text-sm mb-3">Документы</h3>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onOpenPolicy("privacy")}
              className="text-white/60 text-xs hover:text-white transition-colors text-left"
            >
              Политика конфиденциальности
            </button>
            <button
              onClick={() => onOpenPolicy("agency")}
              className="text-white/60 text-xs hover:text-white transition-colors text-left"
            >
              Агентский договор
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-yellow-400/30 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-white/40 text-xs">© 2024 Эвакуатор Крым. Все права защищены.</p>
        <p className="text-white/40 text-xs">Крым · Симферополь · Ялта · Севастополь · Керчь</p>
      </div>
    </footer>
  )
}