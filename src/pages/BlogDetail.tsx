import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Header from "@/components/Header"
import OrderModal from "@/components/OrderModal"
import Footer from "@/components/Footer"
import PolicyModal from "@/components/PolicyModal"

const API_URL = "https://functions.poehali.dev/1279db87-9326-4b6d-9988-ad8a408d5f79"

interface BlogItem {
  id: number
  title: string
  content: string
  date: string
  image_url: string | null
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
}

export default function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState<BlogItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [policyType, setPolicyType] = useState<"privacy" | "agency" | null>(null)

  useEffect(() => {
    fetch(`${API_URL}?type=blog&id=${id}`)
      .then(r => {
        if (r.status === 404) { setNotFound(true); setLoading(false); return null }
        return r.json()
      })
      .then(data => { if (data) { setItem(data); setLoading(false) } })
      .catch(() => setLoading(false))
  }, [id])

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      <Header onOpenModal={() => setModalOpen(true)} />
      <main className="flex-1 pt-28 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate("/blog")}
            className="text-white/40 hover:text-white/70 text-xs mb-8 flex items-center gap-1 transition-colors"
          >
            ← Все статьи
          </button>

          {loading && (
            <div className="flex gap-2 items-center text-white/30 text-sm">
              <div className="w-4 h-4 border border-white/20 border-t-white/60 rounded-full animate-spin" />
              Загрузка...
            </div>
          )}

          {notFound && (
            <div>
              <p className="text-white/40 text-sm mb-4">Статья не найдена</p>
              <button onClick={() => navigate("/blog")} className="text-white text-sm hover:text-white/70 transition-colors">
                ← Вернуться к блогу
              </button>
            </div>
          )}

          {item && (
            <article>
              <p className="text-white/40 text-xs mb-3">{formatDate(item.date)}</p>
              <h1 className="text-white text-2xl md:text-3xl font-light mb-4 leading-snug">{item.title}</h1>
              <div className="w-12 h-[2px] bg-yellow-400 mb-6" />
              {item.image_url && (
                <img src={item.image_url} alt={item.title} className="w-full rounded-xl mb-6 object-cover max-h-[400px]" />
              )}
              <div className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{item.content}</div>
            </article>
          )}
        </div>
      </main>
      <Footer onOpenPolicy={setPolicyType} />
      <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <PolicyModal open={policyType !== null} type={policyType} onClose={() => setPolicyType(null)} />
    </div>
  )
}
