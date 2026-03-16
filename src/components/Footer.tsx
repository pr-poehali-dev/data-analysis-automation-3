interface FooterProps {
  onOpenPolicy: (type: "privacy" | "agency") => void
}

export default function Footer({ onOpenPolicy }: FooterProps) {
  return (
    <footer className="relative z-20 w-full bg-black/40 backdrop-blur-md border-t border-white/10 px-6 py-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <a
              href="https://t.me/ug_transfer_online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 text-xs hover:text-white transition-colors"
            >
              Telegram
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

      <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-white/40 text-xs">© 2024 Эвакуатор Крым. Все права защищены.</p>
        <p className="text-white/40 text-xs">Крым · Симферополь · Ялта · Севастополь · Керчь</p>
      </div>
    </footer>
  )
}
