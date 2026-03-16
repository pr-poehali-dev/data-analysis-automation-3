import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ADMIN_LOGIN = "Yalta"
const ADMIN_PASSWORD = "Yalta220577"

interface NewsItem {
  id: number
  title: string
  content: string
  date: string
}

export default function Admin() {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const [news, setNews] = useState<NewsItem[]>([
    { id: 1, title: "Открыли новое направление — Феодосия", content: "Теперь принимаем заказы на эвакуатор в Феодосию и обратно. Работаем 24/7.", date: "2024-01-15" },
  ])
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ title: "", content: "", date: "" })

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      setIsAuth(true)
      setError("")
    } else {
      setError("Неверный логин или пароль")
    }
  }

  function handleAdd() {
    if (!form.title || !form.content) return
    const newItem: NewsItem = {
      id: Date.now(),
      title: form.title,
      content: form.content,
      date: form.date || new Date().toISOString().split("T")[0],
    }
    setNews([newItem, ...news])
    setForm({ title: "", content: "", date: "" })
  }

  function handleEdit(item: NewsItem) {
    setEditId(item.id)
    setForm({ title: item.title, content: item.content, date: item.date })
  }

  function handleSave() {
    setNews(news.map(n => n.id === editId ? { ...n, ...form } : n))
    setEditId(null)
    setForm({ title: "", content: "", date: "" })
  }

  function handleDelete(id: number) {
    setNews(news.filter(n => n.id !== id))
  }

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <button onClick={() => navigate("/")} className="text-white/40 hover:text-white/70 text-xs mb-8 flex items-center gap-1 transition-colors">
            ← На главную
          </button>
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8">
            <h1 className="text-white text-xl font-medium mb-1">Вход в панель</h1>
            <p className="text-white/40 text-xs mb-6">Управление новостями сайта</p>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="text-white/50 text-xs mb-1 block">Логин</label>
                <input
                  type="text"
                  value={login}
                  onChange={e => setLogin(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-white/30 transition-colors"
                  autoComplete="username"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Пароль</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-white/30 transition-colors"
                  autoComplete="current-password"
                />
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button
                type="submit"
                className="w-full bg-white text-black font-medium text-sm py-2.5 rounded-lg hover:bg-white/90 active:scale-95 transition-all duration-200 mt-2"
              >
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-xl font-medium">Управление новостями</h1>
            <p className="text-white/40 text-xs mt-0.5">Публикация и редактирование новостей</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="text-white/40 hover:text-white/70 text-xs transition-colors">
              На главную
            </button>
            <button onClick={() => setIsAuth(false)} className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Выйти
            </button>
          </div>
        </div>

        {/* Форма добавления / редактирования */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-white text-sm font-medium mb-4">
            {editId ? "Редактировать новость" : "Новая публикация"}
          </h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Заголовок"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/30"
            />
            <textarea
              placeholder="Текст новости"
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              rows={4}
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/30 resize-none"
            />
            <input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-white/30 transition-colors"
            />
            <div className="flex gap-2">
              {editId ? (
                <>
                  <button onClick={handleSave} className="flex-1 bg-white text-black text-sm font-medium py-2.5 rounded-lg hover:bg-white/90 active:scale-95 transition-all duration-200">
                    Сохранить
                  </button>
                  <button onClick={() => { setEditId(null); setForm({ title: "", content: "", date: "" }) }} className="px-4 py-2.5 rounded-lg border border-white/10 text-white/50 text-sm hover:border-white/30 transition-colors">
                    Отмена
                  </button>
                </>
              ) : (
                <button onClick={handleAdd} className="flex-1 bg-white text-black text-sm font-medium py-2.5 rounded-lg hover:bg-white/90 active:scale-95 transition-all duration-200">
                  Опубликовать
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Список новостей */}
        <div className="flex flex-col gap-3">
          {news.length === 0 && (
            <p className="text-white/30 text-sm text-center py-8">Новостей пока нет</p>
          )}
          {news.map(item => (
            <div key={item.id} className="bg-zinc-900 border border-white/10 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-white/40 text-xs mb-1">{item.date}</p>
                  <h3 className="text-white text-sm font-medium mb-1 truncate">{item.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed line-clamp-2">{item.content}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => handleEdit(item)} className="text-white/40 hover:text-white text-xs transition-colors">
                    Изменить
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-400/60 hover:text-red-400 text-xs transition-colors">
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
