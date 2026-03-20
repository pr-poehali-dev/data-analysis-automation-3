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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.2 14.4L12 14l-3.2 2.4.8-3.8L6.4 9.8l3.9-.2L12 6l1.7 3.6 3.9.2-3.2 2.8.8 3.8z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/79956141414"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                title="WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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