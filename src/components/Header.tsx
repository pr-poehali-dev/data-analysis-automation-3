export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-11 p-6">
      <div className="flex justify-between items-center">
        <img
          src="https://cdn.poehali.dev/projects/b275e081-8e63-4958-8c50-b2e74190fc81/bucket/a0cb0a3c-3212-4748-965c-9d6888d8d1ab.png"
          alt="Юг-Трансфер"
          className="h-10 w-auto object-contain"
        />
        <nav className="flex items-center gap-6">
          <a
            href="https://t.me/ug_transfer_online"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-xs uppercase"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.378l-2.968-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.896.181z"/>
            </svg>
            Telegram
          </a>
          <a
            href="tel:+79956141414"
            className="text-white hover:text-neutral-400 transition-colors duration-300 uppercase text-sm font-medium"
          >
            +7 995 614-14-14
          </a>
        </nav>
      </div>
    </header>
  )
}