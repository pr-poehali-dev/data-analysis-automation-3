import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"
import PartnersModal from "@/components/PartnersModal"

interface HeaderProps {
  onOpenModal: () => void
}

export default function Header({ onOpenModal }: HeaderProps) {
  const [partnersOpen, setPartnersOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/60 backdrop-blur-md transition-all duration-300">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <a href="/" onClick={() => window.location.reload()} className="cursor-pointer">
              <img
                src="https://cdn.poehali.dev/projects/b275e081-8e63-4958-8c50-b2e74190fc81/bucket/a0cb0a3c-3212-4748-965c-9d6888d8d1ab.png"
                alt="Юг-Трансфер"
                className="h-10 w-auto object-contain hover:opacity-80 transition-opacity duration-200"
              />
            </a>
            <nav className="hidden lg:flex items-center gap-6">
              <a href="/" onClick={() => window.location.reload()} className="text-white/80 hover:text-white transition-colors text-sm">
                Главная
              </a>
              <a href="https://ug-transfer.online/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors text-sm">
                Заказать такси
              </a>
              <a href="/news" className="text-white/80 hover:text-white transition-colors text-sm">
                Новости
              </a>
              <a href="/blog" className="text-white/80 hover:text-white transition-colors text-sm">
                Блог
              </a>
              <button onClick={() => setPartnersOpen(true)} className="text-white/80 hover:text-white transition-colors text-sm">
                Партнёры
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+79956141414"
              className="hidden sm:block text-white hover:text-neutral-400 transition-colors duration-300 uppercase text-sm font-medium"
            >
              +7 995 614-14-14
            </a>
            <div className="hidden sm:block w-px h-4 bg-white/30" />
            <a
              href="https://t.me/ug_transfer_online"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-white hover:text-white/60 transition-colors duration-200"
              title="Telegram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.378l-2.968-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.896.181z"/>
              </svg>
            </a>
            <a
              href="https://wa.me/79956141414"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-white hover:text-white/60 transition-colors duration-200"
              title="WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 transition-colors"
            >
              <Icon name="Menu" size={20} className="text-white" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow-400" />
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[200]" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="absolute top-0 right-0 h-full w-full max-w-xs bg-neutral-950 border-l border-white/10 p-6 flex flex-col animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-white/50 text-xs uppercase tracking-widest">Меню</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <Icon name="X" size={18} />
              </button>
            </div>

            <nav className="flex flex-col gap-1 flex-1">
              <a
                href="/"
                onClick={() => { setMenuOpen(false); window.location.reload() }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm"
              >
                <Icon name="Home" size={18} className="text-white/40" />
                Главная
              </a>
              <button
                onClick={() => { setMenuOpen(false); onOpenModal() }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-yellow-400 hover:bg-yellow-400/10 transition-colors text-sm font-medium text-left"
              >
                <Icon name="Truck" size={18} className="text-yellow-400/60" />
                Вызвать эвакуатор
              </button>
              <a
                href="https://ug-transfer.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm"
              >
                <Icon name="Car" size={18} className="text-white/40" />
                Заказать такси
              </a>
              <a
                href="/news"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm"
              >
                <Icon name="Newspaper" size={18} className="text-white/40" />
                Новости
              </a>
              <a
                href="/blog"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm"
              >
                <Icon name="BookOpen" size={18} className="text-white/40" />
                Блог
              </a>
              <button
                onClick={() => { setMenuOpen(false); setPartnersOpen(true) }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm text-left"
              >
                <Icon name="Handshake" size={18} className="text-white/40" />
                Партнёры
              </button>

              <div className="h-px bg-white/10 my-2" />

              <button
                onClick={() => { setMenuOpen(false); navigate("/admin") }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors text-sm text-left"
              >
                <Icon name="LogIn" size={18} className="text-white/20" />
                Вход
              </button>
            </nav>

            <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
              <a
                href="tel:+79956141414"
                className="flex items-center gap-3 text-white text-sm font-medium"
              >
                <Icon name="Phone" size={16} className="text-yellow-400" />
                +7 995 614-14-14
              </a>
              <div className="flex gap-3">
                <a
                  href="https://t.me/ug_transfer_online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.378l-2.968-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.896.181z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/79956141414"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <PartnersModal open={partnersOpen} onClose={() => setPartnersOpen(false)} />
    </>
  )
}
