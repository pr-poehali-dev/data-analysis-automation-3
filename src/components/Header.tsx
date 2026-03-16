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