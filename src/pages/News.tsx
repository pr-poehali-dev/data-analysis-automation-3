import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "@/components/Header"
import OrderModal from "@/components/OrderModal"
import Footer from "@/components/Footer"
import PolicyModal from "@/components/PolicyModal"

const NEWS_URL = "https://functions.poehali.dev/1279db87-9326-4b6d-9988-ad8a408d5f79"

interface NewsItem {
  id: number
  title: string
  content: string
  date: string
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
}

export default function News() {
  const navigate = useNavigate()
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [policyType, setPolicyType] = useState<"privacy" | "agency" | null>(null)

  useEffect(() => {
    fetch(NEWS_URL)
      .then(r => r.json())
      .then(data => { setNews(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      <Header onOpenModal={() => setModalOpen(true)} />
      <main className="flex-1 pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-white text-3xl font-light mb-2">Новости</h1>
          <p className="text-white/40 text-sm mb-4">Актуальная информация об эвакуаторе в Крыму</p>
          <div className="w-12 h-[2px] bg-yellow-400 mb-10" />

          {loading && (
            <div className="flex gap-2 items-center text-white/30 text-sm">
              <div className="w-4 h-4 border border-white/20 border-t-white/60 rounded-full animate-spin" />
              Загрузка...
            </div>
          )}

          {!loading && news.length === 0 && (
            <p className="text-white/30 text-sm">Новостей пока нет</p>
          )}

          <div className="flex flex-col gap-4">
            {news.map(item => (
              <article
                key={item.id}
                onClick={() => navigate(`/news/${item.id}`)}
                className="group bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-2xl p-6 cursor-pointer transition-all duration-200 border-l-2 border-l-yellow-400"
              >
                <p className="text-white/40 text-xs mb-2">{formatDate(item.date)}</p>
                <h2 className="text-white text-base font-medium mb-2 group-hover:text-white/90 transition-colors">{item.title}</h2>
                <p className="text-white/60 text-sm leading-relaxed line-clamp-3">{item.content}</p>
                <span className="inline-block mt-3 text-white/40 text-xs group-hover:text-white/70 transition-colors">
                  Читать далее →
                </span>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer onOpenPolicy={setPolicyType} />
      <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <PolicyModal open={policyType !== null} type={policyType} onClose={() => setPolicyType(null)} />
    </div>
  )
}