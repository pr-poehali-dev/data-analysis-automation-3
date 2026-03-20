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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3C7.03 3 3 6.8 3 11.4c0 2.63 1.3 4.96 3.35 6.47L4.5 22l4.2-2.08c1.03.35 2.15.54 3.3.54 4.97 0 9-3.8 9-8.46C21 7.34 16.97 3 12 3z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round"/>
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