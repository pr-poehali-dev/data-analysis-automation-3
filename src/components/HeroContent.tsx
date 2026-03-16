interface HeroContentProps {
  onOpenModal: () => void
}

export default function HeroContent({ onOpenModal }: HeroContentProps) {
  return (
    <main className="absolute inset-0 z-20 flex items-center px-6 md:px-8 md:pt-20 md:pb-16">
      <div className="flex w-full items-center">
      <div className="text-left max-w-lg">
        <div
          className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent rounded-full" />
          <span className="text-white/90 text-xs font-light relative z-10">Эвакуатор и трансфер по всему Крыму · 24/7</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-4">
          <span className="font-medium italic">Эвакуатор</span>
          <br />
          <span className="font-light tracking-tight text-white">в Крыму</span>
        </h1>

        {/* Description */}
        <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
          Подача за 30 минут в любую точку полуострова. Симферополь, Севастополь, Ялта, Керчь и другие города.
          Легковые, грузовые автомобили и спецтехника. Работаем круглосуточно.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={onOpenModal}
            className="md:hidden px-8 py-3 rounded-full bg-yellow-400 text-black font-normal text-xs transition-all duration-200 hover:bg-yellow-300 active:scale-95"
          >
            Оставить заявку
          </button>
          <a
            href="https://t.me/ug_transfer_online"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden flex items-center gap-2 px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.378l-2.968-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.896.181z"/>
            </svg>
            Написать в Telegram
          </a>
          <button
            onClick={onOpenModal}
            className="hidden md:block px-8 py-3 rounded-full bg-yellow-400 text-black font-normal text-xs transition-all duration-200 hover:bg-yellow-300 active:scale-95"
          >
            Оставить заявку
          </button>
          <a
            href="tel:+79956141414"
            className="hidden md:block px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50"
          >
            Позвонить: +7 995 614-14-14
          </a>
        </div>
      </div>
      <div className="hidden md:flex flex-1 justify-center items-center">
        <img
          src="https://cdn.poehali.dev/projects/b275e081-8e63-4958-8c50-b2e74190fc81/bucket/1eec948d-f678-41ff-add6-277e63ed612e.jpg"
          alt="Эвакуатор"
          className="max-w-[550px] w-full object-contain drop-shadow-2xl rounded-2xl border-2 border-yellow-400"
        />
      </div>
      </div>
    </main>
  )
}